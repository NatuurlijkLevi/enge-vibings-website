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
const ontstopperContainerAnimation = "ontstopperPullChallenges 5s linear";
const banaanContainerAnimation = "bananaAppear 2500ms ease-in-out";
const banaanAnimation = "bananaShootToCloseChallenges 2500ms ease-in-out";

console.log(ontstopperContainer, ontstopperContainerAnimation)

let animationBusy = false;

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
        }, 2000);
        setTimeout(() => {
            banaan.style.animation = "";
            banaanContainer.style.animation = "";
            setTimeout(() => {
                animationBusy = false;
            }, 100);
        }, 2500);
    }
    else if (!animationBusy)
    {
        animationBusy = true;
        ontstopperContainer.style.animation = ontstopperContainerAnimation;
        setTimeout(() => {
            challengeContainer.style.transform = "translate(0)";
            challengeButton.classList.add("clicked");
        }, 3500);
        setTimeout(() => {
            ontstopperContainer.style.animation = "";
            setTimeout(() => {
                animationBusy = false;
            }, 100);
        }, 5000);
    }
});