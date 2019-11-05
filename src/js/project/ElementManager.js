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
     * @type {Element}
     */
    this.projectElem = null;

    /**
     *
     * @type {Object}
     */
    this.buttons = {};

    /**
     *
     * @type {Element}
     */
    this.rightElem = null;

    this.paths = [];

    this.links = [];

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
    Elem.setText(h2, "Let's get started!");
    var pElem = Elem.appendNewElem(leftElem,'p');
    Elem.setText(pElem, "Start by selecting an existing project or create a new project.");

    var div = Elem.appendNewElem(leftElem,'div');
    var inputBtns = [];
    for(var i=0; i<2; i++){
        //inputBtns.push(Elem.appendNewElem(div,'input'));
        //inputBtns[i].setAttribute('type', 'button');
    }
    inputBtns[0] = Elem.appendNewElem(div,'input');
    inputBtns[0].setAttribute('type', 'button');
    var h3 = Elem.appendNewElem(div,'h3');
    Elem.setText(h3, "OR");
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
    //var div = Elem.appendNewClassElem(this.rightElem,'div','recent-projects');
    var list = Elem.appendNewClassElem(this.rightElem,'div','recent-projects');

    var pElem = Elem.appendNewElem(list,'h3');
    Elem.setText(pElem, "Open recent project");

    //var links = [];

    //var list = Elem.appendNewElem(this.rightElem,'ul');
    var listElems = [];
    //var paths = [];

    var projectNames = [];
//console.log(window.localStorage.getItem('recentProjects') );

    if(window.localStorage.getItem('recentProjects') !== null){
        var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
        if(recentP.projects.length > 0 ){
            for(var i=0; i<recentP.projects.length; i++){
                /*
                listElems.push(Elem.appendNewElem(list,'li'));
                links.push(Elem.appendNewElem(listElems[i],'a'));
                Elem.setText(links[i], recentP.projects[i]);
                links[i].setAttribute('href', recentP.projects[i])
                */

                this.links.push(Elem.appendNewElem(list,'a'));
                this.links[i].setAttribute('href', "#");
                listElems.push(Elem.appendNewElem(this.links[i],'div'));


                projectNames.push(Elem.appendNewElem(listElems[i],'h4'));
                var filename = recentP.projects[i].replace(/^.*[\\\/]/, '');
                Elem.setText(projectNames[i], filename);

                this.paths.push(Elem.appendNewElem(listElems[i],'p'));
                Elem.setText(this.paths[i], recentP.projects[i]);
                //links[i].setAttribute('href', recentP.projects[i])
            }
        } else {
            var noP = Elem.appendNewElem(list,'p');
            Elem.setText(noP, '...');
        }
    }


    /*
    var div = Elem.appendNewClassElem(this.rightElem,'div','no-project');
    var pElem = Elem.appendNewElem(div,'p');
    Elem.setText(pElem, "No project loaded...");
    */

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