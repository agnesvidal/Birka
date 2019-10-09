//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 * @constructor
 * @param toolWrapper
 *
 * @class
 * @classdesc
 */
birka.compiler.Footer = function(toolWrapper) {
    /**
     * Reference to the footer element.
     *
     * @type {HTMLElement}
     */
    this.element = Elem.appendNewClassElem(toolWrapper, 'div', 'footer');

    /**
     * Reference to element visualizing the number of errors.
     *
     * @type {null}
     */
    var errorsElem = null;

    /**
     * Reference to element visualizing the number of warnings.
     *
     * @type {null}
     */
    var warningsElem = null;

    /**
     * Reference to the compile button.
     *
     * @type {HTMLElement}
     */
    this.compileBtn = null;
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------
/**
 * @member {number} setWarnings
 * @memberof birka.compiler.Footer
 */
Object.defineProperty(birka.compiler.Footer.prototype, "setWarnings", {
    set: function (value) {
        //this.warnings++;
        //this.warningsElem.innerHTML = this.warnings.toString();
        this.warningsElem.innerHTML = value.toString();
    }
});

/**
 * @member {number} setErrors
 * @memberof birka.compiler.Footer
 */
Object.defineProperty(birka.compiler.Footer.prototype, "setErrors", {
    set: function (value) {
        //this.errors++;
        //this.errorsElem.innerHTML = this.errors.toString();
        this.errorsElem.innerHTML = value.toString();

    }
});

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Creates the HTML-elements that make up the footer.
 *
 * @returns {undefined}
 */
birka.compiler.Footer.prototype.init = function(){
    // Errors/Warnings
    var msg = Elem.appendNewClassElem(this.element, 'div', 'msg');

    var msgError = Elem.appendNewClassElem(msg, 'div', 'msg-error');
    this.errorsElem = msgError.appendChild(Elem.p('0'));
    msgError.appendChild(Elem.p(' error(s) '));

    var msgWarning = Elem.appendNewClassElem(msg, 'div', 'msg-warning');
    this.warningsElem = msgWarning.appendChild(Elem.p('0'));
    msgWarning.appendChild(Elem.p(' warning(s)'));

    this.warnings = 0;
    this.errors = 0;

    // CompileBtn
    this.compileBtn = Elem.appendNewElem(this.element, 'input');
    this.compileBtn.setAttribute('type', 'submit');
    this.compileBtn.setAttribute('value', 'Compile');
    this.compileBtn.setAttribute('id','compileBtn');
};