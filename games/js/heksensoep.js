const ingredienten = document.querySelectorAll('.ingredient');
const huidigeSoepKleur = document.querySelector(':root').style.getPropertyValue('--huidige-soep-kleur');
const iframe = document.getElementById('ketel-bubbels');
const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
const bubbles = innerDoc.getElementById('bubbles');

const soepKleuren = [
                        '--groene-soep',
                        '--rode-soep',
                        '--blauwe-soep',
                        '--gele-soep',
                        '--paarse-soep',
                        '--oranje-soep',
                        '--witte-soep',
                        '--grijze-soep',
                        '--bruine-soep',
                        '--roze-soep',
                        '--turquoise-soep',
                        '--zilver-soep',
                        '--goud-soep',
                        '--koper-soep',
                        '--zink-soep',
                        '--nikkel-soep',
                        '--lood-soep',
                        '--ijzer-soep',
                        '--tin-soep',
                        '--aluminium-soep'
                    ];

ingredienten.forEach(ingredient => {
  ingredient.addEventListener('click', () => {
    const ingredientImg = ingredient.children[0].innerHTML;
    ingredient.classList.toggle('used');
    const nieuweSoepKleur = soepKleuren[Math.floor(Math.random() * soepKleuren.length)];
    document.documentElement.style.setProperty('--huidige-soep-kleur', nieuweSoepKleur);
    innerDoc.bubbles.innerHTML += ingredientImg;
  });
});