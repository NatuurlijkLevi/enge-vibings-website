// Initialize variables for the pop-up
let closeX;
let popUpIsClosed = true;
let heksensoepPopUp = false;

// function to show the pop-up
// @param type: the type of the pop-up
// @param message: the message to display in the pop-up
function showPopUp(type, message) {
    popUpIsClosed = false;
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up-container");
    // Create the pop-up based on the type
    switch (type) {
        case "wheelspinner":
            popUp.innerHTML += `<div class="pop-up wheelspinner">
                                    <div class="x"></div>
                                    <h1>Wheelspinner</h1>
                                    <p>${message}</p>
                                </div>`;
            heksensoepPopUp = false;
            break;
        case "heksensoep":
            popUp.innerHTML += `<div class="pop-up heksensoep">
                                    <div class="x"></div>
                                    <h1 class="pop-up-text">Je neemt een slok...</h1>
                                    <p class="pop-up-text">${message}</p>
                                </div>`;
            heksensoepPopUp = true;
            break;
        case "kerstgrot":
            popUp.innerHTML += `<div class="pop-up kerstgrot">
                                    <div class="x"></div>
                                    <h1 class="pop-up-text">Je tieft het in het vuur...</h1>
                                    <p class="pop-up-text">${message}</p>
                                </div>`;
            heksensoepPopUp = true;
            break;
    }
    closeX = popUp.querySelector(".x");
    closeX.addEventListener("click", hidePopUp);
    document.body.appendChild(popUp);
}

// function to hide the pop-up
function hidePopUp() {
    // Remove the pop-up from the DOM
    const popUp = document.querySelector(".pop-up-container");
    if (popUp) {
        closeX.removeEventListener("click", hidePopUp);
        closeX = null;
        popUp.remove();
        popUpIsClosed = true;
        // Set the special action done to heksensoep if the pop-up was a heksensoep pop-up
        if (heksensoepPopUp){
            localStorage.setItem("specialActionDone", "heksensoep");
        }
    }
}