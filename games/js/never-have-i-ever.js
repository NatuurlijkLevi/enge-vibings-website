// Initialize variables
const neverHaveIEverText = document.querySelector('#middle > p');
const nextButton = document.getElementById('next-button');

let splitText;
let neverHaveIEver;

// Fetch the never-have-i-ever.json file and select a random never have I ever
async function newNeverHaveIEver() {
    const response = await fetch("json/never-have-i-ever.json");
    const data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.length);
    neverHaveIEver = "Never have I ever " + data[randomIndex];
    neverHaveIEverText.innerHTML = neverHaveIEver;
    splitText = new SplitType('.split-text', {
        types: 'lines, words, chars',
        tagName: 'span'
      });    
    gsap.from('.split-text .line', {
      y: '100%',
      opacity: 0,
      duration: 0.80,
      ease: 'power2.out',
      stagger: 0.15,
    })
    
}

// Call the newNeverHaveIEver function
newNeverHaveIEver();

// Add an event listener to the nextButton
// If the button is clicked, the text will be split and the next never have I ever will be selected
nextButton.addEventListener('click', () => {
    splitText.revert();
    neverHaveIEver = "";
    neverHaveIEverText.innerHTML = "";
    newNeverHaveIEver();
});