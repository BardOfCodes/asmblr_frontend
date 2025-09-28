// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const PolyLine2DDefinition: NodeDefinition = {
  type: "PolyLine2D",
  label: "PolyLine2D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "vertices", "label": "Vertices", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "vertices", "type": "string", "label": "Vertices", "config": {"defaultValue": null}, "linkedToInput": "vertices", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EvaluateLayoutNodeDefinition: NodeDefinition = {
  type: "EvaluateLayoutNode",
  label: "EvaluateLayoutNode",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec2DDefinition: NodeDefinition = {
  type: "SplitVec2D",
  label: "SplitVec2D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "float", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec3DDefinition: NodeDefinition = {
  type: "SplitVec3D",
  label: "SplitVec3D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "float", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec4DDefinition: NodeDefinition = {
  type: "SplitVec4D",
  label: "SplitVec4D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "float", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
