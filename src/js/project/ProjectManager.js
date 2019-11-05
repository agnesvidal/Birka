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
birka.project.ProjectManager = function(callback) {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    // ...

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    this.callback = callback;
    /**
     *
     * @type {birka.project.ElementManager}
     */
    this.elemManager = null;

    /**
     * ...
     *
     * @type {Array}
     */
    this.paths = [];

    /**
     * ...
     *
     * @type {birka.project.Modal}
     */
    this.modal = null;
};

//------------------------------------------------------------------------------
// Public Static constants
//------------------------------------------------------------------------------
/**
 * Reference to Electron dialog API
 *
 * @type {Electron.Dialog}
 * @constant
 * @default
 */
birka.project.ProjectManager.dialog = require('electron').remote.dialog;

/**
 * Reference to Node.js FileSystem module
 *
 * @type {module:fs}
 * @constant
 * @default
 */
birka.project.ProjectManager.fs = require('fs');

/**
 * Reference to Node.js Path module
 *
 * @type {module:path}
 * @constant
 * @default
 */
birka.project.ProjectManager.path = require('path');

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.init = function(){
    this.m_initUI();
};

/**
 * Initializes user interface.
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_initUI = function(){
    this.elemManager = new birka.project.ElementManager(this.toolWrapper);
    this.elemManager.init();
    /*
    if(sessionStorage.loaded === 'true') {
        this.m_initLoadedProject();
    }*/
    this.m_addListeners();
    /*
    var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
    var rP = {};
    window.localStorage.setItem('recentProjects', JSON.stringify(rP));
*/
    //window.localStorage.recent
};


/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_addListeners = function(){
    var m_this = this;
    this.elemManager.buttons.createBtn.addEventListener('click',function(){ m_this.m_createProject(this)});
    this.elemManager.buttons.chooseBtn.addEventListener('click',function(){ m_this.m_openProject(this)});

    for(var i=0; i<this.elemManager.links.length; i++){
        var path = this.elemManager.paths[i].innerHTML;
        this.elemManager.links[i].addEventListener('click',function(){
            m_this.m_loadProject(this.querySelector('p').innerHTML)

        });
    }
    //console.log(JSON.parse(localStorage.getItem('recentProjects')));
    var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));

    //console.log(recentP.projects);


};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_createProject = function(){
    var m_this = this;
    m_this.modal = new birka.project.CreateModal(m_this.modal, {
        type: 'custom',
        title: 'Create project'
    });

    m_this.modal.buttons[1].addEventListener('click', function(){m_this.modal.save(m_this.m_saveProject, m_this)});
};

birka.project.ProjectManager.prototype.m_saveProject = function(caller) {
    var project = new birka.project.Project();
    caller.callback(project);
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_openProject = function(){
    var m_this = this;
    birka.project.ProjectManager.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
            m_this.m_loadProject(folderPaths[0]);
        }
    });
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_loadProject = function(path){
    if(this.m_checkIfFolder(path) !== false){
    if(this.m_checkProjectValidity(path, this.m_walkDir(path))){
        //this.m_readConfig(this.chosenpath + config); //@TODO Reads xml file for now...

        // Create project, save data in session, and show "result":
        var projectname = path.replace(/^.*[\\\/]/, '');
        window.sessionStorage.setItem('name', projectname);
        window.sessionStorage.setItem('projectLocation', path);
        window.sessionStorage.setItem('output', path + '/src/data');
        window.sessionStorage.setItem('loaded', 'true');
//console.log(window.localStorage.getItem('recentProjects'));

        if(window.localStorage.getItem('recentProjects') !== null) {
            var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));

        var p = path;
            for (var i = 0; i < recentP.projects.length; i++) {

                if (recentP.projects[i] === path) {
                    recentP.projects.splice(i, 1);
                }
            }
            recentP.projects.unshift(p);

            if(recentP.projects.length > 5) {
                recentP.projects.splice(5);
            }
            window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
        } else if(window.localStorage.getItem('recentProjects') === null) {
            var recentP = {
                projects: [path]
            };
            window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
            console.log(window.localStorage.getItem('recentProjects'))
        }
        this.m_saveProject(this);
    } else {
        this.m_showError('Not a working project.', 'Missing Main.js and/or data folder.')
    }
    } else{
        var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
        for(var i=0; i<this.elemManager.links.length; i++){
            //console.log(this.elemManager.links[i].querySelector('p'))
            if(this.elemManager.links[i].querySelector('p').innerHTML === path){
                //console.log(path, this.elemManager.links[i].querySelector('p').innerHTML);
                this.elemManager.links[i].parentNode.removeChild(this.elemManager.links[i]);
                this.elemManager.links.splice(i, 1);

            }
        }
        for(var j=0; j<recentP.projects.length; j++){
            if(path === recentP.projects[j]){
                //console.log(j, recentP.projects[j]);
                recentP.projects.splice(j, 1);
                //console.log(recentP)
            }
        }

        window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
        //console.log(recentP);
    }
};

