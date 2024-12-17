// Initialize variables
const kerstspullen = document.querySelectorAll('.kerstspul');
const vuurContainer = document.getElementById('vuur-container');
const root = document.querySelector(':root');

// Initialize the game elements so the iframe gets always loaded (the iframe.onload event listener is not always working)
async function initializeGameElements() {  
  // If there is local storage, get the kerstspuls that are already used
  let usedKerstspullen = JSON.parse(localStorage.getItem('usedKerstspullen')) || [];
  console.log(usedKerstspullen);
  
  if (Array.isArray(usedKerstspullen)) {
    usedKerstspullen.forEach(kerstspul => {
      kerstspullen.forEach(kerstspulElement => {
        let storedKerstspulForFire = kerstspulElement.querySelector('p').innerText.toLowerCase().replace('+', 'en');
        while (storedKerstspulForFire.includes(' ')) {
          storedKerstspulForFire = storedKerstspulForFire.replace(' ', '');
        }
        if (storedKerstspulForFire === kerstspul) {
          kerstspulElement.classList.toggle('used');
        }
      });
    });
  } else {
    console.error('usedKerstspullen is not an array:', usedKerstspullen);
  }
}

initializeGameElements();

// Burn the kerstspul
function burnKerstspul() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Arrays with responses for moving forward and backward
  const forward = [5, 6, 7, 8];
  const goodResponse = [
    "De rook ruikt heerlijk!</p><p class='pop-up-text'>Hierdoor ga je ",
    "Het voelt goed!</p><p class='pop-up-text'>Daarom ga je ",
    "De brandlucht geeft een reuksensatie!</p><p class='pop-up-text'>Ga hierom ",
    "De grot verwamt goed!</p><p class='pop-up-text'>Hierom ga je "
  ];
  const backward = [3, 4, 9, 10];
  const badResponse = [
    "Er ontstaat een grote steekvlam!</p><p class='pop-up-text'>Hierdoor moet je door je mond uit te spoelen ",
    "Er ontstaat een explosie!</p><p class='pop-up-text'>Hierdoor ga je ",
    "Het vuur slaat op hol!</p><p class='pop-up-text'>Daarom moet je ",
    "Je verbrand je vingers!</p><p class='pop-up-text'>Daarom ga je "
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
  showPopUp("kerstgrot", message);
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

// Add an event listener to each kerstspul
// When an kerstspul is clicked, the kerstspul will be burned
kerstspullen.forEach(kerstspul => {
  kerstspul.addEventListener('click', () => {
    if (!kerstspul.classList.contains('used')) {
      let deepestChildParent = kerstspul;
      while (deepestChildParent.children.length < 2) {
        deepestChildParent = deepestChildParent.children[0];
      }
      const kerstspulImg = deepestChildParent.children[0].children[0];
      const kerstspulName = deepestChildParent.children[1].innerText;
      const kerstspulImgRect = kerstspulImg.getBoundingClientRect();
      kerstspul.classList.toggle('used');

      // Create a new image element
      const firstkerstspulImg = kerstspulImg.cloneNode(true);
      firstkerstspulImg.width = kerstspulImgRect.width;
      firstkerstspulImg.height = kerstspulImgRect.height;
      firstkerstspulImg.style.opacity = 0;

      // Append the new image element to the vuurContainer element
      vuurContainer.appendChild(firstkerstspulImg);
      setTimeout(() => {
        kerstspulForFire = kerstspulName.toLowerCase().replace('’', '');
        while (kerstspulForFire.includes(' ')) {
          kerstspulForFire = kerstspulForFire.replace(' ', '');
        }
        console.log(kerstspulForFire);
        if (kerstspulForFire === 'kerstsokken') {
          const secondkerstspulImg = kerstspulImg.cloneNode(true);
          secondkerstspulImg.width = kerstspulImgRect.width;
          secondkerstspulImg.height = kerstspulImgRect.height;
          secondkerstspulImg.style.opacity = 0;
          vuurContainer.appendChild(secondkerstspulImg);
          setTimeout(() => {
            const thirdkerstspulImg = kerstspulImg.cloneNode(true);
            thirdkerstspulImg.width = kerstspulImgRect.width;
            thirdkerstspulImg.height = kerstspulImgRect.height;
            thirdkerstspulImg.style.opacity = 0;
            vuurContainer.appendChild(thirdkerstspulImg);
          }, 600);
        }
        // Store the used kerstspulForFire in an array in the local storage
        usedKerstspullen = JSON.parse(localStorage.getItem('usedKerstspullen')) || [];
        if (!usedKerstspullen.includes(kerstspulForFire)) {
          if (!Array.isArray(usedKerstspullen)) {
            usedKerstspullen = [];
          }
          usedKerstspullen.push(kerstspulForFire);
          localStorage.setItem('usedKerstspullen', JSON.stringify(usedKerstspullen));
        }
        if (kerstspulForFire != 'kerstsokken') {
          setTimeout(() => {
            burnKerstspul();
          }, 1000);
        }
        else {
          setTimeout(() => {
            burnKerstspul();
          }, 2200);
        }
      }, 600);
    }
  });
});