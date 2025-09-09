// Should contain Float Vec2D Vec3D Vec4D
// SplitVec2D SplitVec3D SplitVec4D
// Uniform Float Vec2D Vec3D Vec4D

import { ClassicPreset } from "rete";
import { DataflowNode } from 'rete-engine';
import { FloatControl, Vector2DControl, Vector3DControl, Vector4DControl, VectorControl } from "../controls/vector-control";
import { UniformFloatControl, UniformVec2Control, UniformVec3Control, UniformVec4Control } from "../controls/slider-vector-control";
import { StringControl } from "../controls/string-control";

const exprSocket = new ClassicPreset.Socket("ExprSocket");

type FloatData = {
    value: [number,]
}

type FloatInputs = { value: ClassicPreset.Socket };
type FloatOutputs = { expr: ClassicPreset.Socket };

export class Float extends ClassicPreset.Node<FloatInputs, FloatOutputs> implements DataflowNode {
    static ID = 'Float'
    width = 180

    constructor(data: FloatData) {
        super("Float");
        const value = new ClassicPreset.Input(exprSocket, "value");
        const expr = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("value", value);
        this.addOutput("expr", expr);
        value.addControl(new FloatControl(data.value, '', () => {}));

    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): FloatData {
        const control = this.inputs['value']?.control;
    
        if (control instanceof FloatControl) {
            return {
                value: control.value as [number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected FloatControl but found other control");
    }
}

type Vec2Data = {
    value_1: [number],
    value_2: [number]
}

type Vec2Inputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket };
type Vec2Outputs = { expr: ClassicPreset.Socket };

export class Vec2 extends ClassicPreset.Node<Vec2Inputs, Vec2Outputs> implements DataflowNode {
    static ID = 'Vec2'
    width = 180

    constructor(data: Vec2Data) {
        super("Vec2D");
        const value_1 = new ClassicPreset.Input(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Input(exprSocket, "value_2");
        const expr = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("value_1", value_1);
        this.addInput("value_2", value_2);
        this.addOutput("expr", expr);
        value_1.addControl(new FloatControl(data.value_1, '', () => {}));
        value_2.addControl(new FloatControl(data.value_2, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): Vec2Data {
        const control_1 = this.inputs['value_1']?.control;
        const control_2 = this.inputs['value_2']?.control;
    
        if (control_1 instanceof FloatControl && control_2 instanceof FloatControl) {
            return {
                value_1: control_1.value as [number], // Explicitly cast to the expected type
                value_2: control_2.value as [number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected FloatControl but found other control");
    }
}

type Vec3Data = {
    value_1: [number],
    value_2: [number],
    value_3: [number]
}

type Vec3Inputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket, value_3: ClassicPreset.Socket };
type Vec3Outputs = { expr: ClassicPreset.Socket };

export class Vec3 extends ClassicPreset.Node<Vec3Inputs, Vec3Outputs> implements DataflowNode {
    static ID = 'Vec3'
    width = 180

    constructor(data: Vec3Data) {
        super("Vec3D");
        const value_1 = new ClassicPreset.Input(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Input(exprSocket, "value_2");
        const value_3 = new ClassicPreset.Input(exprSocket, "value_3");
        const expr = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("value_1", value_1);
        this.addInput("value_2", value_2);
        this.addInput("value_3", value_3);
        this.addOutput("expr", expr);
        value_1.addControl(new FloatControl(data.value_1, '', () => {}));
        value_2.addControl(new FloatControl(data.value_2, '', () => {}));
        value_3.addControl(new FloatControl(data.value_3, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): Vec3Data {
        const control_1 = this.inputs['value_1']?.control;
        const control_2 = this.inputs['value_2']?.control;
        const control_3 = this.inputs['value_3']?.control;
    
        if (control_1 instanceof FloatControl && control_2 instanceof FloatControl && control_3 instanceof FloatControl) {
            return {
                value_1: control_1.value as [number], // Explicitly cast to the expected type
                value_2: control_2.value as [number], // Explicitly cast to the expected type
                value_3: control_3.value as [number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected FloatControl but found other control");
    }
}

type Vec4Data = {
    value_1: [number],
    value_2: [number],
    value_3: [number],
    value_4: [number]
}

type Vec4Inputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket, value_3: ClassicPreset.Socket, value_4: ClassicPreset.Socket };
type Vec4Outputs = { expr: ClassicPreset.Socket };

export class Vec4 extends ClassicPreset.Node<Vec4Inputs, Vec4Outputs> implements DataflowNode {
    static ID = 'Vec4'
    width = 180

    constructor(data: Vec4Data) {
        super("Vec4D");
        const value_1 = new ClassicPreset.Input(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Input(exprSocket, "value_2");
        const value_3 = new ClassicPreset.Input(exprSocket, "value_3");
        const value_4 = new ClassicPreset.Input(exprSocket, "value_4");
        const expr = new ClassicPreset.Output(exprSocket, "expr");
        this.addInput("value_1", value_1);
        this.addInput("value_2", value_2);
        this.addInput("value_3", value_3);
        this.addInput("value_4", value_4);
        this.addOutput("expr", expr);
        value_1.addControl(new FloatControl(data.value_1, '', () => {}));
        value_2.addControl(new FloatControl(data.value_2, '', () => {}));
        value_3.addControl(new FloatControl(data.value_3, '', () => {}));
        value_4.addControl(new FloatControl(data.value_4, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): Vec4Data {
        const control_1 = this.inputs['value_1']?.control;
        const control_2 = this.inputs['value_2']?.control;
        const control_3 = this.inputs['value_3']?.control;
        const control_4 = this.inputs['value_4']?.control;
    
        if (control_1 instanceof FloatControl && control_2 instanceof FloatControl && control_3 instanceof FloatControl && control_4 instanceof FloatControl) {
            return {
                value_1: control_1.value as [number], // Explicitly cast to the expected type
                value_2: control_2.value as [number], // Explicitly cast to the expected type
                value_3: control_3.value as [number], // Explicitly cast to the expected type
                value_4: control_4.value as [number] // Explicitly cast to the expected type
            };
        }
        
        throw new Error("Expected FloatControl but found other control");
    }
}

type SplitVec2DData = {
    expr: [number, number]
}

type SplitVec2DInputs = { expr: ClassicPreset.Socket };
type SplitVec2DOutputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket };

export class SplitVec2D extends ClassicPreset.Node<SplitVec2DInputs, SplitVec2DOutputs> implements DataflowNode {
    static ID = 'SplitVec2D'
    width = 180

    constructor(data: SplitVec2DData) {
        super("Split Vec2D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const value_1 = new ClassicPreset.Output(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Output(exprSocket, "value_2");
        this.addInput("expr", expr);
        this.addOutput("value_1", value_1);
        this.addOutput("value_2", value_2);
        expr.addControl(new Vector2DControl(data.expr, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): SplitVec2DData {
        const control = this.inputs['expr']?.control;
    
        if (control instanceof Vector2DControl) {
            return {
                expr: control.value as [number, number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected Vector2DControl but found other control");
    }
}

type SplitVec3DData = {
    expr: [number, number, number]
}

type SplitVec3DInputs = { expr: ClassicPreset.Socket };
type SplitVec3DOutputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket, value_3: ClassicPreset.Socket };

export class SplitVec3D extends ClassicPreset.Node<SplitVec3DInputs, SplitVec3DOutputs> implements DataflowNode {
    static ID = 'SplitVec3D'
    width = 180

    constructor(data: SplitVec3DData) {
        super("Split Vec3D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const value_1 = new ClassicPreset.Output(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Output(exprSocket, "value_2");
        const value_3 = new ClassicPreset.Output(exprSocket, "value_3");
        this.addInput("expr", expr);
        this.addOutput("value_1", value_1);
        this.addOutput("value_2", value_2);
        this.addOutput("value_3", value_3);
        expr.addControl(new Vector3DControl(data.expr, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): SplitVec3DData {
        const control = this.inputs['expr']?.control;
    
        if (control instanceof Vector3DControl) {
            return {
                expr: control.value as [number, number, number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected Vector3DControl but found other control");
    }
}

type SplitVec4DData = {
    expr: [number, number, number, number]
}

type SplitVec4DInputs = { expr: ClassicPreset.Socket };
type SplitVec4DOutputs = { value_1: ClassicPreset.Socket, value_2: ClassicPreset.Socket, value_3: ClassicPreset.Socket, value_4: ClassicPreset.Socket };

export class SplitVec4D extends ClassicPreset.Node<SplitVec4DInputs, SplitVec4DOutputs> implements DataflowNode {
    static ID = 'SplitVec4D'
    width = 180

    constructor(data: SplitVec4DData) {
        super("Split Vec4D");
        const expr = new ClassicPreset.Input(exprSocket, "expr");
        const value_1 = new ClassicPreset.Output(exprSocket, "value_1");
        const value_2 = new ClassicPreset.Output(exprSocket, "value_2");
        const value_3 = new ClassicPreset.Output(exprSocket, "value_3");
        const value_4 = new ClassicPreset.Output(exprSocket, "value_4");
        this.addInput("expr", expr);
        this.addOutput("value_1", value_1);
        this.addOutput("value_2", value_2);
        this.addOutput("value_3", value_3);
        this.addOutput("value_4", value_4);
        expr.addControl(new Vector4DControl(data.expr, '', () => {}));
    }
    
    data(): {} {
        return {}; // ideally this could actually forward the data. 
    }
    serialize(): SplitVec4DData {
        const control = this.inputs['expr']?.control;
    
        if (control instanceof Vector4DControl) {
            return {
                expr: control.value as [number, number, number, number] // Explicitly cast to the expected type
            };
        }
    
        throw new Error("Expected Vector4DControl but found other control");
    }
}


type UniformFloatData = {
    min: [number];
    max: [number];
    value: [number];
    name: string
};
  
type UniformFloatInputs = { min: ClassicPreset.Socket; max: ClassicPreset.Socket; };
type UniformFloatOutputs = { expr: ClassicPreset.Socket };

export class UniformFloat extends ClassicPreset.Node<UniformFloatInputs, UniformFloatOutputs> implements DataflowNode {
static ID = "UniformFloat";
width = 180;
// height = 345;

constructor(data: UniformFloatData, uniformFunction?: any) {
    super("Uniform Float");

    // Create a default uniformFunction if none is provided
    if (!uniformFunction) {
        uniformFunction = (value: [number]) => {
            console.log("Uniform Float Updated:", value);
        };
    }

    // Create inputs
    const minInput = new ClassicPreset.Input(exprSocket, "min");
    const maxInput = new ClassicPreset.Input(exprSocket, "max");
    
    const nameControl = new StringControl(data.name, "Name", () => {});
    const valueControl = new UniformFloatControl(
    data.value,
    "",
    { min: data.min[0], max: data.max[0] },
    uniformFunction
    );

    // Create output
    const valueOutput = new ClassicPreset.Output(exprSocket, "expr");

    // Add controls to inputs
    
    this.addControl("name", nameControl);
    this.addControl("value", valueControl);

    // Add inputs and outputs to the node
    this.addInput("min", minInput);
    this.addInput("max", maxInput);
    minInput.addControl(new FloatControl(data.min, "Min", () => {}));
    maxInput.addControl(new FloatControl(data.max, "Max", () => {}));
    this.addOutput("expr", valueOutput);
}

data(): UniformFloatData {
    // Return the current state of the node
    return this.serialize();
}

serialize(): UniformFloatData {
    const controlMin = this.inputs["min"]?.control;
    const controlMax = this.inputs["max"]?.control;
    const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
    const valueControl = this.controls["value"] as UniformFloatControl;

    if (controlMin instanceof FloatControl && controlMax instanceof FloatControl && valueControl instanceof UniformFloatControl) {
    return {
        min: controlMin.value as [number],
        max: controlMax.value as [number],
        value: valueControl.value as [number],
        name: nameControl.value as string,
    };
    }

    throw new Error("Expected FloatControl and UniformFloatControl but found other controls");
}
}
type UniformVec2Data = {
    min: [number, number];
    max: [number, number];
    value: [number, number];
    name: string;
};

type UniformVec2Inputs = { min: ClassicPreset.Socket; max: ClassicPreset.Socket };
type UniformVec2Outputs = { expr: ClassicPreset.Socket };

export class UniformVec2 extends ClassicPreset.Node<UniformVec2Inputs, UniformVec2Outputs> implements DataflowNode {
    static ID = "UniformVec2";
    width = 180;
    
    constructor(data: UniformVec2Data, uniformFunction?: any) {
        super("Uniform Vec2");
    
        if (!uniformFunction) {
            uniformFunction = (value: [number, number]) => {
                console.log("Uniform Vec2 Updated:", value);
            };
        }
        // Create and add controls directly to the node
        const minInput = new ClassicPreset.Input(exprSocket, "min");
        const maxInput = new ClassicPreset.Input(exprSocket, "max");

        const minControl = new Vector2DControl(data.min, "Min", () => {});
        const maxControl = new Vector2DControl(data.max, "Max", () => {});

        const nameControl = new StringControl(data.name, "Name", () => {});
        
        const valueControl = new UniformVec2Control(
            data.value,
            "",
            [
                { min: data.min[0], max: data.max[0] },
                { min: data.min[1], max: data.max[1] },
            ],
            uniformFunction
        );
    
        // Add controls directly to the node
        this.addInput("min", minInput);
        this.addInput("max", maxInput);
        minInput.addControl(minControl);
        maxInput.addControl(maxControl);
        this.addControl("name", nameControl);
        this.addControl("value", valueControl);
    
        // Create and add output socket
        const valueOutput = new ClassicPreset.Output(exprSocket, "expr");
        this.addOutput("expr", valueOutput);
    }
    
    data(): {} {
        return {};
    }
    
    serialize(): UniformVec2Data {
        const controlMin = this.inputs["min"]?.control;
        const controlMax = this.inputs["max"]?.control;
        const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
        const valueControl = this.controls["value"] as UniformVec2Control;
    
        if (controlMin instanceof VectorControl && controlMax instanceof VectorControl && valueControl instanceof UniformVec2Control) {
            return {
                min: controlMin.value as [number, number],
                max: controlMax.value as [number, number],
                value: valueControl.value as [number, number],
                name: nameControl.value as string,
            };
        }
        throw new Error("Expected FloatControl and UniformFloatControl but found other controls");
    }
}

type UniformVec3Data = {
    min: [number, number, number];
    max: [number, number, number];
    value: [number, number, number];
    name: string;
};

type UniformVec3Inputs = { min: ClassicPreset.Socket; max: ClassicPreset.Socket };
type UniformVec3Outputs = { expr: ClassicPreset.Socket };

export class UniformVec3 extends ClassicPreset.Node<UniformVec3Inputs, UniformVec3Outputs> implements DataflowNode {
    static ID = "UniformVec3";
    width = 180;
    
    constructor(data: UniformVec3Data, uniformFunction?: any) {
        super("Uniform Vec3");

        if (!uniformFunction) {
            uniformFunction = (value: [number, number, number]) => {
                console.log("Uniform Vec3 Updated:", value);
            };
        }
    
        // Create and add controls directly to the node
        const minInput = new ClassicPreset.Input(exprSocket, "min");
        const maxInput = new ClassicPreset.Input(exprSocket, "max");

        const minControl = new Vector3DControl(data.min, "Min", () => {});
        const maxControl = new Vector3DControl(data.max, "Max", () => {});

        const nameControl = new StringControl(data.name, "Name", () => {});

        const valueControl = new UniformVec3Control(
            data.value,
            "",
            [
                { min: data.min[0], max: data.max[0] },
                { min: data.min[1], max: data.max[1] },
                { min: data.min[2], max: data.max[2] },
            ],
            uniformFunction
        );
    
        // Add controls directly to the node
        this.addInput("min", minInput);
        this.addInput("max", maxInput);
        minInput.addControl(minControl);
        maxInput.addControl(maxControl);
        this.addControl("name", nameControl);
        this.addControl("value", valueControl);

        // Create and add output socket
        const valueOutput = new ClassicPreset.Output(exprSocket, "expr");
        this.addOutput("expr", valueOutput);
    }

    data(): {} {
        return {};
    }

    serialize(): UniformVec3Data {
        const controlMin = this.inputs["min"]?.control;
        const controlMax = this.inputs["max"]?.control;
        const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
        const valueControl = this.controls["value"] as UniformVec3Control;

        if (controlMin instanceof VectorControl && controlMax instanceof VectorControl && valueControl instanceof UniformVec3Control) {
            return {
                min: controlMin.value as [number, number, number],
                max: controlMax.value as [number, number, number],
                value: valueControl.value as [number, number, number],
                name: nameControl.value as string,
            };
        }

    throw new Error("Expected FloatControl and UniformFloatControl but found other controls");
    }
}


type UniformVec4Data = {
    min: [number, number, number, number];
    max: [number, number, number, number];
    value: [number, number, number, number];
    name: string;
};
type UniformVec4Inputs = { min: ClassicPreset.Socket; max: ClassicPreset.Socket };
type UniformVec4Outputs = { expr: ClassicPreset.Socket };
export class UniformVec4 extends ClassicPreset.Node<UniformVec4Inputs, UniformVec4Outputs> implements DataflowNode {
    static ID = "UniformVec4";
    width = 180;

    constructor(data: UniformVec4Data, uniformFunction?: any) {
        super("Uniform Vec4");

        if (!uniformFunction) {
            uniformFunction = (value: [number, number, number, number]) => {
                console.log("Uniform Vec4 Updated:", value);
            };
        }

        // Create and add controls directly to the node
        const minInput = new ClassicPreset.Input(exprSocket, "min");
        const maxInput = new ClassicPreset.Input(exprSocket, "max");

        const minControl = new Vector4DControl(data.min, "Min", () => {});
        const maxControl = new Vector4DControl(data.max, "Max", () => {});

        const nameControl = new StringControl(data.name, "Name", () => {});

        const valueControl = new UniformVec4Control(
            data.value,
            "",
            [
                { min: data.min[0], max: data.max[0] },
                { min: data.min[1], max: data.max[1] },
                { min: data.min[2], max: data.max[2] },
                { min: data.min[3], max: data.max[3] },
            ],
            uniformFunction
        );

        // Add controls directly to the node
        this.addInput("min", minInput);
        this.addInput("max", maxInput);
        minInput.addControl(minControl);
        maxInput.addControl(maxControl);
        this.addControl("name", nameControl);
        this.addControl("value", valueControl);

        // Create and add output socket
        const valueOutput = new ClassicPreset.Output(exprSocket, "expr");
        this.addOutput("expr", valueOutput);
    }
    data(): {} {
        return {};
    }
    serialize(): UniformVec4Data {
        const controlMin = this.inputs["min"]?.control;
        const controlMax = this.inputs["max"]?.control;
        const nameControl = this.controls["name"] as ClassicPreset.InputControl<"text">;
        const valueControl = this.controls["value"] as UniformVec4Control;

        if (controlMin instanceof VectorControl && controlMax instanceof VectorControl && valueControl instanceof UniformVec4Control) {
            return {
                min: controlMin.value as [number, number, number, number],
                max: controlMax.value as [number, number, number, number],
                value: valueControl.value as [number, number, number, number],
                name: nameControl.value as string,
            };
        }

        throw new Error("Expected FloatControl and UniformFloatControl but found other controls");
    }
}