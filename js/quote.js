const article = document.querySelector("article");

const minutesForQuote = 5;
const secondsForQuote = minutesForQuote * 60;
const millisecondsForQuote = secondsForQuote * 1000;

const amberNames = ["Amber", "Wasbeer", "HammieDeHam", "HammieDeHamer", "Amber Meijer"]
const jordanNames = ["Jordan", "iJordan_", "jordansoerendonk", "ItsJordanNL", "Zratan", "Jordan Johannes Romanus Adrianus Koevoets"];
const leviNames = ["Levi", "NatuurlijkLevi", "Leviman", "GewoonLevi", "HenryJonesJunior1", "HenryGamingYT", "Levi Meijer"];
const loekNames = ["Loek", "LOEKMANS", "Loekman", "loekmeneerman", "LivingRoomPlant", "Just Some Guy", "Plant", "Kamerplant", "Dode plant", "Dode kamerplant", "loekmeneer", "Loek Theodoris Adrianus van Kessel", "Loek Theodoris Adrianus van Kessel Govers"];
const luukNames = ["Luuk", "LuckyBoy", "LuckyBoy1203", "LuckyBoy2003", "Luukman", "Paul", "PAULLLLLL!!!!", "Eduward Lucas Rademakers", "Edward Lucas Rademakers", "Luuk Rademakers"];
const stefNames =  ["Stef", "Steef", "SteefNL", "vishengelman", "Brandweerman Sam", "ZwartePietGaming", "Freek11111", "SteefNLGamerino", "Stef van Herk"];

const amberQuotes = [
    "Docenten zijn gewoon eikels.",
    "Jort is een nicht.",
    "Wat is een brug?!?!",
    "Ik ben bergen aan het zandificeren.",
    "Australiaans.",
    "Ik zeg altijd au als iemand Texas zegt.",
    "Oh lekker, stenen!<br>♪♪ Ik eet graag stenen voor ontbijt ♪♪",
    "Het hoort geen soep te zijn"
];
const jordanQuotes = [
    "Dillema.",
    "Wat is het toch mooi om dik te zijn.",
    "Planeten geven licht.",
    "De specerijen zijn belangrijk, Luuk.",
    "Ik ben een electronic.",
    "De rollercoaster gaat weg, kom hier Duncan Laurence.",
    "<b>*Rokerslachje*</b>",
    "Vrachtweerwagen.",
    "Klaasman.",
    "Leviman, pak me bij de hand breng me naar het land. Dode kamerplant.",
    "Dat beest staat echt alsof die een lamp in de hoek van een kamer is.",
    "Jouw haar ziet er wel uit als iets wat ik op wil eten.",
    "Ik heb hier geen tijd voor, ik heb een kubus om op te lossen.",
    "Hahaha, Hij heeft zn dingetje in de fik gezet",

];
const leviQuotes = [
    "Ik wil jou mijn slang laten zien.",
    "Dit is wel echt een denkertje.",
    "Ik heb zojuist een kat vermoord :)",
    "Wat is een Bonaire?",
    "Het is al voorbij, dus mij boeit het niet.",
    "Zolang het makkelijk is, is het makkelijk.",
    "De-week-voor-kerstvakantie-vakantie.",
    "Ik gebruik geen medischijnen.",
    "De wijn is belangrijk.",
    "Ik ben niet eng.",
    "<b>*high pitched screaming*</b><br>Het was een mug."
];
const loekQuotes = [
    "Je kan nooit te weinig hebben.",
    "Amber, jouw armen zijn ongeveer even sterk als een natte noedel.",
    "Imponster.",
    "Ja, tyfus dat is mijn naam.",
    "Ja, Amber is een nietmachine.",
    "Kalm aan, de volgende ronde win ik wel.",
    "Control Shift N, Is liking femboys gay?",
    "Een Elifont.",
    "Dat mag je echt niet in quotes zetten, dat is privé.",
    "<b>*nies*</b>, herpes?",
    "Omg een Jezus koe.",
    "Ik hou van worsten en lul en ballen"
];
const luukQuotes = [
    "George in de wielstoel.",
    "Wie doet mij?",
    "Nee Levi, sssh. Niet typen rotjoch.",
    "Noise reducetion.",
    "Hocus pocus ik zit in amogus.",
    "En ik ben een weegschaal"
];
const stefQuotes = [
    "Das echt Fiat he, werkt pas als je er tegenaan slaat. Net als een vrouw.",
    "I gotta feeling, inside my balls. It goes electric baby when they hit the wall.",
    "N als in Windows, zonder de doos.",
    "Promtoe.",
    "Ching Chong Impact.",
    "lgbtiq+ staat voor limburger-, belg-, en trans-iq, toch?",
    "Zelfs Danjo vindt jullie geklefbek niks.",
    "En al is het niet goed kan ze het in d'r anus rammen, d'n vuile slet dat ze is.",
    "Mond open want ik moet poepen.",
    "Jezus penguin.",
    "Gisteren reden wij ook door rood, maar dat was heel donker oranje.",
    "Politie hotdogs",
    "Ik wil helemaal geen mobiele salade wagen"
];

function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    return randomQuote;
}

function getRandomName(names) {
    const randomNumber = Math.random();

    if (randomNumber < 0.25) {
        return names[0];
    } else {
        return names[Math.floor(Math.random() * (names.length - 1)) + 1];
    }
}

function chooseRandomPerson(){
    const namesArray = ["amber", "jordan", "levi", "loek", "luuk", "stef"];
    const randomIndex = Math.floor(Math.random() * (namesArray.length));
    const randomPerson = namesArray[randomIndex];
    return randomPerson;
}

function newQuote() {
    const person = chooseRandomPerson();
    const personQuote = (getRandomQuote(eval(person + "Quotes")));
    const personName = (getRandomName(eval(person + "Names")));
    article.innerHTML = '<p><i class="quote-text">“'+ personQuote +'”</i></p><p class="quote-text">~ ' + personName + '</p>'
    const quoteText = new SplitType('.quote-text', {
        types: 'lines, words, chars',
        tagName: 'span'
      });    
    gsap.from('.quote-text .line', {
      y: '100%',
      opacity: 0,
      duration: 0.80,
      ease: 'power2.out',
      stagger: 0.15,
    })
}

window.onload = function() {
    newQuote();
    setInterval(newQuote,millisecondsForQuote);
}

