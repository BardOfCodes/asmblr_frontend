import { Connection } from './connections'
import * as SWNodes from './sw_components'

export type Node =
  | SWNodes.Float
  | SWNodes.Vec2
  | SWNodes.Vec3
  | SWNodes.Vec4
  | SWNodes.SplitVec2D
  | SWNodes.SplitVec3D
  | SWNodes.SplitVec4D
  | SWNodes.UniformFloat
  | SWNodes.UniformVec2
  | SWNodes.UniformVec3
  | SWNodes.Translate2D
  | SWNodes.EulerRotate2D
  | SWNodes.Scale2D
  | SWNodes.Rectangle2D
  | SWNodes.Trapezoid2D
  | SWNodes.PolyLine2D
  | SWNodes.Circle2D
  | SWNodes.NullExpression2D
  | SWNodes.Dilate2D
  | SWNodes.Translate3D
  | SWNodes.EulerRotate3D
  | SWNodes.Scale3D
  | SWNodes.Plane3D
  | SWNodes.Union
  | SWNodes.Intersection
  | SWNodes.Difference
  | SWNodes.Complement
  | SWNodes.ApplyHeight
  | SWNodes.BBoxedApplyHeight
  | SWNodes.Difference
  | SWNodes.LinkedHeightField3D
  | SWNodes.SetMaterial
  | SWNodes.RegisterGeometry
  | SWNodes.RegisterGeometryBeta
  | SWNodes.RegisterState
  | SWNodes.NamedGeometry
  | SWNodes.ConvertToShaderNode
  | SWNodes.MarkerNode
  | SWNodes.UnaryOperator
  | SWNodes.BinaryOperator
  | SWNodes.VectorOperator


export type ConnProps = Connection<Node, Node>
