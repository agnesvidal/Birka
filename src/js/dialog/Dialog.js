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
birka.dialog.Dialog = function() {
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
birka.dialog.Dialog.prototype.open = function(options, parent) {
    this.element = Elem.appendNewClassElem(document.body, 'div', 'app-dialog');
    this.m_parent = parent;
    this.m_options = options;
    this.init();
};

birka.dialog.Dialog.prototype.init = function() {
    var m_this = this;
    var container = Elem.appendNewClassElem(this.element, 'div', 'app-dialog-container');
    var header = Elem.appendNewClassElem(container, 'div', 'app-dialog-header');
    var h1 = Elem.appendNewElem(header, 'h1');
    if(this.m_options.title.length > 0) {
        h1.innerHTML = this.m_options.title;
    }
    var form = Elem.appendNewElem(container, 'form');
    this.m_content = Elem.appendNewClassElem(form, 'div', 'app-dialog-content');
    this.m_footer = Elem.appendNewClassElem(form, 'div', 'app-dialog-footer');
    this.m_initFooterButtons();

    if(this.m_options.type === 'error'){
        this.m_initMessage(this.m_options.type)
    } else if(this.m_options.type === 'warning'){
        this.m_initMessage(this.m_options.type)
    } else if(this.m_options.type === 'custom'){
        this.m_initCustom();
    }

    this.element.addEventListener('click', function(event){
        if(event.target.className === 'app-dialog'){
            m_this.m_close();
        }
    });
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
birka.dialog.Dialog.prototype.m_initMessage = function(type) {
    var message = "";
    if(this.m_options.message.length > 0) {
        message = Elem.appendNewClassElem(this.m_content, 'p', ('app-' + type + '-dialog'));
        message.innerHTML = this.m_options.message;
    }
};

// Override in child class
birka.dialog.Dialog.prototype.m_initCustom = function() {

};

birka.dialog.Dialog.prototype.m_initFooterButtons = function() {
    var m_this = this;
    this.m_buttons = [];
    for(var i=0; i<1; i++){
        this.m_buttons.push(Elem.appendNewClassElem(this.m_footer, 'input', 'button'));
        this.m_buttons[i].setAttribute('type', 'button');
    }
    this.m_buttons[0].value = 'OK';

    this.m_buttons[0].addEventListener('click', function(event){m_this.m_close(this)});


};


birka.dialog.Dialog.prototype.m_close = function(event) {
    var m_this = this;
    var dialog = document.querySelector('.app-dialog');
    if(dialog){
        dialog.parentNode.removeChild(this.element);
    }
    if(this.m_options.callback)
    if(this.m_options.callback.func){
        this.m_options.callback.func(this.m_parent, this.m_options.callback.param);
    }
};