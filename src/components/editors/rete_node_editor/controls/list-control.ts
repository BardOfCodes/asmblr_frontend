import { ClassicPreset } from "rete";

export class StringSelectionControl extends ClassicPreset.Control {
  value: string; // Current selected value
  label: string;
  options: string[]; // List of selectable options
  onUpdate: () => void;

  constructor(initial: string, label: string, options: string[], onUpdate: () => void) {
    super();
    this.value = initial;
    this.label = label;
    this.options = options;
    this.onUpdate = onUpdate;
  }

  setValue(value: string) {
    this.value = value;
    this.onUpdate();
  }
}