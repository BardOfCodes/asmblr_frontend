import { NodeEditor, NodeId } from 'rete';
import { DiContainer, Schemes } from "../editor"
import * as Nodes from './components';
import * as SWNodes from './sw_components';
import { Connection } from './connections';
import { NodeFactory } from './components/types';

export async function createNode(di: DiContainer, name: string, data: any, uniformFunctionMap?: any) {
  const nodes = {
    [SWNodes.Float.ID]: () => new SWNodes.Float(data),
    [SWNodes.Vec2.ID]: () => new SWNodes.Vec2(data),
    [SWNodes.Vec3.ID]: () => new SWNodes.Vec3(data),
    [SWNodes.Vec4.ID]: () => new SWNodes.Vec4(data),

    [SWNodes.SplitVec2D.ID]: () => new SWNodes.SplitVec2D(data),
    [SWNodes.SplitVec3D.ID]: () => new SWNodes.SplitVec3D(data),
    [SWNodes.SplitVec4D.ID]: () => new SWNodes.SplitVec4D(data),
    [SWNodes.UniformFloat.ID]: () => {
      return uniformFunctionMap
        ? new SWNodes.UniformFloat(data, uniformFunctionMap[data.name])
        : new SWNodes.UniformFloat(data);
    },
    [SWNodes.UniformVec2.ID]: () => {
      return uniformFunctionMap
        ? new SWNodes.UniformVec2(data, uniformFunctionMap[data.name])
        : new SWNodes.UniformVec2(data);
    },
    [SWNodes.UniformVec3.ID]: () => {
      return uniformFunctionMap
        ? new SWNodes.UniformVec3(data, uniformFunctionMap[data.name])
        : new SWNodes.UniformVec3(data);
    },
    [SWNodes.Translate2D.ID]: () => new SWNodes.Translate2D(data),
    [SWNodes.EulerRotate2D.ID]: () => new SWNodes.EulerRotate2D(data),
    [SWNodes.Scale2D.ID]: () => new SWNodes.Scale2D(data),
    [SWNodes.Rectangle2D.ID]: () => new SWNodes.Rectangle2D(data),
    [SWNodes.Trapezoid2D.ID]: () => new SWNodes.Trapezoid2D(data),
    [SWNodes.PolyLine2D.ID]: () => new SWNodes.PolyLine2D(data),
    [SWNodes.Circle2D.ID]: () => new SWNodes.Circle2D(data),
    [SWNodes.Dilate2D.ID]: () => new SWNodes.Dilate2D(data),
    [SWNodes.NullExpression2D.ID]: () => new SWNodes.NullExpression2D(),


    [SWNodes.Translate3D.ID]: () => new SWNodes.Translate3D(data),
    [SWNodes.EulerRotate3D.ID]: () => new SWNodes.EulerRotate3D(data),
    [SWNodes.Scale3D.ID]: () => new SWNodes.Scale3D(data),
    [SWNodes.Plane3D.ID]: () => new SWNodes.Plane3D(data),

    [SWNodes.Union.ID]: () => new SWNodes.Union(),
    [SWNodes.Difference.ID]: () => new SWNodes.Difference(),
    [SWNodes.Intersection.ID]: () => new SWNodes.Intersection(),
    [SWNodes.Complement.ID]: () => new SWNodes.Complement(),

    [SWNodes.ConvertToShaderNode.ID]: () => new SWNodes.ConvertToShaderNode(),
    [SWNodes.LinkedHeightField3D.ID]: () => new SWNodes.LinkedHeightField3D(),
    [SWNodes.ApplyHeight.ID]: () => new SWNodes.ApplyHeight(data),
    [SWNodes.SetMaterial.ID]: () => new SWNodes.SetMaterial(data),
    [SWNodes.RegisterGeometry.ID]: () => new SWNodes.RegisterGeometry(data),
    [SWNodes.RegisterState.ID]: () => new SWNodes.RegisterState(data),
    [SWNodes.NamedGeometry.ID]: () => new SWNodes.NamedGeometry(data),
    [SWNodes.MarkerNode.ID]: () => new SWNodes.MarkerNode(data),

    [SWNodes.UnaryOperator.ID]: () => new SWNodes.UnaryOperator(data),
    [SWNodes.BinaryOperator.ID]: () => new SWNodes.BinaryOperator(data),
    [SWNodes.VectorOperator.ID]: () => new SWNodes.VectorOperator(data),


    [Nodes.InputNumber.ID]: () => new Nodes.InputNumber(di, data),
    [Nodes.InputTexture.ID]: () => new Nodes.InputTexture(di, data),
    [Nodes.InputCurve.ID]: () => new Nodes.InputCurve(di, data),
    [Nodes.InputColor.ID]: () => new Nodes.InputColor(di, data),

    [Nodes.Brick.ID]: () => new Nodes.Brick(di),
    [Nodes.Circle.ID]: () => new Nodes.Circle(di, data),
    [Nodes.Noise.ID]: () => new Nodes.Noise(di),

    [Nodes.NumberNode.ID]: () => new Nodes.NumberNode(di, data),
    [Nodes.Add.ID]: () => new Nodes.Add(),
    [Nodes.Subtract.ID]: () => new Nodes.Subtract(),
    [Nodes.Distance.ID]: () => new Nodes.Distance(),
    [Nodes.Divide.ID]: () => new Nodes.Divide(),
    [Nodes.Multiply.ID]: () => new Nodes.Multiply(),
    [Nodes.Pow.ID]: () => new Nodes.Pow(di, data),

    [Nodes.Blend.ID]: () => new Nodes.Blend(di),
    [Nodes.Blur.ID]: () => new Nodes.Blur(di, data),
    [Nodes.Invert.ID]: () => new Nodes.Invert(di),
    [Nodes.Lightness.ID]: () => new Nodes.Lightness(di, data),
    [Nodes.NormalMap.ID]: () => new Nodes.NormalMap(di, data),
    [Nodes.Gradient.ID]: () => new Nodes.Gradient(di),
    [Nodes.Transform.ID]: () => new Nodes.Transform(di, data),

    [Nodes.ModuleNode.ID]: async () => {
      const node = new Nodes.ModuleNode(di, data)

      await node.update()
      return node
    },
    [Nodes.OutputMaterial.ID]: () => new Nodes.OutputMaterial(di),

    [Nodes.OutputNumber.ID]: () => new Nodes.OutputNumber(data),
    [Nodes.OutputTexture.ID]: () => new Nodes.OutputTexture(data),
    [Nodes.OutputCurve.ID]: () => new Nodes.OutputCurve(data),
    [Nodes.OutputColor.ID]: () => new Nodes.OutputColor(data),
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

export async function importEditor(di: DiContainer, data: Data, other_editor: any, uniformFunctionMap?: any) {
  const { nodes, connections, positions} = data;

  for (const n of nodes) {
    const node = await createNode(di, n.name, n.data, uniformFunctionMap);
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
