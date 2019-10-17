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
    // Super call
    //--------------------------------------------------------------------------
    birka.Tool.call(this, "Project");

    /**
     *
     * @type {birka.project.ElementManager}
     */
    this.elemManager = null;

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    this.app = require('electron').remote;
    this.dialog = this.app.dialog;
    this.fs = require('fs');
    this.path = require('path');
};
//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.project.Project.prototype = Object.create(birka.Tool.prototype);
birka.project.Project.prototype.constructor = birka.project.Project;

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.init = function(){
    this.m_initUI(this.m_initModules);
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_initModules = function(){
    this.fs = require('fs');
    this.path = require('path');
};

/**
 * Initializes user interface.
 *
 * @param callback
 * @returns {undefined}
 */
birka.project.Project.prototype.m_initUI = function(callback){
    this.m_initTitle();
    this.elemManager = new birka.project.ElementManager(this.toolWrapper);
    this.elemManager.init();
    //console.log(sessionStorage.loaded);
    if(sessionStorage.loaded === 'true') {
        this.m_initLoadedProject();
    }
    this.m_addListeners();
    callback();
};


/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_addListeners = function(){
    var m_this = this;
    //this.elemManager.newProjectBtn.addEventListener('click',function(){m_this.m_createNewProject(this)});
    this.elemManager.mainBtns[1].addEventListener('click',function(){ m_this.m_createProject(this)});
    this.elemManager.mainBtns[0].addEventListener('click',function(){ m_this.m_openProject(this)});
};

/**
 * ...
 *
 * @returns {undefined}
 */
//@TODO In progress
birka.project.Project.prototype.m_createProject = function(){
    var m_this = this;
    this.elemManager.createProjectForm();
    this.elemManager.browseBtn.addEventListener('click',function(){m_this.m_chooseLocation(this)});
    this.elemManager.saveBtn.addEventListener('click',function(){m_this.m_saveProject(this)});
    document.addEventListener('invalid', (function(){
        return function(e){
            //prevent the browser from showing default error bubble/ hint
            e.preventDefault();
            // optionally fire off some custom validation handler
            console.log(e.target);
            e.target.style.borderBottom = '1px solid red';
        };
    })(), true);

};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_saveProject = function(){
    if(this.elemManager.locationpath.innerHTML === ""){
       this.elemManager.locationpath.parentNode.style.border = '1px solid red';
    } else{
        sessionStorage.setItem('loaded', true);
        sessionStorage.setItem('projectName', this.elemManager.projectName.value);
        sessionStorage.setItem('projectLocation', this.elemManager.locationpath.innerHTML); //@TODO resourcePath instead?
    }
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_chooseLocation = function(){
    var m_this = this;
    this.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
           // m_this.m_loadProject(folderPaths[0]);
            m_this.elemManager.locationpath.innerHTML = folderPaths[0];

            //console.log(folderPaths[0]);
            /*
            m_this.outputPath = folderPaths[0];
            m_this.form.outputPath.innerHTML = folderPaths[0];
            */
        }
    });
};


/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_openProject = function(){
    var m_this = this;
    this.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
            m_this.m_loadProject(folderPaths[0]);
            //console.log(folderPaths[0]);
            /*
            m_this.outputPath = folderPaths[0];
            m_this.form.outputPath.innerHTML = folderPaths[0];
            */
        }
    });
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_loadProject = function(path){
    this.m_createProject();
    this.elemManager.projectName.value = 'myGame';
    this.elemManager.locationpath.innerHTML = 'User/folder1/folder2/games';
    this.elemManager.saveBtn.setAttribute('value', 'Update');
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.Project.prototype.m_initLoadedProject = function(){
    this.m_createProject();
    this.elemManager.projectName.value = sessionStorage.projectName;
    this.elemManager.locationpath.innerHTML = sessionStorage.projectLocation;
    this.elemManager.saveBtn.setAttribute('value', 'Update');

};
