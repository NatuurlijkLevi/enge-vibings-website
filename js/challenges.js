// Initialize variables
const challengeButton = document.getElementById("challenge-button");
const challengeContainer = document.getElementById("challenge-container");
const challenges = document.getElementById("challenges");
const challengeRect = challenges.getBoundingClientRect();
const challengeWidth = challengeRect.width;
// Hide the challenge container to the left with the button sticking out
challengeContainer.style.transform = "translate(-" + challengeWidth + "px)";

// Add an event listener to the challenge button
// When the button is clicked, the challenge container will slide out
// If the button is clicked again, the challenge container will slide back in
challengeButton.addEventListener("click", () => {

    if (challengeButton.classList.contains("clicked"))
    {
        challengeContainer.style.transform = "translate(-" + challengeWidth + "px)";
        challengeButton.classList.remove("clicked");
    }
    else
    {
        challengeContainer.style.transform = "translate(0)";
        challengeButton.classList.add("clicked");
    }
});