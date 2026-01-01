// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const MatMixV4Definition: NodeDefinition = {
  type: "MatMixV4",
  label: "MatMixV4",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "expr_a", "label": "Expr A", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_b", "label": "Expr B", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "t", "label": "T", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "t", "type": "float", "label": "T", "config": {"defaultValue": null}, "linkedToInput": "t", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatRefV3Definition: NodeDefinition = {
  type: "MatRefV3",
  label: "MatRefV3",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MatRefV4Definition: NodeDefinition = {
  type: "MatRefV4",
  label: "MatRefV4",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV1Definition: NodeDefinition = {
  type: "MaterialV1",
  label: "MaterialV1",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "smpl_index", "label": "Smpl Index", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "smpl_index", "type": "int", "label": "Smpl Index", "config": {"defaultValue": null}, "linkedToInput": "smpl_index", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV1V4Definition: NodeDefinition = {
  type: "MaterialV1V4",
  label: "MaterialV1V4",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "mr", "label": "Mr", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "mr", "type": "Vector[2]", "label": "Mr", "config": {"defaultValue": null}, "linkedToInput": "mr", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV2Definition: NodeDefinition = {
  type: "MaterialV2",
  label: "MaterialV2",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "Vector[3]", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV3Definition: NodeDefinition = {
  type: "MaterialV3",
  label: "MaterialV3",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "emissive", "label": "Emissive", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "emissive", "type": "Vector[3]", "label": "Emissive", "config": {"defaultValue": null}, "linkedToInput": "emissive", "showLabel": true, "hasSocket": true}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MaterialV4Definition: NodeDefinition = {
  type: "MaterialV4",
  label: "MaterialV4",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "emissive", "label": "Emissive", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "mrc", "label": "Mrc", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "emissive", "type": "Vector[3]", "label": "Emissive", "config": {"defaultValue": null}, "linkedToInput": "emissive", "showLabel": true, "hasSocket": true}, {"key": "mrc", "type": "Vector[3]", "label": "Mrc", "config": {"defaultValue": null}, "linkedToInput": "mrc", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NonEmissiveMaterialV3Definition: NodeDefinition = {
  type: "NonEmissiveMaterialV3",
  label: "NonEmissiveMaterialV3",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "albedo", "label": "Albedo", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "roughness", "label": "Roughness", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "clearcoat", "label": "Clearcoat", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "metallic", "label": "Metallic", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "albedo", "type": "Vector[3]", "label": "Albedo", "config": {"defaultValue": null}, "linkedToInput": "albedo", "showLabel": true, "hasSocket": true}, {"key": "roughness", "type": "float", "label": "Roughness", "config": {"defaultValue": null}, "linkedToInput": "roughness", "showLabel": true, "hasSocket": true}, {"key": "clearcoat", "type": "float", "label": "Clearcoat", "config": {"defaultValue": null}, "linkedToInput": "clearcoat", "showLabel": true, "hasSocket": true}, {"key": "metallic", "type": "float", "label": "Metallic", "config": {"defaultValue": null}, "linkedToInput": "metallic", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterMaterialDefinition: NodeDefinition = {
  type: "RegisterMaterial",
  label: "RegisterMaterial",
  category: "sysl_materials",
  description: "Auto-generated from sysl.symbolic.materials.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
