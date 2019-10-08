birka.compiler.TableRow = function(table, obj) {
    this.element = Elem.appendNewElem(table, 'tr');
    if(obj.status === 1){
        this.element.classList.add('error', 'hidden');
    }

    if(obj.status === 2){
        this.element.classList.add('warning', 'hidden');
    }

    this.tds = [];

    for (var i=0; i<5; i++) {
        this.tds.push(Elem.appendNewElem(this.element, 'td'));
    }
    //this.tds[0].innerHTML = "[]";
    this.addCheckbox(this.tds[0]);
    this.inputName(this.tds[2], obj.name);
    /*
    this.tds[1].innerHTML = "asset/textures/texture.png";
    this.tds[2].innerHTML = "texture";
    this.tds[3].innerHTML = "10 kB";
    this.tds[4].innerHTML = "  +";
    */
    this.tds[1].innerHTML = obj.path;
    //this.tds[2].innerHTML = obj.name;
    this.tds[3].innerHTML = obj.size;

    if(obj.status !== 0){
        this.makeCollapsible(this.tds[4]);
        this.message(table, obj.status);
    }


};

birka.compiler.TableRow.prototype.inputName = function(td, name) {
        var input = Elem.appendNewElem(td, 'input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', name);
};



birka.compiler.TableRow.prototype.addCheckbox = function(td) {
    var label = Elem.appendNewClassElem(td, 'label', 'check-container');
    var input = Elem.appendNewClassElem(label, 'input', 'checkbox');
        input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'checked');
    var span = Elem.appendNewClassElem(label, 'span', 'checkmark')

};

birka.compiler.TableRow.prototype.makeCollapsible = function(td) {
    //var coll = Elem.appendNewClassElem(td, 'label', 'coll-cell');
    td.classList.add('coll-cell');
};

birka.compiler.TableRow.prototype.message = function(table, status) {
    //var coll = Elem.appendNewClassElem(td, 'label', 'coll-cell');
    var row = Elem.appendNewClassElem(table, 'tr', 'msg');
    var td = Elem.appendNewElem(row, 'td');
    td.setAttribute('colspan', '5');

    switch(status){
        case 1: row.classList.add('error');
                td.innerHTML = 'Invalid file type.';
                break;
        case 2: row.classList.add('warning');
                td.innerHTML = 'File size exceeds 1MB.';
                break;
    }
};
