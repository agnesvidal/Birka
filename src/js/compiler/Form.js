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
    for(var i=0; i<3; i++){ //@TODO 3?
        labels.push(Elem.appendNewElem(this.element, 'label'));
        inputFields.push(Elem.appendNewClassElem(this.element, 'div', 'input-field'));
    }
    labels[0].setAttribute('for', 'selectInputBtn');
    labels[0].innerText = 'Select input folder';
    labels[1].setAttribute('for', 'selectOutputBtn');
    labels[1].innerText = 'Select output file';

    // BrowserBtns
    var inputBtns = [];
    for(i=0; i<2; i++){
        inputBtns.push(Elem.appendNewElem(inputFields[i], 'input'));
        inputBtns[i].setAttribute('type', 'button');
        inputBtns[i].setAttribute('value', 'Browse...')
    }

    inputBtns[0].id = 'selectInputBtn';
    this.inputBtn = inputBtns[0];

    inputBtns[1].id = 'selectOutputBtn';
    this.outputBtn = inputBtns[1];

    // Filepath
    var filepathBoxes = [];
    for(i=0; i<2; i++){
        filepathBoxes.push(Elem.appendNewElem(inputFields[i], 'div'));
        filepathBoxes[i].setAttribute('class', 'filepath');
    }

    this.inputPath = filepathBoxes[0];
    this.outputPath = filepathBoxes[1];
};