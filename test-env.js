import $ from 'jquery';
const Hammer = require('materialize-css/js/hammer.min');

global.Hammer = Hammer;
global.$ = $;
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({ matches: true }))
});

Object.defineProperty(document, 'getElementsByClassName', {
  value: jest.fn(() => ([{
    style: { display: 'block' },
    className: { replace: () => {} }
  }]))
});
