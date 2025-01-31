// snowify library:
    /**
    * snowify - A JavaScript library for generating snow balls to use on any website
    *
    * @author Gaurav Pandey
    * @license MIT
    * 
    */
    const o="snowify__snow";let e=document.getElementById(o);function n(o,e){return Math.floor(Math.random()*(e-o+1))+o}const t={white:"#ffffff",offWhite:"#e4f3ff",veryLightBlue:"#b9e1ff",lightBlue:"#a6d9ff",blue:"#80c8ff"},initSnowify=i=>{const{snowColor:s="white",snowCount:r=200}=i??{};e&&(e.remove(),e=null);const l=t[s]??"white";let a=r??200;if(isNaN(a)&&(a=200),("white"===document?.body?.style?.backgroundColor||"#ffffff"===document?.body?.style?.backgroundColor||"rgb(255, 255, 255)"===document?.body?.style?.backgroundColor||"rgba(255, 255, 255, 1)"===document?.body?.style?.backgroundColor||"transparent"===document?.body?.style?.backgroundColor||""===document?.body?.style?.backgroundColor||"initial"===document?.body?.style?.backgroundColor||"inherit"===document?.body?.style?.backgroundColor||"unset"===document?.body?.style?.backgroundColor&&"white"===s),a<50?(console.warn("The snow count is too low. The minimum snow count is 50."),a=50):a>500&&(console.warn("The snow count is too high. The maximum snow count is 500."),a=500),!e){var d=".snowify_snow {  position: absolute;  width: 10px;  height: 10px;  background:"+l+";  border-radius: 50%;  margin-top: -10px;}",c="";for(let o=1;o<a;o++){c+='<i class="snowify_snow"></i>';var f=1e-4*n(0,1e6),u=1e-4*n(-1e5,1e5),h=(10*n(3,8)).toFixed(2),w=(1e-4*n(0,1e4)).toFixed(2);d+=".snowify_snow:nth-child("+o+") {  opacity: "+(1e-4*n(1,1e4)).toFixed(2)+";  transform: translate("+f.toFixed(2)+"vw, -10px) scale("+w+");  animation: fall-"+o+" "+n(10,30)+"s -"+n(0,30)+"s linear infinite;}@keyframes fall-"+o+" {"+h+"% {transform: translate("+(f+u).toFixed(2)+"vw, "+h+"vh) scale("+w+");}to {transform: translate("+(f+u/2).toFixed(2)+"vw, 105vh) scale("+w+");}}"}e=document.createElement("div"),e.id=o,e.innerHTML="<style>#snowify__snow {position: fixed;left: 0;top: 0;bottom: 0;width: 100vw;height: 100vh;overflow: hidden;z-index: 9999999;pointer-events: none;}"+d+"</style>"+c,document.body.appendChild(e)}};initSnowify.destroy=()=>{e&&(e.remove(),e=null)};

// My code:
// Initialize variables
const cssTheme = document.getElementById('css-theme');
const bodyElement = document.querySelector('body')
const monthOfYear = new Date().getMonth() + 1;
const dayOfMonth = new Date().getDate();
const thisYear = new Date().getFullYear();
let clickCounter = 0;

const partyDates = [{month: 3, startDay: 8, endDay: 9, year: 2025}];

// Function to check if the page is in an iframe
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
  }

// If the month of year is 12 (december) and between dates 6 and 29, set the theme to christmas an save in localstorage
if (monthOfYear === 12 && (dayOfMonth >= 6 && dayOfMonth <= 29)) {
    localStorage.setItem('theme', 'christmas');
}
else if (localStorage.getItem('themeSetWithCommands') != "true") {
    localStorage.setItem('theme', null);
}

if (partyDates.some(date => date.month === monthOfYear && date.startDay >= dayOfMonth && date.endDay <= dayOfMonth && date.year === thisYear))
{
    localStorage.setItem('clickEvent', 'party');
}
else if (localStorage.getItem('clickEventSetWithCommands') != "true")
{
    localStorage.setItem('clickEvent', null);
}

localStorage.setItem('clickEvent', 'party');

// get the href of the css object if it's not null'
let href
if (cssTheme != null)
{
    href = cssTheme.href;
    // if it's christmas, change the css and make it snow
    if (localStorage.getItem('theme') === "christmas") {
        if (cssTheme != null)
        {
            href = href.replace("main.css", "main-christmas.css");
        }
        // If the cssTheme Element is null it's christmas, make it snow
        if (!inIframe())
        {
            initSnowify();
        }
    }
    cssTheme.href = href;
}