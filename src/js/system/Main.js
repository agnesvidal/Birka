//--------------------------------------------------------------------------
// PUBLIC CLASS
//--------------------------------------------------------------------------
/**
 * @class Main
 * @classdesc Manages the app's basic functionality.
 */

birka.system.Main = function() {
    //----------------------------------------------------------------------
    // Strict mode
    //----------------------------------------------------------------------

    "use strict";

    //----------------------------------------------------------------------
    // Public scope
    //----------------------------------------------------------------------
    /**
     *  ...
     *
     *  @type {Object}
     */
    var m_this = {};
    //----------------------------------------------------------------------
    // PUBLIC properties
    //----------------------------------------------------------------------
    /**
     *
     * @type {birka.project.ProjectManager}
     */
    m_this.projectManager = null;

    /**
     *
     * @type {null}
     */
    m_this.project = null;


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


    //--------------------------------------------------------------------------
    // Public static methods
    //--------------------------------------------------------------------------
    /**
     * Initializes UI.
     *
     * @returns {undefined}
     */
    m_this.init = function() {
        m_initUI();
    };

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @returns {undefined}
     */
    function m_initUI() {
        m_this.projectManager = new birka.project.ProjectManager(m_addProject);
        m_this.projectManager.init();
    }

    /**
     * ...
     *
     * @param project
     */
     function m_addProject(project) {
        m_this.project = project;
        m_this.project.init();
    }

    /**
     * ...
     */
    function m_removeProject() {
        m_this.project = null;
    }

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

    window.addEventListener('load', m_this.init);

    //----------------------------------------------------------------------
    // ...
    //----------------------------------------------------------------------

    return m_this;
}();

