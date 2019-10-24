//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates new projectdirectory object.
 *
 * @constructor
 * 
 * @param {object} project Object with properties name, output, title and id
 * 
 * @class
 * @classdesc
 * 
 * CLASS DESCRIPTION
 */
birka.Projectdirectory = function(project) {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Project name.
     *
     * @type {string}
     * @ignore
     */
    this.m_project = project.name || "";

    /**
     * Rootfolder for project
     *
     * @type {string}
     * @ignore
     */
    this.m_output = project.location + '/' + project.name || "";

     /**
     * Project title (eg. game title)
     *
     * @type {string}
     * @ignore
     */
    this.m_title = project.title || "";

     /**
     * Project id.
     *
     * @type {string}
     * @ignore
     */
    this.m_id = project.id || "";

    /**
     * ... 
     *
     * @type {array}
     * @ignore
     */
    this.m_resquestQueue = []; //TODO Rename? not "requests"...

    /**
     * ...
     *
     * @type {Object}
     * @ignore
     */
    this.m_request = {}; //TODO Rename? not "request"...

    /**
     * Array with paths to projectfolders.
     *
     * @type {array}
     * @ignore
     */
    this.m_folders = [
        '/bin-debug/', 
        '/lib/', 
        '/src/data/', 
        '/src/scene/', 
        '/src/scope/', 
        '/src/system/'];

    /**
     * Array with information about each project file.
     *
     * @type {array}
     * @ignore
     */
    this.m_files = [
        {
            name: 'Main.js',
            template: '/templates/Main.txt',
            directory: '/src/system/'
        },
        {
            name: 'rune.js',
            url: 'https://raw.githubusercontent.com/VectorPanic/rune/master/dist/rune.js',
            template: '',
            directory: '/lib/'
        },
        {
            name: 'SceneMain.js',
            template: '/templates/SceneMain.txt',
            directory: '/src/scene/'
        },
        {
            name: 'Alias.js',
            template: '/templates/Alias.txt',
            directory: '/src/scope/'
        },
        {
            name: 'Manifest.js',
            template: '/templates/Manifest.txt',
            directory: '/src/scope/'
        },
        {
            name: 'Index.html',
            template: '/templates/Index.txt',
            directory: '/bin-debug/'
        }
    ];

};


//--------------------------------------------------------------------------
// Public Static constants
//--------------------------------------------------------------------------

/**
 * Reference to Node.js FileSystem module
 *
 * @type {Object}
 * @constant
 * @default
 * @suppress {undefinedVars	}
 *
 */
birka.Projectdirectory.fs = require('fs');

/**
 * Reference to Node.js mkdirp module
 * 
 * @type {object}
 * @constant
 * @default
 */
birka.Projectdirectory.mkdirp = require('mkdirp');


//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Create project direcctory
 *
 *
 * @return {undefined} //TODO: boolean?
 */
birka.Projectdirectory.prototype.create = function() {
    this.m_initFolders();
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------
/**
 * Initializes process of creating folders for directory
 *
 * 
 * @private
 */
birka.Projectdirectory.prototype.m_initFolders = function() {
    for (var i = 0; i < this.m_folders.length; i++) {
        this.m_checkDirectory(this.m_folders[i]);
    }
    this.m_initFiles();
};


/**
 * Initializes process of creating project files
 *
 * 
 * @private
 */
birka.Projectdirectory.prototype.m_initFiles = function() {
    this.m_resquestQueue = this.m_files;
    this.m_processRequestQueue();
};

/**
 * Processes queue of files to be created.
 *
 * 
 * @private
 */
birka.Projectdirectory.prototype.m_processRequestQueue = function() {
    if (this.m_resquestQueue.length > 0) {
        this.m_request = this.m_resquestQueue.shift();
        this.m_processRequest();
    } else {
        this.m_onComplete();
    }
};

/**
 * Process file request //TODO request?
 * 
 *
 * @private
 */
birka.Projectdirectory.prototype.m_processRequest = function() {
    if(this.m_request.name == 'rune.js') {
        this.m_getURLdata();
    } else {
        this.m_createFileData();
    }
};

/**
 * Fetch data from URL and save to file.
 * 
 * @param callback
 *
 * @return {undefined} 
 */
birka.Projectdirectory.prototype.m_getURLdata = function() {
    var m_this = this;
    var req = new XMLHttpRequest();
    req.open("GET", this.m_request.url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4)
            if (req.status === 200) {
                var data = this.responseText;
                m_this.m_saveDataToFile(data);
            } else {
                console.log("Error...");  //TODO felhantering
            }
    };
    req.send();
};

/**
 * Create each supplied directory including any necessary parent 
 * directories that don't yet exist. If the directory already exists, do nothing.
 *
 * @private
 */
birka.Projectdirectory.prototype.m_checkDirectory = function(folderpath) {
    birka.Projectdirectory.mkdirp.sync(this.m_output + folderpath);
};

/**
 * Create data for project file from template.
 *
 * @private
 */
birka.Projectdirectory.prototype.m_createFileData = function() {
    var temp = this.m_readTemplate(this.m_request.template);
    var app = /%APP%/g;
    var data = temp.replace(app, this.m_project);

    if(this.m_request.name == 'Main.js') {
        var title = /%TITLE%/g;
        data = data.replace(title, this.m_title);
        var id = /%ID%/g;
        data = data.replace(id, this.m_id)
    }

    this.m_saveDataToFile(data);
};

/**
 * Save data to file.
 *
 * @param {string} data 
 * @private
 */
birka.Projectdirectory.prototype.m_saveDataToFile = function(data) {
    var m_this = this; //@FIXME Tried fixing error after compilation...
    var file = this.m_output + this.m_request.directory + this.m_request.name;
    birka.Projectdirectory.fs.writeFile(file, data, function(err) {
       if (err) {
           throw err; //TODO felhantering
       } else {
           m_this.m_processRequestQueue();
       }
    });
};

/**
 * Reads file sctructure from template.
 *
 * @return {String}
 * @private
 * @suppress {undefinedVars}
 */
birka.Projectdirectory.prototype.m_readTemplate = function(path) {
    var temp = birka.Projectdirectory.fs.readFileSync(__dirname + path).toString();
    return temp;
};

/**
 * 
 *
 * @private
 */
birka.Projectdirectory.prototype.m_onComplete = function(path) {
    //TODO är detta tillräckligt?
    this.m_resquestQueue = null;
    this.m_request = null;
    console.log("Directory complete!");
};

/**
 * 
 *
 * @private
 */
birka.Projectdirectory.prototype.m_onError = function(path) {
    //TODO felhantering
};