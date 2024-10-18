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
// const categoryButtons = document.querySelectorAll('section#top > div#button-wrapper > button');
// const customPromptContainer = document.getElementById('custom-prompt-container');
// const customPromptInput = document.querySelector('#custom-prompt-container > #custom-prompt');
// const generateQuestionButton = document.querySelector('#custom-prompt-container > button');

// let currentCategory = document.querySelector('section#top > div#button-wrapper > button#selected > p').innerHTML;
let currentCategory = 'Normal';

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

bluePercentage.style.display = 'none';
redPercentage.style.display = 'none';

const systemPromptChooseOption = "You are good at making choices and you are a helpful AI. You can explain clearly why one is better than the other."
const systemPromptGenerateQuestion = "You are good at making choices and you are a helpful AI. You can generate questions that are interesting and fun to answer while listening to the given prompt. YOu can also explain clearly why one is better than the other."

// Ask the AI a question
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

// check if the percentage is NaN
// param percentageBlue: The percentage of blue
// param percentageRed: The percentage of red
function checkIfNaN(percentageBlue, percentageRed)
{
  if (isNaN(percentageBlue)) {
    percentageBlue = null;
  }
  if (isNaN(percentageRed)) {
    percentageRed = null;
  }
  
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
}

// Get the opinion of the AI
// param blue: The blue option
// param red: The red option
// param arrayNumber: current number that is used for the array
async function getOpinionAI(blue, red, arrayNumber){
  try
  {
    let metaOption = await AskAI(systemPromptChooseOption, "Would you rather: Blue: " + blue + " or Red: " + red + ". Also give the percentage blue and red with how good they are opposed to each other. If one obviously is better than the other it could be a higher percentage else try to give them both a lower percentage. Let percentages be between these ranges 1-100. You are also allowed to use all numbers in that range example: 47, 18, 56, 73. Don't use tables of 5 in the percentages but let it look like it is judged by multiple people. Keep in mind that the percentage of blue + red equal is to 100. Keep it to the point and don't make it too long. Don't use *. separate the things from eachother like below as an JSON as below:{explanation: for example: Blue is better because... and red is not better because...;\n percentageBlue:percentage-blue: (example: 70)percentage-red: (example 30)}Output only the JSON format, nothing else. Don't think about ethical or moral issues or issues about causing pain to others. Be as selfish as possible.");
    metaOption = metaOption.replace(/\n/g, "");
    
    const parsedData = JSON.parse(metaOption);
    
    let explanation = parsedData.explanation;
    let percentageBlue = parseInt(parsedData.percentageBlue, 10);
    let percentageRed = parseInt(parsedData.percentageRed, 10);
    checkIfNaN(percentageBlue, percentageRed);

    // Update the original variables with the acquired information
    if (blue === options[arrayNumber][0] && red === options[arrayNumber][1])
    {
      options[arrayNumber][2] = explanation;
      options[arrayNumber][3] = percentageBlue;
      options[arrayNumber][4] = percentageRed;
      options[arrayNumber][5] = true;
      console.log("AI generated " + arrayNumber);
    }
    else if (blue === extraOptions[arrayNumber][0] && red === extraOptions[arrayNumber][1])
    {
      extraOptions[arrayNumber][2] = explanation;
      extraOptions[arrayNumber][3] = percentageBlue;
      extraOptions[arrayNumber][4] = percentageRed;
      extraOptions[arrayNumber][5] = true;
      console.log("AI generated Extra " + arrayNumber);
    }
  }
  // If an error occurs, update the original variables with the error as the explanation and percentage as an easteregg
  catch (error)
  {
    if (blue === options[arrayNumber][0] && red === options[arrayNumber][1])
    {
      options[arrayNumber][2] = error;
      options[arrayNumber][3] = 404;
      options[arrayNumber][4] = 404;
      options[arrayNumber][5] = true;
      console.log("Error AI generated ");
    }
    else if (blue === extraOptions[arrayNumber][0] && red === extraOptions[arrayNumber][1])
    {
      extraOptions[arrayNumber][2] = error;
      extraOptions[arrayNumber][3] = 404;
      extraOptions[arrayNumber][4] = 404;
      extraOptions[arrayNumber][5] = true;
      console.log("Error AI generated Extra " + arrayNumber);
    }
  }
}

