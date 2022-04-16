const localStorageMock = (() => {
  let store = {
    token: 'sampleToken'
  };
  return {
    getItem: key =>
      store[key],
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });