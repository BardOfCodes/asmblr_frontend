// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const ArbitraryCappedConeDefinition: NodeDefinition = {
  type: "ArbitraryCappedCone",
  label: "ArbitraryCappedCone",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ArbitraryCappedCylinder3DDefinition: NodeDefinition = {
  type: "ArbitraryCappedCylinder3D",
  label: "ArbitraryCappedCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ArbitraryRoundCone3DDefinition: NodeDefinition = {
  type: "ArbitraryRoundCone3D",
  label: "ArbitraryRoundCone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "r1", "label": "R1", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Box3DDefinition: NodeDefinition = {
  type: "Box3D",
  label: "Box3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "vector3", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BoxFrame3DDefinition: NodeDefinition = {
  type: "BoxFrame3D",
  label: "BoxFrame3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "e", "label": "E", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "e", "type": "float", "label": "E", "config": {"defaultValue": null}, "linkedToInput": "e", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedCone3DDefinition: NodeDefinition = {
  type: "CappedCone3D",
  label: "CappedCone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedCylinder3DDefinition: NodeDefinition = {
  type: "CappedCylinder3D",
  label: "CappedCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedTorus3DDefinition: NodeDefinition = {
  type: "CappedTorus3D",
  label: "CappedTorus3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Capsule3DDefinition: NodeDefinition = {
  type: "Capsule3D",
  label: "Capsule3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cone3DDefinition: NodeDefinition = {
  type: "Cone3D",
  label: "Cone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CubicBezierExtrude3DDefinition: NodeDefinition = {
  type: "CubicBezierExtrude3D",
  label: "CubicBezierExtrude3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "controls", "label": "Controls", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "controls", "type": "string", "label": "Controls", "config": {"defaultValue": null}, "linkedToInput": "controls", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cuboid3DDefinition: NodeDefinition = {
  type: "Cuboid3D",
  label: "Cuboid3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "vector3", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CutHollowSphereDefinition: NodeDefinition = {
  type: "CutHollowSphere",
  label: "CutHollowSphere",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "t", "label": "T", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "t", "type": "float", "label": "T", "config": {"defaultValue": null}, "linkedToInput": "t", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CutSphere3DDefinition: NodeDefinition = {
  type: "CutSphere3D",
  label: "CutSphere3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cylinder3DDefinition: NodeDefinition = {
  type: "Cylinder3D",
  label: "Cylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DeathStar3DDefinition: NodeDefinition = {
  type: "DeathStar3D",
  label: "DeathStar3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "d", "label": "D", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "d", "type": "float", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HexPrism3DDefinition: NodeDefinition = {
  type: "HexPrism3D",
  label: "HexPrism3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "vector2", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactAnisotropicGaussian3DDefinition: NodeDefinition = {
  type: "InexactAnisotropicGaussian3D",
  label: "InexactAnisotropicGaussian3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "center", "label": "Center", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "axial_radii", "label": "Axial Radii", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "scale_constant", "label": "Scale Constant", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "center", "type": "vector3", "label": "Center", "config": {"defaultValue": null}, "linkedToInput": "center", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "axial_radii", "type": "vector3", "label": "Axial Radii", "config": {"defaultValue": null}, "linkedToInput": "axial_radii", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "scale_constant", "type": "float", "label": "Scale Constant", "config": {"defaultValue": null}, "linkedToInput": "scale_constant", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactCone3DDefinition: NodeDefinition = {
  type: "InexactCone3D",
  label: "InexactCone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactEllipsoid3DDefinition: NodeDefinition = {
  type: "InexactEllipsoid3D",
  label: "InexactEllipsoid3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "vector3", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactOctahedron3DDefinition: NodeDefinition = {
  type: "InexactOctahedron3D",
  label: "InexactOctahedron3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "s", "label": "S", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "s", "type": "float", "label": "S", "config": {"defaultValue": null}, "linkedToInput": "s", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactSuperQuadrics3DDefinition: NodeDefinition = {
  type: "InexactSuperQuadrics3D",
  label: "InexactSuperQuadrics3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "skew_vec", "label": "Skew Vec", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "epsilon_1", "label": "Epsilon 1", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "epsilon_2", "label": "Epsilon 2", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "skew_vec", "type": "vector3", "label": "Skew Vec", "config": {"defaultValue": null}, "linkedToInput": "skew_vec", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "epsilon_1", "type": "float", "label": "Epsilon 1", "config": {"defaultValue": null}, "linkedToInput": "epsilon_1", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "epsilon_2", "type": "float", "label": "Epsilon 2", "config": {"defaultValue": null}, "linkedToInput": "epsilon_2", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InfiniteCone3DDefinition: NodeDefinition = {
  type: "InfiniteCone3D",
  label: "InfiniteCone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InfiniteCylinder3DDefinition: NodeDefinition = {
  type: "InfiniteCylinder3D",
  label: "InfiniteCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "c", "label": "C", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "c", "type": "vector3", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LinearExtrude3DDefinition: NodeDefinition = {
  type: "LinearExtrude3D",
  label: "LinearExtrude3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Link3DDefinition: NodeDefinition = {
  type: "Link3D",
  label: "Link3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "le", "label": "Le", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r1", "label": "R1", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "le", "type": "float", "label": "Le", "config": {"defaultValue": null}, "linkedToInput": "le", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamCuboid3DDefinition: NodeDefinition = {
  type: "NoParamCuboid3D",
  label: "NoParamCuboid3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamCylinder3DDefinition: NodeDefinition = {
  type: "NoParamCylinder3D",
  label: "NoParamCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamSphere3DDefinition: NodeDefinition = {
  type: "NoParamSphere3D",
  label: "NoParamSphere3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NullExpression3DDefinition: NodeDefinition = {
  type: "NullExpression3D",
  label: "NullExpression3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Octahedron3DDefinition: NodeDefinition = {
  type: "Octahedron3D",
  label: "Octahedron3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "s", "label": "S", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "s", "type": "float", "label": "S", "config": {"defaultValue": null}, "linkedToInput": "s", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Plane3DDefinition: NodeDefinition = {
  type: "Plane3D",
  label: "Plane3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "n", "label": "N", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "n", "type": "vector3", "label": "N", "config": {"defaultValue": null}, "linkedToInput": "n", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyQuadBezierExtrude3DDefinition: NodeDefinition = {
  type: "PolyQuadBezierExtrude3D",
  label: "PolyQuadBezierExtrude3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "controls", "label": "Controls", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "controls", "type": "string", "label": "Controls", "config": {"defaultValue": null}, "linkedToInput": "controls", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Pyramid3DDefinition: NodeDefinition = {
  type: "Pyramid3D",
  label: "Pyramid3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticBezierExtrude3DDefinition: NodeDefinition = {
  type: "QuadraticBezierExtrude3D",
  label: "QuadraticBezierExtrude3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "control", "label": "Control", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "control", "type": "vector2", "label": "Control", "config": {"defaultValue": null}, "linkedToInput": "control", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Quadrilateral3DDefinition: NodeDefinition = {
  type: "Quadrilateral3D",
  label: "Quadrilateral3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "c", "label": "C", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "d", "label": "D", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "c", "type": "vector3", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "d", "type": "vector3", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Revolution3DDefinition: NodeDefinition = {
  type: "Revolution3D",
  label: "Revolution3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "radius", "label": "Radius", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RevolvedVesica3DDefinition: NodeDefinition = {
  type: "RevolvedVesica3D",
  label: "RevolvedVesica3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Rhombus3DDefinition: NodeDefinition = {
  type: "Rhombus3D",
  label: "Rhombus3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "la", "label": "La", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "lb", "label": "Lb", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "la", "type": "float", "label": "La", "config": {"defaultValue": null}, "linkedToInput": "la", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "lb", "type": "float", "label": "Lb", "config": {"defaultValue": null}, "linkedToInput": "lb", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundCone3DDefinition: NodeDefinition = {
  type: "RoundCone3D",
  label: "RoundCone3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedBox3DDefinition: NodeDefinition = {
  type: "RoundedBox3D",
  label: "RoundedBox3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "radius", "label": "Radius", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "vector3", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedCylinder3DDefinition: NodeDefinition = {
  type: "RoundedCylinder3D",
  label: "RoundedCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SDFGrid3DDefinition: NodeDefinition = {
  type: "SDFGrid3D",
  label: "SDFGrid3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "sdf_grid", "label": "Sdf Grid", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "sdf_grid", "type": "string", "label": "Sdf Grid", "config": {"defaultValue": null}, "linkedToInput": "sdf_grid", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SimpleExtrusion3DDefinition: NodeDefinition = {
  type: "SimpleExtrusion3D",
  label: "SimpleExtrusion3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SolidAngle3DDefinition: NodeDefinition = {
  type: "SolidAngle3D",
  label: "SolidAngle3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Sphere3DDefinition: NodeDefinition = {
  type: "Sphere3D",
  label: "Sphere3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "radius", "label": "Radius", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Torus3DDefinition: NodeDefinition = {
  type: "Torus3D",
  label: "Torus3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "t", "label": "T", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "t", "type": "vector2", "label": "T", "config": {"defaultValue": null}, "linkedToInput": "t", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TriPrism3DDefinition: NodeDefinition = {
  type: "TriPrism3D",
  label: "TriPrism3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "vector2", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Triangle3DDefinition: NodeDefinition = {
  type: "Triangle3D",
  label: "Triangle3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "c", "label": "C", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "vector3", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "b", "type": "vector3", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "c", "type": "vector3", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VerticalCappedCylinder3DDefinition: NodeDefinition = {
  type: "VerticalCappedCylinder3D",
  label: "VerticalCappedCylinder3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VerticalCapsule3DDefinition: NodeDefinition = {
  type: "VerticalCapsule3D",
  label: "VerticalCapsule3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedLowPrecisionSDFGrid3DDefinition: NodeDefinition = {
  type: "EncodedLowPrecisionSDFGrid3D",
  label: "EncodedLowPrecisionSDFGrid3D",
  category: "Primitives",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedRGBGrid3DDefinition: NodeDefinition = {
  type: "EncodedRGBGrid3D",
  label: "EncodedRGBGrid3D",
  category: "Primitives",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedSDFGrid3DDefinition: NodeDefinition = {
  type: "EncodedSDFGrid3D",
  label: "EncodedSDFGrid3D",
  category: "Primitives",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LowPrecisionSDFGrid3DDefinition: NodeDefinition = {
  type: "LowPrecisionSDFGrid3D",
  label: "LowPrecisionSDFGrid3D",
  category: "Primitives",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBGrid3DDefinition: NodeDefinition = {
  type: "RGBGrid3D",
  label: "RGBGrid3D",
  category: "Primitives",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec3DDefinition: NodeDefinition = {
  type: "SplitVec3D",
  label: "SplitVec3D",
  category: "Primitives",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "float", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
