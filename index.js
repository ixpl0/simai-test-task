class Component {
  #template;
  #displayParams;
  #modifiers;
  #textContent;
  #events;

  constructor({
    template = '<div></div>',
    displayParams = {},
    modifiers = [],
    textContent,
    events = {},
  }) {
    this.#template = template;
    this.#displayParams = displayParams;
    this.#modifiers = modifiers;
    this.#textContent = textContent;
    this.#events = events;
  }

  #createElementFromTemplate() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.#template, 'text/html');

    return doc.body.firstChild;
  }

  #applyDisplayParams(element) {
    Object.entries(this.#displayParams).forEach(([param, value]) => {
      element.style[param] = value;
    });
  }

  #applyModifiers(element) {
    this.#modifiers.forEach((modifier) => modifier(element));
  }

  #applyTextContent(element) {
    if (this.#textContent) {
      element.textContent = this.#textContent;
    }
  }

  #applyEvents(element) {
    Object.entries(this.#events).forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });
  }

  create() {
    const element = this.#createElementFromTemplate();

    this.#applyDisplayParams(element);
    this.#applyModifiers(element);
    this.#applyTextContent(element);
    this.#applyEvents(element);

    return element;
  }
}

// Пример использования
const button = new Component({
  template: '<button type="button" data-name="red-button"></button>',
  displayParams: {
    backgroundColor: 'orangered',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  modifiers: [
    (element) => element.classList.add('large'),
    (element) => {
      element.style.padding = '8px 16px';
      element.style.borderRadius = '5px';
    },
  ],
  textContent: 'Нажми меня!',
  events: {
    click: () => alert('Кнопка нажата!')
  }
});

document.body.append(button.create());
