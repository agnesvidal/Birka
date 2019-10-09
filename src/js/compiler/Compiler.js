birka.compiler.Compiler = function() {
    Tool.call(this, 'Compiler');

    //----------------------------------------------------------------------
    // PUBLIC properties
    //----------------------------------------------------------------------
    var m_this = this;
    /**
     *
     * @type {null}
     */
    this.toolHeader = null;

    this.form = null;

    this.table = null;

    this.footer = null;

    this.files = null;

    /*
    var fs = require('fs');
    var path = require('path');
    var app = require('electron').remote;
    var dialog = app.dialog;
    console.log(dialog);
    */

};

birka.compiler.Compiler.fs = require('fs');
birka.compiler.Compiler.path = require('path');
birka.compiler.Compiler.app = require('electron').remote;
birka.compiler.Compiler.dialog = birka.compiler.Compiler.app.dialog;
console.log(birka.compiler.Compiler.dialog);


// -------------------------------------------------------
// INHERITANCE
// -------------------------------------------------------
birka.compiler.Compiler.prototype = Object.create(Tool.prototype);
birka.compiler.Compiler.prototype.constructor = birka.compiler.Compiler;

//----------------------------------------------------------------------
// PUBLIC methods
//----------------------------------------------------------------------

birka.compiler.Compiler.prototype.init = function(){
    console.log("Compiler init");
    this.m_initUI(this.fooFunc);

    this.app = require('electron').remote;
    this.dialog = this.app.dialog;
    //this.m_foo();
};

birka.compiler.Compiler.prototype.fooFunc = function(){
    console.log('callback');
    console.log(birka.system.Main.toolWrapper);
};


//----------------------------------------------------------------------
// Private methods
//----------------------------------------------------------------------
birka.compiler.Compiler.prototype.m_initUI = function(callback){
    this.initHeader();
    this.form = new Form(this.toolHeader);
    this.table = new Table();
    this.footer = new Footer();
    this.m_addListeners();

    //console.log(this.form.outputBtn);
    //this.footer.setErrors = 3;
    //console.log(this.footer.warnings);

    callback();

};

birka.compiler.Compiler.prototype.m_addListeners = function(){
    this.form.inputBtn.addEventListener('click',this.m_uploadFiles);

};

birka.compiler.Compiler.prototype.m_uploadFiles = function(e){
    //var m_this = this;
    e.preventDefault();
    console.log(e);
    var temp = this.nextElementSibling;
    birka.compiler.Compiler.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined){
            console.log("No destination folder selected");
            return;
        } else {
            console.log(folderPaths);
            temp.innerHTML = folderPaths[0];
            // Write file path
            traverseDir(folderPaths[0]);
        }
    });
};

birka.compiler.Compiler.prototype.m_foo = function(callback) {
    var obj = {};
    obj.status = 2;
    obj.path = "asset/textures/texture.png";
    obj.name = "texture";
    obj.size = "10 kB";

    var rows = [];
    for (var i=0; i<5; i++) {
        rows.push(new birka.compiler.TableRow(this.table.tBody, obj));
    }
    for(var i=0; i<rows.length; i++) {
        if(rows[i].element.classList.contains('hidden')){
            //console.log(rows[i].element);
            rows[i].element.addEventListener('click', function() {
                this.children[this.children.length -1].classList.toggle("coll-active");
                var content = this.nextElementSibling;
                if(content.style.display === "table-row") {
                    content.style.display = "none";
                } else {
                    content.style.display = "table-row";
                }
            });

        }
        /*

    */
    }
};
