const root = document.querySelector(":root")
const currentVolgorde = localStorage.getItem("volgorde").split(",", 6)
let currentKoning = localStorage.getItem("koning")
let currentHeks = localStorage.getItem("heks");

// If it's christmas, change the role icons to the christmas ones
if (localStorage.getItem('theme') === "christmas") {
    root.style.setProperty("--koning-icon-src", "url('../../img/rollen/kerstman.svg')")
    root.style.setProperty("--heks-icon-src", "url('../../img/rollen/grinch.svg')")
}

let ronde = 0;
let nuAanDeBeurt = 0;

if (localStorage.getItem("ronde") != null)
{
    ronde = localStorage.getItem("ronde")
}
if (localStorage.getItem("nuAanDeBeurt") != null)
{
    nuAanDeBeurt = localStorage.getItem("nuAanDeBeurt")
}

const beurtKlaarButton = document.querySelector("button")
const nuAanDeBeurtElement = document.querySelector("p")
const roleIconElement = document.getElementById("roleicon")

let specialActionRequired = false
let specialActionDone = false

function updateAanDeBeurt() {
    currentKoning = localStorage.getItem("koning")
    currentHeks = localStorage.getItem("heks");
    specialActionDone = localStorage.getItem("specialActionDone");
    console.log(specialActionDone)
    if (specialActionRequired && ((specialActionDone != "koningkaarten" && nuAanDeBeurtElement.innerText == String(currentKoning)) || (specialActionDone != "heksensoep" && nuAanDeBeurtElement.innerText == String(currentHeks))))
    {
        beurtKlaarButton.innerText = "Voer eerst de\nspeciale actie uit"
    }
    else {
        beurtKlaarButton.innerText = "Beurt Klaar"
        localStorage.setItem("specialActionDone", false);
        if (nuAanDeBeurt >= 6)
        {
            nuAanDeBeurt = 0;
            ronde++
        }
        nuAanDeBeurtElement.innerText = currentVolgorde[nuAanDeBeurt]
        console.log(currentVolgorde[nuAanDeBeurt] + currentKoning + currentHeks)
        if (nuAanDeBeurtElement.innerText == String(currentKoning))
        {
            roleIconElement.className = "koning"
            specialActionRequired = true
        }
        else if (nuAanDeBeurtElement.innerText == String(currentHeks))
        {
            roleIconElement.className = "heks"
            specialActionRequired = true
        }
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
updateAanDeBeurt()
beurtKlaarButton.addEventListener("click", updateAanDeBeurt)