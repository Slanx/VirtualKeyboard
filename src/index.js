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

/* --------------------------------------EVENTS---------------------------------------------------*/

const onShift = (e) => {
  if (e.key === 'Shift') {
    keyboardWrapper.innerHTML = '';
    keyboard.isShift();
    keyboardWrapper.append(keyboard.render());
    document.removeEventListener('keydown', onShift);
  }
};

document.addEventListener('keydown', onShift);

document.addEventListener('keyup', (e) => {
  onShift(e);
  document.addEventListener('keydown', onShift);
});

const onCapsLock = (e) => {
  if (e.code === 'CapsLock') {
    keyboardWrapper.innerHTML = '';
    keyboard.isShift();
    keyboardWrapper.append(keyboard.render());
    document.removeEventListener('keydown', onCapsLock);
  }
};

document.addEventListener('keydown', onCapsLock);

document.addEventListener('keyup', () => {
  document.addEventListener('keydown', onCapsLock);
});

window.addEventListener('DOMContentLoaded', () => {});
