import { NodeEditor, NodeId } from 'rete';
import { DiContainer, Schemes } from "./index"
import * as ANodes from './nodes';
import { Connection } from './connections';
import { NodeFactory } from './nodes/types';

export async function createNode(name: string, data: any, uniformFunctionMap?: any) {
  const nodes = {
    [ANodes.Float.ID]: () => new ANodes.Float(data),
    [ANodes.Vec2.ID]: () => new ANodes.Vec2(data),
    [ANodes.Vec3.ID]: () => new ANodes.Vec3(data),
    [ANodes.Vec4.ID]: () => new ANodes.Vec4(data),

    [ANodes.SplitVec2D.ID]: () => new ANodes.SplitVec2D(data),
    [ANodes.SplitVec3D.ID]: () => new ANodes.SplitVec3D(data),
    [ANodes.SplitVec4D.ID]: () => new ANodes.SplitVec4D(data),
    [ANodes.UniformFloat.ID]: () => {
      return uniformFunctionMap
        ? new ANodes.UniformFloat(data, uniformFunctionMap[data.name])
        : new ANodes.UniformFloat(data);
    },
    [ANodes.UniformVec2.ID]: () => {
      return uniformFunctionMap
        ? new ANodes.UniformVec2(data, uniformFunctionMap[data.name])
        : new ANodes.UniformVec2(data);
    },
    [ANodes.UniformVec3.ID]: () => {
      return uniformFunctionMap
        ? new ANodes.UniformVec3(data, uniformFunctionMap[data.name])
        : new ANodes.UniformVec3(data);
    },
    [ANodes.UniformVec4.ID]: () => {
      return uniformFunctionMap
        ? new ANodes.UniformVec4(data, uniformFunctionMap[data.name])
        : new ANodes.UniformVec4(data);
    },

    [ANodes.Union.ID]: () => new ANodes.Union(),
    [ANodes.Difference.ID]: () => new ANodes.Difference(),
    [ANodes.Intersection.ID]: () => new ANodes.Intersection(),
    [ANodes.Complement.ID]: () => new ANodes.Complement(),

    [ANodes.RegisterGeometry.ID]: () => new ANodes.RegisterGeometry(data),
    [ANodes.RegisterState.ID]: () => new ANodes.RegisterState(data),
    [ANodes.RegisterMaterial.ID]: () => new ANodes.RegisterMaterial(data),
    [ANodes.NamedGeometry.ID]: () => new ANodes.NamedGeometry(data),
    [ANodes.SetMaterial.ID]: () => new ANodes.SetMaterial(data),
    
    // Neo - Transforms + Cuboid + Superquadric + base SuperPrim
    [ANodes.Translate3D.ID]: () => new ANodes.Translate3D(data),
    [ANodes.EulerRotate3D.ID]: () => new ANodes.EulerRotate3D(data),
    [ANodes.AARotate3D.ID]: () => new ANodes.AARotate3D(data),
    [ANodes.Scale3D.ID]: () => new ANodes.Scale3D(data),
    [ANodes.Plane3D.ID]: () => new ANodes.Plane3D(data),
    [ANodes.Cuboid3D.ID]: () => new ANodes.Cuboid3D(data),
    [ANodes.SuperQuadric3D.ID]: () => new ANodes.SuperQuadric3D(data),
    [ANodes.NeoPrimitive3D.ID]: () => new ANodes.NeoPrimitive3D(data),


    [ANodes.Translate2D.ID]: () => new ANodes.Translate2D(data),
    [ANodes.EulerRotate2D.ID]: () => new ANodes.EulerRotate2D(data),
    [ANodes.Scale2D.ID]: () => new ANodes.Scale2D(data),
    [ANodes.Rectangle2D.ID]: () => new ANodes.Rectangle2D(data),
    [ANodes.Trapezoid2D.ID]: () => new ANodes.Trapezoid2D(data),
    [ANodes.PolyLine2D.ID]: () => new ANodes.PolyLine2D(data),
    [ANodes.Circle2D.ID]: () => new ANodes.Circle2D(data),
    [ANodes.Dilate2D.ID]: () => new ANodes.Dilate2D(data),
    [ANodes.NullExpression2D.ID]: () => new ANodes.NullExpression2D(),



    [ANodes.LinkedHeightField3D.ID]: () => new ANodes.LinkedHeightField3D(),
    [ANodes.ApplyHeight.ID]: () => new ANodes.ApplyHeight(data),
    [ANodes.MarkerNode.ID]: () => new ANodes.MarkerNode(),
    

    [ANodes.UnaryOperator.ID]: () => new ANodes.UnaryOperator(data),
    [ANodes.BinaryOperator.ID]: () => new ANodes.BinaryOperator(data),
    [ANodes.VectorOperator.ID]: () => new ANodes.VectorOperator(data),
  }

  const matched = nodes[name]

  if (!matched) throw new Error(`Unsupported node '${name}'`);

  const node = await matched()

  return node
}

type Data = {
  nodes: { id: NodeId, name: string, data: Record<string, unknown> }[]
  connections: { id: NodeId, source: string, target: string, sourceOutput: keyof Node['outputs'], targetInput: keyof Node['inputs'] }[]
  positions: Record<string, { x: number, y: number }>
}

export async function importEditor(di: DiContainer, data: Data, other_editor?: any, uniformFunctionMap?: any) {
  const { nodes, connections, positions} = data;

  for (const n of nodes) {
    const node = await createNode(n.name, n.data, uniformFunctionMap);
    node.id = n.id;
    await di.editor.addNode(node);
  }
  for (const c of connections) {
    const source = di.editor.getNode(c.source);
    const target = di.editor.getNode(c.target);

    if (
      source &&
      target &&
      source.outputs[c.sourceOutput] &&
      target.inputs[c.targetInput]
    ) {
      const conn = new Connection(source, c.sourceOutput, target, c.targetInput);

      await di.editor.addConnection(conn);
    }
  }
  other_editor.loadPositions(positions);
  // other_editor.loadComments(comments);
}

export function exportEditor(editor: NodeEditor<Schemes>, other_editor: any) {
  const nodes = [];
  const connections = [];
  const positions = other_editor.savePositions();
  // const comments = other_editor.saveComments();


  for (const n of editor.getNodes()) {
    nodes.push({
      id: n.id,
      name: (n.constructor as NodeFactory).ID,
      data: n.serialize()

    });
  }
  for (const c of editor.getConnections()) {
    connections.push({
      source: c.source,
      sourceOutput: c.sourceOutput,
      target: c.target,
      targetInput: c.targetInput
    });
  }

  return {
    nodes,
    connections,
    positions,
    // comments
  };
}
