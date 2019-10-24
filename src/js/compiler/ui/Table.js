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
birka.compiler.Table = function(toolWrapper) {
    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------
    /**
     * Reference to the table element.
     *
     * @type {HTMLElement}
     */
    this.element = Elem.appendNewClassElem(toolWrapper, 'div', 'fileIndex');

    //@TODO comment...
    this.tableElem = null;
    /**
     * Reference to tbody element.
     *
     * @type {HTMLElement}
     */
    //this.tBody = null;
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Creates the HTML-elements that make up the table.
 *
 * @returns {undefined}
 */
birka.compiler.Table.prototype.init = function(){
    // FileIndex-div
    var h3 = Elem.appendNewElem(this.element,'h3');
    Elem.text(h3, 'Files');

    // Table
    this.tableElem =  Elem.appendNewElem(this.element, 'table');

    // Thead
    var thead =  Elem.appendNewElem(this.tableElem, 'thead');
    var tr = Elem.appendNewElem(thead, 'tr');
    var ths = [];
    for(var i=0; i<5; i++) {
        ths.push(Elem.appendNewElem(tr, 'th'));
    }

    // Th
    Elem.text(ths[0], 'Incl.');
    Elem.text(ths[1], 'File path');
    Elem.text(ths[2], 'Name');
    Elem.text(ths[3], 'File size');
    Elem.text(ths[4], '');

    // Tbody
    //this.tBody = Elem.appendNewElem(this.tableElem, 'tbody');
};