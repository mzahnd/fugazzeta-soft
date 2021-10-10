let _transitionEndEventSupported = true;

document.addEventListener('readystatechange', event => {
    // HTML/DOM elements are ready 
    if (event.target.readyState === "interactive") {
        // Listeners

        // Window
        // Window has been resized
        window.addEventListener('resize', headerWindowResizeEvent, false);

        // Transitions
        try {
            document.getElementById('menu-main')
                                .addEventListener(transitionEndEventName(),
                                                    headerHideMenu, false);
        } catch (e) {
            console.log(e);
        }

        // Buttons 
        // Toggle main menu in header
        document.getElementById('btn-toggle-menu')
                            .addEventListener('click',
                                                headerToggleMenu, false);

        // Close main menu when clicking in the content section
        const content = document.getElementsByClassName('page-content');
        for (let i=0, len=content.length; i < len; i++) {
            content[i].addEventListener('click', headerCloseMenu, false);
        }
    }

    // Window has been loaded
    if (event.target.readyState === "complete") {
        // Set current font size
        menuAccessZoomWriteSize();
    }
});

function headerCloseMenu() {
    const container = document.getElementById('menu-main');
    container.style.left = '-' 
            + window.getComputedStyle(container).getPropertyValue('max-width');
}

async function headerToggleMenu() {
    const container = document.getElementById('menu-main');
    const computedLeft =getParsedInt(
                window.getComputedStyle(container).getPropertyValue('left'));
    
    if (computedLeft) {
        container.style.display = 'flex';
        await sleep(1); // Ugly hack. Lets the transition be performed

        container.style.left = 0;
    } else {
        headerCloseMenu();
    }
}

function headerCloseMenuOnPageClick() {
    const container = document.getElementById('menu-main');

    if (getParsedInt(container.style.getPropertyValue('left'))) {
        headerCloseMenu();
    }
}

// *--------------------------------------------------*
function sleep(ms) {
    // https://stackoverflow.com/a/39914235
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

function getParsedInt(value) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

function headerHideMenu() {
    const container = document.getElementById('menu-main');

    // Negative left position
    if (container.style.left[0] === '-') {
        container.style.display = 'none';
    }
}

function headerWindowResizeEvent() {
    /* This function solves an animation glitch when a display is drastically
     * changed and the menu is "closed".
     * Using a screen with dimensions 1024x768 (like an iPad) will display two
     * different menu styles whenever the screen is rotated
     * (1024x768 -> 768x1024) and the menu is closed. The oppening animation
     * will start "from the middle of the screen" because we're hidding the
     * menu by changing the left coordinate of it.
     */
    const container = document.getElementById('menu-main');
    
    // Only needed when the menu is not being displayed
    if (container.style.left[0] == '-') {
        container.style.left = '-' 
            + window.getComputedStyle(container).getPropertyValue('max-width');
    }
}

function transitionEndEventName () {
    // https://stackoverflow.com/a/9090128

    let i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend', // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    throw 'TransitionEnd event not supported.';
}
