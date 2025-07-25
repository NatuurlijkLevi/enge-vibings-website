// Initialize variables
const challengeButton = document.getElementById("challenge-button");
const challengeContainer = document.getElementById("challenge-container");
const challenges = document.getElementById("challenges");
const challengeRect = challenges.getBoundingClientRect();
const challengeWidth = challengeRect.width;
// Hide the challenge container to the left with the button sticking out
challengeContainer.style.transform = "translate(-" + challengeWidth + "px)";

// Initialize variables for the ontstopper and banaan containers
const ontstopperContainer = document.getElementById("ontstoppercontainer");
const banaanContainer = document.getElementById("banaancontainer");
const banaan = document.querySelector("#banaancontainer > object:nth-child(1)");

// Initialize variables for the ontstopper and banaan animations
const ontstopperContainerAnimation = "ontstopperPullChallenges 2500ms linear";
const banaanContainerAnimation = "bananaAppear 1250ms ease-in-out";
const banaanAnimation = "bananaShootToCloseChallenges 1250ms ease-in";

let animationBusy = false;
const horrorSpelButton = document.getElementById("horrorspel");
const wiiSpelButton = document.getElementById("wii");

// Add an event listener to the challenge button
// When the button is clicked, the challenge container will slide out
// If the button is clicked again, the challenge container will slide back in
challengeButton.addEventListener("click", () => {

    if (challengeButton.classList.contains("clicked") && !animationBusy)
    {
        animationBusy = true;
        banaan.style.animation = banaanAnimation
        banaanContainer.style.animation = banaanContainerAnimation;
        setTimeout(() => {
            challengeContainer.style.transform = "translate(-" + challengeWidth + "px)";
            challengeButton.classList.remove("clicked");
        }, 1000);
        setTimeout(() => {
            banaan.style.animation = "";
            banaanContainer.style.animation = "";
            setTimeout(() => {
                animationBusy = false;
            }, 100);
        }, 1250);
    }
    else if (!animationBusy)
    {
        animationBusy = true;
        ontstopperContainer.style.animation = ontstopperContainerAnimation;
        setTimeout(() => {
            challengeContainer.style.transform = "translate(0)";
            challengeButton.classList.add("clicked");
        }, 1750);
        setTimeout(() => {
            ontstopperContainer.style.animation = "";
            setTimeout(() => {
                animationBusy = false;
            }, 100);
        }, 2500);
    }
});

// Initialize variables for the horrorspel popup
let horrorSpelOgenOne;
let horrorSpelOgenTwo;
let horrorSpelPopUpButton;

// function to show the horrorspel popup
function showHorrorspelPopUp() {
    const horrorSpelPopUp = document.createElement("div");
    horrorSpelPopUp.innerHTML += `  <div id="horrorspel-popup">
                                        <h1>Hoeveel ogen?</h1>
                                        <div id="ogen-container">
                                            <input type="number" id="ogen1" min="1" max="6">
                                            <input type="number" id="ogen2" min="1" max="6">
                                        </div>
                                        <button>Open horrorspel</button>
                                        <a href="horrorspel-alternatief:">Open alternatief</a>
                                    </div>`;
    document.body.appendChild(horrorSpelPopUp);
    horrorSpelOgenOne = document.getElementById("ogen1");
    horrorSpelOgenTwo = document.getElementById("ogen2");
    horrorSpelPopUpButton = document.querySelector("#horrorspel-popup > button");
    horrorSpelPopUpAlt = document.querySelector("#horrorspel-popup > a");
    horrorSpelPopUpButton.addEventListener("click", openHorrorSpel);
    horrorSpelPopUpAlt.addEventListener("click", openHorrorSpelAlt);
}

function showWiiSpelPopUp() {
    const wiiSpelPopUp = document.createElement("div");
    wiiSpelPopUp.innerHTML += `     <div id="wii-popup">
                                        <h1>Wii Spellen</h1>
                                        <ul>
                                            <li><a href="tetrispartydeluxe:" onclick="closeWiiSpelPopUp()" target="_blank">Tetris Party Deluxe</a></li>
                                            <li><a href="udrawstudio:" onclick="closeWiiSpelPopUp()" target="_blank">uDraw Studio</a></li>
                                            <li><a href="wariowaresmoothmoves:" onclick="closeWiiSpelPopUp()" target="_blank">Wario Ware: Smooth Moves</a></li>
                                            <li><a href="wiiparty:" onclick="closeWiiSpelPopUp()" target="_blank">Wii Party</a></li>
                                            <li><a href="wiisportsresort:" onclick="closeWiiSpelPopUp()" target="_blank">Wii Sports Resort</a></li>
                                        </ul>
                                    </div>`;
    document.body.appendChild(wiiSpelPopUp);
}

// Add an event listener to the horrorspel button
// When the button is clicked, the horrorspel popup will be shown
horrorSpelButton.addEventListener("click", showHorrorspelPopUp);
wiiSpelButton.addEventListener("click", showWiiSpelPopUp);

// function to remove the horrorspel popup
function removeContainer(container){
    horrorSpelOgenOne = null;
    horrorSpelOgenTwo = null;
    horrorSpelPopUpButton = null;
    horrorSpelPopUpAlt = null;
    
    container.remove();
}

// function to open the horrorspel
function openHorrorSpel() {
    const horrorSpelContainer = document.querySelector("div:has(> #horrorspel-popup)");
    if (horrorSpelContainer && horrorSpelOgenOne.value !== "" && horrorSpelOgenTwo.value !== "" && horrorSpelOgenOne.value > 0 && horrorSpelOgenOne.value < 7 && horrorSpelOgenTwo.value > 0 && horrorSpelOgenTwo.value < 7)
    {   
        const ogenOne = horrorSpelOgenOne.value;
        const ogenTwo = horrorSpelOgenTwo.value;
        window.open(`horrorspel-${ogenOne}-${ogenTwo}:`);
        removeContainer(horrorSpelContainer);
        horrorSpelPopUpButton.removeEventListener("click", openHorrorSpel);
        horrorSpelPopUpAlt.removeEventListener("click", openHorrorSpelAlt);
    }
}

function closeWiiSpelPopUp() {
    const wiiSpelContainer = document.querySelector("div:has(> #wii-popup)");
    if (wiiSpelContainer) {
        removeContainer(wiiSpelContainer);
    }
}

// Add an event listener to the horror spel alt button
function openHorrorSpelAlt() {
    const horrorSpelContainer = document.querySelector("div:has(> #horrorspel-popup)");
    if (horrorSpelContainer) {
        window.open("horrorspel-alternatief:");
        removeContainer(horrorSpelContainer);
        horrorSpelPopUpButton.removeEventListener("click", openHorrorSpel);
        horrorSpelPopUpAlt.removeEventListener("click", openHorrorSpelAlt);
    }
}