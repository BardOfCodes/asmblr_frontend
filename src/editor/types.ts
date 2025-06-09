import { Connection } from './connections'
import * as ANodes from './nodes'

export type Node =
  | ANodes.Float
  | ANodes.Vec2
  | ANodes.Vec3
  | ANodes.Vec4
  | ANodes.SplitVec2D
  | ANodes.SplitVec3D
  | ANodes.SplitVec4D
  | ANodes.UniformFloat
  | ANodes.UniformVec2
  | ANodes.UniformVec3
  | ANodes.Translate2D
  | ANodes.EulerRotate2D
  | ANodes.Scale2D
  | ANodes.Rectangle2D
  | ANodes.Trapezoid2D
  | ANodes.PolyLine2D
  | ANodes.Circle2D
  | ANodes.NullExpression2D
  | ANodes.Dilate2D
  | ANodes.Translate3D
  | ANodes.EulerRotate3D
  | ANodes.Scale3D
  | ANodes.Plane3D
  | ANodes.Union
  | ANodes.Intersection
  | ANodes.Difference
  | ANodes.Complement
  | ANodes.ApplyHeight
  | ANodes.Difference
  | ANodes.LinkedHeightField3D
  | ANodes.SetMaterial
  | ANodes.RegisterGeometry
  | ANodes.RegisterState
  | ANodes.NamedGeometry
  | ANodes.MarkerNode
  | ANodes.UnaryOperator
  | ANodes.BinaryOperator
  | ANodes.VectorOperator
  | ANodes.RegisterMaterial
  | ANodes.NeoPrimitive3D
  | ANodes.SuperQuadric3D
  | ANodes.Cuboid3D
  


export type ConnProps = Connection<Node, Node>
