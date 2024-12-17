// Initiate the variables
const root = document.querySelector(":root")
let currentVolgorde;
let currentKoning;
let currentHeks;
let lastRoundHeksensoepDone = localStorage.getItem("lastRoundHeksensoepDone") || "false";

let ronde = 0;
let nuAanDeBeurt = 0;

const beurtKlaarButton = document.querySelector("button")
const nuAanDeBeurtElement = document.querySelector("p")
const roleIconElement = document.getElementById("roleicon")

let specialActionRequired = false
let specialActionDone = false

// If it's christmas, change the role icons to the christmas ones
if (localStorage.getItem('theme') === "christmas") {
    root.style.setProperty("--koning-icon-src", "url('../../img/rollen/kerstman.svg')")
    root.style.setProperty("--heks-icon-src", "url('../../img/rollen/grinch.svg')")
}

// If the local storage contains the volgorde, koning and heks, set the variables to the local storage values
if (localStorage.getItem("ronde") != null)
{
    ronde = localStorage.getItem("ronde")
}
if (localStorage.getItem("nuAanDeBeurt") != null)
{
    nuAanDeBeurt = localStorage.getItem("nuAanDeBeurt")
}

// Function to update the spinned items
function updateSpinnedItems() {
    currentVolgorde = localStorage.getItem("volgorde").split(",", 6)
    currentKoning = localStorage.getItem("koning")
    currentHeks = localStorage.getItem("heks");
}

// Wait for the spinned items to be set in the local storage
const waitForSpinnedItems = setInterval(() => {
    if (localStorage.getItem("volgordeDone") === "true" && localStorage.getItem("koning") != null && localStorage.getItem("heks") != null) {
        updateSpinnedItems();
        updateAanDeBeurt();
        clearInterval(waitForSpinnedItems);
    }
}, 1000);

// Function to update the current player
function updateAanDeBeurt() {
    currentKoning = localStorage.getItem("koning")
    let lastHeks = currentHeks
    currentHeks = localStorage.getItem("heks");

    // If the last heks is not the same as the current heks, the last round heksensoep is not done
    if (lastHeks != currentHeks)
    {
        lastRoundHeksensoepDone = false
    }

    // If the special action is required and the special action is not done, the button will show a message
    specialActionDone = localStorage.getItem("specialActionDone");
    console.log(specialActionDone)
    if (specialActionRequired && ((specialActionDone != "koningkaarten" && nuAanDeBeurtElement.innerText == String(currentKoning)) || (specialActionDone != "heksensoep" && nuAanDeBeurtElement.innerText == String(currentHeks))))
    {
        beurtKlaarButton.innerText = "Voer eerst de\nspeciale actie uit"
    }
    // If the special action is required and the special action is done or the special action is not required, the button will show the normal message on the button
    else
    {
        beurtKlaarButton.innerText = "Beurt Klaar"
        localStorage.setItem("specialActionDone", false);
        // If the current player is the last player, the round will be increased and the current player will be the first player
        if (nuAanDeBeurt >= 6)
        {
            nuAanDeBeurt = 0;
            ronde++
        }
        // The current player will be updated
        nuAanDeBeurtElement.innerText = currentVolgorde[nuAanDeBeurt]
        // If the current player is the king, the role icon will be the king icon and the special action is required
        if (nuAanDeBeurtElement.innerText == String(currentKoning))
        {
            roleIconElement.className = "koning"
            specialActionRequired = true
        }
        // If the current player is the witch, the role icon will be the witch icon
        else if (nuAanDeBeurtElement.innerText == String(currentHeks))
        {
            roleIconElement.className = "heks"
            // If the last round heksensoep is done, the special action is not required
            if (lastRoundHeksensoepDone == "true")
            {
                specialActionRequired = false
                lastRoundHeksensoepDone = "false"
            }
            // If the last round heksensoep is not done, the special action is required
            else
            {
                specialActionRequired = true
                lastRoundHeksensoepDone = "true"
            }
            // The last round heksensoep is updated in the local storage
            localStorage.setItem("lastRoundHeksensoepDone", lastRoundHeksensoepDone)
            console.log(lastRoundHeksensoepDone)
        }
        // If the current player is neither the king nor the witch, there will be no icons and the special action is not required
        else
        {
            roleIconElement.classList.remove("koning")
            roleIconElement.classList.remove("heks")
            specialActionRequired = false
        }
        localStorage.setItem("ronde", ronde)
        localStorage.setItem("nuAanDeBeurt", nuAanDeBeurt)
        nuAanDeBeurt++
    }
}

// If the button is clicked, the current player will be updated
beurtKlaarButton.addEventListener("click", updateAanDeBeurt)