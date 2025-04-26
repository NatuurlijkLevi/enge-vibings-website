// Initialize variables
const ingredienten = document.querySelectorAll('.ingredient');
const root = document.querySelector(':root');
const iframe = document.getElementById('ketel-bubbels');
const ketelSvgGroup = document.querySelector('div#ketel > svg > g');
let ingredientenToegevoegd = localStorage.getItem('ingredientenToegevoegd') || 0;
let innerDoc;
let bubbles;
let iframeRoot;
let bubble;
let bubblesLoaded;

// Initialize the game elements so the iframe gets always loaded (the iframe.onload event listener is not always working)
async function initializeGameElements() {
  innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  bubbles = await innerDoc.getElementById('bubbles');
  bubble = await innerDoc.querySelectorAll('.bubble');
  iframeRoot = await innerDoc.querySelector(':root');
  console.log(innerDoc);
  console.log(bubbles);
  if (!bubbles) {
    bubblesLoaded = false;
    setTimeout(() => {
      setBubblesElements();
    }, 1000);
  }


  
  // If there is local storage, get the ingredients that are already used
  let usedIngredients = JSON.parse(localStorage.getItem('usedIngredients')) || [];
  console.log(usedIngredients);
  
  if (Array.isArray(usedIngredients)) {
    usedIngredients.forEach(ingredient => {
      changeSoupWaterColorByAdding(ingredient);
      ingredienten.forEach(ingredientElement => {
        let storedIngredientForSoep = ingredientElement.querySelector('p').innerText.toLowerCase().replace('’', '');
        while (storedIngredientForSoep.includes(' ')) {
          storedIngredientForSoep = storedIngredientForSoep.replace(' ', '');
        }
        if (storedIngredientForSoep === ingredient) {
          ingredientElement.classList.toggle('used');
        }
      });
    });
  } else {
    console.error('usedIngredients is not an array:', usedIngredients);
  }
}

async function setBubblesElements(){
  bubbles = innerDoc.getElementById('bubbles');
  bubble = innerDoc.querySelectorAll('.bubble');
  iframeRoot = innerDoc.querySelector(':root');
  if (bubbles) {
    bubblesLoaded = true;
    console.log(bubbles);
  }
  else {
    setTimeout(() => {
      setBubblesElements();
    }, 1000);
  }
}

initializeGameElements();

let ingredientForSoep;

// Change the color of the soup water by adding an ingredient
function changeSoupWaterColorByAdding(ingredient) {
  const newLayer = `<path d="M621.5 81C621.5 81.6405 621.197 83.1776 618.606 85.6363C616.013 88.0964 611.777 90.8267 605.635 93.6462C593.396 99.2649 575.212 104.515 552.15 108.993C506.151 117.925 442.277 123.5 371.5 123.5C300.723 123.5 236.849 117.925 190.85 108.993C167.788 104.515 149.604 99.2649 137.365 93.6462C131.223 90.8267 126.987 88.0964 124.394 85.6363C121.803 83.1776 121.5 81.6405 121.5 81C121.5 80.3595 121.803 78.8224 124.394 76.3637C126.987 73.9036 131.223 71.1733 137.365 68.3538C149.604 62.7351 167.788 57.4851 190.85 53.0071C236.849 44.0752 300.723 38.5 371.5 38.5C442.277 38.5 506.151 44.0752 552.15 53.0071C575.212 57.4851 593.396 62.7351 605.635 68.3538C611.777 71.1733 616.013 73.9036 618.606 76.3637C621.197 78.8224 621.5 80.3595 621.5 81Z" fill="var(--${ingredient}-insoep)" class="added-color"/>`;
  ketelSvgGroup.innerHTML += newLayer;

  bubble.forEach(bubbleElement => {
    const newChild = document.createElement('div');
    newChild.id = ingredient;
    newChild.classList.add('bubble-color');
    let currentElement = bubbleElement;
    while (currentElement.children.length > 0) {
      currentElement = currentElement.children[0];
    }
    currentElement.appendChild(newChild);
  });

  ingredienten.forEach(ingredientenGridItems => {
    const ingredientenGridItemContent = ingredientenGridItems.innerHTML;
    ingredientenGridItems.innerHTML = `<div id="${ingredient}" class="added-color">${ingredientenGridItemContent}</div>`;
    setTimeout(() => {
      const addedColor = document.querySelector(".added-color");
      if (addedColor) {
        addedColor.classList.remove('added-color');
      }
    }, 500);
  });

  // Store the used ingredient in an array in the local storage
  usedIngredients = JSON.parse(localStorage.getItem('usedIngredients')) || [];
  if (!usedIngredients.includes(ingredient)) {
    if (!Array.isArray(usedIngredients)) {
      usedIngredients = [];
    }
    ingredientenToegevoegd++;
    usedIngredients.push(ingredient);
    localStorage.setItem('usedIngredients', JSON.stringify(usedIngredients));
    localStorage.setItem('ingredientenToegevoegd', ingredientenToegevoegd);
    console.log(ingredientenToegevoegd);
  }
}

