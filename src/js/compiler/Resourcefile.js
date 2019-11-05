

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new resourcefile object.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * CLASS DESCRIPTION
 */
birka.compiler.Resourcefile = function(projectname, output) {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Project name.
     *
     * @type {string}
     * @ignore
     */
    this.m_project = projectname || "";

    /**
     * ...
     *
     * @type {string}
     * @ignore
     */
    this.m_output = output || "";

    /**
     * ...
     *
     * @type {array}
     * @ignore
     */
    this.m_resquestQueue = [];

    /**
     * ...
     *
     * @type {Object}
     * @ignore
     */
    this.m_request = {};

    /**
     * ...
     *
     * @type {array}
     * @ignore
     */
    this.m_tempArr = [];

};


//--------------------------------------------------------------------------
// Public Static constants
//--------------------------------------------------------------------------

/**
 * Reference to Node.js FileSystem module
 *
 * @type {undefined}
 * @constant
 * @default
 */
birka.compiler.Resourcefile.fs = require('fs');


//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Compile files to manifest.
 *
 * @param {array} files Array with file objects, each object contains blob and filename.
 * @param {string} projectname Path to project resource folder.
 *
 * @return {undefined} //TODO: boolean?
 */
birka.compiler.Resourcefile.prototype.compile = function(files) {
    if (files.length > 0) {
        this.m_resquestQueue = files;
        this.m_processRequestQueue();
    } else {
        this.m_writeFile();
    };

};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------


/**
 * ...
 *
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_processRequestQueue = function() {
    if (this.m_resquestQueue.length > 0) {
        this.m_request = this.m_resquestQueue.shift();
        this.m_processRequest();
    } else {
        this.m_writeFile();
    }
};

/**
 * ...
 *
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_processRequest = function() {
    this.m_generateBase64(this.m_request.blob, this.m_request.name);
};

/**
 * ...
 *
 * @param {blob} blob ...
 * @param {string} name ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_generateBase64 = function(blob, name) {
    var m_this = this;
    var reader = new FileReader();
    reader.onload = function(event) {
        m_this.m_generateResponse(name, reader.result);
        m_this.m_resquest = null;
        m_this.m_processRequestQueue();
    }
    reader.readAsDataURL(blob);
};

/**
 * Write resource to manifest file.
 *
 * @param {string} name ...
 * @param {string} data A base64 encoded string.
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_generateResponse = function(name, data) {
    var str = "this.create(\"" + name + "\", \"" + data + "\");"
    this.m_tempArr.push(str);    
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_writeFile = function() {
    var temp = this.m_readTemplate();
    var app = /%APP%/g;
    var data = temp.replace(app, this.m_project);

    var resources = this.m_tempArr.join('\n\t');
    data = data.replace("%RESOURCES%", resources);

    this.m_saveDataToFile(data);
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_saveDataToFile = function (data) {
    var m_this = this; //@FIXME Tried fixing error after compilation...
    var file = this.m_output + '/src/data/Resources.js';
    birka.compiler.Resourcefile.fs.writeFile(file, data, function(err) {
        if (err) {
            throw err; //TODO felhantering
        } else {
            m_this.m_onComplete();
        }
    });
};

/**
 * Reads manifest structure from source file.
 *
 * @return {String}
 * @private
 */
birka.compiler.Resourcefile.prototype.m_readTemplate = function() {
    var structure = birka.compiler.Resourcefile.fs.readFileSync(__dirname + '/templates/Resources.txt').toString();
    return structure;
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_onComplete = function(data) {
    this.m_tempArr = [];
    this.m_resquestQueue = [];
    this.m_request = {};
    this.m_project = "";
    this.m_output = "";
    console.log('Resource file has been saved!');
    alert('Resource file has been saved!')
};