//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *    --- TODO ---
 * 
 * Denna klass är inte klar alls! 
 * Här följer några förbättrningsförslag/idéer:
 * 
 * - "Slå ihop" med ProjectDirectory. Det finns kod om återupprepas.. 
 * eventuellt använda den här klassen i PD? Omstrukturering krävs 
 * beroende på ytterligare funktionalitet.
 * - välja att hämta bundlad/äldre version?
 * - Ändra namn på klass?? 
 * 
 */ 

/**
 * ...
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * CLASS DESCRIPTION
 */
birka.project.ProjectSDK = function() {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * 
     *
     * @type {string}
     * @ignore
     */
    this.m_bundledTemplate = ""; //TODO fixa temp? 

    /**
     * 
     *
     * @type {string}
     * @ignore
     */
    this.m_url = "https://raw.githubusercontent.com/VectorPanic/rune/master/dist/rune.js";

    /**
     * 
     *
     * @type {string}
     * @ignore
     */
    this.m_name = "rune.js";

    /**
     * 
     *
     * @type {string}
     * @ignore
     */
    this.m_directory = "/lib/";

}

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
birka.project.ProjectSDK.dialog = require('electron').remote.dialog;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * 
 *
 *
 * @return {undefined}
 */
birka.project.ProjectSDK.prototype.updateToLatestVersion = function() {
    this.m_getURLdata();
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * Fetch data from URL and save to file.
 * 
 * @param callback
 *
 * @return {undefined} 
 */
birka.project.ProjectSDK.prototype.m_getURLdata = function() {
    var m_this = this;
    var req = new XMLHttpRequest();
    req.open("GET", this.m_url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4)
            if (req.status === 200) {
                var data = this.responseText;
                m_this.m_writeFile(data);
            } else {
                m_this.m_onError("Birka failed to fetch Rune.js from server. Make sure you have internet access and try again. If error remains, please contact developer.")
            }
    };
    req.send();
};


/**
 * Save data to file.
 *
 * @param {string} data 
 * @private
 */
birka.project.ProjectSDK.prototype.m_writeFile = function(data) {
    var m_this = this;
    var file = window.sessionStorage.projectLocation + this.m_directory + this.m_name;

    birka.project.Projectdirectory.fs.writeFile(file, data, function(err) {
       if (err) {
            m_this.m_onError("Birka could not save 'Rune.js'. Try again. If error remains, please contact developer.");
       } else {
           m_this.m_onComplete();
       }
    });
};

/**
 * 
 *
 * @private
 */
birka.project.ProjectSDK.prototype.m_onComplete = function() {
    birka.project.ProjectSDK.dialog.showMessageBox({
        title: "Info",
        message: "SDK sucessfully updated!",
        buttons: ['OK']
    });
};

/**
 * 
 *
 * @private
 */
birka.project.ProjectSDK.prototype.m_onError = function(msg) {
    birka.project.Projectdirectory.dialog.showMessageBox({
        title: "Error",
        message: msg,
        icon: './src/img/error.png',
        buttons: ['OK']
    });
};