const cssTheme = document.getElementById('css-theme');
const monthOfYear = new Date().getMonth() + 1;
const dayOfMonth = new Date().getDate();
console.log(cssTheme, monthOfYear, dayOfMonth);

if (monthOfYear === 12 && (dayOfMonth >= 6 && dayOfMonth <= 29)) {
    localStorage.setItem('theme', 'christmas');
}
// else if (monthOfYear === 11)
// {
//     localStorage.setItem('theme', 'christmas');
// }
else {
    localStorage.setItem('theme', null);
}


let href = cssTheme.href;
if (localStorage.getItem('theme') === "christmas") {
    href = href.replace("main.css", "main-christmas.css");
}
cssTheme.href = href;
console.log(cssTheme.href);