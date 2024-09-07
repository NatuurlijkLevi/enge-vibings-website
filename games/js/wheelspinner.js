import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.0/dist/spin-wheel-esm.js';
import * as easing from './easing.js';

const easingFunctions = [
  {
    label: 'default (easeSinOut)',
    function: null,
  },
  {
    label: 'easeSinInOut',
    function: easing.sinInOut,
  },
  {
    label: 'easeCubicOut',
    function: easing.cubicOut,
  },
  {
    label: 'easeCubicInOut',
    function: easing.cubicInOut,
  },
  {
    label: 'easeElasticOut',
    function: easing.elasticOut,
  },
  {
    label: 'easeBounceOut',
    function: easing.bounceOut,
  },
];

let selected = document.getElementById("selected");
let buttonItems = document.querySelectorAll("aside > div#buttonwrapper > button");
const spinButton = document.querySelector('#spinbutton');
let linkItems;
let volgordeSpel;
let koningSpel;
let heksSpel;
let dashboard;

const volgorde = document.querySelector('aside > div#buttonwrapper > button:nth-child(1)');
const koning = document.querySelector('aside > div#buttonwrapper > button:nth-child(2)');
const heks = document.querySelector('aside > div#buttonwrapper > button:nth-child(3)');

let volgordeDone = localStorage.getItem("volgordeDone");
let koningDone = localStorage.getItem("koningDone");
let heksDone = localStorage.getItem("heksDone");

let volgordeCount = 0;

function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

if (inIframe()) {
  volgordeSpel = parent.document.querySelector('article > div > section > ul');
  koningSpel = parent.document.querySelector('article > div > section:nth-child(2)');
  heksSpel = parent.document.querySelector('article > div > section:nth-child(3)');
  dashboard = parent.document.querySelector('#dashboard');
}
else {
  buttonItems = document.querySelector("aside");
  buttonItems.innerHTML = "";
}
let buttonIsClicked = false;

let savedVolgorde = localStorage.getItem("volgorde");
console.log(savedVolgorde);
let savedKoning = localStorage.getItem("koning");
let savedHeks = localStorage.getItem("heks");
let currentVolgorde = [];
let currentKoning;
let currentHeks;

if (savedVolgorde !== null) {
  savedVolgorde.split(",").forEach((item) => {
    volgordeSpel.innerHTML += `<li>${item}</li>`;
  });
  volgordeCount = 6;
}

if (savedKoning !== null) {
  koningSpel.innerHTML += `<p>${savedKoning}</p>`;
}

if (savedHeks !== null) {
  heksSpel.innerHTML += `<p>${savedHeks}</p>`;
}

function checkIfAllDone() {
  if (volgordeDone && koningDone && heksDone) {
    dashboard.style.animationName = "hidewheelspinner";
  }
}
checkIfAllDone();

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
}

function resetWheel() {
  container.innerHTML = "";
  wheel = new Wheel(container, props);
  wheel.itemBackgroundColors = ['#3CBEDE', '#DD41B8', '#455DA5', '#96299C', '#455DA5', '#DD41B8'];
  wheel.lineWidth = 0;
  wheel.borderWidth = 0;
  wheel.itemLabelColors = ['#FCFAFA'];
  wheel.itemLabelFont = "'Montserrat', sans-serif";
  wheel.isInteractive = true;
  wheel.itemLabelAlign = 'right';
  wheel.itemLabelFontSizeMax = 35;
}
resetWheel();

const getRandomItemIndex = () => {
  const randomIndex = Math.floor(Math.random() * props.items.length);
  return randomIndex;
};

let getLastPlayer = (winnerIndex) => {
  if (winnerIndex === 0) {
    return 1;
  }
  else {
    return 0;
  }
}

