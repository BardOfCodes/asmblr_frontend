import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { Vector3DControl } from "../controls/vector-control";

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