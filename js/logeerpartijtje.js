const nieuweKoningButton = document.querySelector('#koningwisselaar > button');
const nieuweKoningInput = document.querySelector('#koningwisselaar > input');
const nieuweHeksButton = document.querySelector('#hekswisselaar > button');
const nieuweHeksInput = document.querySelector('#hekswisselaar > input');
const presentatieButton = document.querySelector('#presentatie > button');

nieuweKoningButton.addEventListener('click', () => {
    const huidigeKoning = document.querySelector('article > div > section:nth-child(2) > p');
    huidigeKoning.innerHTML = nieuweKoningInput.value;
    nieuweKoningInput.value = '';
})

nieuweHeksButton.addEventListener('click', () => {
    const huidigeHeks = document.querySelector('article > div > section:nth-child(3) > p');
    huidigeHeks.innerHTML = nieuweHeksInput.value;
    nieuweHeksInput.value = '';
})

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

presentatieButton.addEventListener('click', () => {
    const presentatie = presentaties[Math.floor(Math.random() * presentaties.length)];
    window.open(presentatie.label, '_blank');
})
