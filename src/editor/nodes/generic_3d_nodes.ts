
import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl } from "../controls/vector-control";
import { StringControl } from "../controls/string-control";
import { Vector3DControl } from "../controls/vector-control";

const exprSocket = new ClassicPreset.Socket("ExprSocket");

type RegisterGeometryData = {
  name: string
  bbox_scale: [number, number, number]
  bbox_origin: [number, number, number]
}

type RegisterGeometryInputs = { expr: ClassicPreset.Socket, 
  bbox_scale: ClassicPreset.Socket,
  bbox_origin: ClassicPreset.Socket,
};

type RegisterGeometryOutputs = { };

export class RegisterGeometry extends ClassicPreset.Node<RegisterGeometryInputs, RegisterGeometryOutputs> implements DataflowNode {
  static ID = 'RegisterGeometry'
  width = 180

  constructor(data: RegisterGeometryData) {
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
    serialize(): RegisterGeometryData {
      return {
        name: (this.controls["name"] as ClassicPreset.InputControl<"text">).value as string,
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
      return {
        name: (this.controls["name"] as ClassicPreset.InputControl<"text">).value as string,
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


type RegisterMaterialData = {
  name: string
  base_color: [number, number, number]
  metallic: [number]
  roughness: [number]
  ior : [number]
  emissive: [number, number, number]
  opacity: [number]
}

type RegisterMaterialInputs = { 
  base_color: ClassicPreset.Socket,
  metallic: ClassicPreset.Socket,
  roughness: ClassicPreset.Socket,
  ior: ClassicPreset.Socket,
  emissive: ClassicPreset.Socket,
  opacity: ClassicPreset.Socket
};

type RegisterMaterialOutputs = { expr: ClassicPreset.Socket };

export class RegisterMaterial extends ClassicPreset.Node<RegisterMaterialInputs, RegisterMaterialOutputs> implements DataflowNode {
  static ID = 'RegisterMaterial'
  width = 180

  constructor(data: RegisterMaterialData) {
      super("Register Material");
      const nameControl = new StringControl(data.name, "Name", () => {});
      this.addControl("name", nameControl);
      const base_color = new ClassicPreset.Input(exprSocket, "base_color");
      this.addInput("base_color", base_color);
      const vctrl = new Vector3DControl(data.base_color, 'Base Color', () => {
          console.log("Base Color Updated");
      });
      base_color.addControl(vctrl);

      const metallic = new ClassicPreset.Input(exprSocket, "metallic");
      this.addInput("metallic", metallic);
      const metallicCtrl = new FloatControl(data.metallic, 'Metallic', () => {});
      metallic.addControl(metallicCtrl);

      const roughness = new ClassicPreset.Input(exprSocket, "roughness");
      this.addInput("roughness", roughness);
      const roughnessCtrl = new FloatControl(data.roughness, 'Roughness', () => {});
      roughness.addControl(roughnessCtrl);

      const ior = new ClassicPreset.Input(exprSocket, "ior");
      this.addInput("ior", ior);
      const iorCtrl = new FloatControl(data.ior, 'IOR', () => {});
      ior.addControl(iorCtrl);

      const emissive = new ClassicPreset.Input(exprSocket, "emissive");
      this.addInput("emissive", emissive);
      const emissiveCtrl = new Vector3DControl(data.emissive, 'Emissive', () => {});
      emissive.addControl(emissiveCtrl);

      const opacity = new ClassicPreset.Input(exprSocket, "opacity");
      this.addInput("opacity", opacity);
      const opacityCtrl = new FloatControl(data.opacity, 'Opacity', () => {});
      opacity.addControl(opacityCtrl);

      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return this.serialize();
    }
    serialize(): RegisterMaterialData {
        return {
            name: (this.controls["name"] as ClassicPreset.InputControl<"text">).value as string,
            base_color: (this.inputs['base_color']?.control as Vector3DControl).value as [number, number, number],
            metallic: (this.inputs['metallic']?.control as FloatControl).value as [number],
            roughness: (this.inputs['roughness']?.control as FloatControl).value as [number],
            ior: (this.inputs['ior']?.control as FloatControl).value as [number],
            emissive: (this.inputs['emissive']?.control as Vector3DControl).value as [number, number, number],
            opacity: (this.inputs['opacity']?.control as FloatControl).value as [number],
        }
    }
}

type SetMaterialData = {
  material_name: string
}

type SetMaterialInputs = { expr: ClassicPreset.Socket};

type SetMaterialOutputs = { expr: ClassicPreset.Socket };

export class SetMaterial extends ClassicPreset.Node<SetMaterialInputs, SetMaterialOutputs> implements DataflowNode {
  static ID = 'SetMaterial'
  width = 180

  constructor(data: SetMaterialData) {
      super("Set Material");

      const materialNameControl = new StringControl(data.material_name, "Material Name", () => {});
      this.addControl("material_name", materialNameControl);
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return {};
    }
    serialize(): SetMaterialData {
      return {
        material_name: (this.controls["material_name"] as ClassicPreset.InputControl<"text">).value as string,
      }
    }
}
