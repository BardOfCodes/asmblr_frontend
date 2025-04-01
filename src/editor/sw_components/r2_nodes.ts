import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl, Vector2DControl } from "../controls/vector-control";
import { ListControl } from "../controls/dynamic-list";
import { List } from "lodash";

const exprSocket = new ClassicPreset.Socket("ExprSocket");

type EulerRotate2DData = {
    param: [number],
}
  
type EulerRotate2DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type EulerRotate2DOutputs = { expr: ClassicPreset.Socket };
  
export class EulerRotate2D extends ClassicPreset.Node<EulerRotate2DInputs, EulerRotate2DOutputs> implements DataflowNode {
static ID = 'EulerRotate2D'
width = 180

constructor(data: EulerRotate2DData) {
    super("Euler Rotate 2D");
    const expr = new ClassicPreset.Input(exprSocket, "expr");
    const param = new ClassicPreset.Input(exprSocket, "param");
    const expr_out = new ClassicPreset.Output(exprSocket, "expr");
    this.addInput("expr", expr);
    this.addInput("param", param);
    this.addOutput("expr", expr_out);
    
    const vctrl = new FloatControl(data.param, '', () => {
        console.log("Theta Updated");
    });
    param.addControl(vctrl);

    }

    data(): {} {
    return {};
    }
    serialize(): EulerRotate2DData {
    return {
        param: (this.inputs['param']?.control as FloatControl).value as [number]
    }
    }
}

type Translate2DData = {
    param: [number, number],
  }

type Translate2DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type Translate2DOutputs = { expr: ClassicPreset.Socket };

export class Translate2D extends ClassicPreset.Node<Translate2DInputs, Translate2DOutputs> implements DataflowNode {
  static ID = 'Translate2D'
  width = 180

