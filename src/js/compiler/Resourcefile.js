

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

/**
 * Reference to Node.js FileSystem module
 *
 * @type {undefined}
 * @constant
 * @default
 */
birka.compiler.Resourcefile.dialog = require('electron').remote.dialog;


//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Compile files to manifest.
 *
 * @param {array} files Array with file objects, each object contains blob and filename.
 * @param {string} projectname Path to project resource folder.
 *
 * @return {undefined} 
 */
birka.compiler.Resourcefile.prototype.compile = function(files) {
    if (files.length > 0) {
        this.m_resquestQueue = files;
        this.m_processRequestQueue();
    } else {
        this.m_readTemplate();
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
        this.m_readTemplate();
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
    reader.onerror = function(event) {
        reader.abort();
        m_this.onError("Birka failed to read a resource file. Check ingoing resources and try again. If error remains, please contact developer.");
    };
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
birka.compiler.Resourcefile.prototype.m_saveDataToFile = function(temp) {
    var app = /%APP%/g;
    var data = temp.replace(app, this.m_project);
    var resources = this.m_tempArr.join('\n\t');

    data = data.replace("%RESOURCES%", resources);
    this.m_writeFile(data);
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_writeFile = function (data) {
    var m_this = this;
    var file = this.m_output + '/src/data/Resources.js';
    birka.compiler.Resourcefile.fs.writeFile(file, data, function(err) {
        if (err) {
            m_this.m_onError("Birka could not save resource file. Try again. If error remains, please contact developer.");
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
 * 
 *  
 */
birka.compiler.Resourcefile.prototype.m_readTemplate = function() {
    var m_this = this;
    birka.compiler.Resourcefile.fs.readFile(__dirname + '/templates/Resources.txt'.toString(), 'utf8', function(err, data) {
        if (err) {
            m_this.m_onError("Birka could not read template for resource file. Try again. If error remains, please contact developer.");  
        } else {
            m_this.m_saveDataToFile(data)
        }
    });
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_onError = function(msg) {
    birka.compiler.Resourcefile.dialog.showMessageBox({
        title: "Error",
        message: msg,
        icon: './src/img/error.png',
        buttons: ['OK']
    });
    this.m_reset();
}

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_onComplete = function() {
    var location = '"' + this.m_output + '/src/data/Resources.js"';
    var size = this.m_getFilesize();

    birka.compiler.Resourcefile.dialog.showMessageBox({
        title: "Info",
        message: "The resources has been compiled and saved to "+ location +" with a size of "+ size +" KB.",
        buttons: ['OK']
    });
    this.m_reset();
};

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_getFilesize = function() {
    var stats = birka.compiler.Resourcefile.fs.statSync(this.m_output + '/src/data/Resources.js');
    var fileSize = stats.size;
    var kiloBytes = Math.round(fileSize/1000);

    return kiloBytes;
}

/**
 * ...
 *
 * @private
 */
birka.compiler.Resourcefile.prototype.m_reset = function() {
    this.m_tempArr = [];
    this.m_resquestQueue = [];
    this.m_request = {};
    this.m_project = "";
    this.m_output = "";
};