// Initialize the settings page variables
const consoleLog = document.querySelector("body > div")
const consoleInput = document.querySelector("body > input")

// Load the console log content from local storage
consoleLog.innerHTML = localStorage.getItem("consoleLogContent");

// Function to clear all local storage
function clearLocalStorage() {
    localStorage.clear();
    consoleLog.innerHTML += "Cleared all local storage<br>";
    location.reload();
}

// Function to clear heksensoep progress
function clearHeksensoep() {
    localStorage.removeItem("usedIngredients");
    localStorage.removeItem("usedKerstspullen");
    consoleLog.innerHTML += "Cleared heksensoep progress<br>";
}

// Add an event listener to the console input
document.addEventListener("keyup", (event) => {
    // If the enter key is pressed and the console input is not empty check the input
    if (event.key === "Enter" && consoleInput.value !== "") {
        switch (consoleInput.value) {
            // If the input is not a valid command, display an error message
            default: 
                consoleLog.innerHTML += consoleInput.value + " is not a valid command type 'help' for a list of commands<br>";
                break;
            // If the input is a valid command, execute the command
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
        // Clear the console input after the command is executed
        consoleInput.value = "";
    }
})