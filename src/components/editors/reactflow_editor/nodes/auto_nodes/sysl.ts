// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const MatSolidV1Definition: NodeDefinition = {
  type: "MatSolidV1",
  label: "MatSolidV1",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "solid", "label": "Solid", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSolidV2Definition: NodeDefinition = {
  type: "MatSolidV2",
  label: "MatSolidV2",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "solid", "label": "Solid", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSolidV3Definition: NodeDefinition = {
  type: "MatSolidV3",
  label: "MatSolidV3",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "solid", "label": "Solid", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BoundedSolidDefinition: NodeDefinition = {
  type: "BoundedSolid",
  label: "BoundedSolid",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "bounding", "label": "Bounding", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "bound_threshold", "label": "Bound Threshold", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "bound_threshold", "type": "float", "label": "Bound Threshold", "config": {"defaultValue": null}, "linkedToInput": "bound_threshold", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const GeomOnlySmoothUnionDefinition: NodeDefinition = {
  type: "GeomOnlySmoothUnion",
  label: "GeomOnlySmoothUnion",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedSDFGrid3DDefinition: NodeDefinition = {
  type: "EncodedSDFGrid3D",
  label: "EncodedSDFGrid3D",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "data", "label": "Data", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "string", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LowPrecisionSDFGrid3DDefinition: NodeDefinition = {
  type: "LowPrecisionSDFGrid3D",
  label: "LowPrecisionSDFGrid3D",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "data", "label": "Data", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "string", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedLowPrecisionSDFGrid3DDefinition: NodeDefinition = {
  type: "EncodedLowPrecisionSDFGrid3D",
  label: "EncodedLowPrecisionSDFGrid3D",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "data", "label": "Data", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "string", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SMPLMaterialDefinition: NodeDefinition = {
  type: "SMPLMaterial",
  label: "SMPLMaterial",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "smpl_index", "label": "Smpl Index", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "smpl_index", "type": "float", "label": "Smpl Index", "config": {"defaultValue": null}, "linkedToInput": "smpl_index", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBMaterialDefinition: NodeDefinition = {
  type: "RGBMaterial",
  label: "RGBMaterial",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "vector3", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV3Definition: NodeDefinition = {
  type: "MaterialV3",
  label: "MaterialV3",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "emissive", "label": "Emissive", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "vector3", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "emissive", "type": "vector3", "label": "Emissive", "config": {"defaultValue": null}, "linkedToInput": "emissive", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NonEmissiveMaterialV3Definition: NodeDefinition = {
  type: "NonEmissiveMaterialV3",
  label: "NonEmissiveMaterialV3",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "vector3", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatReferenceDefinition: NodeDefinition = {
  type: "MatReference",
  label: "MatReference",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterMaterialDefinition: NodeDefinition = {
  type: "RegisterMaterial",
  label: "RegisterMaterial",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBGrid3DDefinition: NodeDefinition = {
  type: "RGBGrid3D",
  label: "RGBGrid3D",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "data", "label": "Data", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "string", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedRGBGrid3DDefinition: NodeDefinition = {
  type: "EncodedRGBGrid3D",
  label: "EncodedRGBGrid3D",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "data", "label": "Data", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "string", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatColorOnlyDefinition: NodeDefinition = {
  type: "MatColorOnly",
  label: "MatColorOnly",
  category: "sysl_combinators",
  description: "Auto-generated from sysl.symbolic.mat_solid_combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatSmoothColorOnlyDefinition: NodeDefinition = {
  type: "MatSmoothColorOnly",
  label: "MatSmoothColorOnly",
  category: "sysl_combinators",
  description: "Auto-generated from sysl.symbolic.mat_solid_combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RepelDefinition: NodeDefinition = {
  type: "Repel",
  label: "Repel",
  category: "sysl_combinators",
  description: "Auto-generated from sysl.symbolic.mat_solid_combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AvoidDefinition: NodeDefinition = {
  type: "Avoid",
  label: "Avoid",
  category: "sysl_combinators",
  description: "Auto-generated from sysl.symbolic.mat_solid_combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
