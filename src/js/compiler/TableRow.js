//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 * @constructor
 * @param {HTMLElement} table ...
 *
 * @class
 * @classdesc
 */
birka.compiler.TableRow = function(table) {
    /**
     * ...
     *
     * @type {Element}
     */
    this.tbody = Elem.appendNewElem(table, 'tbody');

    this.element = Elem.appendNewElem(this.tbody, 'tr');

    /**
     * ...
     *
     * @type {boolean}
     */
    this.include = true;

    /**
     * ...
     *
     * @type {Element}
     */
    this.m_parentTable = table;

    /**
     * ...
     *
     * @type {Array}
     */
    this.tds = [];

    /**
     * ...
     *
     * @type {Element}
     */
    this.textInput = null;

    /**
     * ...
     *
     * @type {null}
     */
    this.messageRow = null;
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Creates row in table.
 *
 * @param   {Object} data ...
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.create = function(data) {
    //this.m_createRow(data);
    this.m_createCells(data);
    this.m_makeCollapsible();

    if(data.status.length > 0) {
        this.m_changeStatus(data.status);
    }
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
birka.compiler.TableRow.prototype.m_createRow = function(data) {

};
/**
 *
 *
 * @param   {Object} data ...
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_createCells = function(data) {
    for (var i=0; i<5; i++) {
        this.tds.push(Elem.appendNewElem(this.element, 'td'));
    }
    this.m_addCheckbox(this.tds[0]);
    this.tds[1].innerHTML = data.path;
    this.m_inputName(this.tds[2], data.name);
    this.tds[3].innerHTML = data.size;

    this.tds[4].classList.add('coll-cell');

};

/**
 * Adds checkbox to row.
 *
 * @param   {Element} td ...
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_addCheckbox = function(td) {
    var m_this = this;
    var label = Elem.appendNewClassElem(td, 'label', 'check-container');
    var input = Elem.appendNewClassElem(label, 'input', 'checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'checked');
    input.addEventListener('click',function(){m_this.m_toggleInclude(this)});
    var span = Elem.appendNewClassElem(label, 'span', 'checkmark');
};

/**
 * Toggles whether the row/file is to be included when compiling.
 *
 * @param   {Event} e
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_toggleInclude = function(e){
    var m_this = this;
    m_this.element.classList.toggle('ignored');
    m_this.include = m_this.include !== true;
};

/**
 * Creates text input for filename and writes default name.
 *
 * @param   {Element}   td
 * @param   {String}        name
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_inputName = function(td, name) {
    this.textInput = Elem.appendNewElem(td, 'input');
    this.textInput.setAttribute('type', 'text');
    this.textInput.setAttribute('value', name);
    this.textInput.setAttribute('required','');
    this.textInput.addEventListener('keypress', function(e){
      if(e.keyCode === 32){
          e.preventDefault();
        }
    })
};

/**
 *
 *
 * @param   {Array}  status
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_changeStatus = function(status) {
    var s = 0;
    if(status.length > 0) {
        for(var i = 0; i<status.length; i++){
            if((status[i] === 1) || (status[i] === 2)){
                s = 1;
            }

            if(status[i] >= 10){
                s = 10;
            }
        }
    }
    //this.tds[4].classList.add('coll-cell');
    this.m_styleRow(s);
};
/**
 *
 * @param   {Number}  status
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_styleRow = function(status) {
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
        case 5: this.element.classList.remove('warning');
                this.element.classList.add('error');
            break;
    }
};

birka.compiler.TableRow.prototype.m_toggleDisabled = function(disabled) {
    //this.m_makeCollapsible();

    if(disabled){
        this.messageRow.style.display = "none";
        this.m_makeCollapsible();
    } else {
        //this.messageRow.style.display = "table-row";
        this.m_makeCollapsible();
    }
};

/**
 * Turns row collapsible to show message.
 *
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_makeCollapsible = function() {
    var m_this = this;
    this.tds[4].addEventListener('click',function(){m_this.m_collapse(this)});
};

birka.compiler.TableRow.prototype.m_collapse = function(e) {
    var m_this = this;
    if (this.element.classList.contains('error') || this.element.classList.contains('warning')) {
        e.classList.toggle("coll-active");
        var message = m_this.tbody.nextElementSibling;
        if (message.style.display === "table-row-group") {
            message.style.display = "none";
        } else if(message.style.display === "none") {
            message.style.display = "table-row-group";
        }
    }
};

