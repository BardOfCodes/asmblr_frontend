// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const UnaryOperatorDefinition: NodeDefinition = {
  type: "UnaryOperator",
  label: "UnaryOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "Enum[\"sin\"|\"cos\"|\"tan\"|\"log\"|\"exp\"|\"sqrt\"|\"abs\"|\"floor\"|\"ceil\"|\"round\"|\"frac\"|\"sign\"|\"normalize\"|\"norm\"|\"neg\"]", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const BinaryOperatorDefinition: NodeDefinition = {
  type: "BinaryOperator",
  label: "BinaryOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr_0", "label": "Expr 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "expr_1", "label": "Expr 1", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "Enum[\"add\"|\"sub\"|\"mul\"|\"div\"|\"pow\"|\"atan2\"|\"min\"|\"max\"|\"step\"|\"mod\"]", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VectorOperatorDefinition: NodeDefinition = {
  type: "VectorOperator",
  label: "VectorOperator",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "op", "label": "Op", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "op", "type": "Enum[\"normalize\"]", "label": "Op", "config": {"defaultValue": null}, "linkedToInput": "op", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const VecListDefinition: NodeDefinition = {
  type: "VecList",
  label: "VecList",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "vectors", "label": "Vectors", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "count", "label": "Count", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "vectors", "type": "List[Vector[3]]", "label": "Vectors", "config": {"defaultValue": null}, "linkedToInput": "vectors", "showLabel": true, "hasSocket": true}, {"key": "count", "type": "int", "label": "Count", "config": {"defaultValue": null}, "linkedToInput": "count", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const FloatDefinition: NodeDefinition = {
  type: "Float",
  label: "Float",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "value", "label": "Value", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "value", "type": "float", "label": "Value", "config": {"defaultValue": null}, "linkedToInput": "value", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec2Definition: NodeDefinition = {
  type: "Vec2",
  label: "Vec2",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec3Definition: NodeDefinition = {
  type: "Vec3",
  label: "Vec3",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const Vec4Definition: NodeDefinition = {
  type: "Vec4",
  label: "Vec4",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "x", "label": "X", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "y", "label": "Y", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "z", "label": "Z", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "w", "label": "W", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "x", "type": "float", "label": "X", "config": {"defaultValue": null}, "linkedToInput": "x", "showLabel": true, "hasSocket": true}, {"key": "y", "type": "float", "label": "Y", "config": {"defaultValue": null}, "linkedToInput": "y", "showLabel": true, "hasSocket": true}, {"key": "z", "type": "float", "label": "Z", "config": {"defaultValue": null}, "linkedToInput": "z", "showLabel": true, "hasSocket": true}, {"key": "w", "type": "float", "label": "W", "config": {"defaultValue": null}, "linkedToInput": "w", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformFloatDefinition: NodeDefinition = {
  type: "UniformFloat",
  label: "UniformFloat",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "float", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true}, {"key": "default", "type": "float", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true}, {"key": "max", "type": "float", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true}, {"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec2Definition: NodeDefinition = {
  type: "UniformVec2",
  label: "UniformVec2",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "Vector[2]", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true}, {"key": "default", "type": "Vector[2]", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true}, {"key": "max", "type": "Vector[2]", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true}, {"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec3Definition: NodeDefinition = {
  type: "UniformVec3",
  label: "UniformVec3",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "Vector[3]", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true}, {"key": "default", "type": "Vector[3]", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true}, {"key": "max", "type": "Vector[3]", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true}, {"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const UniformVec4Definition: NodeDefinition = {
  type: "UniformVec4",
  label: "UniformVec4",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "min", "label": "Min", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "default", "label": "Default", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "max", "label": "Max", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "name", "label": "Name", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "min", "type": "Vector[4]", "label": "Min", "config": {"defaultValue": null}, "linkedToInput": "min", "showLabel": true, "hasSocket": true}, {"key": "default", "type": "Vector[4]", "label": "Default", "config": {"defaultValue": null}, "linkedToInput": "default", "showLabel": true, "hasSocket": true}, {"key": "max", "type": "Vector[4]", "label": "Max", "config": {"defaultValue": null}, "linkedToInput": "max", "showLabel": true, "hasSocket": true}, {"key": "name", "type": "str", "label": "Name", "config": {"defaultValue": null}, "linkedToInput": "name", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec2DDefinition: NodeDefinition = {
  type: "SplitVec2D",
  label: "SplitVec2D",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "int", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec3DDefinition: NodeDefinition = {
  type: "SplitVec3D",
  label: "SplitVec3D",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "int", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SplitVec4DDefinition: NodeDefinition = {
  type: "SplitVec4D",
  label: "SplitVec4D",
  category: "variables",
  description: "Auto-generated from geolipi.symbolic.variables.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "index", "label": "Index", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "index", "type": "int", "label": "Index", "config": {"defaultValue": null}, "linkedToInput": "index", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
