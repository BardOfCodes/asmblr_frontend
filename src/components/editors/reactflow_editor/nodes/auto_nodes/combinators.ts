// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const ComplementDefinition: NodeDefinition = {
  type: "Complement",
  label: "Complement",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DifferenceDefinition: NodeDefinition = {
  type: "Difference",
  label: "Difference",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const IntersectionDefinition: NodeDefinition = {
  type: "Intersection",
  label: "Intersection",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": true}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const JoinUnionDefinition: NodeDefinition = {
  type: "JoinUnion",
  label: "JoinUnion",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": true}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NarySmoothIntersectionDefinition: NodeDefinition = {
  type: "NarySmoothIntersection",
  label: "NarySmoothIntersection",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const NarySmoothUnionDefinition: NodeDefinition = {
  type: "NarySmoothUnion",
  label: "NarySmoothUnion",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SmoothDifferenceDefinition: NodeDefinition = {
  type: "SmoothDifference",
  label: "SmoothDifference",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SmoothIntersectionDefinition: NodeDefinition = {
  type: "SmoothIntersection",
  label: "SmoothIntersection",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SmoothUnionDefinition: NodeDefinition = {
  type: "SmoothUnion",
  label: "SmoothUnion",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SwitchedDifferenceDefinition: NodeDefinition = {
  type: "SwitchedDifference",
  label: "SwitchedDifference",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UnionDefinition: NodeDefinition = {
  type: "Union",
  label: "Union",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": true}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const XORDefinition: NodeDefinition = {
  type: "XOR",
  label: "XOR",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const GeomOnlySmoothUnionDefinition: NodeDefinition = {
  type: "GeomOnlySmoothUnion",
  label: "GeomOnlySmoothUnion",
  category: "Combinators",
  description: "Auto-generated from geolipi.symbolic.combinators.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "k", "label": "K", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "k", "type": "float", "label": "K", "config": {"defaultValue": null}, "linkedToInput": "k", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
