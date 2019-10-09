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
birka.compiler.Tool = function(name) {
    /**
     * Name of the tool.
     *
     * @type {string} name
     */
    this.name = name || "";

    /**
     * Reference to the tool's wrapper.
     *
     * @type {HTMLElement} toolWrapper
     */
    this.toolWrapper = null; // @TODO Alternativt skicka med toolWrapper från Main

};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Initalizes the tool's header.
 *
 * @returns undefined
 */
birka.compiler.Tool.prototype.initHeader = function(){
    this.toolWrapper = document.getElementById('tool-wrapper');
    this.toolHeader = Elem.appendNewClassElem(this.toolWrapper, 'div', 'tool-header');
    var toolName = Elem.appendNewElem(this.toolHeader,'h2');
    Elem.text(toolName, this.name);

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
birka.compiler.Tool.prototype.m_initTitle = function(){
    document.title = 'Birka ' + this.name;
};