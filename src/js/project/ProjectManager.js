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
    this.m_view = null;

    /**
     * ...
     *
     * @type {Array}
     */
    this.m_paths = [];
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

birka.project.ProjectManager.CModal =  new birka.project.CreateModal();
birka.project.ProjectManager.Modal =  new birka.project.Modal();

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
    this.m_view = new birka.project.ProjectManagerView(this.toolWrapper);
    this.m_view.init();
    
    // if(sessionStorage.loaded === 'true') {
    //     this.m_loadProject(window.sessionStorage.projectLocation);
    // }

    this.m_addListeners();
};


/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_addListeners = function(){
    var m_this = this;
    this.m_view.createBtn.addEventListener('click',function(){m_this.m_createProject()});
    this.m_view.chooseBtn.addEventListener('click',function(){m_this.m_openProject()});

    for(var i=0; i<this.m_view.linkItems.length; i++){
        this.m_view.linkItems[i].addEventListener('click',function(){
            m_this.m_loadProject(this.querySelector('p').innerHTML)
        });
    }
    require('electron').ipcRenderer.on('create', function() {
        m_this.m_createProject();
    });

    require('electron').ipcRenderer.on('open', function() {
        m_this.m_openProject();
    });
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.project.ProjectManager.prototype.m_createProject = function(){
    var m_this = this;
    birka.project.ProjectManager.CModal.openDialog({
        type: 'custom',
        title: 'Create project',
        callback: m_this.m_saveProject
    }, m_this);
};

birka.project.ProjectManager.prototype.m_saveProject = function(caller) {
    var m_this = this;
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

            // Create project, save data in session, and show "result":
            var projectname = path.replace(/^.*[\\\/]/, '');
            window.sessionStorage.setItem('name', projectname);
            window.sessionStorage.setItem('projectLocation', path);
            window.sessionStorage.setItem('output', path + '/src/data');
            window.sessionStorage.setItem('loaded', 'true');

            if(window.localStorage.getItem('recentProjects') !== null) {
                var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));

            var p = path;
                for (var i = 0; i < recentP.projects.length; i++) {

                    if (recentP.projects[i].toLowerCase() === path.toLowerCase()) {
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
    } 
};

/**
 * ...
 *
 * @param parent
 * @param path
 * @returns undefined
 */
birka.project.ProjectManager.prototype.m_removeRecent = function(parent, path) {
    var m_this = parent;
    var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));

    for(var i=0; i<m_this.m_view.linkItems.length; i++){
        if(m_this.m_view.linkItems[i].querySelector('p').innerHTML === path){
            m_this.m_view.linkItems[i].parentNode.removeChild(m_this.m_view.linkItems[i]);
            m_this.m_view.linkItems.splice(i, 1);

        }
    }
    for(var j=0; j<recentP.projects.length; j++){
        if(path === recentP.projects[j]){
            recentP.projects.splice(j, 1);
        }
    }

    window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
};

/**
 * ...
 *
 * @param dir
 * @returns {boolean}
 */
birka.project.ProjectManager.prototype.m_checkIfFolder = function(dir) {
    var m_this = this;
    try{
        birka.project.ProjectManager.fs.readdirSync(dir)
    } catch(err){
        if(err.code === "ENOENT"){
            birka.project.ProjectManager.Modal.openDialog({
                type: "error",
                title: "Missing project folder",
                message: "The project folder has either been removed, or moved to a new location.",
                callback: {func: m_this.m_removeRecent, param: dir}
            }, m_this);
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

    birka.project.ProjectManager.fs.readdirSync(dir).forEach(function(file) {
        var fullPath = birka.project.ProjectManager.path.join(dir, file);
        if (birka.project.ProjectManager.fs.lstatSync(fullPath).isDirectory()) {
            m_this.m_walkDir(fullPath);
            m_this.m_paths.push(fullPath);
        } else {
            if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
                m_this.m_paths.push(fullPath);
            }
        }
    });

};

/**
 * ...
 *
 * @param path
 * @returns {boolean}
 */
birka.project.ProjectManager.prototype.m_checkProjectValidity = function(path) {
    if(this.m_paths.indexOf(path + '/src/system/Main.js') > -1){
        if(this.m_paths.indexOf(path + '/src/data') > -1){
            return true
        }
    } else {
        return false
    }
};

/**
 * Displays error message.
 *
 * @param title
 * @param msg
 * @returns undefined
 */
birka.project.ProjectManager.prototype.m_showError = function(title, msg) {
    birka.project.ProjectManager.Modal.openDialog({
        type: 'error',
        title: title,
        message: [msg]
    });
};