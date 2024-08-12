const ingredienten = document.querySelectorAll('.ingredient');
const root = document.querySelector(':root');
const iframe = document.getElementById('ketel-bubbels')
const ketelSvgGroup = document.querySelector('div#ketel > svg > g');
let innerDoc;
let bubbles;
let iframeRoot;
let bubble;
iframe.onload = () => {
  innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  bubbles = innerDoc.getElementById('bubbles');
  iframeRoot = innerDoc.querySelector(':root');
  bubble = innerDoc.querySelectorAll('.bubble');
}
let ingredientForSoep;

function changeSoupWaterColorByAdding(ingredient){
  const newLayer = '<path d="M621.5 81C621.5 81.6405 621.197 83.1776 618.606 85.6363C616.013 88.0964 611.777 90.8267 605.635 93.6462C593.396 99.2649 575.212 104.515 552.15 108.993C506.151 117.925 442.277 123.5 371.5 123.5C300.723 123.5 236.849 117.925 190.85 108.993C167.788 104.515 149.604 99.2649 137.365 93.6462C131.223 90.8267 126.987 88.0964 124.394 85.6363C121.803 83.1776 121.5 81.6405 121.5 81C121.5 80.3595 121.803 78.8224 124.394 76.3637C126.987 73.9036 131.223 71.1733 137.365 68.3538C149.604 62.7351 167.788 57.4851 190.85 53.0071C236.849 44.0752 300.723 38.5 371.5 38.5C442.277 38.5 506.151 44.0752 552.15 53.0071C575.212 57.4851 593.396 62.7351 605.635 68.3538C611.777 71.1733 616.013 73.9036 618.606 76.3637C621.197 78.8224 621.5 80.3595 621.5 81Z" fill="var(--' + ingredient + '-insoep)" class="added-color"/>';
  ketelSvgGroup.innerHTML += newLayer;
  bubble.forEach(bubbleElement => {
    let newChild = document.createElement('div');
    newChild.id = ingredient;
    let currentElement = bubbleElement;
    while (currentElement.children.length > 0) {
      currentElement = currentElement.children[0];
    }
    currentElement.appendChild(newChild);
  })
  ingredienten.forEach(ingredientenGridItems => {
    const ingredientenGridItemContent = ingredientenGridItems.innerHTML;
    ingredientenGridItems.innerHTML = '<div id="' + ingredient + '" class="added-color">' + ingredientenGridItemContent + '</div>'
    setTimeout(() => {
      const addedColor = document.querySelector(".added-color");
      addedColor.classList.remove('added-color');
    }, 500);
  })
}

function sipSoep() {
  const randomNumber = Math.random();
  const forward = [5, 6, 7, 8]
  const goodResponse = 
                      [
                        "Het smaakt heerlijk! Hierdoor ga je ",
                        "De soep is verrukelijk! Daarom ga je ",
                        "De soep is om je vingers bij af te likken! Ga hierom ",
                        "Het is om van te smullen! Hierom ga je ",
                        "De soep is zo lekker dat je "
                      ]
  const backward = [3, 4, 9, 10]
  const badResponse = 
                      [
                        "Het smaakt afschuwelijk! Hierdoor moet je door je mond uit te spoelen ",
                        "De soep is niet te drinken! Hierdoor ga je ",
                        "Het is niet te eten! Daarom moet je ",
                        "De soep is niet te vreten! Daarom ga je ",
                        "De soep is zo vies dat je "
                      ]
  const moveResponse = 
                      [
                        " vakjes ",
                        " stappen ",
                        " hokjes ",
                      ]

  alert("Je neemt een slok...");
  let message;
  if (randomNumber < 0.5) {
    const randomBackward = backward[Math.floor(Math.random() * backward.length)];
    const randomBadResponse = badResponse[Math.floor(Math.random() * badResponse.length)];
    const randomMoveResponse = moveResponse[Math.floor(Math.random() * moveResponse.length)];
    message = randomBadResponse + randomBackward + randomMoveResponse + "achteruit.";
  }
  else {
    const randomForward = forward[Math.floor(Math.random() * forward.length)];
    const randomGoodResponse = goodResponse[Math.floor(Math.random() * goodResponse.length)];
    const randomMoveResponse = moveResponse[Math.floor(Math.random() * moveResponse.length)];
    message = randomGoodResponse + randomForward + randomMoveResponse + "vooruit.";
  }
  message = "Je neemt een slok...\n\n\n\n" + message;
  alert(message);
  
}

ingredienten.forEach(ingredient => {
  ingredient.addEventListener('click', () => {
    if (!ingredient.classList.contains('used')) {      
      let deepestChildParent = ingredient;
      while (deepestChildParent.children.length < 2) {
        deepestChildParent = deepestChildParent.children[0];
      }
      const ingredientImg = deepestChildParent.children[0].children[0];
      const ingredientName = deepestChildParent.children[1].innerText;
      const ingredientImgRect = ingredientImg.getBoundingClientRect();
      ingredient.classList.toggle('used');

      // Create a new image element
      ingredientImg.width = ingredientImgRect.width;
      ingredientImg.height = ingredientImgRect.height;
      ingredientImg.opacity = 0;

      // Append the new image element to the bubbles container
      bubbles.appendChild(ingredientImg);
      setTimeout(() => {
        ingredientForSoep = ingredientName.toLowerCase().replace('’', '');
        while (ingredientForSoep.includes(' ')) {
          ingredientForSoep = ingredientForSoep.replace(' ', '');
        }
        if (ingredientForSoep === 'zuurvandedoden') {
          const secondIngredientImg = ingredientImg.cloneNode(true);
          secondIngredientImg.width = ingredientImgRect.width;
          secondIngredientImg.height = ingredientImgRect.height;
          secondIngredientImg.opacity = 0;
          bubbles.appendChild(secondIngredientImg);
          setTimeout(() => {
            const thirdIngredientImg = ingredientImg.cloneNode(true);
            thirdIngredientImg.width = ingredientImgRect.width;
            thirdIngredientImg.height = ingredientImgRect.height;
            thirdIngredientImg.opacity = 0;
            bubbles.appendChild(thirdIngredientImg);
          }, 600);
        }
        if (ingredientForSoep != 'zuurvandedoden') {
          changeSoupWaterColorByAdding(ingredientForSoep);
          setTimeout(() => {
            sipSoep();
          }, 1250);
        }
        else {
          setTimeout(() => {
            changeSoupWaterColorByAdding(ingredientForSoep);
          }, 1200);
          setTimeout(() => {
            sipSoep();
          }, 2200);
        }
      }, 600);
    } else {
      alert(`Je hebt dit ingrediënt al gebruikt!`);
    }
  });
});