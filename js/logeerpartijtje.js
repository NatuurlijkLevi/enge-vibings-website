// Initialize variables
let currentTheme = localStorage.getItem('theme');
const koningkaarten = document.getElementById('koningkaarten');
const heksensoep = document.getElementById('heksensoep');
const hekswisselaar = document.querySelector('#hekswisselaar > input');
const koningwisselaar = document.querySelector('#koningwisselaar > input');
const koningLabel = document.querySelector('article > div > section:nth-child(2) > h1');
const heksLabel = document.querySelector('article > div > section:nth-child(3) > h1');

const nieuweKoningButton = document.querySelector('#koningwisselaar > button');
const nieuweKoningInput = document.querySelector('#koningwisselaar > input');
const nieuweHeksButton = document.querySelector('#hekswisselaar > button');
const nieuweHeksInput = document.querySelector('#hekswisselaar > input');
const presentatieButton = document.querySelector('#presentatie > button');


// Add an event listener to the nieuweKoningButton
// If the button is clicked, the current king will be replaced with the new king
nieuweKoningButton.addEventListener('click', () => {
    const huidigeKoning = document.querySelector('article > div > section:nth-child(2) > p');
    let nieuweKoning = nieuweKoningInput.value;
    huidigeKoning.innerHTML = nieuweKoning;
    localStorage.setItem('koning', nieuweKoning);
    nieuweKoningInput.value = '';
})

// Add an event listener to the nieuweHeksButton
// If the button is clicked, the current witch will be replaced with the new witch
nieuweHeksButton.addEventListener('click', () => {
    const huidigeHeks = document.querySelector('article > div > section:nth-child(3) > p');
    let nieuweHeks = nieuweHeksInput.value;
    huidigeHeks.innerHTML = nieuweHeks;
    localStorage.setItem('heks', nieuweHeks);
    nieuweHeksInput.value = '';
})

// Initialize an array of presentations
const presentaties = [
  {
    label: 'https://docs.google.com/presentation/d/17GtBJ6Zrmpreg9glYcUw8EYfQzJQi8fWDKHNHNbnqt0/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/1azmn2cEVDKhdLfzfRPGpRcO-8Ktaoh4JzK-4c6HRA9w/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/19jMO2U6_wsr8ZzjJOhdYygQ1A9n-61vm7Ia_2JWKsAs/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/1EbiHs3cPyjKUmu4sGRSNGK7VgojlOTDlAVE4jAllDSs/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/1btp_v_S7EeK1SMZMMiwkjUeSjKIDRFV72AdfgVgQNfo/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/1l9qlBiA0_7Kg-a4WkRgtkC9JSs9fx1SLvIRuXVb8n2Q/edit#slide=id.p',
  },
  {
    label: 'https://docs.google.com/presentation/d/19_drQ70qPpZwcaNbIeoBH4uF5YpAF72kj326taBVez4/edit#slide=id.p',
  }
]


// Add an event listener to the presentatieButton
// If the button is clicked, a random presentation will be opened in a new tab
presentatieButton.addEventListener('click', () => {
    const presentatie = presentaties[Math.floor(Math.random() * presentaties.length)];
    window.open(presentatie.label, '_blank');
})

// If it's christmas, change the dashboard items to the christmas ones
if (currentTheme === "christmas") {
  koningkaarten.src = "games/kerstkaarten.html"
  heksensoep.src = "games/kerstgrot.html"
  hekswisselaar.placeholder = "Nieuwe grinch"
  koningwisselaar.placeholder = "Nieuwe kerstman"
  koningLabel.innerHTML = "Kerstman:"
  heksLabel.innerHTML = "Grinch:"
}

// Event listener for keydown events
window.addEventListener('keydown', (event) => {
  // If the key is 'r' and the selected text is 'Volgorde:', shuffle the player order
  if (event.key === "r" && window.getSelection().toString() === "Volgorde:") {
    const volgordeSpel = document.querySelector('article > div > section > ul');
    let spelVolgorde = localStorage.getItem('volgorde');
    let spelVolgordeArray = spelVolgorde.split(',');
    // Ensure the new order is completely different from the previous order
    let newSpelVolgordeArray = spelVolgordeArray.slice();
    while (newSpelVolgordeArray.some((speler, index) => speler === spelVolgordeArray[index]))
    {
      newSpelVolgordeArray.sort(() => Math.random() - 0.5);
    }
    // Update the player order in the local storage
    spelVolgordeArray = newSpelVolgordeArray;
    spelVolgorde = spelVolgordeArray.join(',');
    localStorage.setItem('volgorde', spelVolgorde);

    // Update the player order in the dashboard
    volgordeSpel.innerHTML = '';
    spelVolgordeArray.forEach(speler => {
      const li = document.createElement('li');
      li.innerHTML = speler;
      volgordeSpel.appendChild(li);
    })
  }
});