// Initialize variables
const body = document.querySelector('body');
const truthOrDareText = document.querySelector('#middle > p');
const truthOrDareHeadText = document.querySelector('#middle > h1');
const truthButton = document.getElementById('truth-button');
const dareButton = document.getElementById('dare-button');

let splitText;
let truthOrDare;
let firstTruthOrDare = true;
let lastTimeClickedTruth = false;
let lastTimeClickedDare = false;

// Make a split text animation
function splitTextAnimation() {
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

// Fetch the truth-or-dare.json file and select a random truth
async function newTruth() {
    const response = await fetch("json/truth-or-dare.json");
    const data = await response.json();
    const truthArray = data.truth;
    let randomIndex = Math.floor(Math.random() * truthArray.length);
    truthOrDare = truthArray[randomIndex];
    truthOrDareHeadText.innerHTML = "Truth";
    truthOrDareText.innerHTML = truthOrDare;
    splitTextAnimation();
}

// Fetch the truth-or-dare.json file and select a random dare
async function newDare() {
    const response = await fetch("json/truth-or-dare.json");
    const data = await response.json();
    const dareArray = data.dare;
    let randomIndex = Math.floor(Math.random() * dareArray.length);
    truthOrDare = dareArray[randomIndex];
    truthOrDareHeadText.innerHTML = "Dare";
    truthOrDareText.innerHTML = truthOrDare;
    splitTextAnimation();
}

// If the truthButton is clicked, fetch a new truth
truthButton.addEventListener('click', () => {
    if (!firstTruthOrDare)
    {
        splitText.revert();
    }
    else 
    {
        firstTruthOrDare = false;
        lastTimeClickedTruth = true;
    }
    if (lastTimeClickedTruth)
    {
        truthOrDareHeadText.classList.remove('split-text');
        truthOrDareHeadText.innerHTML = "Truth";
        lastTimeClickedTruth = true;
        lastTimeClickedDare = false;
    }
    else if (lastTimeClickedDare)
    {
        truthOrDareHeadText.classList.add('split-text');
        lastTimeClickedTruth = true;
        lastTimeClickedDare = false;
    }
    body.style.backgroundPosition = "left";
    truthOrDare = "";
    truthOrDareText.innerHTML = "";
    newTruth();
});

// If the dareButton is clicked, fetch a new dare
dareButton.addEventListener('click', () => {
    if (!firstTruthOrDare)
    {
        splitText.revert();
    }
    else 
    {
        lastTimeClickedDare = true;
        firstTruthOrDare = false;
    }
    if (lastTimeClickedDare)
    {
        truthOrDareHeadText.classList.remove('split-text');
        truthOrDareHeadText.innerHTML = "Dare";
        lastTimeClickedTruth = false;
        lastTimeClickedDare = true;
    }
    else if (lastTimeClickedTruth)
    {
        truthOrDareHeadText.classList.add('split-text');
        lastTimeClickedTruth = false;
        lastTimeClickedDare = true;
    }
    body.style.backgroundPosition = "right";
    truthOrDare = "";
    truthOrDareText.innerHTML = "";
    newDare();
});