import { ClassicPreset } from "rete";


export class VectorControl extends ClassicPreset.Control {
  value: number[];
  label: string;

  constructor(initial: number[], label: string, public onUpdate: () => void) {
    super();
    this.value = initial;
    this.label = label;
  }

  setValue(value: number[]) {
    this.value = value;
    this.onUpdate();
  }

  updateDimension(index: number, newValue: number) {
    this.value[index] = newValue;
    this.onUpdate();
  }
}

export class FloatControl extends VectorControl {
  constructor(initial: [number,], label: string, onUpdate: () => void) {
    super(initial, label, onUpdate);
  }
}
export class Vector2DControl extends VectorControl {
  constructor(initial: [number, number], label: string, onUpdate: () => void) {
    super(initial, label, onUpdate);
  }
}

export class Vector3DControl extends VectorControl {
  constructor(initial: [number, number, number], label: string, onUpdate: () => void) {
    super(initial, label, onUpdate);
  }
}

export class Vector4DControl extends VectorControl {
  constructor(initial: [number, number, number, number], label: string, onUpdate: () => void) {
    super(initial, label, onUpdate);
  }
}