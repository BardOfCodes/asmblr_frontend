// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const BoundedSolidDefinition: NodeDefinition = {
  type: "BoundedSolid",
  label: "BoundedSolid",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "bounding", "label": "Bounding", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "bound_threshold", "label": "Bound Threshold", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "bound_threshold", "type": "float", "label": "Bound Threshold", "config": {"defaultValue": null}, "linkedToInput": "bound_threshold", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const GeomOnlySmoothUnionDefinition: NodeDefinition = {
  type: "GeomOnlySmoothUnion",
  label: "GeomOnlySmoothUnion",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

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

export const MatSolidV4Definition: NodeDefinition = {
  type: "MatSolidV4",
  label: "MatSolidV4",
  category: "sysl_base",
  description: "Auto-generated from sysl.symbolic.base.",
  inputs: [{"key": "solid", "label": "Solid", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "material", "label": "Material", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
