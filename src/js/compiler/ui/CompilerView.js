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
birka.compiler.CompilerView = function() {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    birka.ui.View.call(this, 'Compiler');

    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------
    /**
     * Reference to the form element.
     *
     * @type {Element}
     */
    this.form = null;

    /**
     * Reference to the button used to choose input.
     *
     * @type {Element}
     */
    this.inputBtn = null;

    /**
     * Reference to element containing the path for the input.
     *
     * @type {Element}
     */
    this.inputPath = null;

    /**
     * Reference to element containing the path for the output.
     *
     * @type {Element}
     */
    this.outputPath = null;

    /**
     * Reference to the refresh button.
     *
     * @type {Element}
     */
    this.refreshBtn = null;

    /////------------------------------------------------------------ FILELIST
    /**
     * Reference to the table element.
     *
     * @type {Element}
     */
    this.fileList = null;

    //@TODO comment...
    this.tableElem = null;


    /////------------------------------------------------------------ FOOTER
    /**
     * Reference to the footer element.
     *
     * @type {Element}
     */
    this.footer = null;

    /**
     * Reference to element visualizing the number of errors.
     *
     * @type {Element}
     */
    var m_errorsElem = null;

    /**
     * Reference to element visualizing the number of warnings.
     *
     * @type {Element}
     */
    var m_warningsElem = null;

    /**
     * Reference to the compile button.
     *
     * @type {Element}
     */
    this.compileBtn = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.compiler.CompilerView.prototype = Object.create(birka.ui.View.prototype);
birka.compiler.CompilerView.prototype.constructor = birka.compiler.CompilerView;


//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------
/**
 * @member {number} setWarnings
 * @memberof birka.compiler.CompilerView
 */
Object.defineProperty(birka.compiler.CompilerView.prototype, "setWarnings", {
    set: function (value) {
        this.m_warningsElem.innerHTML = value.toString();
    }
});

/**
 * @member {number} setErrors
 * @memberof birka.compiler.CompilerView
 */
Object.defineProperty(birka.compiler.CompilerView.prototype, "setErrors", {
    set: function (value) {
        this.m_errorsElem.innerHTML = value.toString();

    }
});

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Initalizes ...
 *
 * @returns undefined
 */
birka.compiler.CompilerView.prototype.init = function(){
    this.initHeader();
    this.m_renderForm();
    this.m_renderFileList();
    this.m_renderFooter();

};

/**
 * Creates the HTML-elements that make up the form.
 *
 * @returns {undefined}
 */
birka.compiler.CompilerView.prototype.m_renderForm = function() {
    this.form = Elem.appendNewElem(this.toolHeader, 'form');

    this.form.method = "post";
    this.form.enctype = "multipart/form-data";

    var labels = [];
    var inputFields = [];
    var divs = [];
    var filepathBoxes = [];

    for(var i=0; i<2; i++){
        inputFields.push(Elem.appendNewClassElem(this.form, 'div', 'app-input-field'));
        divs.push(Elem.appendNewClassElem(inputFields[i], 'div', 'app-compiler-path-container'));
        labels.push(Elem.appendNewElem(divs[i], 'label'));
        filepathBoxes.push(Elem.appendNewElem(divs[i], 'div'));
        filepathBoxes[i].setAttribute('class', 'app-input-filepath');
    }

    // Browse button
    this.inputBtn = Elem.prependNewClassElem(inputFields[0], 'input', 'app-compiler-browse-btn');
    this.inputBtn.setAttribute('type', 'button');
    this.inputBtn.setAttribute('value', 'Browse...');
    this.inputBtn.id = 'selectInputBtn';

    // Labels
    labels[0].setAttribute('for', 'selectInputBtn');
    labels[0].innerText = 'Select input folder';
    labels[1].innerText = 'Output folder';

    this.refreshBtn = Elem.appendNewClassElem(inputFields[0], 'input', 'app-compiler-refresh-btn');
    this.refreshBtn.setAttribute('type', 'button');

    // Path containers
    this.inputPath = filepathBoxes[0];
    this.outputPath = filepathBoxes[1];
    this.inputPath.innerHTML = 'No folder chosen.';
    if(window.sessionStorage.output === undefined || window.sessionStorage.output === "") {
        this.outputPath.innerHTML = 'No folder chosen.';
    } else {
        this.outputPath.innerHTML = window.sessionStorage.output;
    }
};

/**
 * Creates the HTML-elements that make up the table.
 *
 * @returns {undefined}
 */
birka.compiler.CompilerView.prototype.m_renderFileList = function() {
    this.fileList = Elem.appendNewClassElem(this.element, 'div', 'app-compiler-resources');

    // FileIndex-div
    var h3 = Elem.appendNewElem(this.fileList,'h3');
    Elem.setText(h3, 'Resources');

    // Table
    this.tableElem =  Elem.appendNewElem(this.fileList, 'table');

    // Thead
    var thead =  Elem.appendNewElem(this.tableElem, 'thead');
    var tr = Elem.appendNewElem(thead, 'tr');
    var ths = [];
    for(var i=0; i<5; i++) {
        ths.push(Elem.appendNewElem(tr, 'th'));
    }

    // Th
    Elem.setText(ths[0], 'Incl.');
    Elem.setText(ths[1], 'File path');
    Elem.setText(ths[2], 'Name');
    Elem.setText(ths[3], 'File size');
    Elem.setText(ths[4], '');

    // Tbody
    //this.tBody = Elem.appendNewElem(this.tableElem, 'tbody');
};

/**
 * Creates the HTML-elements that make up the footer.
 *
 * @returns {undefined}
 */
birka.compiler.CompilerView.prototype.m_renderFooter = function() {
    this.footer = Elem.appendNewClassElem(this.element, 'div', 'app-tool-footer');

    // Errors/Warnings
    var exceptions = Elem.appendNewClassElem(this.footer, 'div', 'app-compiler-exceptions-container');

    var exceptionsError = Elem.appendNewClassElem(exceptions, 'div', 'app-compiler-exceptions-error');
    this.m_errorsElem = exceptionsError.appendChild(Elem.p('0'));
    exceptionsError.appendChild(Elem.p(' error(s) '));

    var exceptionsWarning = Elem.appendNewClassElem(exceptions, 'div', 'app-compiler-exceptions-warning');
    this.m_warningsElem = exceptionsWarning.appendChild(Elem.p('0'));
    exceptionsWarning.appendChild(Elem.p(' warning(s)'));

    // CompileBtn
    this.compileBtn = Elem.appendNewElem(this.footer, 'input');
    this.compileBtn.setAttribute('type', 'submit');
    this.compileBtn.setAttribute('value', 'Compile');
    this.compileBtn.setAttribute('class','app-compiler-compile-btn');
};

