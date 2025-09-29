// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const Translate2DDefinition: NodeDefinition = {
  type: "Translate2D",
  label: "Translate2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "offset", "label": "Offset", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "offset", "type": "Vector[2]", "label": "Offset", "config": {"defaultValue": null}, "linkedToInput": "offset", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EulerRotate2DDefinition: NodeDefinition = {
  type: "EulerRotate2D",
  label: "EulerRotate2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Scale2DDefinition: NodeDefinition = {
  type: "Scale2D",
  label: "Scale2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "scale", "label": "Scale", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "scale", "type": "Vector[2]", "label": "Scale", "config": {"defaultValue": null}, "linkedToInput": "scale", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Shear2DDefinition: NodeDefinition = {
  type: "Shear2D",
  label: "Shear2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "shear", "label": "Shear", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "shear", "type": "Vector[2]", "label": "Shear", "config": {"defaultValue": null}, "linkedToInput": "shear", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Affine2DDefinition: NodeDefinition = {
  type: "Affine2D",
  label: "Affine2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "matrix", "label": "Matrix", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "matrix", "type": "Matrix[3,3]", "label": "Matrix", "config": {"defaultValue": null}, "linkedToInput": "matrix", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Distort2DDefinition: NodeDefinition = {
  type: "Distort2D",
  label: "Distort2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "amount", "label": "Amount", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "amount", "type": "float", "label": "Amount", "config": {"defaultValue": null}, "linkedToInput": "amount", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectCoords2DDefinition: NodeDefinition = {
  type: "ReflectCoords2D",
  label: "ReflectCoords2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "normal", "label": "Normal", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "normal", "type": "Vector[2]", "label": "Normal", "config": {"defaultValue": null}, "linkedToInput": "normal", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Reflect2DDefinition: NodeDefinition = {
  type: "Reflect2D",
  label: "Reflect2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "normal", "label": "Normal", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "normal", "type": "Vector[2]", "label": "Normal", "config": {"defaultValue": null}, "linkedToInput": "normal", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectX2DDefinition: NodeDefinition = {
  type: "ReflectX2D",
  label: "ReflectX2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectY2DDefinition: NodeDefinition = {
  type: "ReflectY2D",
  label: "ReflectY2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialReflect2DDefinition: NodeDefinition = {
  type: "AxialReflect2D",
  label: "AxialReflect2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "axis", "type": "Enum[\"AX2D\"|\"AY2D\"]", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetry2DDefinition: NodeDefinition = {
  type: "TranslationSymmetry2D",
  label: "TranslationSymmetry2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialTranslationSymmetry2DDefinition: NodeDefinition = {
  type: "AxialTranslationSymmetry2D",
  label: "AxialTranslationSymmetry2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}, {"key": "axis", "type": "Enum[\"AX2D\"|\"AY2D\"]", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetryX2DDefinition: NodeDefinition = {
  type: "TranslationSymmetryX2D",
  label: "TranslationSymmetryX2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetryY2DDefinition: NodeDefinition = {
  type: "TranslationSymmetryY2D",
  label: "TranslationSymmetryY2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotationSymmetry2DDefinition: NodeDefinition = {
  type: "RotationSymmetry2D",
  label: "RotationSymmetry2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ScaleSymmetry2DDefinition: NodeDefinition = {
  type: "ScaleSymmetry2D",
  label: "ScaleSymmetry2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialScaleSymmetry2DDefinition: NodeDefinition = {
  type: "AxialScaleSymmetry2D",
  label: "AxialScaleSymmetry2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}, {"key": "axis", "type": "Enum[\"AX2D\"|\"AY2D\"]", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Dilate2DDefinition: NodeDefinition = {
  type: "Dilate2D",
  label: "Dilate2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Erode2DDefinition: NodeDefinition = {
  type: "Erode2D",
  label: "Erode2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Onion2DDefinition: NodeDefinition = {
  type: "Onion2D",
  label: "Onion2D",
  category: "transforms_2d",
  description: "Auto-generated from geolipi.symbolic.transforms_2d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
