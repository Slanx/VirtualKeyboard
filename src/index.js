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
textField.cols = '80';
title.after(textField);

const keyboardWrapper = document.createElement('div');
keyboardWrapper.classList.add('keyboard__wrapper');
keyboardWrapper.append(keyboard.render());
app.append(keyboardWrapper);

const descr = document.createElement('div');
descr.classList.add('descr');
const lang = document.createElement('p');
lang.textContent = 'Переключение языка на левые <shift> + <alt>';
descr.append(lang);
const operatingSystem = document.createElement('p');
operatingSystem.textContent = 'Сделанно на Windows';
descr.append(operatingSystem);
app.append(descr);

/* --------------------------------------TextField------------------------------------------------*/

const insertText = (text) => {
  textField.focus();
  textField.setRangeText(text, textField.selectionStart, textField.selectionEnd, 'end');
};

const backSpace = () => {
  textField.focus();
  if (textField.selectionStart !== 0) {
    textField.setRangeText('', textField.selectionStart - 1, textField.selectionEnd, 'end');
  }
};

const deleteText = () => {
  textField.focus();
  if (textField.selectionStart !== 0) {
    textField.setRangeText('', textField.selectionStart, textField.selectionEnd + 1, 'end');
  }
};

const textWrap = () => {
  textField.focus();
  if (textField.selectionStart !== 0) {
    textField.setRangeText('\n', textField.selectionStart, textField.selectionEnd, 'end');
  }
};
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

const checkKeyDown = (element, code) => {
  if (element.hasAttribute('data-type') && element.getAttribute('data-type') === 'printed') {
    const textKey = element.firstChild.textContent;
    insertText(textKey);
  } else if (element.hasAttribute('data-type') && element.getAttribute('data-type') === 'control') {
    if (code === 'ShiftLeft' && !pressed.has('ShiftLeft') && !pressed.has('ShiftRight') && !keyboard.shift) {
      onShift();
    } else if (code === 'CapsLock') {
      keyboard.isCapsLock();
      onShift();
    } else if ((pressed.has('ShiftLeft') && code === 'AltLeft') || (pressed.has('AltLeft') && code === 'ShiftLeft')) {
      if (keyboard.lang === 'EN') {
        changeLanguage('RU');
      } else {
        changeLanguage('EN');
      }
    } else if (code === 'Backspace') {
      backSpace();
    } else if (code === 'Delete') {
      deleteText();
    } else if (code === 'Enter') {
      textWrap();
    }

    addPressedKey(code);
  }
};

const onKeyDown = (e) => {
  e.preventDefault();
  const element = document.querySelector(`[data-key="${e.code}"]`);
  checkKeyDown(element, e.code);
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
    checkKeyDown(el, code);
  }
};
const onMouseUp = (e) => {
  e.preventDefault();
  const el = e.target.closest('[data-type]');
  if (el) {
    const code = el.getAttribute('data-key');
    if (pressed.has(code)) {
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        onShift();
      }
      removePressedKey(code);
    }
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
