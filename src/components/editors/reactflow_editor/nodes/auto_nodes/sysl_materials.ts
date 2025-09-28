// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

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
