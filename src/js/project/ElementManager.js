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
    //this.toolWrapper = null;

    /**
     *
     * @type {null}
     */
    this.projectElem = null;

    /**
     *
     * @type {Array}
     */
    this.mainBtns = [];

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
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
birka.project.ElementManager.prototype.init = function() {
    this.m_initLeft();
    this.m_initRight();
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
    var toolWrapper = document.getElementById('tool-wrapper');

    //var h2 = Elem();
    //this.toolWrapper = document.getElementById('tool-wrapper');
    this.projectElem = Elem.appendNewElem(toolWrapper,'div');
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

    this.mainBtns.push(inputBtns[0]);
    this.mainBtns.push(inputBtns[1]);

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
birka.project.ElementManager.prototype.m_createFormElems = function() {
    this.m_removeElems();
    var form = Elem.appendNewElem(this.rightElem,'form');
    var div = Elem.appendNewElem(form,'div');
    var span = Elem.appendNewElem(div,'span');
    Elem.text(span, "Project name");
    this.projectName = Elem.appendNewClassElem(div,'input','game-name');
    this.projectName.setAttribute('type', 'text');
    this.projectName.setAttribute('placeholder', 'Write your project name...');
    this.projectName.setAttribute('required','');

    var fieldsets = [];
    var legends = [];
    for(var i=0; i<2; i++){
        fieldsets.push(Elem.appendNewElem(form,'fieldset'));
        legends.push(Elem.appendNewElem(fieldsets[i],'legend'));
    }
    legends[0].innerHTML = 'Project location';
    legends[1].innerHTML = 'Configuration settings';

    var locationField = Elem.appendNewClassElem(fieldsets[0],'div','input-field');
    this.locationpath = Elem.appendNewClassElem(locationField,'div','filepath');
    this.browseBtn = Elem.appendNewClassElem(locationField,'input','project-browse');
    this.browseBtn.setAttribute('type','button');

    var labels = [];
    var configInputs = [];
    for(var i=0; i<2; i++){
        labels.push(Elem.appendNewElem(fieldsets[1],'label'));
        configInputs.push(Elem.appendNewElem(fieldsets[1],'input'));
        configInputs[i].setAttribute('type', 'number'); //@TODO change later
    }
    labels[0].innerHTML = 'Id';
    configInputs[0].setAttribute('placeholder', '0');

    labels[1].innerHTML = 'Framerate';
    configInputs[1].setAttribute('placeholder', '60');

    this.saveBtn = Elem.appendNewElem(form,'input');
    this.saveBtn.setAttribute('type','submit');
    this.saveBtn.setAttribute('id','save');
    this.saveBtn.setAttribute('value', 'Save');
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