const consoleLog = document.querySelector("body > div")
const consoleInput = document.querySelector("body > input")

consoleLog.innerHTML = localStorage.getItem("consoleLogContent");

function clearLocalStorage() {
    localStorage.clear();
    consoleLog.innerHTML += "game progress clear - clear the game progress<br>";
    location.reload();
}

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && consoleInput.value !== "") {
        switch (consoleInput.value) {
            default: 
                consoleLog.innerHTML += consoleInput.value + " is not a valid command type 'help' for a list of commands<br>";
                break;
            case "help":
                consoleLog.innerHTML += "clear localstorage - clear all localstorage data<br>";
                break;
            case "clear localstorage":
                clearLocalStorage();
                break;
        }
        consoleInput.value = "";
    }
})