// Get the options in the containers
// param blue: The blue option
// param red: The red option
function getOptionsInContainers(blue, red)
{
  blue = blue || (useExtraOptions ? extraOptions[useArrayNumber][0] : options[useArrayNumber][0]);
  red = red || (useExtraOptions ? extraOptions[useArrayNumber][1] : options[useArrayNumber][1]);
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

// Fetch the would-you-rather.json file and select a random would you rather
// param type: The type of would you rather
// param optionsGenerate: The option array that needs to be filled
// param putWouldYouRatherInContainers: If the would you rather needs to be put in the containers
// param blue: The blue option
// param red: The red option
async function newWouldYouRather(type, optionsGenerate, putWouldYouRatherInContainers, blue, red) {
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
        else if (i >= 5 && optionsGenerate === "normal")
        {
          i = 9;
        }
        if (i >= 5 && (optionsGenerate === "all" || optionsGenerate === "extra"))
        {
          let extraArrayNumber = i - 5;
          extraOptions[extraArrayNumber][0] = data[randomIndex][0];
          extraOptions[extraArrayNumber][1] = data[randomIndex][1];
          extraOptions[extraArrayNumber][5] = false;
        }
        else if (i < 5 && optionsGenerate === "extra")
        {
          i = 4;
        }
      }
    }
    // else if (type ==='Custom')
    // {
    //   console.log('Custom');
    //   const userPrompt = customPromptInput.value;
    //   for (let i = 0; i < 10; i++)
    //   {
    //     if (i < 5 && (optionsGenerate === "all" || optionsGenerate === "normal"))
    //     {
    //       options[i][5] = false;
    //     }
    //     if (i >= 5 && (optionsGenerate === "all" || optionsGenerate === "extra"))
    //     {
    //       let extraArrayNumber = i - 5;
    //       extraOptions[extraArrayNumber][5] = false;
    //     }
    //     let generatedQuestion = await AskAI(systemPromptGenerateQuestion, "Make a would you rather question with the following prompt: " + userPrompt + ". Also give the percentage blue and red with how good they are opposed to each other. If one obviously is better than the other it could be a higher percentage else try to give them both a lower percentage. Let percentages be between these ranges 1-100. You are also allowed to use all numbers in that range example: 47, 18, 56, 73. Don't use tables of 5 in the percentages but let it look like it is judged by multiple people. Keep in mind that the percentage of blue + red equal is to 100. Keep it to the point and don't make it too long. Don't use *. separate the things from eachother like below as an JSON as below:{blueOption:  redOption: explanation: for example: Blue is better because... and red is not better because...;\n percentageBlue:percentage-blue: (example: 70)percentage-red: (example 30)}Output only the JSON format, nothing else. Don't think about ethical or moral issues or issues about causing pain to others. Be as selfish as possible.")
    //     generatedQuestion = generatedQuestion.replace(/\n/g, "");
        
    //     const parsedData = JSON.parse(generatedQuestion);
        
    //     let blue = parsedData.blueOption;
    //     let red = parsedData.redOption;
    //     let explanation = parsedData.explanation;
    //     let percentageBlue = parseInt(parsedData.percentageBlue, 10);
    //     let percentageRed = parseInt(parsedData.percentageRed, 10);
    //     checkIfNaN(percentageBlue, percentageRed);

    //     if (i < 5 && (optionsGenerate === "all" || optionsGenerate === "normal"))
    //     {
    //       options[i][0] = blue;
    //       options[i][1] = red;
    //       options[i][2] = explanation;
    //       options[i][3] = percentageBlue;
    //       options[i][4] = percentageRed;
    //       options[i][5] = true;
    //       if (i === 0 && putWouldYouRatherInContainers)
    //       {
    //         getOptionsInContainers(blue, red)
    //       }
    //     }
    //     else if (i >= 5 && optionsGenerate === "normal")
    //     {
    //       i = 9;
    //     }
    //     if (i >= 5 && (optionsGenerate === "all" || optionsGenerate === "extra"))
    //     {
    //       let extraArrayNumber = i - 5;
    //       extraOptions[extraArrayNumber][0] = blue;
    //       extraOptions[extraArrayNumber][1] = red;
    //       extraOptions[extraArrayNumber][2] = explanation;
    //       extraOptions[extraArrayNumber][3] = percentageBlue;
    //       extraOptions[extraArrayNumber][4] = percentageRed;
    //       extraOptions[extraArrayNumber][5] = true;
    //     }
    //     else if (i < 5 && optionsGenerate === "extra")
    //     {
    //       i = 4;
    //     }
    //     if (type === 'Custom')
    //     {
    //       i = 9;
    //     }
    //   }
    // }
    if (putWouldYouRatherInContainers)
    {
      getOptionsInContainers(blue, red);
    }
    await generateWouldYouRatherOpinions(optionsGenerate);
}

