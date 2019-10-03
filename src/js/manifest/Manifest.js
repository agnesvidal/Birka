

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
var Manifest = function() {

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
Manifest.fs = require('fs');


//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Compile files to manifest.
 *
 * @param {array} filepaths Array with filepaths.
 * @param {string} gamepath Path to game resource folder.
 *
 * @return {undefined} //TODO: boolean?
 */
Manifest.prototype.compile = function(filepaths, gamepath) {
    if (filepaths.length > 0) {
        this.m_addResources(filepaths, gamepath);
    } /*else {
        this.m_removeMarker(gamepath);
    };*/
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * Adds Base64 resources to manifest.
 *
 * @param {array} filepaths Array with filepaths.
 * @param {string} gamepath Path to game resource folder.
 *
 * @private
 */
Manifest.prototype.m_addResources = function(filepaths, gamepath) {
    for (var i = 0; filepaths.length > i; i++) {
        this.m_getBase64(filepaths[i], this.m_writeToFile);
    }
}

/**
 * Reads content of file and forwards data URL (base64) to callback.
 *
 * @param filepath Path to file.
 * @param callback Callback function.
 *
 * @private
 */
Manifest.prototype.m_getBase64 = function(filepath, callback) {
    var xhr = new XMLHttpRequest();       
    xhr.open("GET", filepath, true); 
    xhr.responseType = "blob";

    xhr.onload = function (e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var result = event.target.result;
            callback(result);
        }
        var file = this.response;
        reader.readAsDataURL(file)
    };
    xhr.send();
}

/**
 * Write resource to manifest file.
 *
 * @param data A base64 encoded string.
 *
 * @return {undefined}
 * @private
 */
Manifest.prototype.m_writeToFile = function(data) {
    console.log(data);
    //TODO: ... this.create("player_texture_32x32", "data:[<mediatype>][;base64],<data>");
    //Fnuttar? ska <data> vara "egen" sträng
}

/**
 * Reads manifest structure from source file.
 *
 * @return {String}
 * @private
 */
Manifest.prototype.m_readStructure = function() {
    var structure = Manifest.fs.readFileSync('src/js/manifest/Resources.txt').toString()
    return structure;
}