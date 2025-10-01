// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const Arc2DDefinition: NodeDefinition = {
  type: "Arc2D",
  label: "Arc2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BlobbyCross2DDefinition: NodeDefinition = {
  type: "BlobbyCross2D",
  label: "BlobbyCross2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "he", "label": "He", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "he", "type": "float", "label": "He", "config": {"defaultValue": null}, "linkedToInput": "he", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Box2DDefinition: NodeDefinition = {
  type: "Box2D",
  label: "Box2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[2]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Circle2DDefinition: NodeDefinition = {
  type: "Circle2D",
  label: "Circle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "radius", "label": "Radius", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CircleWave2DDefinition: NodeDefinition = {
  type: "CircleWave2D",
  label: "CircleWave2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "tb", "label": "Tb", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "tb", "type": "float", "label": "Tb", "config": {"defaultValue": null}, "linkedToInput": "tb", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CoolS2DDefinition: NodeDefinition = {
  type: "CoolS2D",
  label: "CoolS2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Cross2DDefinition: NodeDefinition = {
  type: "Cross2D",
  label: "Cross2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "b", "type": "Vector[2]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CutDisk2DDefinition: NodeDefinition = {
  type: "CutDisk2D",
  label: "CutDisk2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Egg2DDefinition: NodeDefinition = {
  type: "Egg2D",
  label: "Egg2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Ellipse2DDefinition: NodeDefinition = {
  type: "Ellipse2D",
  label: "Ellipse2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "ab", "label": "Ab", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "ab", "type": "Vector[2]", "label": "Ab", "config": {"defaultValue": null}, "linkedToInput": "ab", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EquilateralTriangle2DDefinition: NodeDefinition = {
  type: "EquilateralTriangle2D",
  label: "EquilateralTriangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "side_length", "label": "Side Length", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "side_length", "type": "float", "label": "Side Length", "config": {"defaultValue": null}, "linkedToInput": "side_length", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Heart2DDefinition: NodeDefinition = {
  type: "Heart2D",
  label: "Heart2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Hexagram2DDefinition: NodeDefinition = {
  type: "Hexagram2D",
  label: "Hexagram2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HorseShoe2DDefinition: NodeDefinition = {
  type: "HorseShoe2D",
  label: "HorseShoe2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "w", "type": "Vector[2]", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Hyperbola2DDefinition: NodeDefinition = {
  type: "Hyperbola2D",
  label: "Hyperbola2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "he", "label": "He", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}, {"key": "he", "type": "float", "label": "He", "config": {"defaultValue": null}, "linkedToInput": "he", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const InstantiatedPrim2DDefinition: NodeDefinition = {
  type: "InstantiatedPrim2D",
  label: "InstantiatedPrim2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "primitive", "label": "Primitive", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "primitive", "type": "str", "label": "Primitive", "config": {"defaultValue": null}, "linkedToInput": "primitive", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const IsoscelesTriangle2DDefinition: NodeDefinition = {
  type: "IsoscelesTriangle2D",
  label: "IsoscelesTriangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "wi_hi", "label": "Wi Hi", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "wi_hi", "type": "Vector[2]", "label": "Wi Hi", "config": {"defaultValue": null}, "linkedToInput": "wi_hi", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Moon2DDefinition: NodeDefinition = {
  type: "Moon2D",
  label: "Moon2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "d", "label": "D", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "ra", "label": "Ra", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rb", "label": "Rb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "d", "type": "float", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true}, {"key": "ra", "type": "float", "label": "Ra", "config": {"defaultValue": null}, "linkedToInput": "ra", "showLabel": true, "hasSocket": true}, {"key": "rb", "type": "float", "label": "Rb", "config": {"defaultValue": null}, "linkedToInput": "rb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamCircle2DDefinition: NodeDefinition = {
  type: "NoParamCircle2D",
  label: "NoParamCircle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamRectangle2DDefinition: NodeDefinition = {
  type: "NoParamRectangle2D",
  label: "NoParamRectangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NoParamTriangle2DDefinition: NodeDefinition = {
  type: "NoParamTriangle2D",
  label: "NoParamTriangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NullExpression2DDefinition: NodeDefinition = {
  type: "NullExpression2D",
  label: "NullExpression2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const OrientedBox2DDefinition: NodeDefinition = {
  type: "OrientedBox2D",
  label: "OrientedBox2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "start_point", "label": "Start Point", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "end_point", "label": "End Point", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "thickness", "label": "Thickness", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "start_point", "type": "Vector[2]", "label": "Start Point", "config": {"defaultValue": null}, "linkedToInput": "start_point", "showLabel": true, "hasSocket": true}, {"key": "end_point", "type": "Vector[2]", "label": "End Point", "config": {"defaultValue": null}, "linkedToInput": "end_point", "showLabel": true, "hasSocket": true}, {"key": "thickness", "type": "float", "label": "Thickness", "config": {"defaultValue": null}, "linkedToInput": "thickness", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const OrientedVesica2DDefinition: NodeDefinition = {
  type: "OrientedVesica2D",
  label: "OrientedVesica2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "a", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "b", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "a", "type": "Vector[2]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "a", "showLabel": true, "hasSocket": true}, {"key": "b", "type": "Vector[2]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "b", "showLabel": true, "hasSocket": true}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Parabola2DDefinition: NodeDefinition = {
  type: "Parabola2D",
  label: "Parabola2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ParabolaSegment2DDefinition: NodeDefinition = {
  type: "ParabolaSegment2D",
  label: "ParabolaSegment2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "wi", "label": "Wi", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "he", "label": "He", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "wi", "type": "float", "label": "Wi", "config": {"defaultValue": null}, "linkedToInput": "wi", "showLabel": true, "hasSocket": true}, {"key": "he", "type": "float", "label": "He", "config": {"defaultValue": null}, "linkedToInput": "he", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Parallelogram2DDefinition: NodeDefinition = {
  type: "Parallelogram2D",
  label: "Parallelogram2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "width", "label": "Width", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "skew", "label": "Skew", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "width", "type": "float", "label": "Width", "config": {"defaultValue": null}, "linkedToInput": "width", "showLabel": true, "hasSocket": true}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true}, {"key": "skew", "type": "float", "label": "Skew", "config": {"defaultValue": null}, "linkedToInput": "skew", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Pie2DDefinition: NodeDefinition = {
  type: "Pie2D",
  label: "Pie2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "c", "label": "C", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "c", "type": "Vector[2]", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "c", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyArc2DDefinition: NodeDefinition = {
  type: "PolyArc2D",
  label: "PolyArc2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "point", "label": "Point", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "point", "type": "List[Vector[3]]", "label": "Point", "config": {"defaultValue": null}, "linkedToInput": "point", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Polygon2DDefinition: NodeDefinition = {
  type: "Polygon2D",
  label: "Polygon2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "verts", "label": "Verts", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "verts", "type": "List[Vector[2]]", "label": "Verts", "config": {"defaultValue": null}, "linkedToInput": "verts", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticBezierCurve2DDefinition: NodeDefinition = {
  type: "QuadraticBezierCurve2D",
  label: "QuadraticBezierCurve2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "A", "label": "A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "B", "label": "B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "C", "label": "C", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "A", "type": "Vector[2]", "label": "A", "config": {"defaultValue": null}, "linkedToInput": "A", "showLabel": true, "hasSocket": true}, {"key": "B", "type": "Vector[2]", "label": "B", "config": {"defaultValue": null}, "linkedToInput": "B", "showLabel": true, "hasSocket": true}, {"key": "C", "type": "Vector[2]", "label": "C", "config": {"defaultValue": null}, "linkedToInput": "C", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticCircle2DDefinition: NodeDefinition = {
  type: "QuadraticCircle2D",
  label: "QuadraticCircle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Rectangle2DDefinition: NodeDefinition = {
  type: "Rectangle2D",
  label: "Rectangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[2]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegularHexagon2DDefinition: NodeDefinition = {
  type: "RegularHexagon2D",
  label: "RegularHexagon2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegularOctagon2DDefinition: NodeDefinition = {
  type: "RegularOctagon2D",
  label: "RegularOctagon2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegularPentagon2DDefinition: NodeDefinition = {
  type: "RegularPentagon2D",
  label: "RegularPentagon2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegularStar2DDefinition: NodeDefinition = {
  type: "RegularStar2D",
  label: "RegularStar2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "n", "label": "N", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "m", "label": "M", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "n", "type": "int", "label": "N", "config": {"defaultValue": null}, "linkedToInput": "n", "showLabel": true, "hasSocket": true}, {"key": "m", "type": "int", "label": "M", "config": {"defaultValue": null}, "linkedToInput": "m", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Rhombus2DDefinition: NodeDefinition = {
  type: "Rhombus2D",
  label: "Rhombus2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "size", "label": "Size", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "size", "type": "Vector[2]", "label": "Size", "config": {"defaultValue": null}, "linkedToInput": "size", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedBox2DDefinition: NodeDefinition = {
  type: "RoundedBox2D",
  label: "RoundedBox2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "bounds", "label": "Bounds", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "radius", "label": "Radius", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "bounds", "type": "Vector[2]", "label": "Bounds", "config": {"defaultValue": null}, "linkedToInput": "bounds", "showLabel": true, "hasSocket": true}, {"key": "radius", "type": "Vector[4]", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedCross2DDefinition: NodeDefinition = {
  type: "RoundedCross2D",
  label: "RoundedCross2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RoundedX2DDefinition: NodeDefinition = {
  type: "RoundedX2D",
  label: "RoundedX2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "w", "label": "W", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true}, {"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Segment2DDefinition: NodeDefinition = {
  type: "Segment2D",
  label: "Segment2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "start_point", "label": "Start Point", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "end_point", "label": "End Point", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "start_point", "type": "Vector[2]", "label": "Start Point", "config": {"defaultValue": null}, "linkedToInput": "start_point", "showLabel": true, "hasSocket": true}, {"key": "end_point", "type": "Vector[2]", "label": "End Point", "config": {"defaultValue": null}, "linkedToInput": "end_point", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Stairs2DDefinition: NodeDefinition = {
  type: "Stairs2D",
  label: "Stairs2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "wh", "label": "Wh", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "n", "label": "N", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "wh", "type": "Vector[2]", "label": "Wh", "config": {"defaultValue": null}, "linkedToInput": "wh", "showLabel": true, "hasSocket": true}, {"key": "n", "type": "int", "label": "N", "config": {"defaultValue": null}, "linkedToInput": "n", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Star2DDefinition: NodeDefinition = {
  type: "Star2D",
  label: "Star2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "rf", "label": "Rf", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "rf", "type": "float", "label": "Rf", "config": {"defaultValue": null}, "linkedToInput": "rf", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Trapezoid2DDefinition: NodeDefinition = {
  type: "Trapezoid2D",
  label: "Trapezoid2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Triangle2DDefinition: NodeDefinition = {
  type: "Triangle2D",
  label: "Triangle2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "p0", "label": "P0", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "p1", "label": "P1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "p2", "label": "P2", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "p0", "type": "Vector[2]", "label": "P0", "config": {"defaultValue": null}, "linkedToInput": "p0", "showLabel": true, "hasSocket": true}, {"key": "p1", "type": "Vector[2]", "label": "P1", "config": {"defaultValue": null}, "linkedToInput": "p1", "showLabel": true, "hasSocket": true}, {"key": "p2", "type": "Vector[2]", "label": "P2", "config": {"defaultValue": null}, "linkedToInput": "p2", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Tunnel2DDefinition: NodeDefinition = {
  type: "Tunnel2D",
  label: "Tunnel2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "wh", "label": "Wh", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "wh", "type": "Vector[2]", "label": "Wh", "config": {"defaultValue": null}, "linkedToInput": "wh", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UnevenCapsule2DDefinition: NodeDefinition = {
  type: "UnevenCapsule2D",
  label: "UnevenCapsule2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r1", "label": "R1", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "r2", "label": "R2", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "h", "label": "H", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r1", "type": "float", "label": "R1", "config": {"defaultValue": null}, "linkedToInput": "r1", "showLabel": true, "hasSocket": true}, {"key": "r2", "type": "float", "label": "R2", "config": {"defaultValue": null}, "linkedToInput": "r2", "showLabel": true, "hasSocket": true}, {"key": "h", "type": "float", "label": "H", "config": {"defaultValue": null}, "linkedToInput": "h", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vesica2DDefinition: NodeDefinition = {
  type: "Vesica2D",
  label: "Vesica2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "r", "label": "R", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "d", "label": "D", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "r", "type": "float", "label": "R", "config": {"defaultValue": null}, "linkedToInput": "r", "showLabel": true, "hasSocket": true}, {"key": "d", "type": "float", "label": "D", "config": {"defaultValue": null}, "linkedToInput": "d", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyLine2DDefinition: NodeDefinition = {
  type: "PolyLine2D",
  label: "PolyLine2D",
  category: "primitives_2d",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "List[Vector[3]]", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
