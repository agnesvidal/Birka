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
birka.project.ProjectManagerView = function() {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Reference to button for creating a new project.
     *
     * @type {Element} createBtn
     */
    this.createBtn = null;

    /**
     * Reference to button for opening a project.
     *
     * @type {Element} chooseBtn
     */
    this.chooseBtn = null;

    /**
     * Array with references to elements holding recently opened projects.
     *
     * @type {Array} linkItems
     */
    this.linkItems = [];

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    /**
     * Reference to the tool's wrapper.
     *
     * @type {Element} m_toolWrapper
     */
    this.m_toolWrapper = null;

    /**
     * Reference to the container element holding all project manager elements.
     *
     * @type {Element} m_element
     */
    this.m_element = null;
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Initalizes ...
 *
 * @returns undefined
 */
birka.project.ProjectManagerView.prototype.init = function() {
    this.m_initHeader();
    this.m_initButtons();
    this.m_initRecent();
};

/**
 * Removes the view's elements.
 *
 * @returns {undefined}
 */
birka.project.ProjectManagerView.prototype.removeElems = function() {
    while (this.m_toolWrapper.hasChildNodes()) {
        this.m_toolWrapper.removeChild(this.m_toolWrapper.firstChild);
    }
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * Creates the header.
 *
 * @returns {undefined}
 */
birka.project.ProjectManagerView.prototype.m_initHeader = function() {
    this.m_toolWrapper = document.getElementById('app-content');
    this.m_element = Elem.appendNewClassElem(this.m_toolWrapper,'div', 'app-project-manager');

    var col1 = Elem.appendNewClassElem(this.m_element,'div','app-project-manager-col-1');
    var h2 = Elem.appendNewElem(col1,'h2');
    Elem.setText(h2, "Let's get started!");
    var pElem = Elem.appendNewElem(col1,'p');
    Elem.setText(pElem, "Start by selecting an existing project or create a new project.");
};

/**
 * Creates the buttons.
 *
 * @returns {undefined}
 */
birka.project.ProjectManagerView.prototype.m_initButtons = function() {
    var col1 = document.querySelector('.app-project-manager-col-1');
    var div = Elem.appendNewClassElem(col1,'div', 'app-project-manager-buttons');
    var inputBtns = [];
    for(var i=0; i<2; i++){
        inputBtns.push(Elem.appendNewElem(div,'input'));
        inputBtns[i].setAttribute('type', 'button');
    }
    var h3 = Elem.appendNewElemAt(div, 'h3', 1);
    Elem.setText(h3, "OR");

    inputBtns[0].setAttribute('value', 'Choose project...');
    inputBtns[1].setAttribute('value', 'Create new project');

    this.chooseBtn = inputBtns[0];
    this.createBtn = inputBtns[1];
};

/**
 * Displays recently opened or created projects.
 *
 * @returns {undefined}
 */
birka.project.ProjectManagerView.prototype.m_initRecent = function() {
    var col2 = Elem.appendNewClassElem(this.m_element,'div','app-project-manager-col-2');
    var recentModule = Elem.appendNewClassElem(col2,'div','app-project-manager-recent');

    var heading = Elem.appendNewElem(recentModule,'h3');
    Elem.setText(heading, "Open recent project");

    var listElems = [];
    var projectNames = [];
    var paths = [];
    if(window.localStorage.getItem('recentProjects') !== null){
        var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
        if(recentP.projects.length > 0 ){
            for(var i=0; i<recentP.projects.length; i++){

                this.linkItems.push(Elem.appendNewClassElem(recentModule,'a', 'app-project-manager-list-item'));
                this.linkItems[i].setAttribute('href', "#");
                listElems.push(Elem.appendNewElem(this.linkItems[i],'div'));

                projectNames.push(Elem.appendNewElem(listElems[i],'h4'));
                var filename = recentP.projects[i].replace(/^.*[\\\/]/, '');
                Elem.setText(projectNames[i], filename);

                paths.push(Elem.appendNewElem(listElems[i],'p'));
                Elem.setText(paths[i], recentP.projects[i]);
            }
        } else {
            var noP = Elem.appendNewElem(recentModule,'p');
            Elem.setText(noP, '...');
        }
    }
};