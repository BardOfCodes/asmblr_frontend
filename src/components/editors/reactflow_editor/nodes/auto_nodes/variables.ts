// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const UnaryOperatorDefinition: NodeDefinition = {
  type: "UnaryOperator",
  label: "UnaryOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BinaryOperatorDefinition: NodeDefinition = {
  type: "BinaryOperator",
  label: "BinaryOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VectorOperatorDefinition: NodeDefinition = {
  type: "VectorOperator",
  label: "VectorOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "string", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VecListDefinition: NodeDefinition = {
  type: "VecList",
  label: "VecList",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "vectors", "label": "Vectors", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "vectors", "type": "string", "label": "Vectors", "config": {"defaultValue": null}, "linkedToInput": "vectors", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "count", "type": "float", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const FloatDefinition: NodeDefinition = {
  type: "Float",
  label: "Float",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "value", "label": "Value", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "value", "type": "float", "label": "Value", "config": {"defaultValue": null}, "linkedToInput": "value", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec2Definition: NodeDefinition = {
  type: "Vec2",
  label: "Vec2",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec3Definition: NodeDefinition = {
  type: "Vec3",
  label: "Vec3",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec4Definition: NodeDefinition = {
  type: "Vec4",
  label: "Vec4",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformFloatDefinition: NodeDefinition = {
  type: "UniformFloat",
  label: "UniformFloat",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "float", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "default", "type": "float", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "max", "type": "float", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec2Definition: NodeDefinition = {
  type: "UniformVec2",
  label: "UniformVec2",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector2", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector2", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector2", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec3Definition: NodeDefinition = {
  type: "UniformVec3",
  label: "UniformVec3",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector3", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector3", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector3", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec4Definition: NodeDefinition = {
  type: "UniformVec4",
  label: "UniformVec4",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "StringSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "vector4", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "default", "type": "vector4", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "max", "type": "vector4", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "name", "type": "string", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true, "socketType": "StringSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
