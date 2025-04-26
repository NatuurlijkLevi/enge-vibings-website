// Initialize variables
const koningButton = document.querySelector("button");
const koningH1 = document.querySelector("h1");
const koningP = document.querySelector("p");

let koningDied = false || localStorage.getItem("koningDied") === "true";
let lastTimeNegative = false || localStorage.getItem("lastTimeNegative") === "true";
let koningHeeftTyfus = false || localStorage.getItem("koningHeeftTyfus") === "true";

    
// function to draw a random card
async function drawRandomCard()
{
    // Fetch the koningkaarten.json file
    const response = await fetch("json/koningkaarten.json");
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

    localStorage.setItem("lastTimeNegative", lastTimeNegative.toString());

    // Get a random card from the cardArray
    let cardValue = Math.floor(Math.random() * cardArray.length);
    
    // If the king has tyfus, there is a 40% chance the king will no longer have tyfus
    if (koningHeeftTyfus)
    {
        const rT = Math.random();
        if (rT < 0.420)
        {
            koningHeeftTyfus = false;
            localStorage.setItem("koningHeeftTyfus", "false");
            cardArray = data.negative; // The cardArray is negative again to show that the king is back
            cardValue = 9; // The card that says the king is back
        }
    }

    // If the number is 0 and the king died by that same card that has already been drawn, draw a new card
    if (koningDied) {
        while (cardValue === 0)
        {
            cardValue = Math.floor(Math.random() * cardArray.length);
        }
    }
    // If the number is 0 and this turn the card is negative, set the koningDied variable to true
    if (cardValue === 0 && lastTimeNegative)
    {
        koningDied = true;
        localStorage.setItem("koningDied", "true");
    }
    // If the number is 8 and this turn the card is negative, set the koningHeeftTyfus variable to true
    if (cardValue === 8 && lastTimeNegative)
    {
        koningHeeftTyfus = true;
        localStorage.setItem("koningHeeftTyfus", "true");
    }

    // Get the card from the cardArray and set the innerHTML of the h1 and p elements
    koningH1.innerHTML = cardArray[cardValue][0];
    koningP.innerHTML = cardArray[cardValue][1];
    // Set the specialActionDone variable to koningkaarten
    localStorage.setItem("specialActionDone", "koningkaarten");
}    

// If you press the button, draw a random card
koningButton.addEventListener('click', function() {
    drawRandomCard();
});
