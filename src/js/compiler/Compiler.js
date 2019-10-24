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
    birka.Tool.call(this, 'Compiler');

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
birka.compiler.Compiler.dialog = require('electron').remote.dialog;

/**
 * Array containing allowed file types.
 *
 * @type {string[]}
 * @constant
 * @default
 */
birka.compiler.Compiler.ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "audio/ogg", "audio/mpeg", "text/xml", "application/json"];

/**
 * Reference to Node.js FileSystem module
 *
 * @type {module:fs}
 * @constant
 * @default
 */
birka.compiler.Compiler.fs = require('fs');

/**
 * Reference to Node.js Path module
 *
 * @type {module:path}
 * @constant
 * @default
 */
birka.compiler.Compiler.path = require('path');

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.compiler.Compiler.prototype = Object.create(birka.Tool.prototype);
birka.compiler.Compiler.prototype.constructor = birka.compiler.Compiler;

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.init = function(){
    if(window.sessionStorage.loaded === undefined) {
        //alert('Select a project first.');
        //this.modals = [];
        /*
        this.modals.push(new birka.project.Modal(this.modals, {
            title: ['Error'],
            message: ['Select or create a project first.']
        }));
        */
        this.initHeader();

        var div = Elem.appendNewClassElem(this.toolHeader,'div','no-project');
        var pElem = Elem.appendNewElem(div,'p');
        Elem.text(pElem, "No project loaded...");
    } else {
    this.m_initUI();
    }
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * Initializes user interface.
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_initUI = function(){
    this.initHeader();
    this.form = new birka.compiler.Form(this.toolHeader);
    this.form.init();
    this.table = new birka.compiler.Table(this.toolWrapper);
    this.table.init();
    this.footer = new birka.compiler.Footer(this.toolWrapper);
    this.footer.init();
    this.m_addListeners();
};

/**
 * ...
 *
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_addListeners = function(){
    var m_this = this;
    this.form.inputBtn.addEventListener('click',function(){m_this.m_uploadFiles(this)});
    this.form.refreshBtn.addEventListener('click',function(){m_this.m_refresh(this)});
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
            temp.push( m_this.files[i].file);
        }
    }
    //@TODO
    // Checks whether there are any errors...
    for(var i=0; i<temp.length; i++) {
        if(temp[i].status.length > 0) {
            for(var j=0; j< temp[i].status.length; j++){
                if((temp[i].status[j] === 1) || (temp[i].status[j] === 2)){
                    //console.log(temp);
                    //console.log("Error. Can't compile.");
                    m_this.modal = new birka.project.Modal(m_this.modal, {
                        type: 'error',
                        title: 'Can\'t compile',
                        message: 'Your selected folder contains errors.'
                    });
                    return;
                }
            }
        }
    }
    //console.log('sessionStorage projectPath', window.sessionStorage.projectLocation);
    //console.log('For compilation:', temp, m_this.outputPath);

    var res = new birka.Resourcefile(window.sessionStorage.name, window.sessionStorage.projectLocation);
    res.compile(temp);
};

/**
 * ...
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_chooseOutput = function(e) {
    var m_this = this;
    birka.compiler.Compiler.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            console.log("No destination folder selected");
            return;
        } else {
            m_this.outputPath = folderPaths[0];
            m_this.form.outputPath.innerHTML = folderPaths[0];

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
    birka.compiler.Compiler.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            console.log("No destination folder selected");
            return;
        } else {
            m_this.m_emptyTable();
            m_this.form.inputPath.innerHTML = folderPaths[0];
            m_this.m_walkDir(folderPaths[0]);
        }
    });
};


/**
 * ...
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_refresh = function(e){
    var m_this = this;
    if(m_this.form.inputPath.innerHTML !== ""){
        m_this.m_emptyTable();
        m_this.m_walkDir(m_this.form.inputPath.innerHTML);
    }
};

/**
 * ...
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_emptyTable = function(){
    var m_this = this;
    this.warnings = 0;
    this.footer.setWarnings = this.warnings;
    this.errors = 0;
    this.footer.setErrors = this.errors;

    while (m_this.table.tableElem.childNodes.length > 1) {
        m_this.table.tableElem.removeChild(m_this.table.tableElem.lastChild);
    }

    this.files = [];
};

/**
 * ...
 *
 * @param   {string} dir
 * @returns {undefined}
 */
birka.compiler.Compiler.prototype.m_walkDir = function(dir) {
    var m_this = this;
    birka.compiler.Compiler.fs.readdirSync(dir).forEach(function(file) {
        var fullPath = birka.compiler.Compiler.path.join(dir, file);
        if (birka.compiler.Compiler.fs.lstatSync(fullPath).isDirectory()) {
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
                //m_this.m_getData(m_this.m_createFile(this.response, path));
                m_this.m_getData(new birka.compiler.File(this.response, path));

            } else {
                console.log("Error...");  //TODO
            }
    };
    req.send();
};

/**
 * ...
 *
 * @param   {birka.compiler.File}    file
 * @returns {undefined}
 */
//@TODO Clean
birka.compiler.Compiler.prototype.m_getData = function(file) {
    var m_this = this;

    file.m_checkStatus();
    if(this.files.length > 0){
        // Check for duplicates
        if(m_this.m_checkIfDuplicate(file.name)){
            file.setStatus = 2;
            this.m_checkForNewDuplicates(file.name);
        }
    }

    //create row and add listener to textinput
    var row = new birka.compiler.TableRow(this.table.tableElem);
    row.create(file);
    row.textInput.addEventListener('input',function(event){m_this.m_changeName(event, row)});

    // if error/warning -> add message and increment error/warning
    if(file.status.length > 0) {
        var message = new birka.compiler.Message(this.table.tableElem);
        message.create(this.table.tableElem, this.table.tableElem.childNodes);
        message.addMessage(file.status);
        for(var i=0; i<file.status.length; i++) {
            this.m_incrementException(file.status[i]);
        }
    }

    //add file, row and message to array for easy access.
    this.files.push({file: file, row: row, message: message});
};

/**
 *
 * @param fileStatus
 */
birka.compiler.Compiler.prototype.m_incrementException = function(fileStatus) {
    if(fileStatus > 0 && fileStatus < 10){
        this.errors++;
        this.footer.setErrors = this.errors;
    }
    if(fileStatus >= 10){
        this.warnings++;
        this.footer.setWarnings = this.warnings;
    }

};

/**
 *
 * @param fileStatus
 */
birka.compiler.Compiler.prototype.m_decrementException = function(fileStatus) {
    if(fileStatus > 0 && fileStatus < 10){
        this.errors--;
        this.footer.setErrors = this.errors;
    }
    if(fileStatus >= 10){
        this.warnings--;
        this.footer.setWarnings = this.warnings;
    }
};

/**
 *
 * @param name
 * @return {boolean}
 */
birka.compiler.Compiler.prototype.m_checkIfDuplicate = function(name) {
    var flag = false;
    for(var i = 0; i<this.files.length; i++) {
        if(this.files[i].file.name === name){
            flag = true;
        }
    }
    return flag;
};

/**
 * ...
 *
 * @param   {Event} e
 * @param   {birka.compiler.TableRow} row
 * @returns {undefined}
 */
//@TODO Clean
birka.compiler.Compiler.prototype.m_changeName = function(e, row) {
    for(var i=0; i<this.files.length; i++){
        if(this.files[i].row === row){
            var fileObj = this.files[i];
            // Duplicate file name and has been before as well
            if(this.m_checkIfDuplicate(row.textInput.value) && fileObj.file.isDuplicate()){
                this.m_checkRemainingDuplicates(fileObj.file.name);
                this.m_checkForNewDuplicates(row.textInput.value);
            }

            // Duplicate file name but was NOT previously.
            else if(this.m_checkIfDuplicate(row.textInput.value) && !fileObj.file.isDuplicate()){
                this.m_checkForNewDuplicates(row.textInput.value);
                this.m_addDuplicateError(fileObj, (i+2));
            }

            // NOT a duplicate file name, but it has been
            else if(!this.m_checkIfDuplicate(row.textInput.value) && fileObj.file.isDuplicate()){
                this.m_removeDuplicateError(fileObj);
                // checks if there are more files with the old name that are now solved too.
                this.m_checkRemainingDuplicates(fileObj.file.name);
            }
            this.files[i].file.setName = row.textInput.value;
        }
    }
};


//check if changed name removed duplicate status from other file/row
//@TODO Rename, clean
birka.compiler.Compiler.prototype.m_checkRemainingDuplicates = function(oldName) {
   var count = 0;
   for(var i=0; i<this.files.length; i++){
       if(this.files[i].row.textInput.value === oldName) {
           count++;
           //console.log("duplicate");
       }
   }
   for(var i=0; i<this.files.length; i++) {
       if (this.files[i].row.textInput.value === oldName) {
           if (count <= 1) {
               this.m_removeDuplicateError(this.files[i]);
           }
       }
   }
};

//check if it changed name turned other file/row into a duplicate
//@TODO Rename, clean.
birka.compiler.Compiler.prototype.m_checkForNewDuplicates = function(name) {
    for(var i = 0; i<this.files.length; i++) {
        if ((this.files[i].file.name === name) && (!this.files[i].file.isDuplicate())) {
            var pos = 0;
            for(var j = 0; j<this.table.tableElem.childNodes.length; j++) {
                if(this.table.tableElem.childNodes[j].childNodes[0] === this.files[i].row.element){
                    //console.log(j);
                    pos = j;
                }
            }
            this.m_addDuplicateError(this.files[i], pos);
        }
    }
};

/**
 *
 * @param fileObj
 * @param pos
 */
birka.compiler.Compiler.prototype.m_addDuplicateError = function(fileObj, pos) {
    fileObj.file.setStatus = 2;

    if(fileObj.message === undefined || fileObj.message === null){
        var message = new birka.compiler.Message(this.table.tableElem);

        message.create(this.table.tableElem, pos);
        fileObj.message = message;
    }
    fileObj.message.addMessage(2);

    //if(fileObj.file.status.indexOf(10) > -1){ //@TODO
    if(fileObj.file.hasWarning()){ //@TODO
        fileObj.row.m_styleRow(5); // remove warning, add error style
    } else{
        fileObj.row.m_styleRow(2); // add error style
    }
    this.m_incrementException(2);
};

/**
 *
 * @param fileObj
 */
birka.compiler.Compiler.prototype.m_removeDuplicateError = function(fileObj) {
    if(fileObj.message.containsDuplicateErr()){
        fileObj.message.removeDup();
        fileObj.file.removeError(2);
    }

    // if file contains a warning
    if(fileObj.file.status.indexOf(10) > -1){ //@TODO
        fileObj.row.m_styleRow(10);
    }

    this.m_decrementException(2);

    //console.log(this.files[i]);
    if(fileObj.file.status.length === 0){
        fileObj.message.tbody.parentNode.removeChild(fileObj.message.tbody);
        fileObj.message = null;
        //console.log(this.files[i].message);
        if(fileObj.row.tds[4].classList.contains('coll-active')){
            fileObj.row.tds[4].classList.remove('coll-active');
        }
        fileObj.row.m_styleRow(0);
    }
};