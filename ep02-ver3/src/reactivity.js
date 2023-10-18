export function bindReactiveState({ name, defaultValue }) {
  if (typeof defaultValue !== 'object') {
    throw new Error('bindReactiveState supports only object as default value');
  }

  let value = new Proxy(defaultValue, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, newValue) {
      target[prop] = newValue;

      const elements = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscribe-path='${prop}']`
        )
      );

      elements.forEach(element => {
        if (element.tagName === 'INPUT') {
          element.value = newValue;
        } else {
          element.innerHTML = newValue;
        }
      });

      return true;
    },
  });

  return value;
}
