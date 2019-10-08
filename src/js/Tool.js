function Tool(name) {
    this.name = name || "";
}

Tool.prototype.initHeader = function(){
    var m_this = this;
    this.toolHeader = Elem.appendNewClassElem(birka.system.Main.toolWrapper, 'div', 'tool-header');
    var toolName = Elem.appendNewElem(this.toolHeader,'h2');
    Elem.text(toolName, this.name);
};