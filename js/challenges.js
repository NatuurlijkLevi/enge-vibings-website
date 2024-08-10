const challengeButton = document.getElementById("challenge-button");
const challengeContainer = document.getElementById("challenge-container");
const challenges = document.getElementById("challenges");
const challengeRect = challenges.getBoundingClientRect();
const challengeWidth = challengeRect.width;
challengeContainer.style.transform = "translate(-" + challengeWidth + "px)";

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