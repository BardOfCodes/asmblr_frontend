// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const SMPLMaterialDefinition: NodeDefinition = {
  type: "SMPLMaterial",
  label: "SMPLMaterial",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "smpl_index", "label": "Smpl Index", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "smpl_index", "type": "int", "label": "Smpl Index", "config": {"defaultValue": null}, "linkedToInput": "smpl_index", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBMaterialDefinition: NodeDefinition = {
  type: "RGBMaterial",
  label: "RGBMaterial",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "Vector[3]", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV3Definition: NodeDefinition = {
  type: "MaterialV3",
  label: "MaterialV3",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "emissive", "label": "Emissive", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "emissive", "type": "Vector[3]", "label": "Emissive", "config": {"defaultValue": null}, "linkedToInput": "emissive", "showLabel": true, "hasSocket": true}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NonEmissiveMaterialV3Definition: NodeDefinition = {
  type: "NonEmissiveMaterialV3",
  label: "NonEmissiveMaterialV3",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatReferenceDefinition: NodeDefinition = {
  type: "MatReference",
  label: "MatReference",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterMaterialDefinition: NodeDefinition = {
  type: "RegisterMaterial",
  label: "RegisterMaterial",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGBGrid3DDefinition: NodeDefinition = {
  type: "RGBGrid3D",
  label: "RGBGrid3D",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "data", "label": "Data", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "Tensor[float,(D,H,W,3)]", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const EncodedRGBGrid3DDefinition: NodeDefinition = {
  type: "EncodedRGBGrid3D",
  label: "EncodedRGBGrid3D",
  category: "materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "data", "label": "Data", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "data", "type": "Tensor[float,(D,H,W,3)]", "label": "Data", "config": {"defaultValue": null}, "linkedToInput": "data", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
