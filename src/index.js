'Use strict';

import './styles/main.scss';
import KeyBoard from './keyboard/keyboard';
import DATA from './keyboard/data';

const keyboard = new KeyBoard(DATA);

window.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------CREATE APP WRAPPER ---------------------------------*/

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
  lang.textContent = 'Переключение языка на левые <Shift> + <Alt>';
  descr.append(lang);
  const operatingSystem = document.createElement('p');
  operatingSystem.textContent = 'Сделанно на Windows';
  descr.append(operatingSystem);
  app.append(descr);

  /* --------------------------------------TextField----------------------------------------------*/

  const insertText = (text) => {
    textField.focus();
    textField.setRangeText(text, textField.selectionStart, textField.selectionEnd, 'end');
  };

  const backSpace = () => {
    textField.focus();
    if (textField.selectionStart !== 0 && textField.selectionStart === textField.selectionEnd) {
      textField.setRangeText('', textField.selectionStart - 1, textField.selectionEnd, 'end');
    } else {
      textField.setRangeText('', textField.selectionStart, textField.selectionEnd, 'end');
    }
  };

  const deleteText = () => {
    textField.focus();
    if (textField.selectionStart !== 0 && textField.selectionStart === textField.selectionEnd) {
      textField.setRangeText('', textField.selectionStart, textField.selectionEnd + 1, 'end');
    } else {
      textField.setRangeText('', textField.selectionStart, textField.selectionEnd, 'end');
    }
  };

  const textWrap = () => {
    textField.focus();
    if (textField.selectionStart !== 0) {
      textField.setRangeText('\n', textField.selectionStart, textField.selectionEnd, 'end');
    }
  };
  const tabWrap = () => {
    textField.focus();
    textField.setRangeText('    ', textField.selectionStart, textField.selectionEnd, 'end');
  };
  /* --------------------------------------Pressed------------------------------------------------*/

  const pressed = new Set();
  let pressMouse = null;

  function addPressedKey(key) {
    pressed.add(key);
    const element = document.querySelector(`[data-key="${key}"]`);
    element.classList.add('active');
    keyboard.getFromPressedKeys(pressed);
  }
  function removePressedKey(key) {
    pressed.delete(key);
    const element = document.querySelector(`[data-key="${key}"]`);
    element.classList.remove('active');
    keyboard.getFromPressedKeys(pressed);
  }

  /* --------------------------------------EVENTS-------------------------------------------------*/

  const onShift = () => {
    keyboardWrapper.innerHTML = '';
    keyboard.isShift();
    keyboardWrapper.append(keyboard.render());
  };

  const onCapsLock = () => {
    keyboardWrapper.innerHTML = '';
    keyboard.isCapsLock();
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
      if ((code === 'ShiftLeft' || code === 'ShiftRight') && !pressed.has('ShiftLeft') && !pressed.has('ShiftRight')) {
        onShift();
      } else if (code === 'ShiftRight' && !pressed.has('ShiftLeft') && !pressed.has('ShiftRight')) {
        onShift();
      } else if (code === 'CapsLock' && !pressed.has('CapsLock')) {
        onCapsLock();
      } else if (code === 'Backspace') {
        backSpace();
      } else if (code === 'Delete') {
        deleteText();
      } else if (code === 'Enter') {
        textWrap();
      } else if (code === 'Tab') {
        tabWrap();
      }
    }
    addPressedKey(code);
  };

  const checkKeyUp = (code) => {
    if (pressed.has(code) && ((code === 'ShiftLeft' && !pressed.has('ShiftRight')) || (code === 'ShiftRight' && !pressed.has('ShiftLeft')))) {
      onShift();
    }
    if ((pressed.has('ShiftLeft') && code === 'AltLeft') || (pressed.has('AltLeft') && code === 'ShiftLeft')) {
      if (keyboard.lang === 'EN') {
        changeLanguage('RU');
      } else {
        changeLanguage('EN');
      }
    }
    removePressedKey(code);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
    const element = document.querySelector(`[data-key="${e.code}"]`);
    if (element) {
      checkKeyDown(element, e.code);
    }
  };

  const onKeyUp = (e) => {
    e.preventDefault();
    const element = document.querySelector(`[data-key="${e.code}"]`);
    if (element) {
      checkKeyUp(e.code);
    }
  };
  const onMouseDown = (e) => {
    const el = e.target.closest('[data-type]');
    if (el) {
      const code = el.getAttribute('data-key');
      pressMouse = code;
      checkKeyDown(el, code);
    }
  };
  const onMouseUp = () => {
    if (pressMouse) {
      checkKeyUp(pressMouse);
    }
  };

  document.addEventListener('keydown', onKeyDown);

  document.addEventListener('keyup', onKeyUp);

  keyboardWrapper.addEventListener('mousedown', onMouseDown);

  keyboardWrapper.addEventListener('mouseup', onMouseUp);
});