  constructor(data: Translate2DData) {
      super("Translate 2D");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const param = new ClassicPreset.Input(exprSocket, "param");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addInput("param", param);
      this.addOutput("expr", expr_out);
      
      const vctrl = new Vector2DControl(data.param, '', () => {
          console.log("Translation Updated");
      });
      param.addControl(vctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Translate2DData {
      return {
          param: (this.inputs['param']?.control as Vector2DControl).value as [number, number]
      }
    }
}

type Scale2DData = {
    param: [number, number],
  }

type Scale2DInputs = { expr: ClassicPreset.Socket, param: ClassicPreset.Socket };
type Scale2DOutputs = { expr: ClassicPreset.Socket };

export class Scale2D extends ClassicPreset.Node<Scale2DInputs, Scale2DOutputs> implements DataflowNode {
  static ID = 'Scale2D'
  width = 180

  constructor(data: Scale2DData) {
      super("Scale 2D");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const param = new ClassicPreset.Input(exprSocket, "param");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addInput("param", param);
      this.addOutput("expr", expr_out);
      
      const vctrl = new Vector2DControl(data.param, '', () => {
          console.log("Scale Updated");
      });
      param.addControl(vctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Scale2DData {
      return {
          param: (this.inputs['param']?.control as Vector2DControl).value as [number, number]
      }
    }
}

type Rectangle2DData = {
    size: [number, number],
}

type Rectangle2DInputs = { size: ClassicPreset.Socket };
type Rectangle2DOutputs = { expr: ClassicPreset.Socket };

export class Rectangle2D extends ClassicPreset.Node<Rectangle2DInputs, Rectangle2DOutputs> implements DataflowNode {
  static ID = 'Rectangle2D'
  width = 180

  constructor(data: Rectangle2DData) {
      super("Rectangle 2D");
      const size = new ClassicPreset.Input(exprSocket, "size");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("size", size);
      this.addOutput("expr", expr_out);
      
      const vctrl = new Vector2DControl(data.size, '', () => {
          console.log("Size Updated");
      });
      size.addControl(vctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Rectangle2DData {
      return {
          size: (this.inputs['size']?.control as Vector2DControl).value as [number, number]
      }
    }
}

type Trapezoid2DData = {
    r1: [number],
    r2: [number],
    height: [number],
}

type Trapezoid2DInputs = { r1: ClassicPreset.Socket, r2: ClassicPreset.Socket, height: ClassicPreset.Socket };
type Trapezoid2DOutputs = { expr: ClassicPreset.Socket };

export class Trapezoid2D extends ClassicPreset.Node<Trapezoid2DInputs, Trapezoid2DOutputs> implements DataflowNode {
  static ID = 'Trapezoid2D'
  width = 180

  constructor(data: Trapezoid2DData) {
      super("Trapezoid 2D");
      const r1 = new ClassicPreset.Input(exprSocket, "r1");
      const r2 = new ClassicPreset.Input(exprSocket, "r2");
      const height = new ClassicPreset.Input(exprSocket, "height");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("r1", r1);
      this.addInput("r2", r2);
      this.addInput("height", height);
      this.addOutput("expr", expr_out);
      
      const r1ctrl = new FloatControl(data.r1, 'r1', () => {
          console.log("R1 Updated");
      });
      r1.addControl(r1ctrl);

      const r2ctrl = new FloatControl(data.r2, 'r2', () => {
          console.log("R2 Updated");
      });
      r2.addControl(r2ctrl);

      const heightctrl = new FloatControl(data.height, 'height', () => {
          console.log("Height Updated");
      });
      height.addControl(heightctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Trapezoid2DData {
      return {
          r1: (this.inputs['r1']?.control as FloatControl).value as [number],
          r2: (this.inputs['r2']?.control as FloatControl).value as [number],
          height: (this.inputs['height']?.control as FloatControl).value as [number]
      }
    }
}

type Dilate2DData = {
    k: [number],
}

type Dilate2DInputs = { expr: ClassicPreset.Socket, k: ClassicPreset.Socket };
type Dilate2DOutputs = { expr: ClassicPreset.Socket };

export class Dilate2D extends ClassicPreset.Node<Dilate2DInputs, Dilate2DOutputs> implements DataflowNode {
  static ID = 'Dilate2D'
  width = 180

  constructor(data: Dilate2DData) {
      super("Dilate 2D");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const k = new ClassicPreset.Input(exprSocket, "k");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addInput("k", k);
      this.addOutput("expr", expr_out);
      
      const kctrl = new FloatControl(data.k, '', () => {
          console.log("K Updated");
      });
      k.addControl(kctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Dilate2DData {
      return {
          k: (this.inputs['k']?.control as FloatControl).value as [number]
      }
    }
}

type PolyLine2DData = {
    points: [number, number, number][],
}

type PolyLine2DInputs = { points: ClassicPreset.Socket };
type PolyLine2DOutputs = { expr: ClassicPreset.Socket };

export class PolyLine2D extends ClassicPreset.Node<PolyLine2DInputs, PolyLine2DOutputs> implements DataflowNode {
  static ID = 'PolyLine2D'
  width = 340

  constructor(data: PolyLine2DData) {
      super("PolyLine 2D");
      const points = new ClassicPreset.Input(exprSocket, "points");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("points", points);
      this.addOutput("expr", expr_out);

      const listControl = new ListControl(
        "Points (X, Y, Bulge)", // Label
        "Vector3D", // Type of the list (Float, Vector2D, etc.)
        () => {
          console.log("List updated!");
        }
      );
      listControl.value = data.points;
      
      // Add the control to a node
      points.addControl(listControl);

    }

    data(): {} {
      return {};
    }
    serialize(): PolyLine2DData {
        const control = this.inputs['points']?.control as ListControl;
      return {
        points: control.value as [number, number, number][],
      }
    }
    clone() {

      return new PolyLine2D({ points: [] });  // Fallback
    }
}
type Circle2DData = {
    radius: [number],
}

type Circle2DInputs = { radius: ClassicPreset.Socket };
type Circle2DOutputs = { expr: ClassicPreset.Socket };

export class Circle2D extends ClassicPreset.Node<Circle2DInputs, Circle2DOutputs> implements DataflowNode {
  static ID = 'Circle2D'
  width = 180

  constructor(data: Circle2DData) {
      super("Circle 2D");
      const radius = new ClassicPreset.Input(exprSocket, "radius");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("radius", radius);
      this.addOutput("expr", expr_out);
      
      const vctrl = new FloatControl(data.radius, '', () => {
          console.log("Radius Updated");
      });
      radius.addControl(vctrl);

    }

    data(): {} {
      return {};
    }
    serialize(): Circle2DData {
      return {
          radius: (this.inputs['radius']?.control as FloatControl).value as [number]
      }
    }
}

export class NullExpression2D extends ClassicPreset.Node<{}, { expr: ClassicPreset.Socket }> implements DataflowNode {
  static ID = 'NullExpression2D'
  width = 180

  constructor() {
      super("Null Expression 2D");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return {};
    }
    serialize(): {} {
      return {}
    }
}