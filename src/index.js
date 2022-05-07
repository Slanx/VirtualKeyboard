'Use strict';

import './styles/main.scss';
import KeyBoard from './keyboard/keyboard';
import DATA from './keyboard/data';

const keyboard = new KeyBoard(DATA);

/* -----------------------------------------CREATE APP WRAPPER -----------------------------------*/

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

const keyboardWrapper = document.createElement('div');
keyboardWrapper.classList.add('keyboard__wrapper');
keyboardWrapper.append(keyboard.render());
app.append(keyboardWrapper);

const descr = document.createElement('div');
descr.classList.add('descr');
const lang = document.createElement('p');
lang.textContent = 'Переключение языка <shift> + <ctrl>';
descr.append(lang);
const operatingSystem = document.createElement('p');
operatingSystem.textContent = 'Сделанно на Windows';
descr.append(operatingSystem);
app.append(descr);

/* --------------------------------------Pressed--------------------------------------------------*/

const pressed = new Set();

function addPressedKey(key) {
  pressed.add(key);
  const element = document.querySelector(`[data-key="${key}"]`);
  element.classList.add('active');
}
function removePressedKey(key) {
  pressed.delete(key);
  const element = document.querySelector(`[data-key="${key}"]`);
  element.classList.remove('active');
}

/* --------------------------------------EVENTS---------------------------------------------------*/

const onShift = () => {
  keyboardWrapper.innerHTML = '';
  keyboard.isShift();
  keyboardWrapper.append(keyboard.render());
};

const changeLanguage = (language) => {
  keyboardWrapper.innerHTML = '';
  localStorage.setItem('lang', language);
  keyboard.getLangFromLocalStorage();
  keyboardWrapper.append(keyboard.render());
};

const onKeyDown = (e) => {
  if (!pressed.has(e.code)) {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !pressed.has('ShiftLeft') && !pressed.has('ShiftRight')) {
      onShift();
    }
    if (e.code === 'CapsLock') {
      onShift();
    }
    if (pressed.has('ShiftLeft') && e.code === 'AltLeft') {
      if (keyboard.lang === 'EN') {
        changeLanguage('RU');
      } else {
        changeLanguage('EN');
      }
    }
    addPressedKey(e.code);
  }
};

const onKeyUp = (e) => {
  if (pressed.has(e.code)) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      onShift();
    }
    removePressedKey(e.code);
  }
};
const onMouseDown = (e) => {
  const el = e.target.closest('[data-type]');
  if (el) {
    const code = el.getAttribute('data-key');
    addPressedKey(code);
  }
};

const onMouseUp = (e) => {
  const el = e.target.closest('[data-type]');
  if (el) {
    const code = el.getAttribute('data-key');
    removePressedKey(code);
  }
};

document.addEventListener('keydown', onKeyDown);

document.addEventListener('keyup', onKeyUp);

document.addEventListener('mousedown', onMouseDown);

document.addEventListener('mouseup', onMouseUp);

// keyboardWrapper.addEventListener('mousedown', (e) => {
//   textField.focus();
//   const element = e.target.closest('[data-type]');
//   if (element) {
//     element.classList.add('active');
//     const child = element.firstChild;
//     if (element.getAttribute('data-type') === 'printed') {
//       textField.value += child.textContent;
//     } else if (element.getAttribute('data-type') === 'control') {
//       switch (child.textContent) {
//         case 'Shift':
//           onShift();
//           break;
//         case 'Enter':
//           textField.value += '\n';
//       }
//     }
//   }
// });

// keyboardWrapper.addEventListener('mouseup', (e) => {
//   const element = e.target.closest('[data-type]');
//   if (element) {
//     element.classList.remove('active');
//   }
// });
// console.log(keyboard.shift);

window.addEventListener('DOMContentLoaded', () => {});
