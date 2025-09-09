import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl, Vector2DControl, Vector3DControl, Vector4DControl } from "../controls/vector-control";
import { StringSelectionControl } from "../controls/list-control";

const exprSocket = new ClassicPreset.Socket("ExprSocket");

type EulerRotate3DData = {
    param: [number, number, number],
}

type EulerRotate3DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type EulerRotate3DOutputs = { expr: ClassicPreset.Socket };

export class EulerRotate3D extends ClassicPreset.Node<EulerRotate3DInputs, EulerRotate3DOutputs> implements DataflowNode {
    static ID = 'EulerRotate3D'
    width = 180

    constructor(data: EulerRotate3DData) {
        super("Euler Rotate 3D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addInput("param", param);
        this.addOutput("expr", expr_out);
        
        const vctrl = new Vector3DControl(data.param, '', () => {
            console.log("Theta Updated");
        });
        param.addControl(vctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): EulerRotate3DData {
        return {
            param: (this.inputs['param']?.control as Vector3DControl).value as [number, number, number]
        }
    }
}

type AARotate3DData = {
    param: [number, number, number],
}
type AARotate3DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type AARotate3DOutputs = { expr: ClassicPreset.Socket };
export class AARotate3D extends ClassicPreset.Node<AARotate3DInputs, AARotate3DOutputs> implements DataflowNode {
    static ID = 'AARotate3D'
    width = 180

    constructor(data: AARotate3DData) {
        super("AA Rotate 3D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addInput("param", param);
        this.addOutput("expr", expr_out);
        
        const vctrl = new Vector3DControl(data.param, '', () => {
            console.log("Axis Updated");
        });
        param.addControl(vctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): AARotate3DData {
        return {
            param: (this.inputs['param']?.control as Vector3DControl).value as [number, number, number]
        }
    }
}


type Scale3DData = {
    param: [number, number, number],
}

type Scale3DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type Scale3DOutputs = { expr: ClassicPreset.Socket };

export class Scale3D extends ClassicPreset.Node<Scale3DInputs, Scale3DOutputs> implements DataflowNode {
    static ID = 'Scale3D'
    width = 180

    constructor(data: Scale3DData) {
        super("Scale 3D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addInput("param", param);
        this.addOutput("expr", expr_out);
        
        const vctrl = new Vector3DControl(data.param, '', () => {
            console.log("Size Updated");
        });
        param.addControl(vctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): Scale3DData {
        return {
            param: (this.inputs['param']?.control as Vector3DControl).value as [number, number, number]
        }
    }
}

type Translate3DData = {
    param: [number, number, number],
}

type Translate3DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type Translate3DOutputs = { expr: ClassicPreset.Socket };

export class Translate3D extends ClassicPreset.Node<Translate3DInputs, Translate3DOutputs> implements DataflowNode {
    static ID = 'Translate3D'
    width = 180

    constructor(data: Translate3DData) {
        super("Translate 3D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addInput("param", param);
        this.addOutput("expr", expr_out);
        
        const vctrl = new Vector3DControl(data.param, '', () => {
            console.log("Size Updated");
        });
        param.addControl(vctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): Translate3DData {
        return {
            param: (this.inputs['param']?.control as Vector3DControl).value as [number, number, number]
        }
    }
}

type Plane3DData = {
    origin: [number, number, number],
    normal: [number, number, number],
}

type Plane3DInputs = { origin: ClassicPreset.Socket, normal: ClassicPreset.Socket };
type Plane3DOutputs = { expr: ClassicPreset.Socket };

export class Plane3D extends ClassicPreset.Node<Plane3DInputs, Plane3DOutputs> implements DataflowNode {
    static ID = 'Plane3D'
    width = 180

    constructor(data: Plane3DData) {
        super("Plane 3D");
        const origin = new ClassicPreset.Input(exprSocket, "origin");
        const normal = new ClassicPreset.Input(exprSocket, "normal");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("origin", origin);
        this.addInput("normal", normal);
        this.addOutput("expr", expr_out);
        
        const vctrl_origin = new Vector3DControl(data.origin, 'Origin', () => {
            console.log("Origin Updated");
        });
        origin.addControl(vctrl_origin);

        const vctrl_normal = new Vector3DControl(data.normal, 'Normal', () => {
            console.log("Normal Updated");
        });
        normal.addControl(vctrl_normal);

    }

    data(): {} {
        return {};
    }
    serialize(): Plane3DData {
        return {
            origin: (this.inputs['origin']?.control as Vector3DControl).value as [number, number, number],
            normal: (this.inputs['normal']?.control as Vector3DControl).value as [number, number, number],
        }
    }
    clone() {
        const data = this.serialize();
      return new Plane3D(data);
    }
}
type Cuboid3DData = {
    size: [number, number, number],
}
type Cuboid3DInputs = { size: ClassicPreset.Socket };
type Cuboid3DOutputs = { expr: ClassicPreset.Socket };
export class Cuboid3D extends ClassicPreset.Node<Cuboid3DInputs, Cuboid3DOutputs> implements DataflowNode {
    static ID = 'Cuboid3D'
    width = 180

    constructor(data: Cuboid3DData) {
        super("Cuboid 3D");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("size", param);
        this.addOutput("expr", expr_out);
        
        const vctrl = new Vector3DControl(data.size, '', () => {
            console.log("Size Updated");
        });
        param.addControl(vctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): Cuboid3DData {
        return {
            size: (this.inputs['size']?.control as Vector3DControl).value as [number, number, number]
        }
    }
}

type Sphere3DData = {
    param: [number],
}
type Sphere3DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type Sphere3DOutputs = { expr: ClassicPreset.Socket };
export class Sphere3D extends ClassicPreset.Node<Sphere3DInputs, Sphere3DOutputs> implements DataflowNode {
    static ID = 'Sphere3D'
    width = 180

    constructor(data: Sphere3DData) {
        super("Sphere 3D");
        const param = new ClassicPreset.Input(exprSocket, "param");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("param", param);
        this.addOutput("expr", expr_out);
        
        const param_ctrl = new FloatControl(data.param, 'param', () => {
            console.log("param Updated");
        });
        param.addControl(param_ctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): Sphere3DData {
        return {
            param: (this.inputs['param']?.control as FloatControl).value as [number]
        }
    }
    clone() {
        const data = this.serialize();
        return new Sphere3D(data);
    }
}

type SuperQuadric3DData = {
    skew_vec: [number, number, number],
    epsilon_1: [number],
    epsilon_2: [number],
}
type SuperQuadric3DInputs = { skew_vec: ClassicPreset.Socket, epsilon_1: ClassicPreset.Socket, epsilon_2: ClassicPreset.Socket };
type SuperQuadric3DOutputs = { expr: ClassicPreset.Socket };

export class SuperQuadric3D extends ClassicPreset.Node<SuperQuadric3DInputs, SuperQuadric3DOutputs> implements DataflowNode {
    static ID = 'SuperQuadric3D'
    width = 180

    constructor(data: SuperQuadric3DData) {
        super("Super Quadric 3D");
        const skew_vec = new ClassicPreset.Input(exprSocket, "skew_vec");
        const epsilon_1 = new ClassicPreset.Input(exprSocket, "epsilon_1");
        const epsilon_2 = new ClassicPreset.Input(exprSocket, "epsilon_2");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("skew_vec", skew_vec);
        this.addInput("epsilon_1", epsilon_1);
        this.addInput("epsilon_2", epsilon_2);
        this.addOutput("expr", expr_out);
        
        const skew_ctrl = new Vector3DControl(data.skew_vec, 'Skew Vector', () => {
            console.log("Skew Vector Updated");
        });
        skew_vec.addControl(skew_ctrl);

        const epsilon_1_ctrl = new FloatControl(data.epsilon_1, 'Epsilon 1', () => {
            console.log("Epsilon 1 Updated");
        });
        epsilon_1.addControl(epsilon_1_ctrl);

        const epsilon_2_ctrl = new FloatControl(data.epsilon_2, 'Epsilon 2', () => {
            console.log("Epsilon 2 Updated");
        });
        epsilon_2.addControl(epsilon_2_ctrl);

    }

    data(): {} {
        return {};
    }
    serialize(): SuperQuadric3DData {
        return {
            skew_vec: (this.inputs['skew_vec']?.control as Vector3DControl).value as [number, number, number],
            epsilon_1: (this.inputs['epsilon_1']?.control as FloatControl).value as [number],
            epsilon_2: (this.inputs['epsilon_2']?.control as FloatControl).value as [number],
        }
    }
}

// NeoPrim3D

// Special primitive
type NeoPrimitive3DData = {
    size: [number, number],
    corners: [number, number, number, number],
    thickness: [number],
    mode: string,
    extrusion: [number, number, number],
    onion: [number],
    inflate: [number]
}

type NeoPrimitive3DInputs = { size: ClassicPreset.Socket, corners: ClassicPreset.Socket, thickness: ClassicPreset.Socket, mode: ClassicPreset.Socket, extrusion: ClassicPreset.Socket, onion: ClassicPreset.Socket, inflate: ClassicPreset.Socket };

type NeoPrimitive3DOutputs = { expr: ClassicPreset.Socket };

export class NeoPrimitive3D extends ClassicPreset.Node<NeoPrimitive3DInputs, NeoPrimitive3DOutputs> implements DataflowNode {
    static ID = 'NeoPrimitive3D'
    width = 180

    constructor(data: NeoPrimitive3DData) {
        super("Super Primitive 3D");
        const size = new ClassicPreset.Input(exprSocket, "size");
        const corners = new ClassicPreset.Input(exprSocket, "corners");
        const thickness = new ClassicPreset.Input(exprSocket, "thickness");
        const extrusion = new ClassicPreset.Input(exprSocket, "extrusion");
        const onion = new ClassicPreset.Input(exprSocket, "onion");
        const inflate = new ClassicPreset.Input(exprSocket, "inflate");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");

        this.addInput("size", size);
        this.addInput("corners", corners);
        this.addInput("thickness", thickness);
        this.addInput("extrusion", extrusion);
        this.addInput("onion", onion);
        this.addInput("inflate", inflate);
        this.addOutput("expr", expr_out);

        const vctrl_size = new Vector2DControl(data.size, 'Size', () => {
            console.log("Size Updated");
        });
        size.addControl(vctrl_size);

        const vctrl_corners = new Vector4DControl(data.corners, 'Corners', () => {
            console.log("Corners Updated");
        }
        );
        corners.addControl(vctrl_corners);
        const vctrl_thickness = new FloatControl(data.thickness, 'Thickness', () => {
            console.log("Thickness Updated");
        });
        thickness.addControl(vctrl_thickness);


        const modeControl = new StringSelectionControl(
            data.mode, // Initial value
            "Mode", // Label
            ["0", "1",], // Options
            () => {
            console.log("Value updated!");
            }
        );
        this.addControl("mode", modeControl);

        const vctrl_extrusion = new Vector3DControl(data.extrusion, 'extrusion', () => {
            console.log("extrusion Updated");
        });
        extrusion.addControl(vctrl_extrusion);
        const vctrl_onion = new FloatControl(data.onion, 'Onion', () => {
            console.log("Onion Updated");
        });
        onion.addControl(vctrl_onion);
        const vctrl_inflate = new FloatControl(data.inflate, 'Inflate', () => {
            console.log("Inflate Updated");
        });
        inflate.addControl(vctrl_inflate);
    }

    data(): {} {
        return {};
    }
    serialize(): NeoPrimitive3DData {
        return {
            size: (this.inputs['size']?.control as Vector2DControl).value as [number, number],
            corners: (this.inputs['corners']?.control as Vector4DControl).value as [number, number, number, number],
            thickness: (this.inputs['thickness']?.control as FloatControl).value as [number],
            mode: (this.controls["mode"] as StringSelectionControl).value,
            extrusion: (this.inputs['extrusion']?.control as Vector3DControl).value as [number, number, number],
            onion: (this.inputs['onion']?.control as FloatControl).value as [number],
            inflate: (this.inputs['inflate']?.control as FloatControl).value as [number],
        }
    }
}