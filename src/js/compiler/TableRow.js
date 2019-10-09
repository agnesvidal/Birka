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
     * @type {HTMLElement}
     */
    this.element = Elem.appendNewElem(table, 'tr');

    /**
     * ...
     *
     * @type {boolean}
     */
    this.include = true;

    /**
     * ...
     *
     * @type {HTMLElement}
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
     * @type {null}
     */
    this.textInput = null;
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
    this.m_createCells(data);
    if(data.status !== 0) {
        this.m_changeStatus(data.status);
    }
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
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
};

/**
 * Adds checkbox to row.
 *
 * @param   {HTMLElement} td ...
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
 * @param   {event} e
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
 * @param   {HTMLElement}   td
 * @param   {String}        name
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_inputName = function(td, name) {
    this.textInput = Elem.appendNewElem(td, 'input');
    this.textInput.setAttribute('type', 'text');
    this.textInput.setAttribute('value', name);
};

/**
 *
 *
 * @param   {Number}  status
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_changeStatus = function(status) {
    this.tds[4].classList.add('coll-cell');
    this.m_createMessage(status);
    this.m_styleRow(status);
    this.m_makeCollapsible();
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
        case 1: this.element.classList.add('error', 'hidden');
                break;
        case 2: this.element.classList.add('warning', 'hidden');
                break;
        case 3: this.element.classList.add('error', 'hidden');
                break;
    }
};

/**
 *
 * @param   {Number}  status
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_createMessage = function(status) {
    var row = Elem.appendNewClassElem(this.m_parentTable, 'tr', 'msg');
    var td = Elem.appendNewElem(row, 'td');
    td.setAttribute('colspan', '5');

    switch(status){
        case 1: row.classList.add('error');
                td.innerHTML = 'Invalid file type.';
                break;
        case 2: row.classList.add('warning');
                td.innerHTML = 'File size exceeds 1MB.';
                break;
        case 3: row.classList.add('error');
                td.innerHTML = 'Duplicate name.';
                break;
    }
};

/**
 * Turns row collapsible to show message.
 *
 * @returns {undefined}
 */
birka.compiler.TableRow.prototype.m_makeCollapsible = function() {
    if (this.element.classList.contains('hidden')) {
        this.element.addEventListener('click', function () {
            this.children[this.children.length - 1].classList.toggle("coll-active");
            var content = this.nextElementSibling;
            if (content.style.display === "table-row") {
                content.style.display = "none";
            } else {
                content.style.display = "table-row";
            }
        });
    }
};