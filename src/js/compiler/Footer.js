function Footer() {
    var m_this = this;
    this.element = Elem.appendNewClassElem(birka.system.Main.toolWrapper, 'div', 'footer');
    var errors = "";
    var warnings = "";
    this.compileBtn = null;

    Object.defineProperty(this, "setWarnings", {
        set: function (value) {
            m_this.warnings.innerHTML = value;
        }
    });

    Object.defineProperty(this, "setErrors", {
        set: function (value) {
            m_this.errors.innerHTML = value;
        }
    });


this.init = function(){
    //var footer = Elem.appendNewElem(Main.toolWrapper, 'div', 'footer');

    // Errors/Warnings
    var msg = Elem.appendNewClassElem(this.element, 'div', 'msg');

    var msgError = Elem.appendNewClassElem(msg, 'div', 'msg-error');
    m_this.errors = msgError.appendChild(Elem.p('0'));
    msgError.appendChild(Elem.p(' error(s) '));

    var msgWarning = Elem.appendNewClassElem(msg, 'div', 'msg-warning');
    m_this.warnings = msgWarning.appendChild(Elem.p('0'));
    msgWarning.appendChild(Elem.p(' warning(s)'));


    // CompileBtn
    this.compileBtn = Elem.appendNewElem(this.element, 'input');
    this.compileBtn.setAttribute('type', 'submit');
    this.compileBtn.setAttribute('value', 'Compile');
    this.compileBtn.setAttribute('id','compileBtn');

    };

    this.init();
}