// Initialize variables
const body = document.querySelector("body");
const article = document.querySelector("article");
const soundButton = document.querySelector("svg");
let currentIndexOfAudioQuote;
let currentSound;
let soundButtonClickable = false;

// Constants for the quote interval
const minutesForQuote = 5;
const secondsForQuote = minutesForQuote * 60;
const millisecondsForQuote = secondsForQuote * 1000;

// Arrays with names and quotes
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
    "Levi, wil je even de pijpzak pakken?",
    "Het klinkt gewoon alsof je in een magnetron zit."
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
    "Hahaha, hij heeft zn dingetje in de fik gezet.",
    "Je hebt echt gewoon een specht gemaak. Een natte specht, vooruit dan.",
    "Ik ben besloten",
    "♪♪ Arriva Arriva, waarom ben je laat Arriva Arriva, ik sta te wachten hier Arriva Arriva ♪♪"
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
    "Ik ben eigenlijk een printer.",
    "Nee Amber, jij bent geen vriendschap, jij bent vervelend.",
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
    "Ik hou van worsten en lul en ballen",
    "Wat is de mening van het leven?",
    "Stef, schop mij dan!",
    "De toeterclown komt je toeteren om 3 uur 's nachts."
];
const luukQuotes = [
    "George in de wielstoel.",
    "Wie doet mij?",
    "Nee Levi, sssh. Niet typen rotjoch.",
    "Noise reducetion.",
    "Hocus pocus ik zit in amogus.",
    "En ik ben een weegschaal",
    "Doe eens rustig met je bal Loek",
    "Hoedje van pauperzooi"
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
    "Ik wil helemaal geen mobiele salade wagen",
    "Cummirubben",
    "Hoe laat is het morgen?",
];

const audioQuotes = [
    {
        "quote": "American agents. You are making a grave mistakes",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote0.ogg"
    },
    {
        "quote": "You may know me as Codename Bogdan. I am commander of ze subbarin",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote1.ogg"
    },
    {
        "quote": "And for record, Bogdan is not just codename. It is real name. Clever coding.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote2.ogg"
    },
    {
        "quote": "We are ready to die, every man and boy. We have job to do.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote3.ogg"
    },
    {
        "quote": "Do you know what you're fighting for? Bleeder Burgers and Deludamol? Wake up.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote4.ogg"
    },
    {
        "quote": "You are biggest idiots of whole wide world. Americans.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote5.ogg"
    },
    {
        "quote": "This is a big mistake, like crap in pants.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote6.ogg"
    },
    {
        "quote": "Wait a minute... wait a minute, wait we've can we calm down for just one minute? For less than one minute.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote7.ogg"
    },
    {
        "quote": "Look, you look very much like you have wrong end of shit.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote8.ogg"
    },
    {
        "quote": "You got stuck in the stick you're up creek with paddle of crap!",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote9.ogg"
    },
    {
        "quote": "No, kill me all you like but stop lis-listen, listen, listen, listen, listen, listen, listen.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote10.ogg"
    },
    {
        "quote": "Sure I would like to destroy America, control Russia and destroy fabric of civilization as we know it but these are all piping dreams.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote11.ogg"
    },
    {
        "quote": "You... you are real problem.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote12.ogg"
    },
    {
        "quote": "Oh, cigarette, cigarette.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote13.ogg"
    },
    {
        "quote": "If you let insecure little egomaniac play God then fake human brain he build will be brain of insecure little egomaniac.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote14.ogg"
    },
    {
        "quote": "My Scientists have studied Cliffford. Cliffford is asshole.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote15.ogg"
    },
    {
        "quote": "Scuba gear by hatch over there. I have secret escape pod, good luck!",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote16.ogg"
    },
    {
        "quote": "Democracy is problem. People have too many ideas. In my day, ideas BAD.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote17.ogg"
    },
    {
        "quote": "Always. Evil computer get weapon, weapon, weapon, and then kills, kills, kills all carbon-based intelligent life.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote18.ogg"
    },
    {
        "quote": "This Barrage SUV, heavily weaponize, he make very quickly into evil robot kill car.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote19.ogg"
    },
    {
        "quote": "Bombs, they kill the big group of human. Cars get the human in little hard-to-reach places. Hunt and kill everyone you know and love. Not fun.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote20.ogg"
    },
    {
        "quote": "Not pretty, not nice. Contemporary art, bleak existence.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote21.ogg"
    },
    {
        "quote": "We take and hold. If Cliffford want airfield, we want airfield.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote22.ogg"
    },
    {
        "quote": "No time to celebrate. Maybe robots kill us a couple of days later than before, a few.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote23.ogg"
    },
    {
        "quote": "Peoples. This is very dangerous weapon. In some very dangerous hand. We don't like any American have this tank, particulary not American AI though.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote24.ogg"
    },
    {
        "quote": "Us Russians, we don't understand. If we build tank, we want large, scary tank you see from miles away when we drive in procession through city with our missles and our armies and our tanks. Everyone look how big and mighty we are.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote25.ogg"
    },
    {
        "quote": "This tank is black, and sneaky looking. We don't trust this tank at all.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote26.ogg"
    },
    {
        "quote": "Exactly kind of creepy tank that creepy computer made by creepy man try to control world with.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote27.ogg"
    },
    {
        "quote": "SAM, Surface-to-Air Missile, sites all over the Mount Chilli Pepper.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote28.ogg"
    },
    {
        "quote": "My men are killed, my submarine sunk, I am traitor in Russia and criminal here. Goodbye and good luck to all of us.",
        "author": "Bogdan",
        "audioLocation": "audio/bogdan/bogdanquote29.ogg"
    },
    {
        "quote": "'k rij naar haar en hoor: eh oh",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote0.ogg"
    },
    {
        "quote": "Turk turk, turk turk, turk turk doen, daar daar daar",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote1.ogg"
    },
    {
        "quote": "Bolle man, wat je aan het doen bent mag niet daar. Zoveel bulbepoeder, haren kammen ben je klaar.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote2.ogg"
    },
    {
        "quote": "Bolle man, doe zingen met je koor. Zondag was ik daar een hoer, slappe bankje zak je door.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote3.ogg"
    },
    {
        "quote": "Bolle man, ga die merrie nou eens wassen. Met die billen maar niet wassen, niet de merrie merrie wassen.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote4.ogg"
    },
    {
        "quote": "Bolle man!",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote5.ogg"
    },
    {
        "quote": "Zure aardappelen, ik wil paren met Italianen",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote6.ogg"
    },
    {
        "quote": "Jij barbaar, met butaan!",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote7.ogg"
    },
    {
        "quote": "Dan rij je met je lama ",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote8.ogg"
    },
    {
        "quote": "Mijn tokkie, mijn tokkie, mijn tokkie tokkie tokkie. Tokkie, mijn tokkie, mijn tokkie tokkie tokkie.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote9.ogg"
    },
    {
        "quote": "Zure appeltaart hier op de vakantie.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote10.ogg"
    },
    {
        "quote": "Verse patatten.",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote11.ogg"
    },
    {
        "quote": "Die bami, die bami, die bami",
        "author": "Daler Mehndi",
        "audioLocation": "audio/daler/dalerquote12.ogg"
    }
];

