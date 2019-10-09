//------------------------------------------------------------------------------
// Namespace
//------------------------------------------------------------------------------

/**
 * @namespace birka
 */
var birka = (function(){

    //--------------------------------------------------------------------------
    // Public static scope
    //--------------------------------------------------------------------------

    /**
     * The object's public scope, represented by an object.
     *
     * @type {Object}
     * @private
     */
    var m_this = {};

    //--------------------------------------------------------------------------
    // Package structure
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @namespace compiler
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.compiler = {};

    /**
     * The system package containing the project's core classes.
     *
     * @namespace system
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.system = {};

    /**
     * ...
     *
     * @namespace ui
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.ui = {};


    //--------------------------------------------------------------------------
    // Return public scope object
    //--------------------------------------------------------------------------

    /**
     * Appending project namespace to vendor namespace.
     */
    return m_this;

})();