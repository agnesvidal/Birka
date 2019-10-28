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
birka.ui.View = function(name) {

    this.element = null;
    /**
     * Name of the tool.
     *
     * @type {string} name
     */
    this.name = name || "";

    /**
     * Reference to the tool's wrapper.
     *
     * @type {Element} toolWrapper
     */
    this.toolHeader = null;

};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Initalizes the tool's header.
 *
 * @returns undefined
 */
birka.ui.View.prototype.initHeader = function(){
    this.element = document.getElementById('tool-wrapper');
    this.toolHeader = Elem.appendNewClassElem(this.element, 'div', 'tool-header');
    var toolName = Elem.appendNewElem(this.toolHeader,'h2');
    Elem.setText(toolName, this.name);

    this.m_initTitle();
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * Changes the title of the application to the name of the tool.
 *
 * @returns undefined
 */
birka.ui.View.prototype.m_initTitle = function(){
    document.title = 'Birka ' + this.name; //@TODO "Birka" or project name?
};