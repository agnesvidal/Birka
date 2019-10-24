//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @constructor
 * @param modal
 * @param options
 *
 *
 * @class
 * @classdesc
 */
birka.project.Modal = function(modal, options) {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    this.element = Elem.appendNewClassElem(document.body, 'div', 'dialog');

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    this.modal = modal;

    this.options = options;

    this.browseBtn = null;

    this.content = null;

    this.m_footer = null;

    this.buttons = [];

    this.init();
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
birka.project.Modal.prototype.init = function() {
    var m_this = this;
    var container = Elem.appendNewClassElem(this.element, 'div', 'dialog-container');
    var header = Elem.appendNewClassElem(container, 'div', 'dialog-header');
    var h1 = Elem.appendNewElem(header, 'h1');
    if(this.options.title.length > 0) {
        h1.innerHTML = this.options.title;
    }
    var form = Elem.appendNewElem(container, 'form');
    this.content = Elem.appendNewClassElem(form, 'div', 'dialog-content');
    this.m_footer = Elem.appendNewClassElem(form, 'div', 'dialog-footer');
    this.m_initFooterButtons();

    if(this.options.type === 'error'){
        this.m_initMessage(this.options.type)
    } else if(this.options.type === 'warning'){
        this.m_initMessage(this.options.type)
    } else if(this.options.type === 'custom'){
        this.m_initCustom();
    }

    this.element.addEventListener('click', function(event){
        if(event.target.className === 'dialog'){
            m_this.m_close();
        }
    });
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
birka.project.Modal.prototype.m_initMessage = function(type) {
    var message = "";
    if(this.options.message.length > 0) {
        message = Elem.appendNewClassElem(this.content, 'p', ('dialog-' + type));
        message.innerHTML = this.options.message;
    }
};

// Override in child class
birka.project.Modal.prototype.m_initCustom = function() {

};

birka.project.Modal.prototype.m_initFooterButtons = function() {
    var m_this = this;
    this.buttons = [];
    for(var i=0; i<1; i++){
        this.buttons.push(Elem.appendNewClassElem(this.m_footer, 'input', 'button'));
        this.buttons[i].setAttribute('type', 'button');
    }
    this.buttons[0].value = 'OK';

    this.buttons[0].addEventListener('click', function(){m_this.m_close(this)});


};

birka.project.Modal.prototype.m_close = function() {
    var m_this = this;
    m_this.element.parentNode.removeChild(this.element);
    this.modal = null;
};