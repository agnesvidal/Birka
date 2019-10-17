//--------------------------------------------------------------------------
// PUBLIC STATIC CLASS
//--------------------------------------------------------------------------
/**
 * @class Main
 * @classdesc Manages the app's basic functionality.
 */

birka.system.Main = function() {
    //----------------------------------------------------------------------
    // PUBLIC properties
    //----------------------------------------------------------------------
    /**
     *
     * @property {HTMLElement} toolWrapper - Reference to wrapper containing tool.
     * @default null
     * @public
     */
    this.m_toolWrapper = null;

    /**
     * @type {NodeListOf<HTMLElementTagNameMap[string]>}
     * @default null
     * @public
     */
    this.m_tabs =  null;

    /**
     * @type {Compiler} | {...}
     * @default null
     * @public
     */
    this.m_activeTool = null;
};

//----------------------------------------------------------------------
// PUBLIC methods
//----------------------------------------------------------------------
/**
 * Initializes UI.
 *
 * @returns {undefined}
 */
birka.system.Main.init = function() {
    birka.system.Main.initUI();
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.system.Main.initUI = function() {
    var m_this = this;
    this.m_toolWrapper = document.getElementById('tool-wrapper');
    this.m_tabs = document.querySelectorAll('a');
    for (var i = 0; i < this.m_tabs.length; i++) {
        this.m_tabs[i].addEventListener('click',function(){m_this.changeTool(event, this)});
    }

    this.removeTool();
    this.m_activeTool = new birka.project.Project();
    this.m_activeTool.init();
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.system.Main.changeTool = function(e, elem) {
    if (elem.classList.contains('active')) {
        return;
    } else {
        for (var i = 0; i < this.m_tabs.length; i++) {
            this.m_tabs[i].classList.remove('active');
        }
        elem.classList.toggle("active");
        this.startTool(e.target.id);
    }
};

/**
 * ...
 *
 * @param toolId
 * @returns {undefined}
 */
birka.system.Main.startTool = function(toolId) {
    switch (toolId) {
        case 'tool-0' :
            this.removeTool();
            this.m_activeTool = new birka.project.Project();
            this.m_activeTool.init();
            break;
        case 'tool-1' :
            if(sessionStorage.loaded === undefined) {
                alert('Select a project first.');
                this.m_tabs[1].classList.remove('active');
                this.m_tabs[0].classList.add('active');
            } else {
                this.removeTool();
                this.m_activeTool = new birka.compiler.Compiler();
                this.m_activeTool.init();
            }
            break;
        case 'tool-2' :
            console.log('Start tool 2');
            break;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.system.Main.removeTool = function(){
    while (this.m_toolWrapper.hasChildNodes()) {
        this.m_toolWrapper.removeChild(this.m_toolWrapper.firstChild);
    }
    //Main.allApps.splice(app, 1);
    this.m_activeTool = null;
};

window.addEventListener('load', birka.system.Main.init);