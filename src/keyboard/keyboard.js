import Key from './Key';

class KeyBoard {
  constructor(data, active = new Set()) {
    this.shift = false;
    this.capsLock = false;
    this.lang = 'EN';
    this.data = data;
    this.getLangFromLocalStorage();
    this.active = active;
  }

  render() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    const keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard__container');
    keyboard.prepend(keyboardContainer);

    this.data.forEach((item) => {
      let actEl = false;
      if (this.active.has(item.code)) {
        actEl = true;
      }
      keyboardContainer.append(new Key(item, this.shift, this.capsLock, this.lang, actEl).render());
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

  getFromPressedKeys(set) {
    this.active = set;
  }
}

export default KeyBoard;
