// Initialize variables
const blueOption = document.getElementById('blue-option');
const redOption = document.getElementById('red-option');
const blueOptionText = document.querySelector('#blue-option > p');
const bluePercentage = document.querySelector('#blue-option span.percentage');
const redOptionText = document.querySelector('#red-option > p');
const redPercentage = document.querySelector('#red-option span.percentage');
const percent = document.querySelectorAll('.percent');
const nextButton = document.getElementById('next-button');
const aiChoiceElement = document.getElementById('ai-choice');

let optionText;
let optionA;
let optionB;
let aiPercentageA;
let aiPercentageB;
let aiChoice;

let extraOptionA = "";
let extraOptionB = "";
let extraAiPercentageA;
let extraAiPercentageB;
let extraAiChoice;

let oldOptionA;
let oldOptionB;
let oldAiPercentageA;
let oldAiPercentageB;
let oldAiChoice;

let firstResponse = true;
let secondResponse = false;
let choiceMade = false;
let timeSinceOptionsCreatedNewWYR = 0;
let timeSinceOptionsCreatedShowDetails = 0;

const promptChooseOption = "You are good at making choices and you are a helpful AI. You can explain clearly why one is better than the other."

async function AskAI(systemPrompt, UserPrompt)
{
  const response = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "messages":[
      { role: "system", content: systemPrompt },
      { role: "user", content: UserPrompt },
    ]})
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function getOpinionAI(blue, red){
  if (!secondResponse)
  {
    let metaOption = await AskAI(promptChooseOption, "Would you rather: Blue: " + blue + " or Red: " + red + ". Also give the percentage blue and red with how good they are. Keep in mind that the percentage of blue + red equal is to 100. Keep it to the point and don't make it too long. The explainations should be before everything and dont but text after the last percentage. Don't use *. separate the things from eachother like below:\m\n Explaination: for example: Blue is better because... and red is not better because...;\n percentageBlue: percentageBlue (example: 70)\n percentageRed: percentageRed (example 30)");
    metaOption = metaOption.replace(/\n/g, "");
    let explanationMatch = metaOption.match(/Explaination:\s*(.*)\s*percentageBlue:/);
    console.log(metaOption, firstResponse);
    if (explanationMatch == null)
    {
      explanationMatch = metaOption.match(/\*\*Explaination*\*\s*(.*)\s*percentageBlue:/);
    }
    let percentageBlueMatch = metaOption.match(/percentageBlue:\s*(\d+)/);
    if (percentageBlueMatch == null)
    {
      percentageBlueMatch = metaOption.match(/percentage Blue:\s*(\d+)/);
    }
    let percentageRedMatch = metaOption.match(/percentageRed:\s*(\d+)/);
    if (percentageRedMatch == null)
    {
      percentageRedMatch = metaOption.match(/percentage Red:\s*(\d+)/);
    }
    let metaChoice = explanationMatch ? explanationMatch[1].trim() : '';
    let metaPercentageA = percentageBlueMatch ? parseInt(percentageBlueMatch[1], 10) : 0;
    let metaPercentageB = percentageRedMatch ? parseInt(percentageRedMatch[1], 10) : 0;
    
    // Update the original variables with the acquired information
    if (blue === optionA && red === optionB)
    {
      aiChoice = metaChoice;
      aiPercentageA = metaPercentageA;
      aiPercentageB = metaPercentageB;
      console.log("AI generate")
      console.log(aiChoice);
      console.log(aiPercentageA);
      console.log(aiPercentageB);
    }
    else if (blue === extraOptionA && red === extraOptionB)
    {
      extraAiChoice = metaChoice;
      extraAiPercentageA = metaPercentageA;
      extraAiPercentageB = metaPercentageB;
      console.log("AI generate Extra")
      console.log(extraAiChoice);
      console.log(extraAiPercentageA);
      console.log(extraAiPercentageB);
    }
    if (firstResponse)
    {
      firstResponse = false;
      secondResponse = true;
    }
  }
  else {
    secondResponse = false;
  }
}

