// Initialize variables
const blueOption = document.getElementById('blue-option');
const redOption = document.getElementById('red-option');
const blueOptionText = document.querySelector('#blue-option > p');
const redOptionText = document.querySelector('#red-option > p');
const nextButton = document.getElementById('next-button');

let optionText;
let optionA;
let optionB;
let choiceMade = false;

// Fetch the would-you-rather.json file and select a random would you rather
async function newWouldYouRather() {
    const response = await fetch("json/would-you-rather.json");
    const data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.length);
    optionA = data[randomIndex][0];
    optionB = data[randomIndex][1];
    blueOptionText.innerHTML = optionA;
    redOptionText.innerHTML = optionB;
    optionText = new SplitType('.option-text', {
        types: 'lines, words, chars',
        tagName: 'span'
      });    
    gsap.from('.option-text .line', {
      y: '100%',
      opacity: 0,
      duration: 0.80,
      ease: 'power2.out',
      stagger: 0.15,
    })
    
}

newWouldYouRather();

// When clicked the next button, the next would you rather will be selected
nextButton.addEventListener('click', () => {
    optionText.revert();
    optionA = "";
    optionB = "";
    blueOptionText.innerHTML = "";
    redOptionText.innerHTML = "";
    newWouldYouRather();
});