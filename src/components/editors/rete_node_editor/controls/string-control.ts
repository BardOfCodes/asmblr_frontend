import { ClassicPreset } from "rete";


export class StringControl extends ClassicPreset.Control {
    value: string;
    label: string;
  
    constructor(initial: string, label: string, public onUpdate: () => void) {
      super();
      this.value = initial;
      this.label = label;
    }
  
    setValue(value: string) {
      this.value = value;
      this.onUpdate();
    }
  
  }
  