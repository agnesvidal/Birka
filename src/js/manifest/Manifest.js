

//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Manifest object. //TODO: Compiler? rename class
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * CLASS DESCRIPTION
 */
birka.manifest.Manifest = function() {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {string}
     * @ignore
     */
    this.m_projectName = "";

    /**
     * ...
     *
     * @type {string}
     * @ignore
     */
    this.m_outputPath = "";

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
     * @type {object}
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
birka.manifest.Manifest.fs = require('fs');


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
birka.manifest.Manifest.prototype.compile = function(files, projectName, outputPath) {
    console.log(outputPath);
    this.m_projectName = projectName;
    this.m_outputPath = (outputPath !== "") ? projectName : '/Users/lisa/Desktop'; //TODO: !!

    if (files.length > 0) {
        this.m_resquestQueue = files;
        this.m_processRequestQueue();
    } else {
        console.log("files empty")
        //TODO...
    };

    /*
    if (filepaths.length > 0) {
        this.m_addResources(filepaths, gamepath);
    } else {
        this.m_removeMarker(gamepath);
    };
    */
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
birka.manifest.Manifest.prototype.m_processRequestQueue = function() {
    //console.log(this.m_resquestQueue.length);
    //console.log("processQueue");
    if (this.m_resquestQueue.length > 0) {
        this.m_request = this.m_resquestQueue.shift();
        this.m_processRequest();
    } else {
        //console.log("requestQueue empty")
        this.m_writeFile();
    }
};

/**
 * ...
 *
 *
 * @private
 */
birka.manifest.Manifest.prototype.m_processRequest = function() {
    //console.log(this.m_request);
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
birka.manifest.Manifest.prototype.m_generateBase64 = function(blob, name) {
    //console.log(blob);
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
birka.manifest.Manifest.prototype.m_generateResponse = function(name, data) {
    //TODO: ... this.create('player_texture_32x32', 'data:[<mediatype>][;base64],<data>');
    //Fnuttar? ska <data> vara "egen" sträng
    //console.log(name);
    //console.log(data);

    var str = "this.create(\"" + name + "\", \"" + data + "\",\"<data>\");";
    this.m_tempArr.push(str);    
};

/**
 * ...
 *
 * @private
 */
birka.manifest.Manifest.prototype.m_writeFile = function() {
    var resources = this.m_tempArr.join('\n\t');
    var structure = this.m_readStructure();
    var regex = /%APP%/g;
    var a = structure.replace("%RESOURCES%", resources);
    var b = a.replace(regex, this.m_projectName)

    this.m_saveFile(b);
};

/**
 * ...
 *
 * @private
 */
birka.manifest.Manifest.prototype.m_saveFile = function(data) {
    birka.manifest.Manifest.fs.writeFile(this.m_outputPath + '/Resources.js', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
};

/**
 * Reads manifest structure from source file.
 *
 * @return {String}
 * @private
 */
birka.manifest.Manifest.prototype.m_readStructure = function() {
    var structure = birka.manifest.Manifest.fs.readFileSync('src/js/manifest/Resources.txt').toString();
    return structure;
};