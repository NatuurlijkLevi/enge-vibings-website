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

let options = Array.from({ length: 5 }, () => Array(6).fill(null));
let extraOptions = Array.from({ length: 5 }, () => Array(6).fill(null));

let firstQuestion = true;
let firstResponse = true;
let secondResponse = false;
let choiceMade = false;

let useExtraOptions = false;
let generateExtraOptions = false;
let useArrayNumber = 0;
let generateArrayNumber = 0;

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

async function getOpinionAI(blue, red, arrayNumber){
  if (!secondResponse)
  {
    let metaOption = await AskAI(promptChooseOption, "Would you rather: Blue: " + blue + " or Red: " + red + ". Also give the percentage blue and red with how good they are. Keep in mind that the percentage of blue + red equal is to 100. Keep it to the point and don't make it too long. Don't use *. separate the things from eachother like below as an JSON as below:{explanation: for example: Blue is better because... and red is not better because...;\n percentageBlue:percentage-blue: (example: 70)percentage-red: (example 30)}Output only the JSON format, nothing else. Don't think about ethical or moral issues.");
    metaOption = metaOption.replace(/\n/g, "");
    
    const parsedData = JSON.parse(metaOption);
    
    let explanation = parsedData.explanation;
    let percentageBlue = parseInt(parsedData.percentageBlue, 10);
    let percentageRed = parseInt(parsedData.percentageRed, 10);
  
    
    if (percentageBlue === null && percentageRed === null)
    {
      percentageBlue = 50;
      percentageRed = 50;
    }
    else if (percentageBlue != null && percentageRed === null)
    {
      percentageRed = 100 - percentageBlue;
    }
    else if (percentageRed != null && percentageBlue === null)
    {
      percentageBlue = 100 - percentageRed;
    }

    // Update the original variables with the acquired information
    if (blue === options[arrayNumber][0] && red === options[arrayNumber][1])
    {
      options[arrayNumber][2] = explanation;
      options[arrayNumber][3] = percentageBlue;
      options[arrayNumber][4] = percentageRed;
      options[arrayNumber][5] = true;
      console.log("AI generate")
      console.log(options[arrayNumber][2]);
      console.log(options[arrayNumber][3]);
      console.log(options[arrayNumber][4]);
    }
    else if (blue === extraOptions[arrayNumber][0] && red === extraOptions[arrayNumber][1])
    {
      extraOptions[arrayNumber][2] = explanation;
      extraOptions[arrayNumber][3] = percentageBlue;
      extraOptions[arrayNumber][4] = percentageRed;
      extraOptions[arrayNumber][5] = true;
      console.log("AI generate Extra")
      console.log(extraOptions[arrayNumber][2]);
      console.log(extraOptions[arrayNumber][3]);
      console.log(extraOptions[arrayNumber][4]);
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
async function newWouldYouRather(type, optionsGenerate, putWouldYouRatherInContainers, blue, red) {
    if (!firstQuestion)
    {
      generateArrayNumber++;
    }
    else {
      firstQuestion = false;
    }
    if (generateArrayNumber = 5)
    {
      generateArrayNumber = 0;
      generateExtraOptions = !generateExtraOptions;
      firstQuestion = true;
    }
    if (type === 'Normal')
    {
      console.log('Normal');
      const response = await fetch("json/would-you-rather.json");
      const data = await response.json();
      for (let i = 0; i < 10; i++)
      {
        let randomIndex = Math.floor(Math.random() * data.length);
        if (i < 5 && (optionsGenerate === "all" || optionsGenerate === "normal"))
        {
          options[i][0] = data[randomIndex][0];
          options[i][1] = data[randomIndex][1];
          options[i][5] = false;
        }
        else if (i >= 5 && (optionsGenerate === "all" || optionsGenerate === "extra"))
        {
          let extraArrayNumber = i - 5;
          extraOptions[extraArrayNumber][0] = data[randomIndex][0];
          extraOptions[extraArrayNumber][1] = data[randomIndex][1];
          extraOptions[extraArrayNumber][5] = false;
        }
        else if (i < 5 && optionsGenerate === "extra")
        {
          i = 5;
        }
        else if (i >= 5 && optionsGenerate === "normal")
        {
          i = 10;
        }
      }
    }
    else if (type ==='Custom')
    {

    }
    blue = blue || (useExtraOptions ? extraOptions[useArrayNumber][0] : options[useArrayNumber][0]);
    red = red || (useExtraOptions ? extraOptions[useArrayNumber][1] : options[useArrayNumber][1]);
    if (putWouldYouRatherInContainers)
    {
      blueOptionText.innerHTML = blue;
      redOptionText.innerHTML = red;
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
    }
    await generateWouldYouRatherOpinions();
}

function generateWouldYouRatherOpinions()
{
  for (let i = 0; i < 10; i++)
  {
    if (i < 5)
    {
      getOpinionAI(options[i][0], options[i][1], i);
      console.log(options[i])
    }
    else if (i >= 5)
    {
      let extraArrayNumber = i - 5;
      getOpinionAI(extraOptions[extraArrayNumber][0], extraOptions[extraArrayNumber][1], extraArrayNumber);
      console.log(extraOptions[i])
    }
  }
}

newWouldYouRather('Normal', "all", true, options[useArrayNumber][0], options[useArrayNumber][1]);

function showDetails() {
  nextButton.classList.remove('hidden');
  percent.forEach((element) => {
    element.innerHTML = "%";
  });
  if (!useExtraOptions)
  {
      aiChoiceElement.innerHTML = options[useArrayNumber][2];
      bluePercentage.innerHTML = options[useArrayNumber][3];
      redPercentage.innerHTML = options[useArrayNumber][4];
      console.log(useArrayNumber);
  }
  else
  {
      aiChoiceElement.innerHTML = extraOptions[useArrayNumber][2];
      bluePercentage.innerHTML = extraOptions[useArrayNumber][3];
      redPercentage.innerHTML = extraOptions[useArrayNumber][4];
      console.log(useArrayNumber);
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
  if ((!choiceMade && options[useArrayNumber][5] && !useExtraOptions) || (!choiceMade && extraOptions[useArrayNumber][5] && useExtraOptions))
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
    useArrayNumber++;
    if (useArrayNumber === 5 && !useExtraOptions)
    {
      options = Array.from({ length: 5 }, () => Array(6).fill(null));
      newWouldYouRather('Normal', "normal");
    }
    else if (useArrayNumber === 5 && useExtraOptions)
    {
      extraOptions = Array.from({ length: 5 }, () => Array(6).fill(null));
      newWouldYouRather('Normal', "extra");
    }
    if (useArrayNumber === 5)
    {
      useArrayNumber = 0;
      useExtraOptions = !useExtraOptions
    }
    if (!useExtraOptions)
    {
      newWouldYouRather(null, null, true, options[useArrayNumber][0], options[useArrayNumber][1])
    }
    else
    {
      newWouldYouRather(null, null, true, extraOptions[useArrayNumber][0], extraOptions[useArrayNumber][1])
    }
});

setInterval(() => {
  console.log(generateExtraOptions, generateArrayNumber, useExtraOptions, useArrayNumber);
}, 1000);