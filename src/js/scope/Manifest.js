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
     * @namespace device
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.device = {};

    /**
     * ...
     *
     * @namespace compiler
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.compiler = {};

    /**
     * ...
     *
     * @namespace ui
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.ui = {};

    /**
     * ...
     *
     * @namespace manifest
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.manifest = {};

    /**
     * The system package containing the project's core classes.
     *
     * @namespace system
     * @memberof vectorpanic.birka
     * @since 1.0
     */
    m_this.system = {};

    //--------------------------------------------------------------------------
    // Return public scope object
    //--------------------------------------------------------------------------

    /**
     * Appending project namespace to vendor namespace.
     */
    return m_this;

})();