//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 * @constructor
 * @param toolHeader
 *
 * @class
 * @classdesc
 */
birka.compiler.Form = function(toolHeader) {
    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------
    /**
     * Reference to the form element.
     *
     * @type {HTMLElement}
     */
    this.element = Elem.appendNewElem(toolHeader, 'form');

    /**
     * Reference to the button used to choose input.
     *
     * @type {HTMLElement}
     */
    this.inputBtn = null;

    /**
     * Reference to the button used to choose output destination.
     *
     * @type {HTMLElement}
     */
    this.outputBtn = null;

    /**
     * Reference to element containing the path for the input.
     *
     * @type {HTMLElement}
     */
    this.inputPath = null;

    /**
     * Reference to element containing the path for the output.
     *
     * @type {HTMLElement}
     */
    this.outputPath = null;

    /**
     * Reference to the refresh button.
     *
     * @type {HTMLElement}
     */
    this.refreshBtn = null;
};

/**
 * Creates the HTML-elements that make up the form.
 *
 * @returns {undefined}
 */
birka.compiler.Form.prototype.init = function(){
    this.element.method = "post";
    this.element.enctype = "multipart/form-data";

    // Input
    var labels = [];
    var inputFields = [];
    var divs = [];
    for(var i=0; i<2; i++){ //@TODO 3?
        inputFields.push(Elem.appendNewClassElem(this.element, 'div', 'input-field'));
    }

    // BrowserBtns
    var inputBtns = [];
    for(i=0; i<2; i++){
        inputBtns.push(Elem.appendNewClassElem(inputFields[i], 'input', 'browse'));
        inputBtns[i].setAttribute('type', 'button');
        inputBtns[i].setAttribute('value', 'Browse...');
        divs.push(Elem.appendNewClassElem(inputFields[i], 'div', 'output-row'));
        labels.push(Elem.appendNewElem(divs[i], 'label'));

    }
    labels[0].setAttribute('for', 'selectInputBtn');
    labels[0].innerText = 'Select input folder';
    labels[1].setAttribute('for', 'selectOutputBtn');
    labels[1].innerText = 'Select output folder';

    inputBtns[0].id = 'selectInputBtn';
    this.inputBtn = inputBtns[0];

    inputBtns[1].id = 'selectOutputBtn';
    this.outputBtn = inputBtns[1];

    // Filepath
    var filepathBoxes = [];
    for(i=0; i<2; i++){
        filepathBoxes.push(Elem.appendNewElem(divs[i], 'div'));
        filepathBoxes[i].setAttribute('class', 'filepath');
    }
    this.refreshBtn = Elem.appendNewClassElem(inputFields[0], 'input', 'refresh');
    this.refreshBtn.setAttribute('type', 'button');

    this.inputPath = filepathBoxes[0];
    this.outputPath = filepathBoxes[1];

    this.inputPath.innerHTML = 'No folder chosen.';
    if(sessionStorage.projectLocation === undefined || sessionStorage.projectLocation === "") {
        this.outputPath.innerHTML = 'No folder chosen.';
    } else {
        this.outputPath.innerHTML = sessionStorage.projectLocation;
    }
};