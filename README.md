# Enge Vibings Website (Leip Logeerpartijtje)
This website is made to replace the [linktree](linktr.ee/engevibings) to support my board game. This way you also don't have to open the different programs I made for this game so everything can quickly be used. There are also some fun party games like Would You Rather and Truth Or Dare.

## Installation

1. Install [Git](https://git-scm.com/downloads) and [Visual Studio Code](https://code.visualstudio.com/download) if you don't have them yet.
2. Press 'clone' on the GitLab page.
3. Choose 'Open in your IDE' > 'Visual Studio Code (HTTPS)'.
4. Select a folder where you want the project to be.
5. Then press open.
6. You have now successfully installed the project.

If you want AI integration for the games you are not done yet. You will need LM Studio to run commands through AI. To do this, you need to do the following:
1. Install [LM Studio](https://lmstudio.ai/) if you don't have it yet.
2. After the installation, you have to download the model: 'dolphin-2.8-mistral-7b-v02-GGUF'. This one gives the best response and most likely works the best.
3. Load the model (dolphin-2.8-mistral-7b-v02-GGUF) in LM Studio (by either pressing Ctrl + L or using the button on the top middle of the screen)
4. Go to the navbar on the left (in LM Studio) and press Developer mode (green button)
5. Enable CORS
6. Start the LM Studio Server.
7. Now you successfully started the AI server

## Usage

If you want to run the code, you have to install the 'Live Server' extension. Then you have to press 'Go Live' on the bottom right of the screen.

## Contributing

Pull requests are welcome. For other changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Interesting code snippits

[Working Wheel Spinner](https://github.com/NatuurlijkLevi/enge-vibings-website/blob/main/games/js/wheelspinner.js#L196-L297)  
[Would You Rather - Read JSON file and put contents in the right box](https://github.com/NatuurlijkLevi/enge-vibings-website/blob/main/games/js/would-you-rather.js#L15-L21)  
[When clicked on an ingredient in Heksensoep, it gets added to the soup](https://github.com/NatuurlijkLevi/enge-vibings-website/blob/main/games/js/heksensoep.js#L125-L185)  
[Navigation that's controlled by JS so you can have the cool transitions](https://github.com/NatuurlijkLevi/enge-vibings-website/blob/main/js/navbar.js#L10-L56)

## Authors and Acknowledgment

This project was solely developed by Levi Meijer for the party game Leip Logeerpartijtje.

I made use of the following JS library's:
[Spin Wheel](https://crazytim.github.io/spin-wheel/)  
[Easing](https://github.com/danheberden/easing.js/)  
[Gsap](https://gsap.com/)  
[Split-type](https://www.npmjs.com/package/split-type)  

## License

[MIT](LICENSE)