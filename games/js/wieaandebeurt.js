const currentVolgorde = localStorage.getItem("volgorde").split(",", 6)
let currentKoning = localStorage.getItem("koning")
let currentHeks = localStorage.getItem("heks");

let ronde = 0;
let nuAanDeBeurt = 0
let beurt = [ronde, nuAanDeBeurt]

const beurtKlaarButton = document.querySelector("button")
const nuAanDeBeurtElement = document.querySelector("p")

nuAanDeBeurtElement.innerText = currentVolgorde[0]

beurtKlaarButton.addEventListener("click", () => {
    nuAanDeBeurt++
    if (nuAanDeBeurt >= 6)
    {
        nuAanDeBeurt = 0;
        ronde++
    }
    nuAanDeBeurtElement.innerText = currentVolgorde[nuAanDeBeurt]
    beurt = [ronde, nuAanDeBeurt]
    console.log(beurt)
})