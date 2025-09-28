// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const Revolution3DDefinition: NodeDefinition = {
  type: "Revolution3D",
  label: "Revolution3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "radius", "label": "Radius", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "radius", "type": "float", "label": "Radius", "config": {"defaultValue": null}, "linkedToInput": "radius", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SimpleExtrusion3DDefinition: NodeDefinition = {
  type: "SimpleExtrusion3D",
  label: "SimpleExtrusion3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LinearExtrude3DDefinition: NodeDefinition = {
  type: "LinearExtrude3D",
  label: "LinearExtrude3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticBezierExtrude3DDefinition: NodeDefinition = {
  type: "QuadraticBezierExtrude3D",
  label: "QuadraticBezierExtrude3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "control", "label": "Control", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "control", "type": "vector2", "label": "Control", "config": {"defaultValue": null}, "linkedToInput": "control", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyQuadBezierExtrude3DDefinition: NodeDefinition = {
  type: "PolyQuadBezierExtrude3D",
  label: "PolyQuadBezierExtrude3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "controls", "label": "Controls", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "controls", "type": "string", "label": "Controls", "config": {"defaultValue": null}, "linkedToInput": "controls", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const CubicBezierExtrude3DDefinition: NodeDefinition = {
  type: "CubicBezierExtrude3D",
  label: "CubicBezierExtrude3D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "input", "label": "Input", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "controls", "label": "Controls", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "height", "label": "Height", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "controls", "type": "string", "label": "Controls", "config": {"defaultValue": null}, "linkedToInput": "controls", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "height", "type": "float", "label": "Height", "config": {"defaultValue": null}, "linkedToInput": "height", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const LinearCurve1DDefinition: NodeDefinition = {
  type: "LinearCurve1D",
  label: "LinearCurve1D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const QuadraticCurve1DDefinition: NodeDefinition = {
  type: "QuadraticCurve1D",
  label: "QuadraticCurve1D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const PolyStraightLineCurve1DDefinition: NodeDefinition = {
  type: "PolyStraightLineCurve1D",
  label: "PolyStraightLineCurve1D",
  category: "primitives_higher",
  description: "Auto-generated from geolipi.symbolic.primitives_higher.",
  inputs: [{"key": "points", "label": "Points", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "points", "type": "string", "label": "Points", "config": {"defaultValue": null}, "linkedToInput": "points", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
