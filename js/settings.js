const consoleLog = document.querySelector("body > div")
const consoleInput = document.querySelector("body > input")

consoleLog.innerHTML = localStorage.getItem("consoleLogContent");

function clearLocalStorage() {
    localStorage.clear();
    consoleLog.innerHTML += "Cleared all local storage<br>";
    location.reload();
}

function clearHeksensoep() {
    localStorage.removeItem("usedIngredients");
    localStorage.removeItem("usedKerstspullen");
    consoleLog.innerHTML += "Cleared heksensoep progress<br>";
}

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && consoleInput.value !== "") {
        switch (consoleInput.value) {
            default: 
                consoleLog.innerHTML += consoleInput.value + " is not a valid command type 'help' for a list of commands<br>";
                break;
            case "help":
                consoleLog.innerHTML += "localstorage clear - clear all localstorage data<br>";
                consoleLog.innerHTML += "localstorage clear heksensoep - clear heksensoep progress<br>";
                break;
            case "localstorage clear":
                clearLocalStorage();
                break;
            case "localstorage clear heksensoep":
                clearHeksensoep();
                break;
        }
        consoleInput.value = "";
    }
})