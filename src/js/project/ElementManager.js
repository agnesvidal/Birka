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
birka.project.ElementManager = function() {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    this.toolWrapper = null;

    /**
     *
     * @type {null}
     */
    this.projectElem = null;

    /**
     *
     * @type {Array}
     */
    this.buttons = {};

    /**
     *
     * @type {null}
     */
    this.rightElem = null;

    /**
     *
     * @type {null}
     */
    this.projectName = null;

    /**
     *
     * @type {null}
     */
    this.locationpath = null;

    /**
     *
     * @type {null}
     */
    this.browseBtn = null;

    /**
     *
     * @type {null}
     */
    this.saveBtn = null; //@TODO Rename

    this.form = null;

    this.formInputElems = null;
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
birka.project.ElementManager.prototype.init = function() {
    this.m_initLeft();
    this.m_initRight();
};

birka.project.ElementManager.prototype.removeElems = function() {
    while (this.toolWrapper.hasChildNodes()) {
        this.toolWrapper.removeChild(this.toolWrapper.firstChild);
    }
    //Main.allApps.splice(app, 1);
    //this.m_activeTool = null;
};

birka.project.ElementManager.prototype.createProjectForm = function() {
    this.m_createFormElems();
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ElementManager.prototype.m_initLeft = function() {
    this.toolWrapper = document.getElementById('app-content');

    //var h2 = Elem();
    //this.toolWrapper = document.getElementById('tool-wrapper');
    this.projectElem = Elem.appendNewElem(this.toolWrapper,'div');
    this.projectElem.setAttribute('id', 'project');

    var leftElem = Elem.appendNewClassElem(this.projectElem,'div','project-left');
    var h2 = Elem.appendNewElem(leftElem,'h2');
    Elem.text(h2, "Let's get started!");
    var pElem = Elem.appendNewElem(leftElem,'p');
    Elem.text(pElem, "Start by selecting an existing project or create a new project.");

    var div = Elem.appendNewElem(leftElem,'div');
    var inputBtns = [];
    for(var i=0; i<2; i++){
        //inputBtns.push(Elem.appendNewElem(div,'input'));
        //inputBtns[i].setAttribute('type', 'button');
    }
    inputBtns[0] = Elem.appendNewElem(div,'input');
    inputBtns[0].setAttribute('type', 'button');
    var h3 = Elem.appendNewElem(div,'h3');
    Elem.text(h3, "OR");
    inputBtns[1] = Elem.appendNewElem(div,'input');
    inputBtns[1].setAttribute('type', 'button');
    inputBtns[0].setAttribute('value', 'Choose project...');
    inputBtns[1].setAttribute('value', 'Create new project');

    //this.mainBtns.push(inputBtns[0]);
    //this.mainBtns.push(inputBtns[1]);
    this.buttons = {
        chooseBtn: inputBtns[0],
        createBtn: inputBtns[1]
    }

};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ElementManager.prototype.m_initRight = function() {
    this.rightElem = Elem.appendNewClassElem(this.projectElem,'div','project-right');
    var div = Elem.appendNewClassElem(this.rightElem,'div','no-project');
    var pElem = Elem.appendNewElem(div,'p');
    Elem.text(pElem, "No project loaded...");

};


/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ElementManager.prototype.m_removeElems = function() {
    while (this.rightElem.hasChildNodes()) {
        this.rightElem.removeChild(this.rightElem.firstChild);
    }
};