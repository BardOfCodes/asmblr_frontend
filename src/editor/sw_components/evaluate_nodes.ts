
import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl } from "../controls/vector-control";
import { StringControl } from "../controls/string-control";
import { Vector2DControl, Vector3DControl } from "../controls/vector-control";

const exprSocket = new ClassicPreset.Socket("ExprSocket");


type ConvertToShaderData = {
}

// Define the input and output exprSocket types more clearly
type ConvertToShaderInputs = { expr: ClassicPreset.Socket;};
type ConvertToShaderOutputs = { };

export class ConvertToShaderNode extends ClassicPreset.Node<ConvertToShaderInputs, ConvertToShaderOutputs> implements DataflowNode {
    allocation: string[]
    outputValue: any
    width = 180

    static ID = 'ConvertToShaderNode'

    constructor() {
        super("Convert To Shader Node");
        this.allocation = ['Output'];
        const expr = new ClassicPreset.Input(exprSocket, "expr");
    
        this.addInput("expr", expr);
        
      }
    
      data(): {} {
        return {};
      }
      serialize(): ConvertToShaderData {
        return {
        }
      }
}

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

type BBoxedApplyHeightData = {
  bbox_scale: [number, number],
  bbox_origin: [number, number]
  height: [number]
}
type BBoxedApplyHeightInputs = { expr: ClassicPreset.Socket, bbox_scale: ClassicPreset.Socket, bbox_origin: ClassicPreset.Socket, height: ClassicPreset.Socket };
type BBoxedApplyHeightOutputs = { expr: ClassicPreset.Socket };

export class BBoxedApplyHeight extends ClassicPreset.Node<BBoxedApplyHeightInputs, BBoxedApplyHeightOutputs> implements DataflowNode {
  static ID = 'BBoxedApplyHeight'
  width = 180

  constructor(data: BBoxedApplyHeightData) {
      super("Apply Height BBoxed");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const bbox_scale = new ClassicPreset.Input(exprSocket, "bbox_scale");
      const bbox_origin = new ClassicPreset.Input(exprSocket, "bbox_origin");
      const height = new ClassicPreset.Input(exprSocket, "height");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");

      this.addInput("expr", expr);
      this.addInput("bbox_scale", bbox_scale);
      this.addInput("bbox_origin", bbox_origin);
      this.addInput("height", height);
      this.addOutput("expr", expr_out);

      const vctrl = new Vector2DControl(data.bbox_origin, 'BBox Origin', () => {
        console.log("Origin Updated");
      });
      bbox_origin.addControl(vctrl);
      const vctrl2 = new Vector2DControl(data.bbox_scale, 'BBox Scale', () => {
        console.log("Scale Updated");
      });
      bbox_scale.addControl(vctrl2);
      const heightCtrl = new FloatControl(data.height, 'Height', () => {});
      height.addControl(heightCtrl)

    }

    data(): {} {
      return {};
    }
    serialize(): BBoxedApplyHeightData {
      return {
        bbox_scale: (this.inputs['bbox_scale']?.control as Vector2DControl).value as [number, number],
        bbox_origin: (this.inputs['bbox_origin']?.control as Vector2DControl).value as [number, number],
        height: (this.inputs['height']?.control as FloatControl).value as [number]
      }
    }
}

type SetMaterialData = {
  material: [number]
}

type SetMaterialInputs = { expr: ClassicPreset.Socket, material: ClassicPreset.Socket };

type SetMaterialOutputs = { expr: ClassicPreset.Socket };

export class SetMaterial extends ClassicPreset.Node<SetMaterialInputs, SetMaterialOutputs> implements DataflowNode {
  static ID = 'SetMaterial'
  width = 180

  constructor(data: SetMaterialData) {
      super("Set Material");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const material = new ClassicPreset.Input(exprSocket, "material");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addInput("material", material);
      this.addOutput("expr", expr_out);
      const matCtrl = new FloatControl(data.material, 'MatID', () => {});
      material.addControl(matCtrl);
    }

    data(): {} {
      return {};
    }
    serialize(): SetMaterialData {
      return {
          material: (this.inputs['material']?.control as FloatControl).value as [number]
      }
    }
}