spinButton.addEventListener("click", () => {
  if (!buttonIsClicked) {
    let easing = easingFunctions[2];
    if (selected == heks) {
      easing = easingFunctions[5];
    }
    const easingFunction = easing.function;
    wheel.spinToItem(getRandomItemIndex(), 8000, false, 10, 1, easingFunction);
    buttonIsClicked = true;
    setTimeout(() => {
      const winnerIndex = wheel.getCurrentIndex();
      const winner = props.items[winnerIndex].label;
      if (inIframe()) {
        if (volgordeCount < 6 && !volgordeDone && selected == volgorde) {
          volgordeSpel.innerHTML += `<li>${winner}</li>`;
          volgordeCount++;
          switch (volgordeCount) {
            case 1:
              alert(`${winner} is als eerste aan de beurt!`);
              currentVolgorde[0] = winner;
              break;
            case 2:
              alert(`Daarna is ${winner} aan de beurt!`);
              currentVolgorde[1] = winner;
              break;
            case 3:
              alert(`${winner} komt daarna als derde aan de beurt!`);
              currentVolgorde[2] = winner;
              break;
            case 4:
              alert(`Vervolgens is ${winner} aan de beurt!`);
              currentVolgorde[3] = winner;
              break;
            case 5:
              const lastPlayer = props.items[getLastPlayer(winnerIndex)].label;
              alert(`Als tweederlaatste is ${winner} aan de beurt! Dit betekent dat ${lastPlayer} als laatste aan de beurt is!`);
              currentVolgorde[4] = winner;
              currentVolgorde[5] = lastPlayer;
              break;
          }
          props.items.splice(winnerIndex, 1);
          resetWheel();
          if (volgordeCount === 5) {
            const winnerIndex = wheel.getCurrentIndex();
            const winner = props.items[winnerIndex].label;
            volgordeSpel.innerHTML += `<li>${winner}</li>`;
            volgordeCount++;
            volgordeDone = true;
            localStorage.setItem("volgordeDone", volgordeDone);
            resetNames();
            resetWheel();
            selected.id = "";
            koning.id = "selected";
            selected = koning;
          }
          localStorage.setItem("volgorde", currentVolgorde);
        }
        else if (volgordeDone && selected == volgorde)
        {
          alert("De volgorde is al bepaald!")
        }
        else if (koning == selected && !koningDone) {
          koningSpel.innerHTML += `<p>${winner}</p>`;
          alert(`De koning is ${winner}!`);
          currentKoning = winner;
          localStorage.setItem("koning", currentKoning);
          props.items.splice(winnerIndex, 1);
          resetWheel();
          koningDone = true;
          localStorage.setItem("koningDone", koningDone);
          selected.id = "";
          heks.id = "selected";
          selected = heks;
        }
        else if (koningDone && selected == koning) {
          alert("De koning is al gekozen!")
        }
        else if (heks == selected && !heksDone) {
          heksSpel.innerHTML += `<p>${winner}</p>`;
          alert(`De heks is ${winner}!`);
          currentHeks = winner;
          localStorage.setItem("heks", currentHeks);
          heksDone = true;
          localStorage.setItem("heksDone", heksDone);
          resetNames();
          resetWheel();
          selected.id = "";
        }
        else if (heksDone && selected == heks) {
          alert("De heks is al gekozen!")
        }
        else if (naam == selected) {
          alert(`De gekozenen is ${winner}!`);
        }
      } else {
        alert(`De gekozenen is ${winner}!`);
      }
      checkIfAllDone();
      buttonIsClicked = false;
    }, 8500);
  }
})

buttonItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (koning.id == "selected" && heks == !item) {
      alert("De koning is al gekozen! Kies nu de heks.");
    }
    if (item.id !== "selected" && !buttonIsClicked && (volgordeCount == 0 || volgordeCount == 6))
    {
      selected.id = "";
      item.id = "selected";
      selected = item;
    }
    else if (buttonIsClicked) {
      alert("Je bent al aan het rad aan het draaien!");
    }
    else if (volgordeCount > 0 && volgordeCount < 6) {
      alert("Je bent nog bezig met de volgorde! Maak deze eerst af.");
    }
  });
});

