const body = document.querySelector("body");
const article = document.querySelector("article");
const soundButton = document.querySelector("svg");
let currentIndexOfBogdanQuote;
let currentSound;
let soundButtonClickable = false;

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
    "Het hoort geen soep te zijn",
    "Levi, wil je even de pijpzak pakken?"
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
    "<b>*high pitched screaming*</b><br>Het was een mug.",
    "Ik ben eigenlijk een printer."
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

const bogdanQuotes = [
    "American agents. You are making a grave mistakes",
    "You may know me as Codename Bogdan. I am commander of ze subbarin",
    "And for record, Bogdan is not just codename. It is real name. Clever coding.",
    "We are ready to die, every man and boy. We have job to do.",
    "Do you know what you're fighting for? Bleeder Burgers and Deludamol? Wake up.",
    "You are biggest idiots of whole wide world. Americans.",
    "This is a big mistake, like crap in pants.",
    "Wait a minute... wait a minute, wait we've can we calm down for just one minute? For less than one minute.",
    "Look, you look very much like you have wrong end of shit.",
    "You got stuck in the stick you're up creek with paddle of crap!",
    "No, kill me all you like but stop lis-listen, listen, listen, listen, listen, listen, listen.",
    "Sure I would like to destroy America, control Russia and destroy fabric of civilization as we know it but these are all piping dreams.",
    "You... you are real problem.",
    "Oh, cigarette, cigarette.",
    "If you let insecure little egomaniac play God then fake human brain he build will be brain of insecure little egomaniac.",
    "My Scientists have studied Cliffford. Cliffford is asshole.",
    "Scuba gear by hatch over there. I have secret escape pod, good luck!",
    "Democracy is problem. People have too many ideas. In my day, ideas BAD.",
    "Always. Evil computer get weapon, weapon, weapon, and then kills, kills, kills all carbon-based intelligent life.",
    "This Barrage SUV, heavily weaponize, he make very quickly into evil robot kill car.",
    "Bombs, they kill the big group of human. Cars get the human in little hard-to-reach places. Hunt and kill everyone you know and love. Not fun.",
    "Not pretty, not nice. Contemporary art, bleak existence.",
    "We take and hold. If Cliffford want airfield, we want airfield",
    "No time to celebrate. Maybe robots kill us a couple of days later than before, a few.",
    "Peoples. This is very dangerous weapon. In some very dangerous hand. We don't like any American have this tank, particulary not American AI though.",
    "Us Russians, we don't understand. If we build tank, we want large, scary tank you see from miles away when we drive in procession through city with our missles and our armies and our tanks. Everyone look how big and mighty we are.",
    "This tank is black, and sneaky looking. We don't trust this tank at all.",
    "Exactly kind of creepy tank that creepy computer made by creepy man try to control world with.",
    "SAM, Surface-to-Air Missile, sites all over the Mount Chilli Pepper.",
    "My men are killed, my submarine sunk, I am traitor in Russia and criminal here. Goodbye and good luck to all of us."
];

function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    if (quotes === bogdanQuotes) { currentIndexOfBogdanQuote = randomIndex; }
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

function getPersonQuote(){
    const person = chooseRandomPerson();
    const personQuote = (getRandomQuote(eval(person + "Quotes")));
    const personName = (getRandomName(eval(person + "Names")));
    article.innerHTML = '<p><i class="quote-text">“'+ personQuote +'”</i></p><p class="quote-text">~ ' + personName + '</p>'
}

function getBogdanQuote(){
    const bogdanQuote = (getRandomQuote(bogdanQuotes));
    article.innerHTML = '<p><i class="quote-text">“'+ bogdanQuote +'”</i></p><p class="quote-text">~ Bogdan</p>'
    currentSound = new Audio('audio/bogdanquote' + currentIndexOfBogdanQuote + '.ogg')
    currentSound.play();
    soundButton.style.opacity = "1";
    soundButton.style.pointerEvents = "auto";
    soundButtonClickable = true;
}

function newQuote(firstQuote) {
    let randomNumber = Math.random();
    if (randomNumber > 0.2 || firstQuote) {
        soundButtonClickable = false;
        soundButton.style.opacity = "0";
        soundButton.style.pointerEvents = "none";
        getPersonQuote()
    }
    else {
        getBogdanQuote()
    }
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
    setTimeout( function() {
        newQuote(true);
        setInterval(function() {
            newQuote(false);
        }, millisecondsForQuote);
    }, 1);
}
soundButton.addEventListener('click', () => {
    if (soundButtonClickable) {currentSound.play();}
});

addEventListener('keydown', (event) => {
    if (event.key === 'q') {
        newQuote(false);
    }
});

