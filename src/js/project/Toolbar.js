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
birka.project.Toolbar = function() {
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @type {Array}
     * @public
     */
    this.m_tabs = [];

    //--------------------------------------------------------------------------
    // ...
    //--------------------------------------------------------------------------
    this.m_init();
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------
/**
 * @member {Array} tabs
 * @memberof birka.project.Toolbar
 */
Object.defineProperty(birka.project.Toolbar.prototype, "tabs", {
    get: function () {
        return this.m_tabs;
    }
});

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * ...
 */
birka.project.Toolbar.prototype.m_init = function(){
    var appContainer = document.getElementById('app-content');
    var navWrapper = Elem.appendNewIdElem(appContainer, 'div', 'nav-wrapper');
    var navElem = Elem.appendNewElem(navWrapper, 'nav');
    var ul = Elem.appendNewElem(navElem, 'ul');
    var liElems = [];
    this.m_tabs = [];
    for(var i = 0; i<2; i++){
        liElems.push(Elem.appendNewElem(ul, 'li'));
        this.m_tabs.push(Elem.appendNewElem(liElems[i] , 'a'));
        this.m_tabs[i].setAttribute('href', '#');
    }
    this.m_tabs[0].innerHTML = 'Overview';
    this.m_tabs[0].id = 'overview';
    this.m_tabs[0].setAttribute('class', 'active');
    this.m_tabs[1].innerHTML = 'Compiler';
    this.m_tabs[1].id = 'compiler';
};