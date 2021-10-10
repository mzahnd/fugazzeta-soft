document.addEventListener('readystatechange', event => {
    // HTML/DOM elements are ready 
    if (event.target.readyState === "interactive") {
        // Listeners
        
        // Buttons 
        // Close menu
        document.getElementById('btn-menu-main-close')
                            .addEventListener('click', menuClose);

        // Font size +/-
        document.getElementById('accessibility-zoom-m')
                            .addEventListener('click', menuAccessZoomMinus);
        document.getElementById('accessibility-zoom-p')
                            .addEventListener('click', menuAccessZoomPlus);                            
    }

    // Window has been loaded
    if (event.target.readyState === "complete") {
        // Set current font size
        menuAccessZoomWriteSize();
    }
});

// Public
function menuClose() {
    // Belongs to header.js
        headerCloseMenu();
}

function menuAccessZoomWriteSize() {
    const root = document.querySelector(':root');
    const htmlFontSize = getSelectorVariable(root, '--page-font-size');
    
    const value = getParsedInt(htmlFontSize);
    
    document.getElementById('accessibility-font-size-label').innerHTML = 
                                        value.toString() 
                                        + ' '
                                        + getUnits(value, htmlFontSize);
}

function menuAccessZoomPlus() {
    console.log("+ Zoom");
    modifyFontSize(true);
}

function menuAccessZoomMinus() {
    console.log("- Zoom");
    modifyFontSize(false);
}

// Private
function getParsedInt(value) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

function getUnits(parsed, str) {
    let units = str.replace(parsed.toString(), '');
    return units.trim();
}

function getSelectorVariable(selector, variable) {
    return getComputedStyle(selector).getPropertyValue(variable);
}

function setSelectorVariable(selector, variable, newValue) {
    selector.style.setProperty(variable, newValue);
}

function modifyFontSize(isIncrease) {
    const root = document.querySelector(':root');
    const fontSizeVariable = '--page-font-size';

    let htmlFontSize = getSelectorVariable(root, fontSizeVariable);
        
    let value = getParsedInt(htmlFontSize);
    const units = getUnits(value, htmlFontSize);

    if (isIncrease == true && value < 24) {
        value += 2;
    } else if (! isIncrease && value > 6) {
        value -= 2;
    }

    setSelectorVariable(root, fontSizeVariable, value.toString() + units);

    menuAccessZoomWriteSize();
}