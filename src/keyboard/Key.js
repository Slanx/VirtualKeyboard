class Key {
  constructor({ code, key }, shift = false, capsLock = false, lang = 'EN') {
    this.code = code;
    this.key = key;
    this.shift = shift;
    this.capsLock = capsLock;
    this.lang = lang;
  }

  render = () => {
    const element = document.createElement('button');
    element.classList.add('keyboard__key', 'key');
    element.setAttribute('data-key', this.code);
    if (this.key === 'Backspace' || this.key === 'Shift' || this.key === 'Enter' || this.key === 'CapsLock') {
      element.classList.add('keyboard__key_long');
    } else if (this.key === 'Delete' || this.key === 'Tab') {
      element.classList.add('keyboard__key_medium');
    }
    if (this.key === 'CapsLock') {
      const elementContent = document.createElement('span');
      if (this.capsLock) {
        elementContent.classList.add('circle', 'press');
      } else {
        elementContent.classList.add('circle');
      }
      element.append(elementContent);
    }
    const elementContent = document.createElement('span');
    elementContent.classList.add('key__descr');
    if (this.key instanceof Array) {
      const [enDown, enUp, ruDown, ruUp] = this.key;
      if (this.shift === false && this.lang === 'EN') {
        elementContent.innerHTML = enDown;
      } else if (this.shift === true && this.lang === 'EN') {
        elementContent.innerHTML = enUp;
      } else if (this.shift === false && this.lang === 'RU') {
        elementContent.innerHTML = ruDown;
      } else if (this.shift === true && this.lang === 'RU') {
        elementContent.innerHTML = ruUp;
      }
      element.setAttribute('data-type', 'printed');
    } else if (this.code === 'Space') {
      element.setAttribute('data-type', 'printed');
      elementContent.innerHTML = this.key;
    } else {
      element.setAttribute('data-type', 'control');
      elementContent.innerHTML = this.key;
    }
    element.append(elementContent);

    return element;
  };
}

export default Key;
