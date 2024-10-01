// Initialize variables
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const linkItems = document.querySelectorAll("nav > ul > li");
let bodyRect = body.getBoundingClientRect(body);

// For each link item in the navbar
linkItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Check if the clicked item is not the current page
    if (item.id !== "currentpage")
    {
      // Change the current page to the clicked item
      let current = document.getElementById("currentpage");
      current.id = "";
      item.id = "currentpage";
      // If the clicked item is "Home", change the main content to the home page
      if (item.innerHTML == "<p>Home</p>") {
        main.id = "home";
        header.className = "";
        main.children[1].children[0].style.display = "none";
        setTimeout(() => {
          main.children[1].innerHTML = "<iframe src='quote.html'></iframe>";
        }, 750);
      }
      // If the clicked item is "Logeerpartijtje", change the main content to the sleepover page
      else if (item.innerHTML == "<p>Logeerpartijtje</p>") {
        main.id = "logeerpartijtje";
        header.className = "visible";
        main.children[1].children[0].style.display = "none";
        setTimeout(() => {
          main.children[1].innerHTML ="<iframe src='logeerpartijtje.html'></iframe>";
        }, 750);
      }
      // If the clicked item is "Games", change the main content to the games page
      else if (item.innerHTML == "<p>Games</p>") {
        main.id = "games";
        header.className = "";
        main.children[1].children[0].style.display = "none";
        setTimeout(() => {
          main.children[1].innerHTML = "<iframe src='games.html'></iframe>";
        }, 750);
      }
    }
  });
});