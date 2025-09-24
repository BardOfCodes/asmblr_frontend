// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const BinaryOperatorDefinition: NodeDefinition = {
  type: "BinaryOperator",
  label: "BinaryOperator",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const FloatDefinition: NodeDefinition = {
  type: "Float",
  label: "Float",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "value", "label": "Value", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "value", "type": "float", "label": "Value", "config": {"defaultValue": null}, "linkedToInput": "value", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LinearCurve1DDefinition: NodeDefinition = {
  type: "LinearCurve1D",
  label: "LinearCurve1D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyStraightLineCurve1DDefinition: NodeDefinition = {
  type: "PolyStraightLineCurve1D",
  label: "PolyStraightLineCurve1D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticCurve1DDefinition: NodeDefinition = {
  type: "QuadraticCurve1D",
  label: "QuadraticCurve1D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UnaryOperatorDefinition: NodeDefinition = {
  type: "UnaryOperator",
  label: "UnaryOperator",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformFloatDefinition: NodeDefinition = {
  type: "UniformFloat",
  label: "UniformFloat",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "float", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "default", "type": "float", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "max", "type": "float", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec2Definition: NodeDefinition = {
  type: "UniformVec2",
  label: "UniformVec2",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector2", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector2", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector2", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec3Definition: NodeDefinition = {
  type: "UniformVec3",
  label: "UniformVec3",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector3", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector3", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector3", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec4Definition: NodeDefinition = {
  type: "UniformVec4",
  label: "UniformVec4",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector4", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector4", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector4", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec2Definition: NodeDefinition = {
  type: "Vec2",
  label: "Vec2",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec3Definition: NodeDefinition = {
  type: "Vec3",
  label: "Vec3",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec4Definition: NodeDefinition = {
  type: "Vec4",
  label: "Vec4",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VecListDefinition: NodeDefinition = {
  type: "VecList",
  label: "VecList",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "vectors", "label": "Vectors", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "vectors", "type": "string", "label": "Vectors", "config": {"defaultValue": null}, "linkedToInput": "vectors", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VectorOperatorDefinition: NodeDefinition = {
  type: "VectorOperator",
  label: "VectorOperator",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AvoidDefinition: NodeDefinition = {
  type: "Avoid",
  label: "Avoid",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BoundedSolidDefinition: NodeDefinition = {
  type: "BoundedSolid",
  label: "BoundedSolid",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatColorOnlyDefinition: NodeDefinition = {
  type: "MatColorOnly",
  label: "MatColorOnly",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatReferenceDefinition: NodeDefinition = {
  type: "MatReference",
  label: "MatReference",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSmoothColorOnlyDefinition: NodeDefinition = {
  type: "MatSmoothColorOnly",
  label: "MatSmoothColorOnly",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSolidV1Definition: NodeDefinition = {
  type: "MatSolidV1",
  label: "MatSolidV1",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "material", "type": "string", "label": "Material", "config": {"defaultValue": null}, "linkedToInput": "material", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSolidV2Definition: NodeDefinition = {
  type: "MatSolidV2",
  label: "MatSolidV2",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "material", "type": "string", "label": "Material", "config": {"defaultValue": null}, "linkedToInput": "material", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSolidV3Definition: NodeDefinition = {
  type: "MatSolidV3",
  label: "MatSolidV3",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "material", "type": "string", "label": "Material", "config": {"defaultValue": null}, "linkedToInput": "material", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV3Definition: NodeDefinition = {
  type: "MaterialV3",
  label: "MaterialV3",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "emissive", "label": "Emissive", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "vector3", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "emissive", "type": "vector3", "label": "Emissive", "config": {"defaultValue": null}, "linkedToInput": "emissive", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NonEmissiveMaterialV3Definition: NodeDefinition = {
  type: "NonEmissiveMaterialV3",
  label: "NonEmissiveMaterialV3",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "vector3", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBMaterialDefinition: NodeDefinition = {
  type: "RGBMaterial",
  label: "RGBMaterial",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "vector3", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterMaterialDefinition: NodeDefinition = {
  type: "RegisterMaterial",
  label: "RegisterMaterial",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}, {"key": "material", "type": "string", "label": "Material", "config": {"defaultValue": null}, "linkedToInput": "material", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RepelDefinition: NodeDefinition = {
  type: "Repel",
  label: "Repel",
  category: "auto",
  description: "Auto-generated",
  inputs: [],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SMPLMaterialDefinition: NodeDefinition = {
  type: "SMPLMaterial",
  label: "SMPLMaterial",
  category: "auto",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "smpl_index", "label": "Smpl Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "smpl_index", "type": "float", "label": "Smpl Index", "config": {"defaultValue": null}, "linkedToInput": "smpl_index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
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
