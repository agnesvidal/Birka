function Table() {
    this.wrapper = Elem.appendNewClassElem(birka.system.Main.toolWrapper, 'div', 'fileIndex');
    //var m_table = ...;
    this.tBody = null;

this.init = function(){
    // FileIndex-div
    //var fileindex = Elem.appendNewElem(Main.toolWrapper, 'div', 'fileIndex');
    var h3 = Elem.appendNewElem(this.wrapper,'h3');
    Elem.text(h3, 'Files');

    // Table
    var table =  Elem.appendNewElem(this.wrapper, 'table');

    // Thead
    var thead =  Elem.appendNewElem(table, 'thead');
    var tr = Elem.appendNewElem(thead, 'tr');
    var ths = [];
    for(var i=0; i<5; i++) {
        ths.push(Elem.appendNewElem(tr, 'th'));
    }
    Elem.text(ths[0], 'Include');
    Elem.text(ths[1], 'File path');
    Elem.text(ths[2], 'Name');
    Elem.text(ths[3], 'File size');
    Elem.text(ths[4], '...');

    //Tbody
    this.tBody = Elem.appendNewElem(table, 'tbody');
    };

    this.init();
}