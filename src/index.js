'Use strict';

import './styles/main.scss';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.classList.add('app');
  document.body.prepend(app);

  const title = document.createElement('h1');
  title.textContent = 'Virtual Keyboard'.toUpperCase();
  title.classList.add('title');
  app.prepend(title);

  const textField = document.createElement('textarea');
  textField.classList.add('textField');
  textField.rows = '7';
  title.after(textField);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  textField.after(keyboard);

  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard__container');
  keyboard.prepend(keyboardContainer);

  const createRow = () => {
    const row = document.createElement('div');
    row.classList.add('keyboard__row', 'row');

    return row;
  };

  class Key {
    constructor(key, code, isShift = false) {
      this.key = key;
      this.code = code;
      this.isShift = isShift;
    }

    render = (parent) => {
      const element = document.createElement('div');
      element.classList.add('keyboard__key', 'key', this.code);
      if (this.key === 'Backspace' || this.key === 'Shift' || this.key === 'Enter' || this.key === 'CapsLock') {
        element.classList.add('keyboard__key_long');
      }
      const lang = document.createElement('div');
      lang.classList.add('en');
      element.append(lang);

      const textUp = document.createElement('span');
      textUp.classList.add('keyUp', 'hidden');
      textUp.innerHTML = this.key;
      lang.append(textUp);

      const textDown = document.createElement('span');
      textDown.classList.add('keyDown');
      textDown.innerHTML = this.key;
      lang.append(textDown);

      parent.append(element);
    };
  }

  const arrKeys = [
    [
      { code: 'Backquote', key: '`' },
      { code: 'Digit1', key: '1' },
      { code: 'Digit2', key: '2' },
      { code: 'Digit3', key: '3' },
      { code: 'Digit4', key: '4' },
      { code: 'Digit5', key: '5' },
      { code: 'Digit6', key: '6' },
      { code: 'Digit7', key: '7' },
      { code: 'Digit8', key: '8' },
      { code: 'Digit9', key: '9' },
      { code: 'Digit0', key: '0' },
      { code: 'Minus', key: '-' },
      { code: 'Equal', key: '=' },
      { code: 'Backspace', key: 'Backspace' },
    ],
    [
      { code: 'Tab', key: 'Tab' },
      { code: 'KeyQ', key: 'q' },
      { code: 'KeyW', key: 'w' },
      { code: 'KeyE', key: 'e' },
      { code: 'KeyR', key: 'r' },
      { code: 'KeyT', key: 't' },
      { code: 'KeyY', key: 'y' },
      { code: 'KeyU', key: 'u' },
      { code: 'KeyI', key: 'i' },
      { code: 'KeyO', key: 'o' },
      { code: 'KeyP', key: 'p' },
      { code: 'BracketLeft', key: '[' },
      { code: 'BracketRight', key: ']' },
      { code: 'Backslash', key: '\\' },
      { code: 'Delete', key: 'Delete' },
    ],
    [
      { code: 'CapsLock', key: 'CapsLock' },
      { code: 'KeyA', key: 'a' },
      { code: 'KeyS', key: 's' },
      { code: 'KeyD', key: 'd' },
      { code: 'KeyF', key: 'f' },
      { code: 'KeyG', key: 'g' },
      { code: 'KeyH', key: 'h' },
      { code: 'KeyJ', key: 'j' },
      { code: 'KeyK', key: 'k' },
      { code: 'KeyL', key: 'l' },
      { code: 'Semicolon', key: ';' },
      { code: 'Quote', key: "'" },
      { code: 'Enter', key: 'Enter' },
    ],

    [
      { code: 'ShiftLeft', key: 'Shift' },
      { code: 'KeyZ', key: 'z' },
      { code: 'KeyX', key: 'x' },
      { code: 'KeyC', key: 'c' },
      { code: 'KeyV', key: 'v' },
      { code: 'KeyB', key: 'b' },
      { code: 'KeyN', key: 'n' },
      { code: 'KeyM', key: 'm' },
      { code: 'Comma', key: ',' },
      { code: 'Period', key: '.' },
      { code: 'Slash', key: '/' },
      { code: 'ArrowUp', key: '&#8593' },
      { code: 'ShiftRight', key: 'Shift' },
    ],
    [
      { code: 'ControlLeft', key: 'Ctrl' },
      { code: 'MetaLeft', key: 'Meta' },
      { code: 'AltLeft', key: 'Alt' },
      { code: 'Space', key: ' ' },
      { code: 'AltRight', key: 'Alt' },
      { code: 'ArrowLeft', key: '&#8592' },
      { code: 'ArrowDown', key: '&#8595' },
      { code: 'ArrowRight', key: '&#8594' },
      { code: 'ControlRight', key: 'Ctrl' },
    ],
  ];

  function initKeyboard() {
    arrKeys.forEach((item) => {
      const row = createRow();
      keyboardContainer.append(row);
      item.forEach(({ key, code }) => {
        new Key(key, code).render(row);
      });
    });
  }

  initKeyboard();

  document.addEventListener('keydown', (e) => {
    // console.log(e.code);
    // console.log(e.key);
    // const eventObj = {
    //   code: e.code,
    //   key: e.key,
    // };
    console.log(e);
  });
});
