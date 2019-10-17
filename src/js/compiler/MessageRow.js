birka.compiler.MessageRow = function(tbody, status){
    /**
     * ...
     *
     * @type {HTMLElement}
     */
    //this.element = Elem.appendNewElem(tbody, 'tr');
    this.element = Elem.appendNewClassElem(tbody, 'tr', 'msg');

    this.create(status);

    this.status = 0;
};

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
    //var m_this = this;

    this.setStyle(status);

    var td = Elem.appendNewElem(this.element, 'td');
    td.setAttribute('colspan', '5');
    td.innerHTML = this.codeToMessage(status);

    //this.element.style.display = "table-row";
};

/*
birka.compiler.MessageRow.prototype.statusToMessage = function(status) {
    var msg = "";
    switch(status){
        case 1: msg = "Invalid file type."; break;
        case 2: msg = "File size exceeds [...]."; break;
        case 3: msg = "Duplicate file name."; break;
    }
    return msg;
};
*/

birka.compiler.MessageRow.prototype.m_toggleDisabled = function(disabled) {
    //this.m_makeCollapsible();
    if(disabled){
        this.element.style.display = "none";
    } else {
        //this.messageRow.style.display = "table-row";
        this.element.style.display = "table-row";
    }
};

birka.compiler.MessageRow.prototype.codeToMessage = function(code) {
    var message = "";
    switch(code){
        case 1: message = 'Invalid file type.';                 break;
        case 2: message = 'Duplicate file name. Change ...';    break;
        case 10: message = 'File size exceeds 1MB.';             break;
        case 11: message = 'File size exceeds 3MB';              break;
        //case 5: message = ''; break;
    }
    return message;
};

birka.compiler.MessageRow.prototype.setStyle = function(status) {
    //console.log(status);
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
    }
};

