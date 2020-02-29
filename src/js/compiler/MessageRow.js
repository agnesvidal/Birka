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
birka.compiler.MessageRow = function(tbody, status){
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @type {Element}
     */
    //this.element = Elem.appendNewElem(tbody, 'tr');
    this.element = Elem.appendNewClassElem(tbody, 'tr', 'app-compiler-resource-message');

    this.create(status);

    this.status = 0;
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------
/**
 * @member {number} setStatus
 * @memberof birka.compiler.MessageRow
 */
Object.defineProperty(birka.compiler.MessageRow.prototype, "setStatus", {
    set: function (value) {
        this.status = value;
    }
});

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Creates row in table.
 *
 * @param   {Number} status ...
 * @returns {undefined}
 */
birka.compiler.MessageRow.prototype.create = function(status) {
    this.setStyle(status);

    var td = Elem.appendNewElem(this.element, 'td');
    td.setAttribute('colspan', '5');
    td.innerHTML = this.codeToMessage(status);
};

birka.compiler.MessageRow.prototype.m_toggleDisabled = function(disabled) {
    if(disabled){
        this.element.style.display = "none";
    } else {
        this.element.style.display = "table-row";
    }
};

birka.compiler.MessageRow.prototype.codeToMessage = function(code) {
    var message = "";
    switch(code){
        case 1: message = 'Invalid file type.';                 break;
        case 2: message = 'Duplicate file name.';    break;
        case 10: message = 'File size exceeds 1MB.';             break;
        case 11: message = 'File size exceeds 3MB';              break;
        case 12: message = 'Spaces not allowed in name. The name has been modified from the original filename.';              break;
    }
    return message;
};

birka.compiler.MessageRow.prototype.setStyle = function(status) {
    switch(status){
        case 0: this.element.classList.remove('error');
            break;
        case 1: this.element.classList.add('error');
            break;
        case 2: this.element.classList.add('error');
            break;
        case 10: this.element.classList.add('warning');
            break;
        case 11: this.element.classList.add('warning');
            break;
        case 12: this.element.classList.add('warning');
            break;
    }
};

