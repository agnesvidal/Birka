birka.compiler.File = function(blob, path) {
    this.blob = blob;
    this.path = path;
    this.status = [];
    this.name = null;
    this.size = "";
    this.init();
};

birka.compiler.File.ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "audio/ogg", "audio/mpeg", "text/xml", "application/json"];


/**
 * @member {number} setStatus
 * @memberof birka.compiler.Footer
 */
Object.defineProperty(birka.compiler.File.prototype, "setStatus", {
    set: function (value) {
        this.status.push(value);
    }
});

Object.defineProperty(birka.compiler.File.prototype, "setName", {
    set: function (value) {
        this.name = value;
    }
});

birka.compiler.File.prototype.init = function(){
    this.name = this.m_getFileName(this.path);
    this.size = this.m_bytesToSize(this.blob.size);
    //this.status = this.m_checkStatus(this.name, this.blob.size, this.blob.type);

};

/**
 * ...
 *
 * @returns {number}
 */
birka.compiler.File.prototype.m_checkStatus = function() {
    //console.log('10MB', this.bytesToSize(10000000));

    if(birka.compiler.File.ALLOWED_FILE_TYPES.indexOf(this.blob.type) < 0){
        this.setStatus = 1;
    }

    if((this.blob.type === "image/png") || (this.blob.type === "image/jpg")){
        if(this.blob.size > 500000){ //@TODO change to: 1100000 /* = 1MB */
            this.setStatus = 10;
        }
    }

    if((this.blob.type === "audio/ogg") || (this.blob.type === "audio/mpeg")){
        if(this.blob.size > 3300000){
            this.setStatus = 11;
        }
    }
};

/**
 * ...
 *
 * @param   {string} path
 * @returns {string}
 */
birka.compiler.File.prototype.m_getFileName = function(path){
    var filename = path.replace(/^.*[\\\/]/, '');
    filename = filename.split('.').slice(0, -1).join('.');
    filename = filename.replace(' ', '_');
    return filename;
};

/**
 * ...
 *
 * @param   {Number} bytes
 * @returns {string}
 */
birka.compiler.File.prototype.m_bytesToSize = function(bytes){
    var sizes = ['B', 'kB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

/**
 *  ...
 *
 * @param   {Number} code
 * @returns {undefined}
 */
birka.compiler.File.prototype.removeError = function(code) {
    for (var i = 0; i < this.status.length; i++) {
        if(this.status[i] === code){
            this.status.splice(i, 1);
        }
    }
};

birka.compiler.File.prototype.isDuplicate = function() {
    var flag = false;
    for(var i = 0; i<this.status.length; i++) {
        if(this.status[i] === 2) {
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
};

birka.compiler.File.prototype.hasWarning = function() {
    for(var i = 0; i<this.status.length; i++) {
        if(this.status[i] >= 10) {
            return true;
        } else {
            return false;
        }
    }
};