type RegisterGeometryData = {
  name: string
  bbox: [number, number, number]
}

type RegisterGeometryInputs = { expr: ClassicPreset.Socket, 
  name: ClassicPreset.Socket,
  bbox: ClassicPreset.Socket,};

type RegisterGeometryOutputs = { };

export class RegisterGeometry extends ClassicPreset.Node<RegisterGeometryInputs, RegisterGeometryOutputs> implements DataflowNode {
  static ID = 'RegisterGeometry'
  width = 180

  constructor(data: RegisterGeometryData) {
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
    serialize(): RegisterGeometryData {
      const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
      return {
        name: nameControl.value as string,
        bbox: (this.inputs['bbox']?.control as Vector3DControl).value as [number, number, number]
      }
    }
}

type RegisterGeometryBetaData = {
  name: string
  bbox_scale: [number, number, number]
  bbox_origin: [number, number, number]
}

type RegisterGeometryBetaInputs = { expr: ClassicPreset.Socket, 
  name: ClassicPreset.Socket,
  bbox_scale: ClassicPreset.Socket,
  bbox_origin: ClassicPreset.Socket,
};

type RegisterGeometryBetaOutputs = { };

export class RegisterGeometryBeta extends ClassicPreset.Node<RegisterGeometryBetaInputs, RegisterGeometryBetaOutputs> implements DataflowNode {
  static ID = 'RegisterGeometryBeta'
  width = 180

  constructor(data: RegisterGeometryBetaData) {
      super("Register Geometry");
      const nameControl = new StringControl(data.name, "Name", () => {});
      this.addControl("name", nameControl);
      const bbox_scale= new ClassicPreset.Input(exprSocket, "bbox_scale");
      this.addInput("bbox_scale", bbox_scale);
      const vctrl = new Vector3DControl(data.bbox_scale, 'BBox Scale', () => {
          console.log("Theta Updated");
      });
      bbox_scale.addControl(vctrl);
      const bbox_origin = new ClassicPreset.Input(exprSocket, "bbox_origin");
      this.addInput("bbox_origin", bbox_origin);
      const vctrl2 = new Vector3DControl(data.bbox_origin, 'BBox Origin', () => {
          console.log("Theta Updated");
      });
      bbox_origin.addControl(vctrl2);


      const expr = new ClassicPreset.Input(exprSocket, "expr");
      this.addInput("expr", expr);
    }

    data(): {} {
      return this.serialize();
    }
    serialize(): RegisterGeometryBetaData {
      const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
      return {
        name: nameControl.value as string,
        bbox_scale: (this.inputs['bbox_scale']?.control as Vector3DControl).value as [number, number, number],
        bbox_origin: (this.inputs['bbox_origin']?.control as Vector3DControl).value as [number, number, number]
      }
    }
}


type NamedGeometryData = {
  name: string
}

type NamedGeometryInputs = {};

type NamedGeometryOutputs = { expr: ClassicPreset.Socket };

export class NamedGeometry extends ClassicPreset.Node<NamedGeometryInputs, NamedGeometryOutputs> implements DataflowNode {
  static ID = 'NamedGeometry'
  width = 180

  constructor(data: NamedGeometryData) {
      super("Named Geometry");
      const nameControl = new StringControl(data.name, "Name", () => {});
      this.addControl("name", nameControl);
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return this.serialize();
    }
    serialize(): NamedGeometryData {
      const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
      return {
        name: nameControl.value as string,
      }
    }
}

type RegisterStateData = {
  state: [number],
}

type RegisterStateInputs = { expr: ClassicPreset.Socket, state: ClassicPreset.Socket };

type RegisterStateOutputs = { };

export class RegisterState extends ClassicPreset.Node<RegisterStateInputs, RegisterStateOutputs> implements DataflowNode {
  static ID = 'RegisterState'
  width = 180

  constructor(data: RegisterStateData) {
      super("Register State");
      const stateControl = new FloatControl(data.state, "State", () => {});
      this.addControl("state", stateControl);
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      this.addInput("expr", expr);
    }

    data(): {} {
      return this.serialize();
    }
    serialize(): RegisterStateData {
      return {
        state: (this.controls["state"] as FloatControl).value as [number],
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