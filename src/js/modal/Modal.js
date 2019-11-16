//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @constructor
 *
 *
 * @class
 * @classdesc
 */
birka.project.Modal = function() {
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    this.element = null;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    this.m_options = null;

    this.m_parent = null;

    this.m_content = null;

    this.m_footer = null;

    this.m_buttons = [];
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
birka.project.Modal.prototype.openDialog = function(options, parent) {
    this.element = Elem.appendNewClassElem(document.body, 'div', 'dialog');
    this.m_parent = parent;
    this.m_options = options;
    this.init();
};

birka.project.Modal.prototype.init = function() {
    var m_this = this;
    var container = Elem.appendNewClassElem(this.element, 'div', 'dialog-container');
    var header = Elem.appendNewClassElem(container, 'div', 'dialog-header');
    var h1 = Elem.appendNewElem(header, 'h1');
    if(this.m_options.title.length > 0) {
        h1.innerHTML = this.m_options.title;
    }
    var form = Elem.appendNewElem(container, 'form');
    this.m_content = Elem.appendNewClassElem(form, 'div', 'dialog-content');
    this.m_footer = Elem.appendNewClassElem(form, 'div', 'dialog-footer');
    this.m_initFooterButtons();

    if(this.m_options.type === 'error'){
        this.m_initMessage(this.m_options.type)
    } else if(this.m_options.type === 'warning'){
        this.m_initMessage(this.m_options.type)
    } else if(this.m_options.type === 'custom'){
        console.log('lala');
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
    if(this.m_options.message.length > 0) {
        message = Elem.appendNewClassElem(this.m_content, 'p', ('dialog-' + type));
        message.innerHTML = this.m_options.message;
    }
};

// Override in child class
birka.project.Modal.prototype.m_initCustom = function() {

};

birka.project.Modal.prototype.m_initFooterButtons = function() {
    var m_this = this;
    this.m_buttons = [];
    for(var i=0; i<1; i++){
        this.m_buttons.push(Elem.appendNewClassElem(this.m_footer, 'input', 'button'));
        this.m_buttons[i].setAttribute('type', 'button');
    }
    this.m_buttons[0].value = 'OK';

    this.m_buttons[0].addEventListener('click', function(event){m_this.m_close(this)});


};


birka.project.Modal.prototype.m_close = function(event) {
    var m_this = this;
    var modal = document.querySelector('.dialog');
    if(modal){
        modal.parentNode.removeChild(this.element);
    }
    if(this.m_options.callback)
    if(this.m_options.callback.func){
        this.m_options.callback.func(this.m_parent, this.m_options.callback.param);
    }
};