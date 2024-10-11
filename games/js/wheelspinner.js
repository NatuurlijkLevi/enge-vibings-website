// Import the Wheel class from the Spin Wheel package
import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.0/dist/spin-wheel-esm.js';
import * as easing from './easing.js';

// Initialize variables
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

// Function to check if the game is played in an iframe
function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

// Check if the game is played in an iframe
// If the game is played in an iframe, the parent document will be used
if (inIframe()) {
  volgordeSpel = parent.document.querySelector('article > div > section > ul');
  koningSpel = parent.document.querySelector('article > div > section:nth-child(2)');
  heksSpel = parent.document.querySelector('article > div > section:nth-child(3)');
  dashboard = parent.document.querySelector('#dashboard');
}
// If the game is not played in an iframe, the current document will be used
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

// Check if the volgorde is saved
if (savedVolgorde !== null) {
  savedVolgorde.split(",").forEach((item) => {
    volgordeSpel.innerHTML += `<li>${item}</li>`;
  });
  volgordeCount = 6;
}

// Check if the koning is saved
if (savedKoning !== null) {
  koningSpel.innerHTML += `<p>${savedKoning}</p>`;
}

// Check if the heks is saved
if (savedHeks !== null) {
  heksSpel.innerHTML += `<p>${savedHeks}</p>`;
}

// Check if all the games are done
function checkIfAllDone() {
  if (volgordeDone && koningDone && heksDone) {
    dashboard.style.animationName = "hidewheelspinner";
  }
}
checkIfAllDone();

// Initialize the props object
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

// Reset the names
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

// Create a new Wheel instance
function resetWheel() {
    container.innerHTML = "";
    wheel = new Wheel(container, props);
    wheel.itemBackgroundColors = ['#3CBEDE', '#DD41B8', '#455DA5', '#96299C', '#455DA5', '#DD41B8'];
    wheel.lineWidth = 0;
    wheel.borderWidth = 0;
    wheel.itemLabelColors = ['#FCFAFA'];
    wheel.itemLabelFont = "'Montserrat', sans-serif";
    wheel.isInteractive = false;
    wheel.itemLabelAlign = 'right';
    wheel.itemLabelFontSizeMax = 35;
}

// Create a new Wheel instance with a delay of 500ms to help with the pop up animation
function resetWheelWithDelay() {
  setTimeout(() => {
    resetWheel();
  }, 500);
}

resetWheel();

// Get a random item index
const getRandomItemIndex = () => {
  const randomIndex = Math.floor(Math.random() * props.items.length);
  return randomIndex;
};

// Get the last player
let getLastPlayer = (winnerIndex) => {
  if (winnerIndex === 0) {
    return 1;
  }
  else {
    return 0;
  }
}

// Add an event listener to the spinButton
// If the button is clicked, the wheel will spin to a random item
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
              showPopUp("wheelspinner", `${winner} is als eerste aan de beurt!`);
              currentVolgorde[0] = winner;
              break;
            case 2:
              showPopUp("wheelspinner", `Daarna is ${winner} aan de beurt!`);
              currentVolgorde[1] = winner;
              break;
            case 3:
              showPopUp("wheelspinner", `${winner} komt daarna als derde aan de beurt!`);
              currentVolgorde[2] = winner;
              break;
            case 4:
              showPopUp("wheelspinner", `Vervolgens is ${winner} aan de beurt!`);
              currentVolgorde[3] = winner;
              break;
            case 5:
              const lastPlayer = props.items[getLastPlayer(winnerIndex)].label;
              showPopUp("wheelspinner", `Als tweederlaatste is ${winner} aan de beurt! Dit betekent dat ${lastPlayer} als laatste aan de beurt is!`);
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
            resetWheelWithDelay();
            selected.id = "";
            koning.id = "selected";
            selected = koning;
          }
          localStorage.setItem("volgorde", currentVolgorde);
        }
        else if (volgordeDone && selected == volgorde)
        {
          showPopUp("wheelspinner", "De volgorde is al bepaald!")
        }
        else if (koning == selected && !koningDone) {
          koningSpel.innerHTML += `<p>${winner}</p>`;
          showPopUp("wheelspinner", `De koning is ${winner}!`);
          currentKoning = winner;
          localStorage.setItem("koning", currentKoning);
          props.items.splice(winnerIndex, 1);
          resetWheelWithDelay();
          koningDone = true;
          localStorage.setItem("koningDone", koningDone);
          selected.id = "";
          heks.id = "selected";
          selected = heks;
        }
        else if (koningDone && selected == koning) {
          showPopUp("wheelspinner", "De koning is al gekozen!")
        }
        else if (heks == selected && !heksDone) {
          heksSpel.innerHTML += `<p>${winner}</p>`;
          showPopUp("wheelspinner", `De heks is ${winner}!`);
          currentHeks = winner;
          localStorage.setItem("heks", currentHeks);
          heksDone = true;
          localStorage.setItem("heksDone", heksDone);
          resetNames();
          resetWheelWithDelay();
          selected.id = "";
        }
        else if (heksDone && selected == heks) {
          showPopUp("wheelspinner", "De heks is al gekozen!")
        }
        else if (naam == selected) {
          showPopUp("wheelspinner", `De gekozenen is ${winner}!`);
        }
      } else {
        showPopUp("wheelspinner", `De gekozenen is ${winner}!`);
      }
      // Create a promise that resolves when the pop-up is closed
      const waitForPopUpToClose = new Promise((resolve) => {
        const checkPopUpClosed = setInterval(() => {
          if (popUpIsClosed) {
        clearInterval(checkPopUpClosed);
        resolve();
          }
        }, 100); // Check every 100ms
      });

      // Use the promise to check if all games are done after the pop-up is closed
      waitForPopUpToClose.then(() => {
        checkIfAllDone();
      }).catch((error) => {
        console.error('Error waiting for pop-up to close:', error);
      });
      
      buttonIsClicked = false;
    }, 8500);
  }
})

// Add an event listener to the buttonItems
buttonItems.forEach((item) => {
  // If the item is clicked, the item will be selected
  item.addEventListener("click", () => {
    // If the koning is already selected, the heks must be selected
    if (koning.id == "selected" && heks == !item) {
      showPopUp("wheelspinner", "De koning is al gekozen! Kies nu de heks.");
    }
    // If the item is not selected and the volgorde is either finished or not started, the item will be selected
    if (item.id !== "selected" && !buttonIsClicked && (volgordeCount == 0 || volgordeCount == 6))
    {
      selected.id = "";
      item.id = "selected";
      selected = item;
    }
    // If the button is clicked to spin the wheel, you can't switch what you want to spin for 
    else if (buttonIsClicked) {
      showPopUp("wheelspinner", "Je bent al aan het rad aan het draaien!");
    }
    // If the volgorde is not finished, the volgorde must be finished first
    else if (volgordeCount > 0 && volgordeCount < 6) {
      showPopUp("wheelspinner", "Je bent nog bezig met de volgorde! Maak deze eerst af.");
    }
  });
});

