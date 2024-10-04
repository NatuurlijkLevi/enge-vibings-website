const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})