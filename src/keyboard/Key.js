class Key {
  constructor({ code, key }, isShift = false, iscapsLock = false, lang = 'EN') {
    this.code = code;
    this.key = key;
    this.isShift = isShift;
    this.capsLock = iscapsLock;
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
    const elementContent = document.createElement('span');
    elementContent.classList.add('key__descr');
    if (this.key instanceof Array) {
      const [enDown, enUp, ruDown, ruUp] = this.key;
      if (this.isShift === false && this.lang === 'EN') {
        elementContent.innerHTML = enDown;
      } else if (this.isShift === true && this.lang === 'EN') {
        elementContent.innerHTML = enUp;
      } else if (this.isShift === false && this.lang === 'RU') {
        elementContent.innerHTML = ruDown;
      } else if (this.isShift === true && this.lang === 'RU') {
        elementContent.innerHTML = ruUp;
      }
      element.setAttribute('data-type', 'printed');
    } else {
      element.setAttribute('data-type', 'control');
      elementContent.innerHTML = this.key;
    }
    element.append(elementContent);

    return element;
  };
}

export default Key;
