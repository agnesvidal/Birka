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
birka.compiler.Message = function(table){
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    /**
     * ...
     *
     * @type {Element}
     */
    //this.tbody = Elem.appendNewElem(table, 'tbody');
    this.tbody = null;

    this.messages = [];

};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------
/**
 * Creates row in table.
 *
 * @returns {undefined}
 */
birka.compiler.Message.prototype.create = function(table, pos) {
    this.tbody = Elem.createClassElem('tbody', 'app-compiler-resource-messages');

    table.insertBefore(this.tbody, table.children[pos+1]);
};

/**
 *
 * @param status
 */
birka.compiler.Message.prototype.addMessage = function(status) {
    if(status.length > 0){
        for(var i = 0; i<status.length; i++) {
            var msg = new birka.compiler.MessageRow(this.tbody, status[i]);
            msg.setStatus = status[i];
            this.messages.push(msg);
        }
    } else {
        var msg = new birka.compiler.MessageRow(this.tbody, status);
        msg.setStatus = status;
        this.messages.push(msg);
    }
    this.tbody.style.display = "none";
};

/**
 *
 * @param status
 * @param pos
 */
birka.compiler.Message.prototype.addMessageAt = function(status, pos) {
        for(var i = 0; i<status.length; i++) {
            var msg = new birka.compiler.MessageRow(this.tbody, status[i]);
            msg.setStatus = status[i];
            this.messages.push(msg);
        }
    this.tbody.style.display = "none";
};

/**
 *
 * @param status
 * @param pos
 */
birka.compiler.Message.prototype.removeDup = function(status, pos) {
    for(var i = 0; i<this.messages.length; i++) {
        if(this.messages[i].status === 2) {
            this.tbody.removeChild(this.messages[i].element);
            this.messages.splice(i, 1);
        }
    }
};

/**
 *
 * @return {boolean}
 */
birka.compiler.Message.prototype.containsDuplicateErr = function() {
    var flag = false;
    for(var i = 0; i<this.messages.length; i++) {
        if(this.messages[i].status === 2) {
           flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
};