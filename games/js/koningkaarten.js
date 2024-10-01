// Initialize variables
const koningButton = document.querySelector("button");
const koningH1 = document.querySelector("h1");
const koningP = document.querySelector("p");

let numberNine = false;
let lastTimeNegative = false;
const card = [
    [
        // -
            /* 1   */     "Verraden",
            /* 2   */     "Achterkamers",
            /* 3   */     "Koning maps",
            /* 4   */     "Rechtse opstandeling",
            /* 5   */     "Linkse opstandeling",
            /* 6   */     "Das pech, kroon weg",
            /* 7   */     "De pandemie",
            /* 8   */     "De wind doet een beetje trolling",
            /* 9   */     "Pauperzooi",
            /* 10  */     "Weer wedergekeerd",
            /* 11  */     "Koploperkoning",
            /* 12  */     "Achterloperkoning",
            /* 13  */     "Gebroken ribben",
            /* 14  */     "Achterstand",
            /* 15  */     "I have a dream",
            /* 16  */     "There is an Imposter among us",
            /* 17  */     "Jengakarma",
            /* 18  */     "Verkeerde trede lol",
            /* 19  */     "Piano?",
            /* 20  */     "Intentional Game Design",
            /* 21  */     "EScape",
            /* 22  */     "Boertrolling",
            /* 23  */     "L",
            /* 24  */     "Je wordt geplaagd",
            /* 25  */     "Afgezette weg",
            /* 26  */     "Eerste koning back in business",
            /* 27  */     "3e speler na jou",
            /* 28  */     "Tsunami",
            /* 29  */     "Vergeten",
            /* 30  */     "Raid",
            /* 31  */     "Schaakmoment",
            /* 32  */     "Schaak",
            /* 33  */     "Opstandelingen",
            /* 34  */     "Google maps verkeerd ingesteld",
            /* 35  */     "Veldslag mislukt",
            /* 36  */     "Vijandelijke aanval",
            /* 37  */     "Bandieten slaan",
            /* 38  */     "Politiek Sandaal",
            /* 39  */     "Aardverschuiving",
            /* 40  */     "James Bond",
            /* 41  */     "Militaire Champagne",
            /* 42  */     "Aladin",
            /* 43  */     "Wandering trader",
            /* 44  */     "M. Rasmogius",
            /* 45  */     "Exorsism?",
            /* 46  */     "Zure regen?",
            /* 47  */     "De kipnap",
            /* 48  */     "Hitman",
            /* 49  */     "Zwieber niet stelen",
            /* 50  */     "Zwarte magie",
            /* 51  */     "Aardverschuiving",
            /* 52  */     "geMist",
            /* 53  */     "Lawine",
            /* 54  */     "Chunks laden niet",
            /* 55  */     "Röntgenstraling",
            /* 56  */     "Rivier",
            /* 57  */     "Lag spikes",
            /* 58  */     "Dobbelsteen",
            /* 59  */     "Artefactvalsstrik",
            /* 60  */     "Henk",
            /* 61  */     "Vervloekt",
            /* 62  */     "Mysterieuze vloek",
            /* 63  */     "Voor naar achter",
            /* 64  */     "Kaas",
            /* 65  */     "Ontbijtje",
            /* 66  */     "Lekker achteruit gaan",
            /* 67  */     "Lekker achteruit gaan",
            /* 68  */     "Lekker achteruit gaan",
            /* 69  */     "Lekker achteruit gaan",
            /* 70  */     "Lekker achteruit gaan",
            /* 71  */     "Verrader",
            /* 72  */     "Verloren handelsdeal",
            /* 73  */     "Verzwakt leger",
            /* 74  */     "Natuurramp",
            /* 75  */     "Corruptie",
            /* 76  */     "Economische ineenstorting",
            /* 77  */     "Brand",
            /* 78  */     "Mislukte poging tot diplomatie",
            /* 79  */     "Hongersnood",
            /* 80  */     "Wilde dieren",
            /* 81  */     "De regendans",
            /* 82  */     "Bedtijd",
            /* 83  */     "Gevangenis",
            /* 84  */     "Broekpoepen",
            /* 85  */     "Burn-out",
            /* 86  */     "Ziekenhuis",
            /* 87  */     "Motivatie op",
            /* 88  */     "Nodig plassen",
            /* 89  */     "Pieterman",
            /* 90  */     "Etna",
            /* 91  */     "R.I.P. Butler",
            /* 92  */     "Watertekort",
            /* 93  */     "Geen frikandellen vanavond",
            /* 94  */     "Belastingproblemen",
            /* 95  */     "Verstopte wc",
            /* 96  */     "Vies bed",
            /* 97  */     "Uitgedroogde put",
            /* 98  */     "Gezelligheid",
            /* 99  */     "Verward",
            /* 100 */     "Kapotte troon",

        // +
            /* 1   */     "Achter naar voor",
            /* 2   */     "Verborgen shortcut",
            /* 3   */     "Vriendelijke handelaar",
            /* 4   */     "Het geheime pad van de gids",
            /* 5   */     "Magische spreuk",
            /* 6   */     "De vriendelijke dierenvriend",
            /* 7   */     "Wind in de rug",
            /* 8   */     "Shortcut",
            /* 9   */     "De gids wijst de weg",
            /* 10  */     "Katapult-spreuk",
            /* 11  */     "De handelsdeal",
            /* 12  */     "De geheime tunnel",
            /* 13  */     "Vriendelijk wezen",
            /* 14  */     "Op de kaart",
            /* 15  */     "Magisch elixer",
            /* 16  */     "Briesje",
            /* 17  */     "Snelheidsboost",
            /* 18  */     "Vogelman",
            /* 19  */     "Trappie",
            /* 20  */     "Toverstaf",
            /* 21  */     "Oude man",
            /* 22  */     "Heksenbezem",
            /* 23  */     "Magische poort",
            /* 24  */     "Stroomversnelling",
            /* 25  */     "Fres = ma",
            /* 26  */     "Fakir",
            /* 27  */     "Straling",
            /* 28  */     "Vriendelijke wind",
            /* 29  */     "Koets",
            /* 30  */     "Voertuigmoment",
            /* 31  */     "Lakitu",
            /* 32  */     "Slee",
            /* 33  */     "Red Bull geeft je vleugels",
            /* 34  */     "Staf",
            /* 35  */     "Veer",
            /* 36  */     "11",
            /* 37  */     "De magische belofte",
            /* 38  */     "Fn = Fz = m g",
            /* 39  */     "Feniks",
            /* 40  */     "Betoverd voertuig",
            /* 41  */     "Magische schelp",
            /* 42  */     "Vliegende schotel",
            /* 43  */     "Magisch paard",
            /* 44  */     "Waterval",
            /* 45  */     "Kaart",
            /* 46  */     "Kasper",
            /* 47  */     "Vortex",
            /* 48  */     "Ariel",
            /* 49  */     "Portal",
            /* 50  */     "Fee",
            /* 51  */     "Kompas",
            /* 52  */     "Fv = C u",
            /* 53  */     "Draak",
            /* 54  */     "Lantaarn",
            /* 55  */     "Gnoom",
            /* 56  */     "Stroom",
            /* 57  */     "Wolkman",
            /* 58  */     "Vriendelijke Lakitu?",
            /* 59  */     "Lodestone",
            /* 60  */     "Watervallen",
            /* 61  */     "Buried Treasure Map",
            /* 62  */     "Rugwindkracht",
            /* 63  */     "De kleine zeemeermin",
            /* 64  */     "Poort",
            /* 65  */     "Luchtstroom",
            /* 66  */     "Fe",
            /* 67  */     "Magische sleutel",
            /* 68  */     "Mysterieuze stroom",
            /* 69  */     "Betoverd pad",
            /* 70  */     "Geert de Draak",
            /* 71  */     "Torch",
            /* 72  */     "Mysterieuze Kracht Duwtje",
            /* 73  */     "Betoverde Wolk Vooruit",
            /* 74  */     "Vriendelijke Geest Wolk Rit",
            /* 75  */     "Magisch Kompas Leiding",
            /* 76  */     "Betoverde Waterval Versnelling",
            /* 77  */     "Gevonden Magische Schat Route",
            /* 78  */     "Mysterieuze Kracht Duw",
            /* 79  */     "Magische Lantaarn Pad Verlicht",
            /* 80  */     "Vriendelijke Alchemist Elixer Boost",
            /* 81  */     "Poort van Versnelling",
            /* 82  */     "Kleurrijke Regenboogrit",
            /* 83  */     "Gidsende Bosnimf",
            /* 84  */     "Verborgen Watervalkronkels",
            /* 85  */     "Dwergelijke Schatkaart",
            /* 86  */     "Lichtstraal Verlichting",
            /* 87  */     "Tijd Buigende Betovering",
            /* 88  */     "Vuurvliegje Vervoer",
            /* 89  */     "Dimensie Portaal",
            /* 90  */     "Vriendelijke Reus Lift",
            /* 91  */     "Aardbeving Werping",
            /* 92  */     "Machtige Feniks Vlucht",
            /* 93  */     "Betoverd Kompas Ontdekking",
            /* 94  */     "Magisch Voedsel Energieboost",
            /* 95  */     "Tijd Draaiing Terugreis",
            /* 96  */     "Toverstokje Deuropening",
            /* 97  */     "Ruïne Beschutting",
            /* 98  */     "Magische Zwaan Rit",
            /* 99  */     "Mysterieuze Mist Transport",
            /* 100 */     "Betoverde Vijver Doorgang"
    ],
    [ 
        // -
            /* 1   */     "Je beste handlanger wil je vermoorden. Hierdoor schrik je en stik je in je huig en respawn je bij de start.",
            /* 2   */     "Je komt in de backrooms terecht. Sla 2 beurten over om een manier te vinden om eruit te komen.",
            /* 3   */     "Je wordt tegengehouden door een ridder die de weg kwijt is. Sla een beurt over om de weg te laten zien.",
            /* 4   */     "De persoon rechts van je komt in opstand en wil de kroon. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt.",
            /* 5   */     "De persoon links van je komt in opstand en wil de kroon. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt.",
            /* 6   */     "Je kroon is afgevallen tijdens een wandeltocht. Ga 7 vakjes achteruit om de kroon weer op te rapen.",
            /* 7   */     "De rattenplaag breekt uit. Sla een beurt over om je onderdanen gerust te stellen.",
            /* 8   */     "Je wordt weggeblazen door de wind. Ga 6 vakjes achteruit.",
            /* 9   */     "Je krijgt tyfus. Een andere speler neemt je rol als koning tijdelijk over",
            /* 10  */     "De tyfuskoning heeft geen tyfus meer. De oude koning die voorheen tyfus had is weer koning.",
            /* 11  */     "De speler die voorop staat wil graag koning worden. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt. Sta je zelf vooraan dan blijf je koning.",
            /* 12  */     "De speler die achterop staat wil graag koning worden. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt. Sta je zelf achteraan dan blijf je koning",
            /* 13  */     "Je hebt je ribben gebroken. Sla een beurt over om beter te worden.",
            /* 14  */     "Je loopt op achterstand op je koning-papierwerk. Sla 2 beurten over om het papierwerk bij te werken.",
            /* 15  */     "Je moet een speech geven aan je onderdanen maar je hebt nog niks. Sla een beurt over om je speech voor te bereiden.",
            /* 16  */     "Een ridder wordt vermoord. Sla een beurt over om de imponster te vinden.",
            /* 17  */     "De persoon die het meest recent de Jenga toren heeft laten opvallen wil graag koning worden. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt. Als jij dit was of indien niet van toepassing dan blijf je koning.",
            /* 18  */     "Je fikkert 9 treden van de trap. Ga 9 vakjes achteruit.",
            /* 19  */     "Er valt ineens een random piano op je. Hierdoor sla je een beurt over om weer beter te worden.",
            /* 20  */     "Je bent gaan slapen in de nether. Je bed is ontploft en hebt nu laag HP. Sla een beurt over om te healen.",
            /* 21  */     "Je cape ontsnapt. Ga 7 vakjes achteruit om hem weer om je nek te kunnen doen.",
            /* 22  */     "Een aantal boeren hebben te weinig belasting gelevert. Sla een beurt over om dit op te lossen.",
            /* 23  */     "God vindt dat je 6 vakjes achteruit moet. Luister naar god.",
            /* 24  */     "De rattenplaag jaagt je weg. Ga 8 vakjes achteruit om de rattenplaag te ontwijken.",
            /* 25  */     "De weg is afgezet. Ga 10 vakjes naar achter om weer door te kunnen.",
            /* 26  */     "De eerste koning wil de kroon weer. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt. Was je zelf de eerste koning, dan blijf je koning.",
            /* 27  */     "De 3e speler na jou wil graag koning zijn. Doe een 1v1 challenge om te bepalen wie de nieuwe koning wordt.",
            /* 28  */     "Er is een tsunami in het land. Sla een beurt over zodat de tsunami weer verdwijnt.",
            /* 29  */     "Je bent iets belangrijks vergeten op te halen. Ga 7 vakjes terug om het belangrijke ding op te halen.",
            /* 30  */     "Je koninkrijk wordt geraid. Sla 2 beurten over om de raiders weg te jagen.",
            /* 31  */     "Je staat schaak. Ga 6 vakjes terug om dat niet meer te staan.",
            /* 32  */     "Je staat schaak en je kan niet meer bewegen. Sla een beurt over om met andere schaakstukken te spelen.",
            /* 33  */     "Je onderdanen komen in opstand. Sla een beurt over om ze gerust te stellen.",
            /* 34  */     "Je bent verkeerd gelopen. Ga 6 vakjes terug om weer goed te lopen.",
            /* 35  */     "Een verloren veldslag verzwakt je positie. Hierdoor moet jet 6 vakjes achteruit om te kijken of het goed gaat met je leger.",
            /* 36  */     "Je wordt gedwongen om 7 vakjes terug te gaan om de aanval te ontsnappen",
            /* 37  */     "Een onverwachte aanval van bandieten plunderen je koninkrijk. Hierdoor moet je 10 vakjes terug om de plundering te stoppen.",
            /* 38  */     "Een politiek schandaal veroorzaakt onrust onder je onderdanen. Hierdoor ga je 9 vakjes terug om de reputatieschade te herstellen.",
            /* 39  */     "Een slecht weer veroorzaakt aardverschuivingen op je wegen. Hierdoor ga je 6 vakjes terug om een veilige doorgang te vinden.",
            /* 40  */     "Een vertrouweling blijkt een spion te zijn voor je vijanden. Sla een beurt over om de verrader te ontmaskeren en verdere schade te voorkomen.",
            /* 41  */     "Een mislukte militaire campagne leidt tot verlies van territorium. Hierdoor moet je 9 vakjes terug gaan om je verloren gebieden te heroveren en de vijand te verslaan.",
            /* 42  */     "Een boze geest betovert je reisroute. Ga hierdoor 7 vakjes terug.",
            /* 43  */     "Een handelaar geeft je een vervloekt object. Hierdoor ga je 10 vakjes naar achter.",
            /* 44  */     "Een kwaadaardige tovenaar laat je een aantal vakjes achteruitgaan. Ga 8 vakjes achteruit.",
            /* 45  */     "Een duistere schaduw neemt bezit van je geest. Hierdoor ga je 7 vakjes naar achter.",
            /* 46  */     "Een giftige wolk verpest de lucht om je heen. Hierdoor wordt je gedwongen om 8 vakjes terug te gaan om naar een normale atmosfeer toe te gaan.",
            /* 47  */     "Je wordt gekidnapt door een onbekende entiteit. Ga 8 vakjes terug.",
            /* 48  */     "Je wordt achternagezeten door een huurmoordenaar. Ren snel 9 vakjes terug om te blijven leven.",
            /* 49  */     "Zwieber de Vos wil je kroon stelen. Ga 10 vakjes achteruit om hem te ontsnappen.",
            /* 50  */     "Donkere magie zuigt je 6 vakjes achteruit.",
            /* 51  */     "Een plotselinge aardverschuiving blokkeert je pad. Hierdoor wordt je gedwongen om 6 vakjes achteruit te gaan om een veilige route te vinden.",
            /* 52  */     "Een mysterieuze mist heeft je de verkeerde kant op laten gaan. Ga 7 vakjes terug om weer op het juiste pad te komen.",
            /* 53  */     "Een plotselinge lawine bedekt het pad. Ga 8 vakjes terug om erdoor te kunnen.",
            /* 54  */     "Je render distance is te laag. Ga 6 vakjes terug op de chunks in te laden.",
            /* 55  */     "Een magische straal verstoort je coördinaten. Hierdoor moet je 6 vakjes achteruit te gaan naar een bekende maar verder gelegen plek.",
            /* 56  */     "Je wordt meegenomen door een random rivier. Je gaat 7 vakjes achteruit voordat je eruit komt.",
            /* 57  */     "Door lag spikes teleporteer je 10 vakjes naar achter.",
            /* 58  */     "Je mag nog een keer de dobbelsteen gooien. Maar in plaats van dat je het aantal vakjes vooruit gaat ga je het aantal vakjes achteruit.",
            /* 59  */     "Een verloren artefact van een langvergeten beschaving wordt per ongeluk geactiveerd. Ga 8 vakjes achteruit om de valstrik te ontwijken.",
            /* 60  */     "Je bent vergeten een belangrijke steen onderweg op te rapen. Ga hiervoor 6 vakjes achteruit.",
            /* 61  */     "De volgende keer dat je de dobbelsteen gooit moet je het aantal stappen achteruit in plaats van vooruit.",
            /* 62  */     "Een mysterieuze vloek ontwaakt in de grond onder je voeten, waardoor je gedwongen wordt 6 vakjes achteruit te gaan om de kwade energie te ontlopen.",
            /* 63  */     "Je verwisselt de plek met de speler die achter je is. Sta je zelf helemaal achteraan dan gebeurt er niks.",
            /* 64  */     "Je bent vergeten om de kaas bij de kaasboer te eten. Ga hiervoor 8 vakjes achteruit",
            /* 65  */     "Je hebt nog niet ontbeten. Ga hiervoor 9 vakjes achteruit en heb een heerlijk ontbijt",
            /* 66  */     "Ga 6 vakjes achteruit",
            /* 67  */     "Ga 7 vakjes achteruit",
            /* 68  */     "Ga 8 vakjes achteruit",
            /* 69  */     "Ga 9 vakjes achteruit",
            /* 70  */     "Ga 10 vakjes achteruit",
            /* 71  */     "Een verrader in je midden saboteert je verdedigingswerken. Sla een beurt over om het te pakken.",
            /* 72  */     "Een verloren handelsdeal leidt tot economische instabiliteit. Sla een beurt over om de economie te herstellen.",
            /* 73  */     "Een opstand onder je leger verzwakt je macht. Sla een beurt over om het leger te herstellen.",
            /* 74  */     "Een verwoestende natuurramp vernietigt je landbouwgronden. Sla een beurt over om de landbouwgronden te herstellen.",
            /* 75  */     "Een politiek schandaal onthult corruptie in je regering. Sla 2 beurten over om de corruptie aan te pakken",
            /* 76  */     "Een economische ineenstorting veroorzaakt een hongersnood onder je bevolking. Sla een beurt over om de economie te herstellen.",
            /* 77  */     "Een vernietigende brand verwoest je belangrijkste gebouwen. Sla 2 beurten over om de gebouwen te herstellen.",
            /* 78  */     "Een mislukte poging tot diplomatie leidt tot een internationaal incident. Sla een beurt over om de vrede te herstellen",
            /* 79  */     "Je onderdanen leiden van een hongersnood. Sla een beurt over om de hongersnood te laten verdwijnen.",
            /* 80  */     "Wilde dieren bedreigen je onderdanen. Sla een beurt over om ze de beesten weg te jagen",
            /* 81  */     "Het begint te regenen. Sla een beurt over zodat het niet meer regent.",
            /* 82  */     "Je wordt ineens moe. Sla een beurt over om uit te rusten.",
            /* 83  */     "Je wordt gevangen genomen. Sla een beurt over om te ontsnappen.",
            /* 84  */     "Je poept in je broek van angst. Sla een beurt over om van broek te wisselen.",
            /* 85  */     "Je krijgt ineens een burn-out. Sla een beurt over om te herstellen.",
            /* 86  */     "Je bent ziek. Sla een beurt over om beter te worden.",
            /* 87  */     "Je hebt geen zin meer. Sla een beurt over om meer zin te krijgen.",
            /* 88  */     "Je moet plassen. Sla een beurt over om te gaan plassen.",
            /* 89  */     "Je hebt op de pieterman gestapt. Sla een beurt over om de pijn op te lossen.",
            /* 90  */     "De draak heeft een aantal onderdanen opgegeten. Sla een beurt over om de draak te verslaan.",
            /* 91  */     "Je butler is dood gegaan. Sla een beurt over om voor de begrafenis te zorgen.",
            /* 92  */     "Er is te weinig water in het koninkrijk. Sla een beurt over om het probleem op te lossen.",
            /* 93  */     "Alle paarden zijn weggerend in het koninkrijk. Sla een beurt over om het probleem op te lossen.",
            /* 94  */     "Je onderdanen vinden dat ze te veel belasting moeten betalen. Sla een beurt over om het probleem op te lossen.",
            /* 95  */     "De wc is verstopt. Sla een beurt over om het probleem op te lossen.",
            /* 96  */     "Je koninklijke bed is vies. Sla een beurt over om het probleem op te lossen.",
            /* 97  */     "De put is uitgedroogd in het dorp. Sla een beurt over om het probleem op te lossen.",
            /* 98  */     "Een onverwachte ontmoeting met een mysterieuze vreemdeling leidt tot een diep gesprek, waardoor je een beurt moet overslaan terwijl je luistert naar wat ze te zeggen hebben.",
            /* 99  */     "Een vreemde betovering laat je tijdelijk verward en gedesoriënteerd achter, waardoor je een beurt moet overslaan terwijl je jezelf herpakt.",
            /* 100 */     "Je troon is kapot gegaan. Sla een beurt over om het probleem op te lossen.",

        // +
            /* 1   */     "Je verwisselt de plek met de speler die voor je is. Sta je zelf helemaal vooraan dan gebeurt er niks.",
            /* 2   */     "Je vindt een verborgen kortere route die je 8 vakjes vooruit brengt.",
            /* 3   */     "Een vriendelijke handelaar biedt je een snelle lift aan waardoor je 6 vakjes vooruit gaat.",
            /* 4   */     "Een behulpzame gids met steen Henk leidt je langs een geheime doorgang waardoor je het laatste vakje van het bord bereikt.",
            /* 5   */     "Je ontvangt een magische spreuk waardoor je 6 vakjes vooruit gaat.",
            /* 6   */     "Een vriendelijke dierenvriend biedt je een rit op zijn snelle paard aan, waardoor je 7 vakjes vooruit gaat.",
            /* 7   */     "Je krijgt een vleugje wind in de rug dat je 5 vakjes vooruit blaast.",
            /* 8   */     "Je vindt een kortere weg die je 7 vakjes vooruit brengt.",
            /* 9   */     "Een vriendelijke lokale gids wijst je de weg, waardoor je 4 vakjes vooruit gaat.",
            /* 10  */     "Een mysterieuze toverspreuk katapulteert je 7 vakjes vooruit.",
            /* 11  */     "Een slimme handelsdeal versnelt je vooruitgang met 6 vakjes.",
            /* 12  */     "Je ontdekt een geheime tunnel die je 8 vakjes vooruit brengt.",
            /* 13  */     "Een vriendelijk wezen biedt je een rit op zijn rug aan, waardoor je 5 vakjes vooruit gaat.",
            /* 14  */     "Je vindt een oude kaart die je de weg wijst, waardoor je 6 vakjes vooruit gaat.",
            /* 15  */     "Een vreemdeling geeft je een magisch elixer dat je 7 vakjes vooruit helpt.",
            /* 16  */     "Een briesje duwt je vooruit en brengt je 4 vakjes verder.",
            /* 17  */     "Je krijgt een tijdelijke snelheidboost waardoor je 6 vakjes vooruit gaat.",
            /* 18  */     "Een bevriende vogel gidst je langs een kortere route, waardoor je 5 vakjes vooruit gaat.",
            /* 19  */     "Je ontdekt een magische trap die je 7 vakjes vooruit voert.",
            /* 20  */     "Een betoverde staf geeft je een duwtje in de rug en brengt je 6 vakjes vooruit.",
            /* 21  */     "Een oude wijze wijst je de snelste route aan, waardoor je 5 vakjes vooruit gaat.",
            /* 22  */     "Een betoverde bezem tilt je op en brengt je 6 vakjes vooruit.",
            /* 23  */     "Een magische poort opent zich voor je en laat je 8 vakjes vooruit gaan.",
            /* 24  */     "Je wordt meegenomen door een stroomversnelling die je 6 vakjes vooruit brengt.",
            /* 25  */     "Een mysterieuze kracht duwt je vooruit en brengt je 5 vakjes verder.",
            /* 26  */     "Een vliegend tapijt neemt je mee op een snelle reis en brengt je 8 vakjes vooruit.",
            /* 27  */     "Een magische straal verhoogt je snelheid en brengt je 7 vakjes vooruit.",
            /* 28  */     "Een vriendelijke wind blaast je vooruit en brengt je 6 vakjes verder.",
            /* 29  */     "Een betoverde koets voert je snel door het land en brengt je 8 vakjes vooruit.",
            /* 30  */     "Een vreemd voertuig biedt je een snelle rit aan en brengt je 5 vakjes vooruit.",
            /* 31  */     "Een reis op een magische wolk voert je 6 vakjes vooruit.",
            /* 32  */     "Een betoverde slede neemt je mee op een snelle reis en brengt je 7 vakjes vooruit.",
            /* 33  */     "Een toverdrank geeft je vleugels en brengt je 6 vakjes vooruit.",
            /* 34  */     "Een mysterieuze staf stuwt je vooruit en brengt je 5 vakjes verder.",
            /* 35  */     "Een betoverde veer verhoogt je snelheid en brengt je 7 vakjes vooruit.",
            /* 36  */     "Een vriendelijke elf biedt je een snelle rit aan en brengt je 8 vakjes vooruit.",
            /* 37  */     "Een magische belofte verhoogt je snelheid en brengt je 7 vakjes vooruit.",
            /* 38  */     "Een mysterieuze kracht tilt je op en brengt je 5 vakjes verder.",
            /* 39  */     "Een vlucht op de rug van een feniks brengt je 7 vakjes vooruit.",
            /* 40  */     "Een betoverd voertuig biedt je een snelle rit aan en brengt je 6 vakjes vooruit.",
            /* 41  */     "Een magische schelp neemt je mee op een snelle reis en brengt je 8 vakjes vooruit.",
            /* 42  */     "Een vliegende schotel neemt je mee op een snelle reis en brengt je 7 vakjes vooruit.",
            /* 43  */     "Een magisch paard brengt je snel vooruit en brengt je 5 vakjes verder.",
            /* 44  */     "Een betoverde waterval draagt je mee en brengt je 6 vakjes vooruit.",
            /* 45  */     "Een gevonden magische kaart opent een kortere route en brengt je 7 vakjes vooruit.",
            /* 46  */     "Een vriendelijke geest biedt je een snelle rit aan en brengt je 8 vakjes vooruit.",
            /* 47  */     "Een mysterieuze vortex versnelt je reis en brengt je 5 vakjes vooruit.",
            /* 48  */     "Een bevriende zeemeermin neemt je mee op een snelle reis en brengt je 7 vakjes vooruit.",
            /* 49  */     "Een magisch portaal opent zich voor je en laat je 8 vakjes vooruit gaan.",
            /* 50  */     "Een vriendelijke fee biedt je een rit op haar bezem aan, waardoor je 5 vakjes vooruit gaat.",
            /* 51  */     "Een gevonden magisch kompas leidt je naar voren en brengt je 6 vakjes vooruit.",
            /* 52  */     "Een mysterieuze kracht tilt je op en brengt je 7 vakjes vooruit.",
            /* 53  */     "Een betoverde draak geeft je een lift en brengt je 8 vakjes vooruit.",
            /* 54  */     "Een magische lantaarn verlicht je pad en brengt je 5 vakjes vooruit.",
            /* 55  */     "Een vriendelijke gnoom biedt je een snelle rit aan en brengt je 6 vakjes vooruit.",
            /* 56  */     "Een mysterieuze stroom draagt je mee en brengt je 7 vakjes vooruit.",
            /* 57  */     "Een betoverde wolk zweeft je vooruit en brengt je 8 vakjes vooruit.",
            /* 58  */     "Een vriendelijke geest biedt je een rit op zijn wolk aan, waardoor je 5 vakjes vooruit gaat.",
            /* 59  */     "Een magisch kompas wijst je de weg en brengt je 6 vakjes vooruit.",
            /* 60  */     "Een betoverde waterval versnelt je reis en brengt je 7 vakjes vooruit.",
            /* 61  */     "Een gevonden magische schat opent een kortere route en brengt je 8 vakjes vooruit.",
            /* 62  */     "Een mysterieuze kracht geeft je een duwtje in de rug en brengt je 5 vakjes vooruit.",
            /* 63  */     "Een vriendelijke zeemeermin biedt je een rit op haar rug aan en brengt je 6 vakjes vooruit.",
            /* 64  */     "Een betoverde poort opent zich voor je en brengt je 7 vakjes vooruit.",
            /* 65  */     "Een magische luchtstroom draagt je mee en brengt je 8 vakjes vooruit.",
            /* 66  */     "Een vriendelijke fee biedt je een snelle rit aan en brengt je 5 vakjes vooruit.",
            /* 67  */     "Een gevonden magische sleutel opent een kortere route en brengt je 6 vakjes vooruit.",
            /* 68  */     "Een mysterieuze stroom versnelt je reis en brengt je 7 vakjes vooruit.",
            /* 69  */     "Een betoverd pad wijst je de weg en brengt je 8 vakjes vooruit.",
            /* 70  */     "Een vriendelijke draak biedt je een rit op zijn rug aan en brengt je 5 vakjes vooruit.",
            /* 71  */     "Een magische lantaarn verlicht je pad en brengt je 6 vakjes vooruit.",
            /* 72  */     "Een mysterieuze kracht tilt je op en brengt je 7 vakjes vooruit.",
            /* 73  */     "Een betoverde wolk zweeft je vooruit en brengt je 8 vakjes vooruit.",
            /* 74  */     "Een vriendelijke geest biedt je een rit op zijn wolk aan, waardoor je 5 vakjes vooruit gaat.",
            /* 75  */     "Een magisch kompas wijst je de weg en brengt je 6 vakjes vooruit.",
            /* 76  */     "Een betoverde waterval versnelt je reis en brengt je 7 vakjes vooruit.",
            /* 77  */     "Een gevonden magische schat opent een kortere route en brengt je 8 vakjes vooruit.",
            /* 78  */     "Een mysterieuze kracht geeft je een duwtje in de rug en brengt je 5 vakjes vooruit.",
            /* 79  */     "Een magische lantaarn verlicht je pad en onthult een geheime doorgang die je 8 vakjes vooruit brengt.",
            /* 80  */     "Een vriendelijke alchemist deelt een elixer met je dat je een tijdelijke snelheidsboost geeft en je 5 vakjes vooruit brengt.",
            /* 81  */     "Een betoverde poort opent zich voor je en brengt je 7 vakjes vooruit.",
            /* 82  */     "Een onverwachte regenboog verschijnt en biedt je een kleurrijke lift naar voren, waardoor je 5 vakjes vooruit gaat.",
            /* 83  */     "Een vriendelijke bosnimf wijst je de weg door het dichte bos, waardoor je 6 vakjes vooruit gaat.",
            /* 84  */     "Je ontdekt een verborgen waterval die je via een geheime grot naar voren voert, waardoor je 7 vakjes vooruit gaat.",
            /* 85  */     "Een bevriende dwerg deelt een magische schatkaart met je, die je naar een kortere route leidt en je 8 vakjes vooruit brengt.",
            /* 86  */     "Een mysterieuze lichtstraal doorbreekt de wolken en verlicht je pad, waardoor je 5 vakjes vooruit gaat.",
            /* 87  */     "Een oude tovenaar voert een betovering uit waardoor je de tijd kunt buigen en 6 vakjes vooruit gaat.",
            /* 88  */     "Een zwerm magische vuurvliegjes omringt je en draagt je mee naar voren, waardoor je 7 vakjes vooruit gaat.",
            /* 89  */     "Een magische spreuk opent een portaal naar een andere dimensie en brengt je 8 vakjes vooruit.",
            /* 90  */     "Een vriendelijke reus tilt je op zijn schouders en zet je 5 vakjes vooruit.",
            /* 91  */     "Een plotselinge aardbeving opent een scheur in de grond die je 6 vakjes vooruit werpt.",
            /* 92  */     "Een zeldzame en machtige feniks verschijnt en draagt je op zijn rug naar voren, waardoor je 7 vakjes vooruit gaat.",
            /* 93  */     "Een betoverd kompas onthult een verborgen pad dat je 8 vakjes vooruit brengt.",
            /* 94  */     "Een vriendelijke reiziger deelt zijn magische voedsel met je, waardoor je nieuwe energie krijgt en 5 vakjes vooruit gaat.",
            /* 95  */     "Een draai in de tijd transporteert je naar een eerdere locatie langs het pad, maar wel 6 vakjes vooruit.",
            /* 96  */     "Een toverstokje opent een magische deur die je 7 vakjes vooruit brengt.",
            /* 97  */     "Een oude ruïne biedt beschutting en een kortere route, waardoor je 8 vakjes vooruit gaat.",
            /* 98  */     "Een magische zwaan verschijnt en neemt je mee op haar rug, waardoor je 5 vakjes vooruit gaat.",
            /* 99  */     "Een mysterieuze mist omhult je en transporteert je verder langs het pad, waardoor je 6 vakjes vooruit gaat.",
            /* 100 */     "Een betoverde vijver opent een doorgang naar een verborgen onderwaterwereld, waar je 7 vakjes vooruit gaat."
        ]
    ];
    
// function to draw a random card
function drawRandomCard()
{
    let cardValue = 0;
    const r = Math.random();
    cardValue = Math.floor(r * 200);

    if (numberNine) {
        while (cardValue == 9)
        {
            cardValue = Math.floor(r * 200);
        }
        numberNine = false;
    }
    if (lastTimeNegative) {
        cardValue = Math.floor(r * 100 + 100);
    }
    koningH1.innerHTML = card[0][cardValue];
    koningP.innerHTML = card[1][cardValue];

    if (cardValue === 9) {
        numberNine = true;
    }
    if (cardValue > 100)
    {
        lastTimeNegative = false;
    }
    else
    {
        lastTimeNegative = true;
    }
}    

// If you press the button, draw a random card
koningButton.addEventListener('click', function() {
    drawRandomCard();
});
