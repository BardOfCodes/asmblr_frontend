import { ClassicPreset } from "rete";
import { VectorControl, FloatControl, Vector2DControl, Vector3DControl, Vector4DControl } from "./vector-control";

type VectorType = "Float" | "Vector2D" | "Vector3D" | "Vector4D";

export class ListControl extends ClassicPreset.Control {
  value: Array<number[] | number>; // List of Float or Vector values
  label: string;
  vectorType: VectorType; // Specifies the type of elements in the list
  onUpdate: () => void;

  constructor(
    label: string,
    vectorType: VectorType,
    onUpdate: () => void
  ) {
    super();
    this.value = []; // Start with an empty list
    this.label = label;
    this.vectorType = vectorType;
    this.onUpdate = onUpdate;
  }

  addItem() {
    // Add a default vector of the specified type
    if (this.vectorType === "Float") {
      this.value.push(0);
    } else if (this.vectorType === "Vector2D") {
      this.value.push([0, 0]);
    } else if (this.vectorType === "Vector3D") {
      this.value.push([0, 0, 0]);
    } else if (this.vectorType === "Vector4D") {
      this.value.push([0, 0, 0, 0]);
    }
    this.onUpdate();
  }

  removeItem(index: number) {
    this.value.splice(index, 1); // Remove the vector at the specified index
    this.onUpdate();
  }

  updateItem(index: number, newValue: number[] | number) {
    this.value[index] = newValue; // Update the value at the specified index
    this.onUpdate();
  }
}