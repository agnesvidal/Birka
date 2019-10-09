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
birka.compiler.Compiler = function() {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    birka.compiler.Tool.call(this, 'Compiler');

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @type {HTMLElement}
     */
    this.toolHeader = null;

    /**
     * ...
     *
     * @type {birka.compiler.Form}
     */
    this.form = null;

    /**
     * ...
     *
     * @type {birka.compiler.Table}
     */
    this.table = null;

    /**
     * ...
     *
     * @type {birka.compiler.Footer}
     */
    this.footer = null;

    /**
     * ...
     *
     * @type {Array}
     */
    this.files = [];

    /**
     * ...
     *
     * @type {string}
     */
    this.outputPath = '';

    /**
     * ...
     *
     * @type {number}
     */
    this.errors = 0;

    /**
     * ...
     *
     * @type {number}
     */
    this.warnings = 0;

    /**
     * ...  //TODO: Vet inte om 
     *
     * @type {birka.manifest.Manifest}
     */
    this.manifest = null;


    this.app = require('electron').remote;
    this.dialog = this.app.dialog;
    this.fs = require('fs');
    this.path = require('path');
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.compiler.Compiler.prototype = Object.create(birka.compiler.Tool.prototype);
birka.compiler.Compiler.prototype.constructor = birka.compiler.Compiler;

//----------------------------------------------------------------------
// PUBLIC methods
//----------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.init = function(){
    this.m_initUI(this.m_initModules);
    this.m_initManifest();
};

//----------------------------------------------------------------------
// Private methods
//----------------------------------------------------------------------
/**
 * Initializes manifest complier. //TODO: kan den heta manifest? den eviga frågan.
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_initManifest = function(){
    this.manifest = new birka.manifest.Manifest();
};

/**
 * Initializes user interface.
 *
 * @param callback
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_initUI = function(callback){
    this.initHeader();
    this.form = new birka.compiler.Form(this.toolHeader);
    this.form.init();
    this.table = new birka.compiler.Table(this.toolWrapper);
    this.table.init();
    this.footer = new birka.compiler.Footer(this.toolWrapper);
    this.footer.init();
    this.m_addListeners();
    callback();
    //console.log(this.toolWrapper)
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_initModules = function(){
    this.fs = require('fs');
    this.path = require('path');
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_addListeners = function(){
    var m_this = this;
    this.form.inputBtn.addEventListener('click',function(){m_this.m_uploadFiles(this)});
    this.form.outputBtn.addEventListener('click',function(){m_this.m_chooseOutput(this)});
    this.footer.compileBtn.addEventListener('click',function(){m_this.m_compile(this)});

};

/**
 * ...
 *
 * @param e
 * @returns {undefined}
 */
//@TODO Unfinished method
birka.compiler.Compiler.prototype.m_compile = function(e) {
    var m_this = this;
    var temp = [];

    //@TODO
    // Checks what files should be included...
    for(var i=0; i< m_this.files.length; i++) {
        if( m_this.files[i].row.include === true) {
            temp.push( m_this.files[i].result);
        }
    }
    //@TODO
    // Checks whether there are any errors...
    for(var i=0; i<temp.length; i++) {
        if(temp[i].status === 1) {
            console.log("Error. Can't compile.");
            return;
        }
    }

    console.log('For compilation:', temp, m_this.outputPath);

    // @TODO Skicka array (temp) till ...
    m_this.manifest.compile(temp, "AppOne", m_this.outputPath);
};

