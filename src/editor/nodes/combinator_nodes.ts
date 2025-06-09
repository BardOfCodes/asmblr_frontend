import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';


const exprSocket = new ClassicPreset.Socket("ExprSocket");

type ComplementInputs = { expr: ClassicPreset.Socket };

type ComplementOutputs = { expr: ClassicPreset.Socket };

export class Complement extends ClassicPreset.Node<ComplementInputs, ComplementOutputs> implements DataflowNode {
  static ID = 'Complement'
  width = 180
  height = 150

  constructor() {
      super("Complement");
      const expr = new ClassicPreset.Input(exprSocket, "expr");
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addOutput("expr", expr_out);
    }

    data(): {} {
      return {};
    }
    serialize(): {} {
      return {
      }
    }
}


type DifferenceInputs = { expr1: ClassicPreset.Socket, expr2: ClassicPreset.Socket };

type DifferenceOutputs = { expr: ClassicPreset.Socket };

export class Difference extends ClassicPreset.Node<DifferenceInputs, DifferenceOutputs> implements DataflowNode {
  static ID = 'Difference'
  width = 180
  height = 160

  constructor() {
      super("Difference");
      const expr1 = new ClassicPreset.Input(exprSocket, "expr1");
      const expr2 = new ClassicPreset.Input(exprSocket, "expr2");
      const expr = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr1", expr1);
      this.addInput("expr2", expr2);
      this.addOutput("expr", expr);
    }

    data(): {} {
      return {};
    }
    serialize(): {} {
      return {
      }
    }
}


type UnionInputs = { expr: ClassicPreset.Socket };

type UnionOutputs = { expr: ClassicPreset.Socket };

export class Union extends ClassicPreset.Node<UnionInputs, UnionOutputs> implements DataflowNode {
  static ID = 'Union'
  width = 180

  constructor() {
      super("Union");
      const expr = new ClassicPreset.Input(exprSocket, "expr", true);
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addOutput("expr", expr_out);

    }

    data(): {} {
      return {};
    }
    serialize(): {} {
      return {
      }
    }
}


type IntersectionInputs = { expr: ClassicPreset.Socket };

type IntersectionOutputs = { expr: ClassicPreset.Socket };

export class Intersection extends ClassicPreset.Node<IntersectionInputs, IntersectionOutputs> implements DataflowNode {
  static ID = 'Intersection'
  width = 180

  constructor() {
      super("Intersection");
      const expr = new ClassicPreset.Input(exprSocket, "expr", true);
      const expr_out = new ClassicPreset.Output(exprSocket, "expr");
      this.addInput("expr", expr);
      this.addOutput("expr", expr_out);

    }

    data(): {} {
      return {};
    }
    serialize(): {} {
      return {
      }
    }
}

