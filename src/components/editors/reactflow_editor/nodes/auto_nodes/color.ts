// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const DestinationInDefinition: NodeDefinition = {
  type: "DestinationIn",
  label: "DestinationIn",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DestinationOutDefinition: NodeDefinition = {
  type: "DestinationOut",
  label: "DestinationOut",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DestinationOverDefinition: NodeDefinition = {
  type: "DestinationOver",
  label: "DestinationOver",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const DestinationAtopDefinition: NodeDefinition = {
  type: "DestinationAtop",
  label: "DestinationAtop",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SourceInDefinition: NodeDefinition = {
  type: "SourceIn",
  label: "SourceIn",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SourceOutDefinition: NodeDefinition = {
  type: "SourceOut",
  label: "SourceOut",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SourceOverDefinition: NodeDefinition = {
  type: "SourceOver",
  label: "SourceOver",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SourceAtopDefinition: NodeDefinition = {
  type: "SourceAtop",
  label: "SourceAtop",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SVGXORDefinition: NodeDefinition = {
  type: "SVGXOR",
  label: "SVGXOR",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas_0", "label": "Canvas 0", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "canvas_1", "label": "Canvas 1", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ApplyColor2DDefinition: NodeDefinition = {
  type: "ApplyColor2D",
  label: "ApplyColor2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "color", "label": "Color", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "color", "type": "string", "label": "Color", "config": {"defaultValue": null}, "linkedToInput": "color", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ModifyOpacity2DDefinition: NodeDefinition = {
  type: "ModifyOpacity2D",
  label: "ModifyOpacity2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas", "label": "Canvas", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "alpha", "label": "Alpha", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "alpha", "type": "float", "label": "Alpha", "config": {"defaultValue": null}, "linkedToInput": "alpha", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ModifyColor2DDefinition: NodeDefinition = {
  type: "ModifyColor2D",
  label: "ModifyColor2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas", "label": "Canvas", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "color", "label": "Color", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "color", "type": "string", "label": "Color", "config": {"defaultValue": null}, "linkedToInput": "color", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const ModifyColorTritone2DDefinition: NodeDefinition = {
  type: "ModifyColorTritone2D",
  label: "ModifyColorTritone2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas", "label": "Canvas", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "color_a", "label": "Color A", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "color_b", "label": "Color B", "socketType": "ExprSocket", "required": false, "variadic": false}, {"key": "color_c", "label": "Color C", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "color_a", "type": "string", "label": "Color A", "config": {"defaultValue": null}, "linkedToInput": "color_a", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "color_b", "type": "string", "label": "Color B", "config": {"defaultValue": null}, "linkedToInput": "color_b", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}, {"key": "color_c", "type": "string", "label": "Color C", "config": {"defaultValue": null}, "linkedToInput": "color_c", "showLabel": true, "hasSocket": true, "socketType": "ExprSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const SourceOverSequenceDefinition: NodeDefinition = {
  type: "SourceOverSequence",
  label: "SourceOverSequence",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas", "label": "Canvas", "socketType": "ExprSocket", "required": true, "variadic": true}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AlphaMask2DDefinition: NodeDefinition = {
  type: "AlphaMask2D",
  label: "AlphaMask2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "canvas", "label": "Canvas", "socketType": "ExprSocket", "required": true, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const AlphaToSDF2DDefinition: NodeDefinition = {
  type: "AlphaToSDF2D",
  label: "AlphaToSDF2D",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "expr", "label": "Expr", "socketType": "ExprSocket", "required": true, "variadic": false}, {"key": "dx", "label": "Dx", "socketType": "FloatSocket", "required": false, "variadic": false}, {"key": "canvas_shape", "label": "Canvas Shape", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "dx", "type": "float", "label": "Dx", "config": {"defaultValue": null}, "linkedToInput": "dx", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}, {"key": "canvas_shape", "type": "vector2", "label": "Canvas Shape", "config": {"defaultValue": null}, "linkedToInput": "canvas_shape", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGB2HSLDefinition: NodeDefinition = {
  type: "RGB2HSL",
  label: "RGB2HSL",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "vector3", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const RGB2HSVDefinition: NodeDefinition = {
  type: "RGB2HSV",
  label: "RGB2HSV",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "vector3", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HSV2RGBDefinition: NodeDefinition = {
  type: "HSV2RGB",
  label: "HSV2RGB",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "hsv", "label": "Hsv", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "hsv", "type": "vector3", "label": "Hsv", "config": {"defaultValue": null}, "linkedToInput": "hsv", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HSL2RGBDefinition: NodeDefinition = {
  type: "HSL2RGB",
  label: "HSL2RGB",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "hsl", "label": "Hsl", "socketType": "VectorSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "hsl", "type": "vector3", "label": "Hsl", "config": {"defaultValue": null}, "linkedToInput": "hsl", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};

export const HueShiftDefinition: NodeDefinition = {
  type: "HueShift",
  label: "HueShift",
  category: "color",
  description: "Auto-generated from geolipi.symbolic.color.",
  inputs: [{"key": "rgb", "label": "Rgb", "socketType": "VectorSocket", "required": false, "variadic": false}, {"key": "amount", "label": "Amount", "socketType": "FloatSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "rgb", "type": "vector3", "label": "Rgb", "config": {"defaultValue": null}, "linkedToInput": "rgb", "showLabel": true, "hasSocket": true, "socketType": "VectorSocket"}, {"key": "amount", "type": "float", "label": "Amount", "config": {"defaultValue": null}, "linkedToInput": "amount", "showLabel": true, "hasSocket": true, "socketType": "FloatSocket"}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
