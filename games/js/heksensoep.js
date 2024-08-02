const ingredienten = document.querySelectorAll('.ingredient');
const root = document.querySelector(':root');
const iframe = document.getElementById('ketel-bubbels')
let innerDoc;
let bubbles;
let iframeRoot;
iframe.onload = () => {
  innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  bubbles = innerDoc.getElementById('bubbles');
  iframeRoot = innerDoc.querySelector(':root');
}

const soepKleuren = [
                        'var(--groene-soep)',
                        'var(--rode-soep)',
                        'var(--blauwe-soep)',
                        'var(--gele-soep)',
                        'var(--paarse-soep)',
                        'var(--oranje-soep)',
                        'var(--witte-soep)',
                        'var(--bruine-soep)',
                        'var(--roze-soep)',
                        'var(--turquoise-soep)'
                    ];

ingredienten.forEach(ingredient => {
  ingredient.addEventListener('click', () => {
    if (!ingredient.classList.contains('used')) {
      const ingredientImg = ingredient.children[0].children[0];
      const ingredientImgRect = ingredientImg.getBoundingClientRect();
      ingredient.classList.toggle('used');
      const nieuweSoepKleur = soepKleuren[Math.floor(Math.random() * soepKleuren.length)];
      root.style.setProperty('--huidige-soepkleur', nieuweSoepKleur);
      iframeRoot.style.setProperty('--huidige-soepkleur', nieuweSoepKleur);

      // Create a new image element
      const imgElement = document.createElement('img');
      imgElement.src = ingredient.children[0].src;
      imgElement.width = ingredientImgRect.width;
      imgElement.height = ingredientImgRect.height;
      imgElement.opacity = 0;

      // Append the new image element to the bubbles container
      bubbles.appendChild(imgElement);
    } else {
      alert(`Je hebt dit ingrediënt al gebruikt!`);
    }
  });
});