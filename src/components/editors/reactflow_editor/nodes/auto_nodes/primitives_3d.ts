// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const Sphere3DDefinition: NodeDefinition = {
  type: "Sphere3D",
  label: "Sphere3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "radius", "label": "Radius", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Box3DDefinition: NodeDefinition = {
  type: "Box3D",
  label: "Box3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[3]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cuboid3DDefinition: NodeDefinition = {
  type: "Cuboid3D",
  label: "Cuboid3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[3]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedBox3DDefinition: NodeDefinition = {
  type: "RoundedBox3D",
  label: "RoundedBox3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "radius", "label": "Radius", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[3]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}, {"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BoxFrame3DDefinition: NodeDefinition = {
  type: "BoxFrame3D",
  label: "BoxFrame3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "e", "label": "E", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "e", "type": "float", "label": "E", "config": {"defaultValue": null}, "linkedToInput": "e", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Torus3DDefinition: NodeDefinition = {
  type: "Torus3D",
  label: "Torus3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "t", "label": "T", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "t", "type": "Vector[2]", "label": "T", "config": {"defaultValue": null}, "linkedToInput": "t", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedTorus3DDefinition: NodeDefinition = {
  type: "CappedTorus3D",
  label: "CappedTorus3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Link3DDefinition: NodeDefinition = {
  type: "Link3D",
  label: "Link3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "le", "label": "Le", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "le", "type": "float", "label": "Le", "config": {"defaultValue": null}, "linkedToInput": "le", "showLabel": true, "hasSocket": true}, {"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InfiniteCylinder3DDefinition: NodeDefinition = {
  type: "InfiniteCylinder3D",
  label: "InfiniteCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "c", "label": "C", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "c", "type": "Vector[3]", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cone3DDefinition: NodeDefinition = {
  type: "Cone3D",
  label: "Cone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactCone3DDefinition: NodeDefinition = {
  type: "InexactCone3D",
  label: "InexactCone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InfiniteCone3DDefinition: NodeDefinition = {
  type: "InfiniteCone3D",
  label: "InfiniteCone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Plane3DDefinition: NodeDefinition = {
  type: "Plane3D",
  label: "Plane3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "n", "label": "N", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "n", "type": "Vector[3]", "label": "N", "config": {"defaultValue": null}, "linkedToInput": "n", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HexPrism3DDefinition: NodeDefinition = {
  type: "HexPrism3D",
  label: "HexPrism3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "Vector[2]", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TriPrism3DDefinition: NodeDefinition = {
  type: "TriPrism3D",
  label: "TriPrism3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "Vector[2]", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Capsule3DDefinition: NodeDefinition = {
  type: "Capsule3D",
  label: "Capsule3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VerticalCapsule3DDefinition: NodeDefinition = {
  type: "VerticalCapsule3D",
  label: "VerticalCapsule3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VerticalCappedCylinder3DDefinition: NodeDefinition = {
  type: "VerticalCappedCylinder3D",
  label: "VerticalCappedCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedCylinder3DDefinition: NodeDefinition = {
  type: "CappedCylinder3D",
  label: "CappedCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cylinder3DDefinition: NodeDefinition = {
  type: "Cylinder3D",
  label: "Cylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ArbitraryCappedCylinder3DDefinition: NodeDefinition = {
  type: "ArbitraryCappedCylinder3D",
  label: "ArbitraryCappedCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedCylinder3DDefinition: NodeDefinition = {
  type: "RoundedCylinder3D",
  label: "RoundedCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CappedCone3DDefinition: NodeDefinition = {
  type: "CappedCone3D",
  label: "CappedCone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ArbitraryCappedConeDefinition: NodeDefinition = {
  type: "ArbitraryCappedCone",
  label: "ArbitraryCappedCone",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SolidAngle3DDefinition: NodeDefinition = {
  type: "SolidAngle3D",
  label: "SolidAngle3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CutSphere3DDefinition: NodeDefinition = {
  type: "CutSphere3D",
  label: "CutSphere3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CutHollowSphereDefinition: NodeDefinition = {
  type: "CutHollowSphere",
  label: "CutHollowSphere",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "t", "label": "T", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "t", "type": "float", "label": "T", "config": {"defaultValue": null}, "linkedToInput": "t", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DeathStar3DDefinition: NodeDefinition = {
  type: "DeathStar3D",
  label: "DeathStar3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "d", "label": "D", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}, {"key": "d", "type": "float", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundCone3DDefinition: NodeDefinition = {
  type: "RoundCone3D",
  label: "RoundCone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ArbitraryRoundCone3DDefinition: NodeDefinition = {
  type: "ArbitraryRoundCone3D",
  label: "ArbitraryRoundCone3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactEllipsoid3DDefinition: NodeDefinition = {
  type: "InexactEllipsoid3D",
  label: "InexactEllipsoid3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "Vector[3]", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RevolvedVesica3DDefinition: NodeDefinition = {
  type: "RevolvedVesica3D",
  label: "RevolvedVesica3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Rhombus3DDefinition: NodeDefinition = {
  type: "Rhombus3D",
  label: "Rhombus3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "la", "label": "La", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "lb", "label": "Lb", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "la", "type": "float", "label": "La", "config": {"defaultValue": null}, "linkedToInput": "la", "showLabel": true, "hasSocket": true}, {"key": "lb", "type": "float", "label": "Lb", "config": {"defaultValue": null}, "linkedToInput": "lb", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Octahedron3DDefinition: NodeDefinition = {
  type: "Octahedron3D",
  label: "Octahedron3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "s", "label": "S", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "s", "type": "float", "label": "S", "config": {"defaultValue": null}, "linkedToInput": "s", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactOctahedron3DDefinition: NodeDefinition = {
  type: "InexactOctahedron3D",
  label: "InexactOctahedron3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "s", "label": "S", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "s", "type": "float", "label": "S", "config": {"defaultValue": null}, "linkedToInput": "s", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Pyramid3DDefinition: NodeDefinition = {
  type: "Pyramid3D",
  label: "Pyramid3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Triangle3DDefinition: NodeDefinition = {
  type: "Triangle3D",
  label: "Triangle3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "c", "label": "C", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "c", "type": "Vector[3]", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Quadrilateral3DDefinition: NodeDefinition = {
  type: "Quadrilateral3D",
  label: "Quadrilateral3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "c", "label": "C", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "d", "label": "D", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[3]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[3]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "c", "type": "Vector[3]", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true}, {"key": "d", "type": "Vector[3]", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamCuboid3DDefinition: NodeDefinition = {
  type: "NoParamCuboid3D",
  label: "NoParamCuboid3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamSphere3DDefinition: NodeDefinition = {
  type: "NoParamSphere3D",
  label: "NoParamSphere3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamCylinder3DDefinition: NodeDefinition = {
  type: "NoParamCylinder3D",
  label: "NoParamCylinder3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactSuperQuadrics3DDefinition: NodeDefinition = {
  type: "InexactSuperQuadrics3D",
  label: "InexactSuperQuadrics3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "skew_vec", "label": "Skew Vec", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "epsilon_1", "label": "Epsilon 1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "epsilon_2", "label": "Epsilon 2", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "skew_vec", "type": "Vector[3]", "label": "Skew Vec", "config": {"defaultValue": null}, "linkedToInput": "skew_vec", "showLabel": true, "hasSocket": true}, {"key": "epsilon_1", "type": "float", "label": "Epsilon 1", "config": {"defaultValue": null}, "linkedToInput": "epsilon_1", "showLabel": true, "hasSocket": true}, {"key": "epsilon_2", "type": "float", "label": "Epsilon 2", "config": {"defaultValue": null}, "linkedToInput": "epsilon_2", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InexactAnisotropicGaussian3DDefinition: NodeDefinition = {
  type: "InexactAnisotropicGaussian3D",
  label: "InexactAnisotropicGaussian3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [{"key": "center", "label": "Center", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "axial_radii", "label": "Axial Radii", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "scale_constant", "label": "Scale Constant", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "center", "type": "Vector[3]", "label": "Center", "config": {"defaultValue": null}, "linkedToInput": "center", "showLabel": true, "hasSocket": true}, {"key": "axial_radii", "type": "Vector[3]", "label": "Axial Radii", "config": {"defaultValue": null}, "linkedToInput": "axial_radii", "showLabel": true, "hasSocket": true}, {"key": "scale_constant", "type": "float", "label": "Scale Constant", "config": {"defaultValue": null}, "linkedToInput": "scale_constant", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NullExpression3DDefinition: NodeDefinition = {
  type: "NullExpression3D",
  label: "NullExpression3D",
  category: "primitives_3d",
  description: "Auto-generated from geolipi.symbolic.primitives_3d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
