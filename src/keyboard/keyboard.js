import Key from './Key';

class KeyBoard {
  constructor(data, lang = 'EN', shift = false, capsLock = false) {
    this.shift = shift;
    this.capsLock = capsLock;
    this.lang = lang;
    this.data = data;
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
}

export default KeyBoard;
