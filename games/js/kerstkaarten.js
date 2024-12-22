// Initialize variables
const kerstmanButton = document.querySelector("button");
const kerstmanH1 = document.querySelector("h1");
const kerstmanP = document.querySelector("p");

let kerstmanDied = false;
let lastTimeNegative = false;
    
// function to draw a random card
async function drawRandomCard()
{
    // Fetch the kerstkaarten.json file
    const response = await fetch("json/kerstkaarten.json");
    // Get the data from the response
    const data = await response.json();
    // Get a random number between 0 and 1
    const r = Math.random();

    // Make an array with the positive or negative cards
    let cardArray;
    if (r > 0.5 || lastTimeNegative)
    {
        cardArray = data.positive;
        lastTimeNegative = false;
    }
    else
    {
        cardArray = data.negative;
        lastTimeNegative = true;
    }

    // Get a random card from the cardArray
    let cardValue = Math.floor(Math.random() * cardArray.length);
    // If the number is 0 and the king died by that same card that has already been drawn, draw a new card
    if (kerstmanDied) {
        while (cardValue === 0)
        {
            cardValue = Math.floor(Math.random() * cardArray.length);
        }
        kerstmanDied = false;
    }
    // If the number is 0 and this turn the card is negative, set the kerstmanDied variable to true
    if (cardValue === 0 && lastTimeNegative)
    {
        kerstmanDied = true;
    }

    // Get the card from the cardArray and set the innerHTML of the h1 and p elements
    kerstmanH1.innerHTML = cardArray[cardValue][0];
    kerstmanP.innerHTML = cardArray[cardValue][1];
    // Set the specialActionDone variable to koningkaarten
    localStorage.setItem("specialActionDone", "koningkaarten");
}    

// If you press the button, draw a random card
kerstmanButton.addEventListener('click', function() {
    drawRandomCard();
});
