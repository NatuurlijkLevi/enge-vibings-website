const body = document.querySelector('body');
const linkItems = document.querySelectorAll('nav > ul > li');
let bodyRect = body.getBoundingClientRect(body);

console.log(bodyRect.width, bodyRect.height);

linkItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.id !== 'currentpage')
    {
        let current = document.getElementById('currentpage');
        current.id = '';
        item.id = 'currentpage';
    }
  });
});