// Function to get a random quote
// @param {array} quotes - The array of quotes to choose from
function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote;
    if (quotes === audioQuotes) {
        currentIndexOfAudioQuote = randomIndex;
        randomQuote = quotes[randomIndex].quote;
    }
    else {
        randomQuote = quotes[randomIndex];
    }
    return randomQuote;
}

// Function to get a random name
// @param {array} names - The array of names to choose from
function getRandomName(names) {
    const randomNumber = Math.random();

    if (randomNumber < 0.25) {
        return names[0];
    } else {
        return names[Math.floor(Math.random() * (names.length - 1)) + 1];
    }
}

// Function to choose a random person
function chooseRandomPerson(){
    let namesArray = ["amber", "jordan", "levi", "loek", "luuk", "stef"];
    if (localStorage.getItem('theme') === "afterdark") {
        namesArray = ["jordan", "levi", "loek", "luuk", "stef"];
    }
    const randomIndex = Math.floor(Math.random() * (namesArray.length));
    const randomPerson = namesArray[randomIndex];
    return randomPerson;
}

// Function to get a quote from a random person
function getPersonQuote(){
    const person = chooseRandomPerson();
    const personQuote = (getRandomQuote(eval(person + "Quotes")));
    const personName = (getRandomName(eval(person + "Names")));
    article.innerHTML = '<p><i class="quote-text">“'+ personQuote +'”</i></p><p class="quote-text">~ ' + personName + '</p>'
}

// Function to get a quote from Bogdan
function getAudioQuote(){
    const audioQuote = (getRandomQuote(audioQuotes));
    article.innerHTML = `<p><i class="quote-text">“${audioQuote}”</i></p><p class="quote-text">~ ${audioQuotes[currentIndexOfAudioQuote].author}</p>`
    currentSound = new Audio(audioQuotes[currentIndexOfAudioQuote].audioLocation);
    currentSound.play();
    soundButton.style.opacity = "1";
    soundButton.style.pointerEvents = "auto";
    soundButtonClickable = true;
}

// Function to get a new quote
function newQuote(firstQuote) {
    let randomNumber = Math.random();
    if (randomNumber > 0.2 || firstQuote) {
        soundButtonClickable = false;
        soundButton.style.opacity = "0";
        soundButton.style.pointerEvents = "none";
        getPersonQuote()
    }
    else {
        getAudioQuote()
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

// Function to get a new quote every 5 minutes
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

// if the user presses the 'q' key, a new quote will show
addEventListener('keydown', (event) => {
    if (event.key === 'q') {
        newQuote(false);
    }
});

