const pageState = {
    // HTML/DOM elements are ready 
    isInteractive: (ev) => {
        return (ev.target.readyState === "interactive")
    },
    // Window has been loaded
    isComplete: (ev) => {
        return (ev.target.readyState === "complete")
    }
}

function getParsedInt(value) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

function getUnits(parsed, str) {
    let units = str.replace(parsed.toString(), '');
    return units.trim();
}

function isNumeric(character) {
    return (character >= '0' && character <= '9');
}

selectorVariable = function() {
    function set(selector, variable, newValue) {
        selector.style.setProperty(variable, newValue);
    }

    function get(selector, variable) {
        return getComputedStyle(selector).getPropertyValue(variable);
    }

    return {
        set: set,
        get: get
    };
}();


function sleep(ms) {
    // https://stackoverflow.com/a/39914235
    return new Promise(resolve => setTimeout(resolve, ms));
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