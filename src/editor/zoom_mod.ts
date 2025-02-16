import { Zoom } from 'rete-area-plugin'; // Adjust the path as necessary

export type OnZoom = (delta: number, ox: number, oy: number, source?: 'wheel' | 'touch' | 'dblclick') => void;

export class ZoomWithoutDblClick extends Zoom {
  constructor(intensity: number) {
    super(intensity);
  }

  public initialize(container: HTMLElement, element: HTMLElement, onzoom: OnZoom) {
    this.container = container;
    this.element = element;
    this.onzoom = onzoom;

    // Attach all events except double-click
    this.container.addEventListener('wheel', this.wheel);
    this.container.addEventListener('pointerdown', this.down);

    // Do not attach the dblclick event listener
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    window.addEventListener('pointercancel', this.up);
  }
  // Override the dblclick method to prevent default behavior
  protected dblclick(e: MouseEvent) {
    // Do nothing or optionally log/track if needed
    console.log('Double-click zooming is disabled.');
  }
}