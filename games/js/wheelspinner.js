import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.0/dist/spin-wheel-esm.js';
const spinButton = document.querySelector('#spinbutton');
let volgorde;
let koning;
let heks;

let volgordeDone = false;
let koningDone = false;
let heksDone = false;

let volgordeCount = 0;

function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

if (inIframe()) {
  volgorde = parent.document.querySelector('article > div > section > ul');
  koning = parent.document.querySelector('article > div > section:nth-child(2)');
  heks = parent.document.querySelector('article > div > section:nth-child(3)');
  console.log(volgorde);
}
let buttonIsClicked = false;

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
let wheel;

function resetNames(){
  props.items = [
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
  props.items.sort(() => Math.random() - 0.5);
  resetWheel();
}

function resetWheel() {
  container.innerHTML = "";
  wheel = new Wheel(container, props);
  wheel.itemBackgroundColors = ['#3CBEDE', '#DD41B8', '#455DA5', '#96299C'];
  wheel.lineWidth = 0;
  wheel.borderWidth = 0;
  wheel.itemLabelColors = ['#FCFAFA'];
  wheel.itemLabelFont = "'Montserrat', sans-serif";
  wheel.isInteractive = true;
  wheel.itemLabelAlign = 'right';
  wheel.itemLabelFontSizeMax = 35;
}
resetWheel();

spinButton.addEventListener("click", () => {
  if (!buttonIsClicked) {
    wheel.spin(8000)
    buttonIsClicked = true;
    setTimeout(() => {
      const winnerIndex = wheel.getCurrentIndex();
      const winner = props.items[winnerIndex].label;
      if (inIframe()) {
        if (volgordeCount < 6 && !volgordeDone) {
          volgorde.innerHTML += `<li>${winner}</li>`;
          volgordeCount++;
          props.items.splice(winnerIndex, 1);
          resetWheel();
          if (volgordeCount === 5) {
            const winnerIndex = wheel.getCurrentIndex();
            const winner = props.items[winnerIndex].label;
            volgorde.innerHTML += `<li>${winner}</li>`;
            volgordeDone = true;
            resetNames();
            resetWheel();
          }
        }
        else if (volgordeDone)
        {
          alert("De volgorde is al bepaald!")
        }
      } else {
        alert(`De gekozenen is ${winner}!`);
      }
      buttonIsClicked = false;
    }, 8500);
  }
})

