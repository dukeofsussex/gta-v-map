import {
  Control,
  type ControlOptions,
  DomEvent,
  DomUtil,
} from 'leaflet';

export default class ColourPicker extends Control {
  #input?: HTMLInputElement;

  #startColour: string;

  onInput?: (colour: string) => void;

  options: ControlOptions = {
    position: 'topleft',
  };

  constructor(colour: string) {
    super();
    this.#startColour = colour;
  }

  onAdd() {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control');
    container.title = 'Edit colour';
    DomEvent.disableScrollPropagation(container);
    DomEvent.disableClickPropagation(container);

    const button = DomUtil.create('a', 'leaflet-control-button', container);

    this.#input = DomUtil.create('input', 'leaflet-colour-picker', button);
    this.#input.setAttribute('type', 'color');
    this.#input.setAttribute('value', this.#startColour);
    DomEvent.on(this.#input, 'input', this.#onInput, this);

    return container;
  }

  onRemove() {
    if (this.#input) {
      DomEvent.off(this.#input, 'input', this.#onInput, this);
    }
  }

  #onInput(evt: Event) {
    if (this.onInput) {
      this.onInput((evt.target as HTMLInputElement).value);
    }
  }
}
