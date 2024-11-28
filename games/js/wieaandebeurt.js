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
let nuAanDeBeurt = 0
let beurt = [ronde, nuAanDeBeurt]

const beurtKlaarButton = document.querySelector("button")
const nuAanDeBeurtElement = document.querySelector("p")
const roleIconElement = document.getElementById("roleicon")

function updateAanDeBeurt() {
    console.log(nuAanDeBeurt)
    if (nuAanDeBeurt >= 6)
    {
        nuAanDeBeurt = 0;
        ronde++
    }
    nuAanDeBeurtElement.innerText = currentVolgorde[nuAanDeBeurt]
    console.log(currentVolgorde[nuAanDeBeurt] + currentKoning + currentHeks)
    if (nuAanDeBeurtElement.innerText == String(currentKoning))
    {
        console.log(nuAanDeBeurtElement.innerText+"=="+currentKoning)
        roleIconElement.className = "koning"
    }
    else if (nuAanDeBeurtElement.innerText == String(currentHeks))
    {
        console.log(nuAanDeBeurtElement.innerText+"=="+currentHeks)
        roleIconElement.className = "heks"
    }
    else
    {
        console.log(nuAanDeBeurtElement.innerText+"!="+currentKoning+nuAanDeBeurtElement.innerText+"!="+currentHeks)
        roleIconElement.classList.remove("koning")
        roleIconElement.classList.remove("heks")
    }
    beurt = [ronde, nuAanDeBeurt]
    console.log(beurt)
    nuAanDeBeurt++
}
updateAanDeBeurt()
beurtKlaarButton.addEventListener("click", updateAanDeBeurt)