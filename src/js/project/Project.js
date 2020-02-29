
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 * @constructor
 *
 * @class
 * @classdesc
 */
birka.project.Project = function() {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    // ...

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    /**
     * @type {Element}
     * @private
     */
    this.m_appContent = null;

    /**
     *
     * @type {birka.project.Toolbar}
     * @private
     */
    this.m_toolbar = null;

    /**
     * toolWrapper - Reference to wrapper containing tool.
     *
     * @property {Element}
     * @default null
     * @private
     */
    this.m_toolWrapper = null;

    /**
     * @type {Array}
     * @default []
     * @private
     */
    this.m_tabs =  [];

    /**
     * @type {birka.compiler.Tool|birka.project.Project}
     * @default null
     * @private
     */
    this.m_activeTool = null;
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.init = function(){
    this.m_appContent = document.getElementById('app-content');
    this.m_clearWindow();
    this.m_initUI();
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_initUI = function() {
    var m_this = this;
    this.m_toolbar = new birka.project.Toolbar();
    this.m_tabs = this.m_toolbar.tabs;
    for (var i = 0; i < this.m_tabs.length; i++) {
        this.m_tabs[i].addEventListener('click',function(event){m_this.changeTool(event, this)});
    }
    this.m_toolWrapper = Elem.appendNewClassElem(this.m_appContent, 'div', 'app-tool-wrapper');
    this.m_initProjectDetails();
    this.m_initTitle();

};

//@TODO TEMPORARY
birka.project.Project.prototype.m_initProjectDetails = function() {
    var projectname = Elem.appendNewElem(this.m_toolWrapper, 'h2');
    var toolHeader = Elem.appendNewClassElem(this.m_toolWrapper, 'div', 'app-tool-header');
    var toolName = Elem.appendNewElem(toolHeader,'h2');
    Elem.setText(toolName, 'Project name: ' + window.sessionStorage.name);

    var updateSDK =  Elem.appendNewClassElem(toolHeader, 'input', 'app-project-sdk-btn');
    updateSDK.setAttribute('type', 'button');
    updateSDK.setAttribute('value', 'Uppdatera SDK version');
    this.m_addListeners();
};

/**
 * Changes the title of the application to the name of the project.
 *
 * @returns undefined
 */
birka.project.Project.prototype.m_initTitle = function(){
    document.title = window.sessionStorage.name;
};

/**
 * Changes the title of the application to the name of the project.
 *
 * @returns undefined
 */
birka.project.Project.prototype.m_addListeners = function(){
    var sdkBtn = document.querySelector('.app-project-sdk-btn');
    sdkBtn.addEventListener('click', function(){
        //OBS! Det här är en fullösning så länge, tror inte det är smart att skapa nytt objekt vid varje klick...
        var sdk = new birka.project.ProjectSDK();
        sdk.updateToLatestVersion();
        console.log(window.sessionStorage);
    });
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.changeTool = function(e, elem) {
    if (elem.classList.contains('is-active')) {
        return;
    } else {
        for (var i = 0; i < this.m_tabs.length; i++) {
            this.m_tabs[i].classList.remove('is-active');
        }
        elem.classList.toggle("is-active");
        this.startTool(e.target.id);
    }
};

/**
 * ...
 *
 * @param toolId
 * @returns {undefined}
 */
birka.project.Project.prototype.startTool = function(toolId) {
    switch (toolId) {
        case 'overview' :
            this.removeTool();
            this.m_activeTool = new birka.project.Project();
            this.m_activeTool.init();
            break;
        case 'compiler' :
            this.removeTool();
            this.m_activeTool = new birka.compiler.Compiler();
            this.m_activeTool.init();
            break;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_clearWindow = function(){
    while (this.m_appContent.hasChildNodes()) {
        this.m_appContent.removeChild(this.m_appContent.firstChild);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.removeTool = function(){
    while (this.m_toolWrapper.hasChildNodes()) {
        this.m_toolWrapper.removeChild(this.m_toolWrapper.firstChild);
    }
    this.m_activeTool = null;
};