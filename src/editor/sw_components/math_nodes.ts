import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { StringSelectionControl } from '../controls/list-control'

const exprSocket = new ClassicPreset.Socket("ExprSocket");

type BinaryOperatorData = {
    operator: string,
}
  
type BinaryOperatorDataInputs = { expr1: ClassicPreset.Socket, expr2: ClassicPreset.Socket };
type BinaryOperatorDataOutputs = { expr: ClassicPreset.Socket };
  
export class BinaryOperator extends ClassicPreset.Node<BinaryOperatorDataInputs, BinaryOperatorDataOutputs> implements DataflowNode {
    static ID = 'BinaryOperator'
    width = 200

constructor(data: BinaryOperatorData) {
    super("BinaryOperator");
    const expr1 = new ClassicPreset.Input(exprSocket, "expr1");
    const expr2 = new ClassicPreset.Input(exprSocket, "expr2");
    const expr_out = new ClassicPreset.Output(exprSocket, "expr");
    this.addInput("expr1", expr1);
    this.addInput("expr2", expr2);
    this.addOutput("expr", expr_out);

    const stringControl = new StringSelectionControl(
        data.operator, // Initial value
        "Operation", // Label
        ["ADD", "SUB", "MUL", "DIV",], // Options
        () => {
          console.log("Value updated!");
        }
      );
    this.addControl("operator", stringControl);
}

    data(): {} {
    return {};
    }
    serialize(): BinaryOperatorData {
        const control = this.controls["operator"] as StringSelectionControl;
        return {
            operator: control.value,
        };
    }
}

type UnaryOperatorData = {
    operator: string,
}

type UnaryOperatorDataInputs = { expr: ClassicPreset.Socket };
type UnaryOperatorDataOutputs = { expr: ClassicPreset.Socket };

export class UnaryOperator extends ClassicPreset.Node<UnaryOperatorDataInputs, UnaryOperatorDataOutputs> implements DataflowNode {
    static ID = 'UnaryOperator'
    width = 200

    constructor(data: UnaryOperatorData) {
        super("UnaryOperator");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addOutput("expr", expr_out);

        const stringControl = new StringSelectionControl(
            data.operator, // Initial value
            "Operation", // Label
            ["NEG", "SIN", "COS", "TAN",], // Options
            () => {
              console.log("Value updated!");
            }
          );
        this.addControl("operator", stringControl);
    }

    data(): {} {
        return {};
    }
    serialize(): UnaryOperatorData {
        const control = this.controls["operator"] as StringSelectionControl;
        return {
            operator: control.value,
        };
    }
}

type VectorOperatorData = {
    operator: string,
}

type VectorOperatorDataInputs = { expr: ClassicPreset.Socket };
type VectorOperatorDataOutputs = { expr: ClassicPreset.Socket };

export class VectorOperator extends ClassicPreset.Node<VectorOperatorDataInputs, VectorOperatorDataOutputs> implements DataflowNode {
    static ID = 'VectorOperator'
    width = 200

    constructor(data: VectorOperatorData) {
        super("VectorOperator");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const expr_out = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("expr", expr);
        this.addOutput("expr", expr_out);

        const stringControl = new StringSelectionControl(
            data.operator, // Initial value
            "Operation", // Label
            ["NEG", "NORMALIZE", "NORM"], // Options
            () => {
              console.log("Value updated!");
            }
          );
        this.addControl("operator", stringControl);
    }

    data(): {} {
        return {};
    }
    serialize(): VectorOperatorData {
        const control = this.controls["operator"] as StringSelectionControl;
        return {
            operator: control.value,
        };
    }
}


