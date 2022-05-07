import Key from './Key';

class KeyBoard {
  constructor(data) {
    this.shift = false;
    this.capsLock = false;
    this.lang = 'EN';
    this.data = data;
    this.getLangFromLocalStorage();
  }

  render() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    const keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard__container');
    keyboard.prepend(keyboardContainer);

    this.data.forEach((item) => {
      keyboardContainer.append(new Key(item, this.shift, this.capsLock, this.lang).render());
    });

    return keyboard;
  }

  isShift() {
    this.shift = !this.shift;
  }

  isCapsLock() {
    this.capsLock = !this.capsLock;
  }

  getLangFromLocalStorage() {
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      localStorage.setItem('lang', this.lang);
    }
  }
}

export default KeyBoard;
