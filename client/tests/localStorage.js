const localStorageMock = (() => {
  let store = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJWaWN0b3IiLCJsYXN0TmFtZSI6Iklkb25nZXNpdCIsImVtYWlsIjoidmljdG9yLmlkb25nZXNpdEBhbmRlbGEuY29tIiwicGhvbmUiOiIwNzA2OTc0OTk0NSIsImlkIjoiZWUxYzhmZWQtNmRmZi00OTFkLWE0ZmMtMzFiZWRiNjNiZGUzIiwiaWF0IjoxNTA1ODk5OTk5LCJleHAiOjE1MDYwNzI3OTl9.P5H3o26nqNG1PIlE6HW8rYly9VxNt7WcByRYvfECv84'
  };
  return {
    getItem: key =>
      store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });