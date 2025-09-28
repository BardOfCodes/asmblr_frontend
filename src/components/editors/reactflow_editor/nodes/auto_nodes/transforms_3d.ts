// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const Translate3DDefinition: NodeDefinition = {
  type: "Translate3D",
  label: "Translate3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "offset", "label": "Offset", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "offset", "type": "vector3", "label": "Offset", "config": {"defaultValue": null}, "linkedToInput": "offset", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EulerRotate3DDefinition: NodeDefinition = {
  type: "EulerRotate3D",
  label: "EulerRotate3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angles", "label": "Angles", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angles", "type": "vector3", "label": "Angles", "config": {"defaultValue": null}, "linkedToInput": "angles", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxisAngleRotate3DDefinition: NodeDefinition = {
  type: "AxisAngleRotate3D",
  label: "AxisAngleRotate3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "axis", "type": "vector3", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotateMatrix3DDefinition: NodeDefinition = {
  type: "RotateMatrix3D",
  label: "RotateMatrix3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "matrix", "label": "Matrix", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "matrix", "type": "string", "label": "Matrix", "config": {"defaultValue": null}, "linkedToInput": "matrix", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Scale3DDefinition: NodeDefinition = {
  type: "Scale3D",
  label: "Scale3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "scale", "label": "Scale", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "scale", "type": "vector3", "label": "Scale", "config": {"defaultValue": null}, "linkedToInput": "scale", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuaternionRotate3DDefinition: NodeDefinition = {
  type: "QuaternionRotate3D",
  label: "QuaternionRotate3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "quat", "label": "Quat", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "quat", "type": "vector4", "label": "Quat", "config": {"defaultValue": null}, "linkedToInput": "quat", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Shear3DDefinition: NodeDefinition = {
  type: "Shear3D",
  label: "Shear3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "shear", "label": "Shear", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "shear", "type": "vector3", "label": "Shear", "config": {"defaultValue": null}, "linkedToInput": "shear", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Distort3DDefinition: NodeDefinition = {
  type: "Distort3D",
  label: "Distort3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "amount", "label": "Amount", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "amount", "type": "float", "label": "Amount", "config": {"defaultValue": null}, "linkedToInput": "amount", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Twist3DDefinition: NodeDefinition = {
  type: "Twist3D",
  label: "Twist3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "amount", "label": "Amount", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "amount", "type": "float", "label": "Amount", "config": {"defaultValue": null}, "linkedToInput": "amount", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Bend3DDefinition: NodeDefinition = {
  type: "Bend3D",
  label: "Bend3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "amount", "label": "Amount", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "amount", "type": "float", "label": "Amount", "config": {"defaultValue": null}, "linkedToInput": "amount", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectCoords3DDefinition: NodeDefinition = {
  type: "ReflectCoords3D",
  label: "ReflectCoords3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "normal", "label": "Normal", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "normal", "type": "vector3", "label": "Normal", "config": {"defaultValue": null}, "linkedToInput": "normal", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Reflect3DDefinition: NodeDefinition = {
  type: "Reflect3D",
  label: "Reflect3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "normal", "label": "Normal", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "normal", "type": "vector3", "label": "Normal", "config": {"defaultValue": null}, "linkedToInput": "normal", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectX3DDefinition: NodeDefinition = {
  type: "ReflectX3D",
  label: "ReflectX3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectY3DDefinition: NodeDefinition = {
  type: "ReflectY3D",
  label: "ReflectY3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ReflectZ3DDefinition: NodeDefinition = {
  type: "ReflectZ3D",
  label: "ReflectZ3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialReflect3DDefinition: NodeDefinition = {
  type: "AxialReflect3D",
  label: "AxialReflect3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "axis", "type": "string", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetry3DDefinition: NodeDefinition = {
  type: "TranslationSymmetry3D",
  label: "TranslationSymmetry3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialTranslationSymmetry3DDefinition: NodeDefinition = {
  type: "AxialTranslationSymmetry3D",
  label: "AxialTranslationSymmetry3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "axis", "type": "string", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetryX3DDefinition: NodeDefinition = {
  type: "TranslationSymmetryX3D",
  label: "TranslationSymmetryX3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetryY3DDefinition: NodeDefinition = {
  type: "TranslationSymmetryY3D",
  label: "TranslationSymmetryY3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const TranslationSymmetryZ3DDefinition: NodeDefinition = {
  type: "TranslationSymmetryZ3D",
  label: "TranslationSymmetryZ3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "distance", "label": "Distance", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "distance", "type": "float", "label": "Distance", "config": {"defaultValue": null}, "linkedToInput": "distance", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotationSymmetry3DDefinition: NodeDefinition = {
  type: "RotationSymmetry3D",
  label: "RotationSymmetry3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AxialRotationSymmetry3DDefinition: NodeDefinition = {
  type: "AxialRotationSymmetry3D",
  label: "AxialRotationSymmetry3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "axis", "label": "Axis", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "axis", "type": "string", "label": "Axis", "config": {"defaultValue": null}, "linkedToInput": "axis", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotationSymmetryX3DDefinition: NodeDefinition = {
  type: "RotationSymmetryX3D",
  label: "RotationSymmetryX3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotationSymmetryY3DDefinition: NodeDefinition = {
  type: "RotationSymmetryY3D",
  label: "RotationSymmetryY3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RotationSymmetryZ3DDefinition: NodeDefinition = {
  type: "RotationSymmetryZ3D",
  label: "RotationSymmetryZ3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "angle", "label": "Angle", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "angle", "type": "float", "label": "Angle", "config": {"defaultValue": null}, "linkedToInput": "angle", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Dilate3DDefinition: NodeDefinition = {
  type: "Dilate3D",
  label: "Dilate3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Erode3DDefinition: NodeDefinition = {
  type: "Erode3D",
  label: "Erode3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Onion3DDefinition: NodeDefinition = {
  type: "Onion3D",
  label: "Onion3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NegOnlyOnion3DDefinition: NodeDefinition = {
  type: "NegOnlyOnion3D",
  label: "NegOnlyOnion3D",
  category: "transforms_3d",
  description: "Auto-generated from geolipi.symbolic.transforms_3d.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