/**
 * ...
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_chooseOutput = function(e) {
    var m_this = this;
    this.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openFile']
    }, function(path) {
        if(path === undefined || path.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
            m_this.outputPath = path[0];
            m_this.form.outputPath.innerHTML = path[0];
        }
    });
};

/**
 * ...
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_uploadFiles = function(e){
    var m_this = this;
    this.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
            console.log(folderPaths);
            m_this.form.inputPath.innerHTML = folderPaths[0];
            m_this.m_walkDir(folderPaths[0]);
        }
    });
};

/**
 * ...
 *
 * @param   {string} dir
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_walkDir = function(dir) {
    var m_this = this;
    this.fs.readdirSync(dir).forEach(function(file) {
        var fullPath = this.path.join(dir, file);
        if (this.fs.lstatSync(fullPath).isDirectory()) {
            m_this.m_walkDir(fullPath);
        } else {
            if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
                m_this.m_requestFile(fullPath);
            }
        }
    });
};

/**
 * ...
 *
 * @param   {string} path
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_requestFile = function(path) {
    var m_this = this;
    var req = new XMLHttpRequest();
    req.open("GET", path, true);
    req.responseType = "blob";
    req.onreadystatechange = function () {
        if (req.readyState === 4)
            if (req.status === 200) {
                m_this.m_getData(m_this.m_createFile(this.response, path));
            } else {
                console.log("Error...");  //TODO
            }
    };
    req.send();
};

/**
 * ...
 *
 * @param   {Object}    result
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_getData = function(result) {
    var m_this = this;
    var row = new birka.compiler.TableRow(this.table.tBody);
    row.create(result);

    //row.textInput.addEventListener('input',function(){m_this.m_changeName(event, row)}); //@TODO
    //this.m_checkForDuplicates(result.name, row); //@TODO

    this.files.push({result: result, row: row});
};

/**
 * ...
 *
 * @param   {Blob}      blob
 * @param   {string}    path
 * @returns {Object}    file
 */
birka.compiler.Compiler.prototype.m_createFile = function(blob, path) {
    var file = {};
    file.blob = blob;
    file.name = this.m_getFileName(path);
    file.path = path;
    file.status = this.m_checkStatus(file.blob.size, file.blob.type);
    file.size = this.m_bytesToSize(file.blob.size);
    return file;
};

/**
 * ...
 *
 * @param   {string} path
 * @returns {string}
 */
birka.compiler.Compiler.prototype.m_getFileName = function(path) {
    var filename = path.replace(/^.*[\\\/]/, '');
    filename = filename.split('.').slice(0, -1).join('.');
    filename = filename.replace(' ', '_');
    return filename;
};

/**
 * ...
 *
 * @param   {Number} size
 * @param   {string} type
 * @returns {number}
 */
//@TODO Unfinished method
birka.compiler.Compiler.prototype.m_checkStatus = function(size, type) {
    //console.log('10BM', this.bytesToSize(10000000));
    //console.log(this.bytesToSize(500000));
    var status = 0;
    if(size > 500000){
        status = 2;
        this.warnings++;
        this.footer.setWarnings = this.warnings;
    } else if(type !== 'image/png'){
        status = 1;
        this.errors++;
        this.footer.setErrors = this.errors;
    }
    return status;
};

/**
 * ...
 *
 * @param   {Number} bytes
 * @returns {string}
 */
birka.compiler.Compiler.prototype.m_bytesToSize = function(bytes) {
    var sizes = ['B', 'kB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

/**
 * ...
 *
 * @param   {Event} e
 * @param   {birka.compiler.TableRow} row
 * @returns {undefined}
 */
//@TODO Unfinished method
birka.compiler.Compiler.prototype.m_changeName = function(e, row) {
    //console.log(row.textInput.value);
    //console.log(this.m_checkForDuplicates(row.textInput.value));
    for(var i=0; i<this.files.length; i++){
        if(this.files[i].row === row){
            this.files[i].result.name = row.textInput.value;
            console.log(this.files[i].result.status);

            //@FIXME Undone
            if((this.m_checkForDuplicates(row.textInput.value, row) === false)/* && (this.files[i].result.status === 3)*/){
                console.log('clear');
                row.m_styleRow(0);
            }
        }
    }
};

/**
 * ...
 *
 * @param   {string} name
 * @param   {birka.compiler.TableRow} row
 * @return  {boolean}
 */
//@TODO Unfinished method
birka.compiler.Compiler.prototype.m_checkForDuplicates = function(name, row) {
    var flag = false;
    for(var i = 0; i<this.files.length; i++) {
        if(this.files[i].result.name === name){
            console.log('Duplicate');
            row.m_changeStatus(3);
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
};