// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const ApplyHeightDefinition: NodeDefinition = {
  type: "ApplyHeight",
  label: "ApplyHeight",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "height", "label": "Height", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LinkedHeightField3DDefinition: NodeDefinition = {
  type: "LinkedHeightField3D",
  label: "LinkedHeightField3D",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "plane", "label": "Plane", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "apply_height", "label": "Apply Height", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const MarkerNodeDefinition: NodeDefinition = {
  type: "MarkerNode",
  label: "MarkerNode",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NamedGeometryDefinition: NodeDefinition = {
  type: "NamedGeometry",
  label: "NamedGeometry",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterGeometryDefinition: NodeDefinition = {
  type: "RegisterGeometry",
  label: "RegisterGeometry",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "bbox", "label": "Bbox", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}, {"key": "bbox", "type": "Vector[3]", "label": "Bbox", "config": {"defaultValue": null}, "linkedToInput": "bbox", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RegisterStateDefinition: NodeDefinition = {
  type: "RegisterState",
  label: "RegisterState",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "state", "label": "State", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "state", "type": "float", "label": "State", "config": {"defaultValue": null}, "linkedToInput": "state", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SetMaterialDefinition: NodeDefinition = {
  type: "SetMaterial",
  label: "SetMaterial",
  category: "mxg",
  description: "Auto-generated from migumi.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "material", "type": "float", "label": "Material", "config": {"defaultValue": null}, "linkedToInput": "material", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
