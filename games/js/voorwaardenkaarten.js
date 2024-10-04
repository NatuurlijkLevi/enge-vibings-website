const articleP = document.querySelector("article > p");
const voorwaardenButton = document.querySelector("button");

const voorwaardenkaarten = [
    "als een speler zwaarder is dan jij.",
    "als de som van jullie leeftijden niet boven de 100 komt.",
    "als je een kledingstuk draagt dat dezelfde kleur heeft als je ogen.",
    "als er een piano in huis is.",
    "als het regent.",
    "als één van de spelers een horloge met secondenwijzer draagt.",
    "als niemand rookt.",
    "als er een huisdier in de kamer is.",
    "als evenveel jongens als meisjes meespelen.",
    "als je gierig bent.",
    "als je niet verlegen bent.",
    "als de som van de getallen van jullie telefoonnummer meer dan 20 is.",
    "als je in een vakantiehuisje bent.",
    "als de radio aanstaat.",
    "als een van jullie verkouden is.",
    "als je met uitsluitend familie speelt.",
    "als jullie na aanvang van het spel, niet gestoord zijn door de telefoon of de deurbel.",
    "als je de jongste bent.",
    "als het buiten koud is.",
    "als je hart klopt.",
    "als één van de spelers een das draagt.",
    "als je onder vrienden bent.",
    "als je oma ouder is dan 60.",
    "als je op de begane grond speelt.",
    "als het weekend is.",
    "als dit spel met meer dan 4 personen wordt gespeeld.",
    "als je de dikste speler bent.",
    "als één van jullie deze maand jarig is.",
    "als de verwarming aanstaat.",
    "als het later is dan 18.00 uur.",
    "als de speler rechts van je sokken draagt.",
    "als je niet bang bent voor onweer.",
    "als er bloemen in de kamer staan.",
    "als je regelmatig aan sport doet.",
    "als dit spel met dodelijke ernst wordt gespeeld.",
    "als 2 spelers even oud zijn.",
    "als je vandaag niet met je verkeerde been uit bed bent gestapt.",
    "als je de meeste fiches bezit.",
    "als het zomer is.",
    "als je op een rijdbare stoel zit.",
    "als dit huis een pannendak heeft.",
    "als het huis een even nummer heeft.",
    "als je één rijbewijs hebt.",
    "als je de langste bent.",
    "als een speler je verjaardagsdatum kent.",
    "als een speler lichter is dan jij.",
    "als je gek op tennis bent.",
    "als je nu aan de beurt bent.",
    "als één van de spelers een bril draagt.",
    "als je wilt.",
    "als je op een houten stoel zit.",
    "als je met vakantie bent."
];

function nieuweVoorwaarden() {
    const randomIndex = Math.floor(Math.random() * voorwaardenkaarten.length);
    articleP.innerHTML = "Het moet " + voorwaardenkaarten[randomIndex];
}

voorwaardenButton.addEventListener("click", nieuweVoorwaarden);