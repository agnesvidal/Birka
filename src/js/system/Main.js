//--------------------------------------------------------------------------
// PUBLIC STATIC CLASS
//--------------------------------------------------------------------------
/**
 * @class Main
 * @classdesc Manages the app's basic functionality.
 */

// @TODO Change to birka.system.Main = (function ... ?

birka.system.Main = {
    //----------------------------------------------------------------------
    // PUBLIC properties
    //----------------------------------------------------------------------
    /**
     *
     * @property {HTMLElement} toolWrapper - Reference to wrapper containing tool.
     * @default null
     * @public
     */
    toolWrapper: null,

    /**
     * @type {NodeListOf<HTMLElementTagNameMap[string]>}
     * @default null
     * @public
     */
    tabs: null,

    /**
     * @type {Compiler} | {...}
     * @default null
     * @public
     */
    activeTool: null,

    //----------------------------------------------------------------------
    // PUBLIC methods
    //----------------------------------------------------------------------
    /**
     * Initializes UI.
     *
     * @returns {undefined}
     */
    init : function() {
        birka.system.Main.initUI();
    },

    /**
     * ...
     *
     * @returns {undefined}
     */
    initUI : function() {
        birka.system.Main.toolWrapper = document.getElementById('tool-wrapper');
        birka.system.Main.tabs = document.querySelectorAll('a');
        for (var i = 0; i < birka.system.Main.tabs.length; i++) {
            birka.system.Main.tabs[i].addEventListener('click', birka.system.Main.changeTool);
        }
    },

    /**
     * ...
     *
     * @returns {undefined}
     */
    changeTool : function(e) {
        if (this.classList.contains('active')) {
            return;
        } else {
            for (var i = 0; i < birka.system.Main.tabs.length; i++) {
                birka.system.Main.tabs[i].classList.remove('active');
            }
            this.classList.toggle("active");
            birka.system.Main.startTool(e.target.id);
        }
    },

    /**
     * ...
     *
     * @param toolId
     * @returns {undefined}
     */
    startTool : function(toolId) {
        switch (toolId) {
            case 'tool-1' :
                birka.system.Main.removeTool();
                birka.system.Main.activeTool = new birka.compiler.Compiler();
                birka.system.Main.activeTool.init();
                break;
            case 'tool-2' :
                console.log('Start tool 2');
                break;
        }
    },

    /**
     * ...
     *
     * @returns {undefined}
     */
    removeTool : function(){
        while (birka.system.Main.toolWrapper.hasChildNodes()) {
            birka.system.Main.toolWrapper.removeChild(birka.system.Main.toolWrapper.firstChild);
        }
        //Main.allApps.splice(app, 1);
        birka.system.Main.activeTool = null;
    }
};

window.addEventListener('load', birka.system.Main.init);