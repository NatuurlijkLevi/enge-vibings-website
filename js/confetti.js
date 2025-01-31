// Function to dynamically load a script
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
    script.onload = callback;
}

// Load party-js library
loadScript('https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js', () => {
    partyJsLoaded = true;
});

// Wait until the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Find the highest parent window
    const topWindow = window.top || window;
    const topDocument = topWindow.document;

    // Create the clickPositionElement in the highest parent
    let clickPositionElement;
    if (window === topWindow) {
        clickPositionElement = document.createElement('div');
        clickPositionElement.style.position = 'fixed';
        clickPositionElement.style.top = '0';
        clickPositionElement.style.left = '0';
        document.body.appendChild(clickPositionElement);
    } else {
        clickPositionElement = topDocument.querySelector('#confetti-position') || (() => {
            const el = topDocument.createElement('div');
            el.id = 'confetti-position';
            el.style.position = 'fixed';
            el.style.top = '0';
            el.style.left = '0';
            topDocument.body.appendChild(el);
            return el;
        })();
    }

    // Function to calculate the total offset by going through all parent iframes
    function getTotalOffset() {
        let currentWindow = window;
        let totalOffsetX = 0;
        let totalOffsetY = 0;

        while (currentWindow !== topWindow) {
            const iframe = currentWindow.frameElement;
            const rect = iframe.getBoundingClientRect();
            totalOffsetX += rect.left;
            totalOffsetY += rect.top;
            currentWindow = currentWindow.parent;
        }

        return { x: totalOffsetX, y: totalOffsetY };
    }

    // Click event listener
    document.addEventListener('click', e => {
        if (localStorage.getItem('clickEvent') === "party") {
            clickCounter = parseInt(localStorage.getItem('clickCounter')) || 0;
            clickCounter++;
            if (clickCounter >= 10) {
                // Calculate the absolute position including all iframe offsets
                const totalOffset = getTotalOffset();
                const x = e.clientX + totalOffset.x;
                const y = e.clientY + totalOffset.y;
                
                clickPositionElement.style.left = x + 'px';
                clickPositionElement.style.top = y + 'px';
                
                // Play confetti in the highest parent
                topWindow.party.confetti(clickPositionElement);
                clickCounter = 0;
            }
            localStorage.setItem('clickCounter', clickCounter);
        }
    });
});