const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const linkItems = document.querySelectorAll("nav > ul > li");
let bodyRect = body.getBoundingClientRect(body);

linkItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.id !== "currentpage")
    {
      let current = document.getElementById("currentpage");
      current.id = "";
      item.id = "currentpage";
      if (item.innerHTML == "<p>Home</p>") {
        main.id = "home";
        header.className = "";
        main.children[1].children[0].style.display = "none";
        setTimeout(() => {
          main.children[1].innerHTML = "<iframe src='quote.html'></iframe>";
        }, 750);
      }
      else if (item.innerHTML == "<p>Logeerpartijtje</p>") {
        main.id = "logeerpartijtje";
        header.className = "visible";
        main.children[1].children[0].style.display = "none";
        setTimeout(() => {
          main.children[1].innerHTML ="<iframe src='logeerpartijtje.html'></iframe>";
        }, 750);
      }
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