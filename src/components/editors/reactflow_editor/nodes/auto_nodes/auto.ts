// Auto-generated from asmblr/nodes.json. Do not edit.
import { NodeDefinition } from '../../definitions/NodeDefinitions';

export const PolyLine2DDefinition: NodeDefinition = {
  type: "PolyLine2D",
  label: "PolyLine2D",
  category: "auto",
  description: "Auto-generated from geolipi.symbolic.primitives_2d.",
  inputs: [{"key": "vertices", "label": "Vertices", "socketType": "ExprSocket", "required": false, "variadic": false}],
  outputs: [{"key": "expr", "label": "expr", "socketType": "ExprSocket"}],
  controls: [{"key": "vertices", "type": "List[Vector[3]]", "label": "Vertices", "config": {"defaultValue": null}, "linkedToInput": "vertices", "showLabel": true, "hasSocket": true}],
  factory: (data?: Record<string, any>) => ({ ...(data || {}) })
};
