export const autofocus = {
  inserted(el) {
    const input = el.querySelector('.q-field__native');
    setTimeout(() => {
      input.focus();
    }, 700);
  },
};
