document.addEventListener('readystatechange', event => {
    // HTML/DOM elements are ready 
    if (event.target.readyState === "interactive") {
        // Listeners
        
        // Buttons 
        // Toggle main menu in header
        document.getElementById('btn-toggle-menu')
                            .addEventListener('click', headerToggleMenu);

        // Close main menu when clicking in the content section
        const content = document.getElementsByClassName('page-content');
        for (let i=0, len=content.length; i < len; i++) {
            content[i].addEventListener('click', headerCloseMenu);                         
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

function headerToggleMenu() {
    const container = document.getElementById('menu-main');
    const computedLeft =getParsedInt(
                window.getComputedStyle(container).getPropertyValue('left'));
    
    if (computedLeft) {
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

function getParsedInt(value) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}