let closeX;
let popUpIsClosed = true;
let heksensoepPopUp = false;

function showPopUp(type, message) {
    popUpIsClosed = false;
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up-container");
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

function hidePopUp() {
    const popUp = document.querySelector(".pop-up-container");
    if (popUp) {
        closeX.removeEventListener("click", hidePopUp);
        closeX = null;
        popUp.remove();
        popUpIsClosed = true;
        if (heksensoepPopUp){
            localStorage.setItem("specialActionDone", "heksensoep");
        }
    }
}