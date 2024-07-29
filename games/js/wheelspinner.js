import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.0/dist/spin-wheel-esm.js';

let props = {
    items: [
      {
        label: 'Amber',
      },
      {
        label: 'Jordan',
      },
      {
        label: 'Levi',
      },
      {
        label: 'Loek',
      },
      {
        label: 'Luuk',
      },
      {
        label: 'Stef',
      },
    ]
  }

props.items.sort(() => Math.random() - 0.5);
const container = document.querySelector('.wheel-container');
const wheel = new Wheel(container, props);
wheel.itemBackgroundColors = ['#3CBEDE', '#DD41B8', '#455DA5', '#96299C'];
wheel.lineWidth = 0;
wheel.borderWidth = 0;
wheel.itemLabelColors = ['#FCFAFA'];
wheel.itemLabelFont = "'Montserrat', sans-serif";

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}