// Fetch the would-you-rather.json file and select a random would you rather
async function newWouldYouRather(type, makeExtra, putWouldYouRatherInContainers, A, B) {
    if (type === 'Normal')
    {
      console.log('Normal');
      const response = await fetch("json/would-you-rather.json");
      const data = await response.json();
      for (let i = 0; i < 2; i++)
      {
        let randomIndex = Math.floor(Math.random() * data.length);
        if (i === 0)
        {
          optionA = data[randomIndex][0];
          optionB = data[randomIndex][1];
        }
        else if (i === 1)
        {
          extraOptionA = data[randomIndex][0];
          extraOptionB = data[randomIndex][1];
        }
        if (!makeExtra)
        {
          i = 2;
        }
      }
    }
    else if (type === 'Crazy')
    {

    }
    else if (type === 'Hard Choices')
    {

    }
    else if (type ==='Hot')
    {

    }
    else if (type ==='Mixed')
    {

    }
    else if (type ==='Custom')
    {

    }
    A = A || optionA || extraOptionA || oldOptionA;
    B = B || optionB || extraOptionB || oldOptionB;
    if (putWouldYouRatherInContainers)
    {
      blueOptionText.innerHTML = A;
      redOptionText.innerHTML = B;
    }
    optionText = new SplitType('.option-text', {
        types: 'lines, words, chars',
        tagName: 'span'
      });    
    gsap.from('.option-text .line', {
      y: '100%',
      opacity: 0,
      duration: 0.80,
      ease: 'power2.out',
      stagger: 0.15,
    })
    if (type !== null)
    {
      getOpinionAI(optionA, optionB);
      if (makeExtra) {
        getOpinionAI(extraOptionA, extraOptionB);
      }
      timeSinceOptionsCreatedNewWYR++;
    }
}

newWouldYouRather('Normal', true, true, optionA, optionB);
optionA = "";
optionB = "";
setTimeout(() => {
  newWouldYouRather('Normal', false, false, optionA, optionB);
}, 60000)

function showDetails() {
  nextButton.classList.remove('hidden');
      percent.forEach((element) => {
        element.innerHTML = "%";
      });
    switch (timeSinceOptionsCreatedShowDetails)
    {
      case 0:
        aiChoiceElement.innerHTML = aiChoice;
        bluePercentage.innerHTML = aiPercentageA;
        redPercentage.innerHTML = aiPercentageB;
        break;
      case 1:
        aiChoiceElement.innerHTML = extraAiChoice;
        bluePercentage.innerHTML = extraAiPercentageA;
        redPercentage.innerHTML = extraAiPercentageB;
        break;
      case 2:
        aiChoiceElement.innerHTML = oldAiChoice;
        bluePercentage.innerHTML = oldAiPercentageA;
        redPercentage.innerHTML = oldAiPercentageB;
        break;
    }
    timeSinceOptionsCreatedShowDetails++;
    if (timeSinceOptionsCreatedShowDetails === 3)
    {
      timeSinceOptionsCreatedShowDetails = 0;
    }
}

// When clicked the blue option, the blue option will be selected
blueOption.addEventListener('click', () => {
    if (!choiceMade)
    {
      choiceMade = true;
      blueOption.classList.add('selected');
      showDetails();
    }
});

redOption.addEventListener('click', () => {
  if (!choiceMade)
  {
    choiceMade = true;
    redOption.classList.add('selected');
    showDetails();
  }
});

// When clicked the next button, the next would you rather will be selected
nextButton.addEventListener('click', () => {
    optionText.revert();
    percent.forEach((element) => {
      element.innerHTML = "";
    });
    blueOption.classList.remove('selected');
    redOption.classList.remove('selected');
    nextButton.classList.add('hidden');
    aiChoiceElement.innerHTML = "";
    bluePercentage.innerHTML = "";
    redPercentage.innerHTML = "";
    blueOptionText.innerHTML = "";
    redOptionText.innerHTML = "";
    choiceMade = false;
    switch (timeSinceOptionsCreatedShowDetails)
    {
      case 0:
        newWouldYouRather(null, null, true, optionA, optionB);
        optionA = "";
        optionB = "";
        newWouldYouRather('Normal', false);
        console.log("OptionA & B")
        break;
      case 1:
        newWouldYouRather(null, null, true, extraOptionA, extraOptionB);
        extraOptionA = "";
        extraOptionB = "";
        oldOptionA = optionA;
        oldOptionB = optionB;
        oldAiPercentageA = aiPercentageA;
        oldAiPercentageB = aiPercentageB;
        oldAiChoice = aiChoice;
        newWouldYouRather('Normal', true);
        console.log("ExtraOptionA & B")
        break;
      case 2:
        newWouldYouRather(null, null, true, oldOptionA, oldOptionB);
        oldOptionA = "";
        oldOptionA = "";
        console.log("OldOptionA & B")
        timeSinceOptionsCreatedNewWYR = 0;
        break;
    }
});

setInterval(() => {
  console.log(timeSinceOptionsCreatedNewWYR, timeSinceOptionsCreatedShowDetails);
}, 1000);