// Sip the soup
function sipSoep() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Arrays with responses for moving forward or backward
  const forward = [5, 6, 7, 8];
  const goodResponse = [
    "Het smaakt heerlijk!</p><p class='pop-up-text'>Hierdoor ga je ",
    "De soep is verrukelijk!</p><p class='pop-up-text'>Daarom ga je ",
    "De soep is om je vingers bij af te likken!</p><p class='pop-up-text'>Ga hierom ",
    "Het is om van te smullen!</p><p class='pop-up-text'>Hierom ga je "
  ];
  const backward = [3, 4, 9, 10];
  const badResponse = [
    "Het smaakt afschuwelijk!</p><p class='pop-up-text'>Hierdoor moet je door je mond uit te spoelen ",
    "De soep is niet te drinken!</p><p class='pop-up-text'>Hierdoor ga je ",
    "Het is niet te eten!</p><p class='pop-up-text'>Daarom moet je ",
    "De soep is niet te vreten!</p><p class='pop-up-text'>Daarom ga je "
  ];
  const moveResponse = [
    " vakjes ",
    " stappen ",
    " hokjes ",
  ];

  // Generate a message based on the random number
  let message;
  if (randomNumber < 0.21) {
    const randomBackward = backward[Math.floor(Math.random() * backward.length)];
    const randomBadResponse = badResponse[Math.floor(Math.random() * badResponse.length)];
    const randomMoveResponse = moveResponse[Math.floor(Math.random() * moveResponse.length)];
    message = randomBadResponse + randomBackward + randomMoveResponse + "achteruit.";
  } else {
    const randomForward = forward[Math.floor(Math.random() * forward.length)];
    const randomGoodResponse = goodResponse[Math.floor(Math.random() * goodResponse.length)];
    const randomMoveResponse = moveResponse[Math.floor(Math.random() * moveResponse.length)];
    message = randomGoodResponse + randomForward + randomMoveResponse + "vooruit.";
  }

  // Show the popup with the message and animate the text
  showPopUp("heksensoep", message);
  const quoteText = new SplitType('.pop-up-text', {
      type: 'lines, words, chars',
      tagName: 'span'
    });
  gsap.from('.pop-up-text .char', {
    y: '100%',
    opacity: 0,
    duration: 0.40,
    ease: 'back.out',
    stagger: 0.125,
  });
}

// Add an event listener to each ingredient
// When an ingredient is clicked, the ingredient will be added to the soup if it's not already used
ingredienten.forEach(ingredient => {
  ingredient.addEventListener('click', () => {
    if (!ingredient.classList.contains('used')) {
      let deepestChildParent = ingredient;
      // Get the deepest child of the ingredient
      while (deepestChildParent.children.length < 2) {
        deepestChildParent = deepestChildParent.children[0];
      }
      const ingredientImg = deepestChildParent.children[0].children[0];
      const ingredientName = deepestChildParent.children[1].innerText;
      const ingredientImgRect = ingredientImg.getBoundingClientRect();
      ingredient.classList.toggle('used');

      // Create a new image element
      const firstIngredientImg = ingredientImg.cloneNode(true);
      firstIngredientImg.width = ingredientImgRect.width;
      firstIngredientImg.height = ingredientImgRect.height;
      firstIngredientImg.style.opacity = 0;

      // Append the new image element to the bubbles container
      bubbles.appendChild(firstIngredientImg);
      setTimeout(() => {
        ingredientForSoep = ingredientName.toLowerCase().replace('’', '');
        while (ingredientForSoep.includes(' ')) {
          ingredientForSoep = ingredientForSoep.replace(' ', '');
        }
        console.log(ingredientForSoep);
        // If the ingredient is zuur van de doden, add two more images to the bubbles container
        if (ingredientForSoep === 'zuurvandedoden') {
          const secondIngredientImg = ingredientImg.cloneNode(true);
          secondIngredientImg.width = ingredientImgRect.width;
          secondIngredientImg.height = ingredientImgRect.height;
          secondIngredientImg.style.opacity = 0;
          bubbles.appendChild(secondIngredientImg);
          setTimeout(() => {
            const thirdIngredientImg = ingredientImg.cloneNode(true);
            thirdIngredientImg.width = ingredientImgRect.width;
            thirdIngredientImg.height = ingredientImgRect.height;
            thirdIngredientImg.style.opacity = 0;
            bubbles.appendChild(thirdIngredientImg);
          }, 600);
        }
        // If the ingredient is not zuur van de doden, change the color of the soup water by adding the ingredient
        if (ingredientForSoep != 'zuurvandedoden') {
          setTimeout(() => {
            changeSoupWaterColorByAdding(ingredientForSoep);
          }, 600);
          setTimeout(() => {
            sipSoep();
          }, 1000);
        // If the ingredient is zuur van de doden, change the color of the soup water by adding the ingredient with a longer delay
        } else {
          setTimeout(() => {
            changeSoupWaterColorByAdding(ingredientForSoep);
          }, 1200);
          setTimeout(() => {
            sipSoep();
          }, 2200);
        }
      }, 600);
    }
  });
});