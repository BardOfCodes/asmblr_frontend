
import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl, Vector3DControl} from "../controls/vector-control";
import { StringControl } from "../controls/string-control";

const exprSocket = new ClassicPreset.Socket("ExprSocket");


type LinkedHeightField3DData = {
}

type LinkedHeightField3DInputs = { plane: ClassicPreset.Socket , apply_height: ClassicPreset.Socket, };

type LinkedHeightField3DOutputs = { expr: ClassicPreset.Socket };

export class LinkedHeightField3D extends ClassicPreset.Node<LinkedHeightField3DInputs, LinkedHeightField3DOutputs> implements DataflowNode {
  static ID = 'LinkedHeightField3D'
  width = 180

  constructor() {
      super("Linked Height Field 3D");
      const plane = new ClassicPreset.Input(exprSocket, "plane");
      const apply_height = new ClassicPreset.Input(exprSocket, "apply_height");
      const expr = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("plane", plane);
      this.addInput("apply_height", apply_height);
      this.addOutput("expr", expr);
    }

    data(): {} {
      return {};
    }
    serialize(): LinkedHeightField3DData {
      return {
      }
    }
}

type ApplyHeightData = {
  height: [number]
}

type ApplyHeightInputs = { expr: ClassicPreset.Socket, height: ClassicPreset.Socket };

type ApplyHeightOutputs = { expr: ClassicPreset.Socket };

export class ApplyHeight extends ClassicPreset.Node<ApplyHeightInputs, ApplyHeightOutputs> implements DataflowNode {
  static ID = 'ApplyHeight'
  width = 180

  constructor(data: ApplyHeightData) {
      super("Apply Height");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const height = new ClassicPreset.Input(exprSocket, "height");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addInput("height", height);
      this.addOutput("expr", expr_out);
      const heightCtrl = new FloatControl(data.height, 'Height', () => {});
      height.addControl(heightCtrl)
  }
  data(): {} {
      return {};
    }
    serialize(): ApplyHeightData {
      return {
          height: (this.inputs['height']?.control as FloatControl).value as [number]
      }
    }
}

type MarkerNodeData = {
}

type MarkerNodeInputs = { expr: ClassicPreset.Socket, };

type MarkerNodeOutputs = { expr: ClassicPreset.Socket };

export class MarkerNode extends ClassicPreset.Node<MarkerNodeInputs, MarkerNodeOutputs> implements DataflowNode {
  static ID = 'MarkerNode'
  width = 180

  constructor() {
      super("Marker Node");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      this.addInput("expr", expr);
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return {};
    }
    serialize(): MarkerNodeData {
      return {
      }
    }
}



type OldRegisterGeometryData = {
  name: string
  bbox: [number, number, number]
}

type OldRegisterGeometryInputs = { expr: ClassicPreset.Socket, 
  name: ClassicPreset.Socket,
  bbox: ClassicPreset.Socket,};

type OldRegisterGeometryOutputs = { };

export class OldRegisterGeometry extends ClassicPreset.Node<OldRegisterGeometryInputs, OldRegisterGeometryOutputs> implements DataflowNode {
  static ID = 'RegisterGeometry'
  width = 180

  constructor(data: OldRegisterGeometryData) {
      super("Register Geometry");
      const nameControl = new StringControl(data.name, "Name", () => {});
      this.addControl("name", nameControl);
      const bbox = new ClassicPreset.Input(exprSocket, "bbox");
      this.addInput("bbox", bbox);
      const vctrl = new Vector3DControl(data.bbox, 'BBox', () => {
          console.log("Theta Updated");
      });
      bbox.addControl(vctrl);

      const expr = new ClassicPreset.Input(exprSocket, "expr");
      this.addInput("expr", expr);
    }

    data(): {} {
      return this.serialize();
    }
    serialize(): OldRegisterGeometryData {
      const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
      return {
        name: nameControl.value as string,
        bbox: (this.inputs['bbox']?.control as Vector3DControl).value as [number, number, number]
      }
    }
}
