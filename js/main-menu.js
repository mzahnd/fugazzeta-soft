/* Functions to handle events inside the main menu
 * 
 * Accessibility buttons events are managed here.
 */
mainMenu = function() {
    const DEFAULT_FONT_SIZE = [12, 'pt']; // [ Value , Unit ]
    const MAX_FONT_SIZE = DEFAULT_FONT_SIZE[0] * 2;
    const MIN_FONT_SIZE = DEFAULT_FONT_SIZE[0] / 2;

    let containerMenuMain = null;

    document.addEventListener('readystatechange', event => {
        // HTML/DOM elements are ready 
        if (pageState.isInteractive(event)) {            
            containerMenuMain = document.getElementById('menu-main');

            accessibility.init();

            // Listeners

            // Buttons 
            // Close menu
            document.getElementById('btn-menu-main-close')
                                .addEventListener('click', close);

            // Font size +/-
            document.getElementById('accessibility-zoom-m')
                                .addEventListener('click',
                                                    accessibility.zoom.minus);
            document.getElementById('accessibility-zoom-p')
                                .addEventListener('click',
                                                    accessibility.zoom.plus);
            document.getElementById('accessibility-zoom-reset')
                                .addEventListener('click',
                                                    accessibility.zoom.reset);
        }

        // Window has been loaded
        if (pageState.isComplete(event)) {
            // // Set current font size
            // accessibility.zoom.storeSize();
        }
    });

    async function show() {
        containerMenuMain.style.display = 'flex';
        await sleep(1); // Hack. Allows the transition to be performed
        containerMenuMain.style.left = 0;
    }

    function hide(force = false) {
        // Negative left position
        if ((force && typeof(force) == "boolean") ||
            containerMenuMain.style.left[0] === '-' ) {
            containerMenuMain.style.display = 'none';
        }
    }

    function close() {
        containerMenuMain.style.left = '-100vw'; 
    }

    accessibility = function () {
        function init() {
            zoom.init();
        }

        zoom = function() {
            const ZOOM_VALUE_CLIENT_STORAGE = 'accessibility-zoom-size';
            const CSS_FONT_SIZE_VARIABLE = '--page-font-size'
            
            let containerRoot = null;
            let containerFontSizeLabel = null;

            function init() {
                containerRoot = document.querySelector(':root');
                containerFontSizeLabel =
                    document.getElementById('accessibility-font-size-label');

                getSize();
            }

            function getComputedSize() {
                const htmlFontSize = selectorVariable.get(
                    containerRoot,
                    CSS_FONT_SIZE_VARIABLE
                );
                let value = getParsedInt(htmlFontSize);
                
                return {
                    value: value,
                    units: getUnits(value, htmlFontSize),
                };
            }

            function setSize(value = 0, units = '') {
                selectorVariable.set(containerRoot,
                    CSS_FONT_SIZE_VARIABLE,
                    value.toString() + units
                );

                // Make changes in the document
                containerFontSizeLabel.innerHTML = value.toString()
                                                + ' '
                                                + units;

                // Save on client storage
                localStorage.setItem(ZOOM_VALUE_CLIENT_STORAGE,
                                    value.toString() + units
                );
            }

            function getSize() {
                const stored = localStorage.getItem(ZOOM_VALUE_CLIENT_STORAGE);

                if (stored != null) {
                    const value = getParsedInt(stored);
                    const units = getUnits(value, stored);

                    // Reflect changes in the document
                    setSize(value, units);
                }
            }

            function plus() {
                let computed = getComputedSize()
        
                if (computed.value < MAX_FONT_SIZE) {
                    computed.value += 2;
                    setSize(computed.value, computed.units);
                }
            }
            
            function minus() {
                let computed = getComputedSize()
        
                if (computed.value > MIN_FONT_SIZE) {
                    computed.value -= 2;
                    setSize(computed.value, computed.units);
                }
            }

            function reset() {
                setSize(DEFAULT_FONT_SIZE[0], DEFAULT_FONT_SIZE[1]);
            }

            return {
                init: init,
                setSize: setSize,
                getSize: getSize,
                plus: plus,
                minus: minus,
                reset: reset
            }
        }();

        return {
            init: init,
            zoom: zoom
        }
    }();

    return {
        show: show,
        hide: hide,
        close: close,
        // accessZoomWriteSize: accessibility.zoom.se,
    }
}();
