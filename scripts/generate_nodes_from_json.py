"""
Generate static TypeScript node definition files from asmblr/nodes.json.

Behavior:
- Default input JSON path: ../../../asmblr/nodes.json (relative to this script)
- Output folder: ../src/components/editors/reactflow_editor/nodes/auto_nodes/{primitives2d,primitives3d,transforms2d,transforms3d,combinators,color,auto}
- One-time: if index.ts exists, do nothing unless --force provided
- Writes an index.ts that re-exports all generated definitions
- Writes a variadic_policy.json with { nodeType: { inputKey: boolean } }

Usage:
  python generate_nodes_from_json.py [--input /path/to/nodes.json] [--force]
"""

import argparse
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT_BASE = ROOT.parent / 'src' / 'components' / 'editors' / 'reactflow_editor' / 'nodes' / 'auto_nodes'

# No mapping needed - use categories directly
EXCLUDE_SYMBOLS = {
    'JoinUnion', 'EncodedRGBGrid3D', 'RGBGrid3D', "SDFGrid3D",
    "TileUV2D", "SinRepeatX2D", "SinRepeatY2D",
    "SinAlongAxisY2D", "SinDiagonal2D", "SinDiagonalFlip2D",
    "SinRadial2D", "SquiggleX2D", "SquiggleY2D",
    "SquiggleDiagonal2D", "SquiggleDiagonalFlip2D",
    "SquiggleRadial2D", "SquiggleDistortion2D"
}


def to_file_safe(name: str) -> str:
  return re.sub(r'[^A-Za-z0-9_]', '', name)


def bucket_for_file(node: dict) -> str:
  """Use the category directly as the bucket name"""
  return node.get('category', 'auto')

def category_for_node(node: dict) -> str:
  """Return the original category from the node without mapping"""
  # Just return the category as-is from the node
  return node.get('category', 'auto')


def render_node_definition(node: dict, bucket: str) -> str:
  # Build inputs matching InputDefinition interface
  inputs = []
  for i in node.get('inputs', []):
    input_def = {
      'key': i.get('key'),
      'label': i.get('label'),
      'socketType': 'ExprSocket',  # All sockets are now expressions
      'required': bool(i.get('required'))
    }
    # Add optional fields only if they exist
    if i.get('defaultValue') is not None:
      input_def['defaultValue'] = i.get('defaultValue')
    if i.get('description'):
      input_def['description'] = i.get('description')
    if 'variadic' in i:
      input_def['variadic'] = bool(i['variadic'])
    inputs.append(input_def)
    
  # Build outputs matching OutputDefinition interface  
  outputs = []
  for o in node.get('outputs', []):
    output_def = {
      'key': o.get('key'),
      'label': o.get('label'),
      'socketType': 'ExprSocket'  # All sockets are now expressions
    }
    # Add optional fields only if they exist
    if o.get('description'):
      output_def['description'] = o.get('description')
    outputs.append(output_def)
    
  # Build controls matching ControlDefinition interface
  controls = []
  for c in node.get('controls', []):
    control_def = {
      'key': c.get('key'),
      'type': c.get('type'),  # Raw type string from backend
      'label': c.get('label'),
      'config': c.get('config', {})
    }
    # Add optional fields only if they exist
    if c.get('linkedToInput'):
      control_def['linkedToInput'] = c.get('linkedToInput')
    if c.get('description'):
      control_def['description'] = c.get('description')
    if 'showLabel' in c:
      control_def['showLabel'] = bool(c.get('showLabel'))
    if 'hasSocket' in c:
      control_def['hasSocket'] = bool(c.get('hasSocket'))
    # Remove socketType from controls - not needed anymore
    controls.append(control_def)

  # Use a clean template with proper formatting
  template = """  type: "{type}",
  label: "{label}",
  category: "{category}",
  description: "{description}",
  inputs: {inputs},
  outputs: {outputs},
  controls: {controls},
  factory: (data?: Record<string, any>) => ({{ ...(data || {{}}) }})"""

  return template.format(
    type=node['type'],
    label=node.get('label') or node['type'],
    category=category_for_node(node),
    description=node.get('description') or '',
    inputs=json.dumps(inputs),
    outputs=json.dumps(outputs),
    controls=json.dumps(controls)
  )


def render_bucket_file(definitions: list) -> str:
  """Render a consolidated TypeScript file for a bucket of node definitions."""
  ts = []
  ts.append('// Auto-generated from asmblr/nodes.json. Do not edit.')
  ts.append("import { NodeDefinition } from '../../definitions/NodeDefinitions';")
  ts.append('')
  
  for const_name, definition_body in definitions:
    ts.append(f"export const {const_name}: NodeDefinition = {{")
    ts.append(definition_body)
    ts.append('};')
    ts.append('')
  
  return '\n'.join(ts)


def main():
  parser = argparse.ArgumentParser()
  default_input = (ROOT / '../../../..' / 'asmblr' / 'nodes.json').resolve()
  parser.add_argument('--input', type=str, default=str(default_input))
  parser.add_argument('--force', action='store_true')
  args = parser.parse_args()

  input_path = Path(args.input)
  if not input_path.exists():
    raise SystemExit(f"Missing nodes.json at {input_path}")

  OUT_BASE.mkdir(parents=True, exist_ok=True)
  index_file = OUT_BASE / 'index.ts'
  if index_file.exists() and not args.force:
    print('[generate-nodes] Skipping (already exists). Use --force to regenerate.')
    return

  with open(input_path, 'r') as f:
    data = json.load(f)
  nodes = data.get('nodes', [])

  exports = []
  buckets_content = {}
  
  for node in nodes:
    bucket = bucket_for_file(node)
    file_safe = to_file_safe(node['type'])
    
    # Initialize bucket if it doesn't exist
    if bucket not in buckets_content:
      buckets_content[bucket] = []
    
    # Build node definition
    const_name = f"{file_safe}Definition"
    buckets_content[bucket].append((const_name, render_node_definition(node, bucket)))
    exports.append(f"export {{ {const_name} }} from './{bucket}';")

  # Write consolidated files per bucket
  for bucket in buckets_content:
    if buckets_content[bucket]:
      bucket_path = OUT_BASE / f"{bucket}.ts"
      content = render_bucket_file(buckets_content[bucket])
      with open(bucket_path, 'w') as f:
        f.write(content)

  with open(index_file, 'w') as f:
    f.write('\n'.join(exports) + '\n')

  print(f"[generate-nodes] Wrote {len(exports)} node definitions to {OUT_BASE}")
  print("[generate-nodes] Variadic flags are now included directly in node definitions")


if __name__ == '__main__':
  main()