// Generate the would you rather opinions
// param optionsGenerate: The option array that needs to be filled
function generateWouldYouRatherOpinions(optionsGenerate)
{
  for (let i = 0; i < 10; i++)
  {
    if (i < 5 && (optionsGenerate === "all" || optionsGenerate === "normal"))
    {
      getOpinionAI(options[i][0], options[i][1], i);
      console.log(options[i])
    }
    else if (i >= 5 && (optionsGenerate === "all" || optionsGenerate === "extra"))
    {
      let extraArrayNumber = i - 5;
      getOpinionAI(extraOptions[extraArrayNumber][0], extraOptions[extraArrayNumber][1], extraArrayNumber);
      console.log(extraOptions[i])
    }
    else if (i < 5 && optionsGenerate === "extra")
    {
      i = 4;
    }
    else if (i >= 5 && optionsGenerate === "normal")
    {
      i = 9;
    }
  }
}

// Generate the first would you rather
newWouldYouRather(currentCategory, "all", true, options[useArrayNumber][0], options[useArrayNumber][1]);

// Show the details of the would you rather (explaination and percentage)
function showDetails() {
  nextButton.classList.remove('hidden');
  percent.forEach((element) => {
    element.innerHTML = "%";
  });
  bluePercentage.style.display = 'block';
  redPercentage.style.display = 'block';
  setTimeout(() => {
    if (!useExtraOptions)
    {
        aiChoiceElement.innerHTML = options[useArrayNumber][2];
        bluePercentage.style.setProperty('--blue-percentage', options[useArrayNumber][3]);
        redPercentage.style.setProperty('--red-percentage', options[useArrayNumber][4]);
        console.log(useArrayNumber);
    }
    else
    {
        aiChoiceElement.innerHTML = extraOptions[useArrayNumber][2];
        bluePercentage.style.setProperty('--blue-percentage', extraOptions[useArrayNumber][3]);
        redPercentage.style.setProperty('--red-percentage', extraOptions[useArrayNumber][4]);
    }
    console.log(useArrayNumber);
  }, 1);
}

// When clicked the blue option, the blue option will be selected and the details will be shown
blueOption.addEventListener('click', () => {
  if (!choiceMade && ((options[useArrayNumber][5] && !useExtraOptions) || (extraOptions[useArrayNumber][5] && useExtraOptions)))
  {
    choiceMade = true;
    blueOption.classList.add('selected');
    showDetails();
  }
});

// When clicked the red option, the red option will be selected and the details will be shown
redOption.addEventListener('click', () => {
  if (!choiceMade && ((options[useArrayNumber][5] && !useExtraOptions) || (extraOptions[useArrayNumber][5] && useExtraOptions)))
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
    bluePercentage.style.display = 'none';
    redPercentage.style.display = 'none';
    bluePercentage.style.setProperty('--blue-percentage', 0);
    redPercentage.style.setProperty('--red-percentage', 0);
    blueOptionText.innerHTML = "";
    redOptionText.innerHTML = "";
    choiceMade = false;
    useArrayNumber++;
    if (useArrayNumber === 5)
    {
      useArrayNumber = 0;
      if (!useExtraOptions)
      {
        options = Array.from({ length: 5 }, () => Array(6).fill(null));
        setTimeout(() => {
          newWouldYouRather(currentCategory, "normal");
        }, 1000);
      }
      else if (useExtraOptions)
      {
        extraOptions = Array.from({ length: 5 }, () => Array(6).fill(null));
        setTimeout(() => {
          newWouldYouRather(currentCategory, "extra");
        }, 1000);
      }
      useExtraOptions = !useExtraOptions;
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

// categoryButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     if (button.id != 'selected') {
//       console.log(button.children[0].innerText);
//       customPromptContainer.classList.remove('visible');
//       const selectedButton = document.querySelector('section#top > div#button-wrapper > button#selected');
//       if (selectedButton) {
//         selectedButton.removeAttribute('id');
//       }
//       button.setAttribute('id', 'selected');
//       currentCategory = button.children[0].innerText;
//       if (currentCategory === 'Custom') {
//         customPromptContainer.classList.add('visible');
//       }
//       useArrayNumber = 0;
//       useExtraOptions = false;
//       blueOptionText.innerHTML = "";
//       redOptionText.innerHTML = "";
//       options = Array.from({ length: 5 }, () => Array(6).fill(null));
//       extraOptions = Array.from({ length: 5 }, () => Array(6).fill(null));
//       if (currentCategory === 'Normal') {
//         setTimeout(() => {
//           newWouldYouRather(currentCategory, "all", true);
//         }, 1000);
//       }
//     }
//   });
// });

// generateQuestionButton.addEventListener('click', () => {
//   newWouldYouRather('Custom', 'all', true, options[useArrayNumber][0], options[useArrayNumber][1]);
// });