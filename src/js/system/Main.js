//--------------------------------------------------------------------------
// PUBLIC CLASS
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
     * @type {birka.project.ProjectManager}
     */
    this.projectManager = null;

    /**
     *
     * @type {null}
     */
    this.project = null;

    //----------------------------------------------------------------------
    // Private properties
    //----------------------------------------------------------------------
    /**
     *
     * @property {HTMLElement} toolWrapper - Reference to wrapper containing tool.
     * @default null
     * @public
     */
    //this.m_toolWrapper = null;
};
//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------
/**
 * Initializes UI.
 *
 * @returns {undefined}
 */
birka.system.Main.init = function() {
    birka.system.Main.m_initUI();
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.system.Main.m_initUI = function() {
    this.projectManager = new birka.project.ProjectManager(birka.system.Main.m_addProject);
    this.projectManager.init();
};


/**
 * ...
 *
 * @param project
 */
birka.system.Main.m_addProject = function(project) {
    this.project = project;
    this.project.init();
};

/**
 * ...
 */
birka.system.Main.m_removeProject = function() {
    this.project = null;
};


/**
 * ...
 *
 * @returns {undefined}
 */
/*
birka.system.Main.removeTool = function(){
    while (this.m_toolWrapper.hasChildNodes()) {
        this.m_toolWrapper.removeChild(this.m_toolWrapper.firstChild);
    }
    //this.m_activeTool = null;
};
*/

window.addEventListener('load', birka.system.Main.init);