birka.project.ProjectManager.prototype.m_checkIfFolder = function(dir) {
    try{
        birka.project.ProjectManager.fs.readdirSync(dir)
    } catch(err){
        if(err.code === "ENOENT"){
            this.m_showError('Missing project folder', 'The project folder has either been removed, or moved to a new location.');
            return false
        }
    }
};

/**
 * ...
 *
 * @param   {string} dir
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_walkDir = function(dir) {
    var m_this = this;
/*
    try{
        birka.project.ProjectManager.fs.readdirSync(dir)
    } catch(err){
        if(err.code === "ENOENT"){
            console.log('Err');
            this.m_showError('Can\'t find the folder', '...');
            return
        }
    }
*/
    birka.project.ProjectManager.fs.readdirSync(dir).forEach(function(file) {

        var fullPath = birka.project.ProjectManager.path.join(dir, file);
        if (birka.project.ProjectManager.fs.lstatSync(fullPath).isDirectory()) {
            m_this.m_walkDir(fullPath);
            m_this.paths.push(fullPath);
        } else {
            if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
                m_this.paths.push(fullPath);
            }
        }
    });

//console.log(m_this.paths);
};

/**
 * ...
 *
 * @param path
 * @returns {boolean}
 */
birka.project.ProjectManager.prototype.m_checkProjectValidity = function(path) {
    if(this.paths.indexOf(path + '/src/system/Main.js') > -1){
        if(this.paths.indexOf(path + '/src/data') > -1){
            return true
        }
    } else {
        return false
    }
};


//@TODO Temporary test method
birka.project.ProjectManager.prototype.m_showError = function(title, msg) {
    //this.m_electronDialog(title, msg);
    var m_this = this;
    m_this.modal = new birka.project.Modal(m_this.modal, {
        type: 'error',
        title: [title],
        message: [msg]
    });
};

/*

birka.project.ProjectManager.prototype.m_electronDialog = function(msg, details) {
    this.dialog.showMessageBox({
    title: "Error",
    message: msg,
    icon: './src/img/error.png',
    buttons: ['OK', 'Cancel'],
    detail: details
});
};


birka.project.ProjectManager.prototype.m_readConfig = function(path) {
    var m_this = this;
    var req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.onload = function() {
        if(req.readyState === 4 && req.status === 200){
            console.log(req.response, req.responseXML);

            var xml = req.responseXML;
            var id = xml.getElementsByTagName("id")[0].childNodes[0].nodeValue;
            var title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            console.log(id, title);
            m_this.elemManager.formInputElems.title.value = title;
            m_this.elemManager.formInputElems.id.value = id;

        }
    };
    req.send();
};

birka.project.ProjectManager.prototype.m_initLoadedProject = function(){
    this.m_createProject();
    this.elemManager.projectName.value = sessionStorage.name;
    this.elemManager.locationpath.innerHTML = sessionStorage.projectLocation;
    this.elemManager.saveBtn.setAttribute('value', 'Update');

};

*/