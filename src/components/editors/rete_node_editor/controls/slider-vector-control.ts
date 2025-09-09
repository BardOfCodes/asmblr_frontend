import { ClassicPreset } from "rete";

type SliderVectorRange = { min: number; max: number };

export class SliderVectorControl extends ClassicPreset.Control {
  value: number[];
  label: string;
  range: SliderVectorRange[];

  constructor(
    initial: number[],
    label: string,
    range: SliderVectorRange[],
    public onUpdate: (value: number[]) => void
  ) {
    super();
    this.value = initial;
    this.label = label;
    this.range = range;

    if (range.length !== initial.length) {
      throw new Error("Range length must match value length");
    }
  }

  setValue(value: number[]) {
    this.value = value;
    this.onUpdate(value);
  }

  updateDimension(index: number, newValue: number) {
    this.value[index] = newValue;
    this.onUpdate(this.value);
  }
}

export class UniformFloatControl extends SliderVectorControl {
    constructor(initial: [number], label: string, range: SliderVectorRange, onUpdate: (value: number[]) => void) {
      super(initial, label, [range], onUpdate);
    }
  }
  
  export class UniformVec2Control extends SliderVectorControl {
    constructor(initial: [number, number], label: string, range: [SliderVectorRange, SliderVectorRange], onUpdate: (value: number[]) => void) {
      super(initial, label, range, onUpdate);
    }
  }
  
  export class UniformVec3Control extends SliderVectorControl {
    constructor(
      initial: [number, number, number],
      label: string,
      range: [SliderVectorRange, SliderVectorRange, SliderVectorRange],
      onUpdate: (value: number[]) => void
    ) {
      super(initial, label, range, onUpdate);
    }
  }

  export class UniformVec4Control extends SliderVectorControl {
    constructor(
      initial: [number, number, number, number],
      label: string,
      range: [SliderVectorRange, SliderVectorRange, SliderVectorRange, SliderVectorRange],
      onUpdate: (value: number[]) => void
    ) {
      super(initial, label, range, onUpdate);
    }
  }