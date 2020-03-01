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
//@TODO Fix inheritance
birka.project.NewProjectDialog = function() {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    //birka.dialog.Dialog.call(dialog, options);

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    this.m_options = null;

    this.browseBtn = null;

    this.locationpath = null;

    //this.m_footer = null;

    this.spans = [];

    this.m_buttons = [];

    this.paths = []; // Temporary test

    this.inputs = [];

    this.callback = null;

};

//------------------------------------------------------------------------------
// Public Static constants
//------------------------------------------------------------------------------
/**
 * Reference to Electron dialog API
 *
 * @type {Electron.Dialog}
 * @constant
 * @default
 * @suppress {undefinedVars}
 */
birka.project.NewProjectDialog.dialog = require('electron').remote.dialog;

/**
 * Reference to Node.js FileSystem module
 *
 * @type {module:fs}
 * @constant
 * @default
 */
birka.project.NewProjectDialog.fs = require('fs');

/**
 * Reference to Node.js Path module
 *
 * @type {module:path}
 * @constant
 * @default
 */
//birka.project.NewProjectDialog.path = require('path');

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.project.NewProjectDialog.prototype = Object.create(birka.dialog.Dialog.prototype);
birka.project.NewProjectDialog.prototype.constructor = birka.project.NewProjectDialog;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------
/**
 * @member {string} path
 * @memberof birka.project.NewProjectDialog
 */
Object.defineProperty(birka.project.NewProjectDialog.prototype, "path", {
    get: function () {
        return this.locationpath.innerHTML;
    },
    set: function (value) {
        var m_this = this;
        Elem.setText(m_this.locationpath, value);
    }
});

//------------------------------------------------------------------------------
// Override methods
//------------------------------------------------------------------------------
/**
 * ... Overrides method
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initCustom = function() {
    this.callback = this.m_options.callback;
    this.m_initFields();
};

// Overrides method
birka.project.NewProjectDialog.prototype.m_initFooterButtons = function() {
    var m_this = this;
    for(var i=0; i<2; i++){
        this.m_buttons.push(Elem.createClassElem('input', 'button'));
        this.m_footer.appendChild(this.m_buttons[i]);
        this.m_buttons[i].setAttribute('type', 'button');
    }
    this.m_buttons[0].value = 'Cancel';
    this.m_buttons[1].value = 'Create';

    this.m_buttons[0].addEventListener('click', function(){m_this.m_close(this)});
    this.m_buttons[1].addEventListener('click', function(){m_this.m_checkValidFields()});
};

birka.project.NewProjectDialog.prototype.m_close = function(event) {
    var m_this = this;
    var dialog = document.querySelector('.app-dialog');
    if(dialog){
        while (dialog.hasChildNodes()) {
            dialog.removeChild(dialog.firstChild);
        }
        dialog.parentNode.removeChild(this.element);
    }
    this.inputs = [];
    this.paths = [];
    this.spans = [];
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initFields = function() {
    // Fieldsets and Legends
    var fields = [];
    var legends = [];
    for(var i=0; i<3; i++){
        fields.push(Elem.appendNewElem(this.m_content,'fieldset'));
        legends.push(Elem.appendNewElem(fields[i],'legend'));
    }
    Elem.setText(legends[0], 'Project name');
    Elem.setText(legends[1], 'Project location');
    Elem.setText(legends[2], 'Configuration settings');
    this.m_initErrorSpans();

    this.m_initNameField(fields[0]);
    this.m_initLocationField(fields[1]);
    this.m_initConfigField(fields[2]);
    this.m_addListeners();
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initErrorSpans = function() {
    for(var j=0; j<4; j++){
        this.spans.push(Elem.createClassElem('span','spanerror'));
    }
};

/**
 * ...
 *
 * @param field
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initNameField = function(field) {
    var projectName = Elem.appendNewClassElem(field,'input','game-name');
    projectName.setAttribute('type', 'text');
    projectName.setAttribute('placeholder', 'Write your project name...');
    projectName.setAttribute('minlength','1');
    field.appendChild(this.spans[0]);
    this.inputs.push(projectName);
};

/**
 * ...
 *
 * @param field
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initLocationField = function(field) {
    var m_this = this;
    var locationField = Elem.appendNewClassElem(field,'div','app-input-field');
    this.locationpath = Elem.appendNewClassElem(locationField,'p','app-input-filepath');
    this.browseBtn = Elem.appendNewClassElem(locationField,'input','project-browse');
    this.browseBtn.setAttribute('type','button');
    field.appendChild(this.spans[1]);
    locationField.addEventListener('click',function(){m_this.m_chooseLocation(this)});
};

/**
 * ...
 *
 * @param field
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_initConfigField = function(field) {
    var labels = [];
    for(var i=0; i<2; i++){
        labels.push(Elem.appendNewElem(field,'label'));
        this.inputs.push(Elem.appendNewElem(field,'input'));
        this.inputs[i].setAttribute('required','');

    }
    Elem.appendElemAt(field, this.spans[2], 3);
    Elem.appendElemAt(field, this.spans[3], 6);

    Elem.setText(labels[0], 'Id');
    this.inputs[1].setAttribute('type', 'number'); //@TODO change later
    this.inputs[1].setAttribute('placeholder', 'E.g. 0');

    Elem.setText(labels[1], 'Title');
    this.inputs[2].setAttribute('type', 'text');
    this.inputs[2].setAttribute('placeholder', 'Title');
    this.inputs[2].setAttribute('required','');
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_addListeners = function() {
    var m_this = this;

    this.inputs[0].addEventListener("input", function (event) {
        m_this.m_checkValidTextInput(m_this.inputs[0],  m_this.spans[0]);
        m_this.m_compareInputs(m_this.inputs[0], m_this.inputs[2]);
    }, false);

    this.inputs[0].addEventListener("focusout", function (event) {
       if(m_this.inputs[0].value === "") {
           m_this.m_checkValidTextInput(m_this.inputs[0], m_this.spans[0]);
       }
    }, false);

    this.inputs[1].addEventListener("input", function (event) {
        if (m_this.inputs[1].validity.valid) {
            event.preventDefault();
            m_this.spans[2].innerHTML = "";
            m_this.spans[2].className = "spanerror";
        } else {
            m_this.spans[2].innerHTML = "Fill in an id for your project.";
            m_this.spans[2].className = "spanerror active";
        }
    }, false);

    this.inputs[1].addEventListener("focusout", function (event) {
        if(!m_this.inputs[1].validity.valid) {
            m_this.spans[2].innerHTML = "Fill in an id for your project.";
            m_this.spans[2].className = "spanerror active";
        }
    }, false);

    this.inputs[2].addEventListener("input", function (event) {
         m_this.m_checkValidTextInput(m_this.inputs[2],  m_this.spans[3]);
         m_this.m_compareInputs(m_this.inputs[2], m_this.inputs[0]);
    }, false);

    this.inputs[2].addEventListener("focusout", function (event) {
       if(m_this.inputs[2].value === "") {
           m_this.m_checkValidTextInput(m_this.inputs[2], m_this.spans[3]);
       }
    }, false);
};

birka.project.NewProjectDialog.prototype.m_checkValidTextInput = function(textInput, span) {
    if (textInput.value === "") {
         span.innerHTML = "Fill in field.";
         span.className = "spanerror active";
         textInput.setCustomValidity("Invalid field");
    }

     var regex = /^[a-zåäöA-ZÅÄÖ0-9]+$/;
     if (textInput.value !== "" && !regex.test(textInput.value)) {
         span.innerHTML = "Name should only contain characters: A-Ö, 0-9";
         span.className = "spanerror active";
         textInput.setCustomValidity("Invalid field.");
     }

     if (textInput.value !== "" && regex.test(textInput.value)) {
         span.innerHTML = "";
         span.className = "spanerror";
         textInput.setCustomValidity("");
     }
};

birka.project.NewProjectDialog.prototype.m_compareInputs = function(thisField, thatField) {
    var m_this = this;
    if(thisField.value !== "" &&  thatField.value !== "") {
        if (thisField.value === thatField.value) {
            m_this.inputs[0].setCustomValidity("Invalid field.");
            m_this.spans[0].innerHTML = "Project name and title must not be the same.";
            m_this.spans[0].className = "spanerror active";

            m_this.inputs[2].setCustomValidity("Invalid field.");
            m_this.spans[3].innerHTML = "Project name and title must not be the same.";
            m_this.spans[3].className = "spanerror active";
        } else {
            m_this.m_checkValidTextInput(m_this.inputs[2],  m_this.spans[3]);
            m_this.m_checkValidTextInput(m_this.inputs[0],  m_this.spans[0]);
        }
    }
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_checkValidFields = function() {
    var m_this = this;

    m_this.m_checkValidTextInput(m_this.inputs[0],  m_this.spans[0]);
    m_this.m_checkValidTextInput(m_this.inputs[2],  m_this.spans[3]);

    if (!m_this.inputs[1].validity.valid) {                                               
        m_this.spans[2].innerHTML = "Fill in an id for your project.";                    
        m_this.spans[2].className = "spanerror active";                                   
    }                                                                                     

    if (m_this.path === "") {
        m_this.spans[1].innerHTML = "Please choose a location for your project.";
        m_this.spans[1].className = "spanerror active";
    }


    if(m_this.inputs[0].validity.valid)
        if(m_this.inputs[1].validity.valid)
            if(m_this.inputs[2].validity.valid)
                if(m_this.path !== "") {
                    this.m_checkIfFolderExists();
                }
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_checkIfFolderExists = function() {
    var m_this = this;
        if(m_this.m_walkDir(m_this.path, m_this.path + "/" + m_this.inputs[0].value) === false){
            var filename = m_this.path.replace(/^.*[\\\/]/, '');
            birka.project.NewProjectDialog.dialog.showMessageBox({
                title: "Warning",
                type: "warning",
                message: "A file or folder with this name already exists in the folder " + filename + ". Replacing it will overwrite its current contents.",
                icon: './src/img/error.png',
                buttons: ['Overwrite', 'Cancel'],
                cancelId: 1
            }, function (response) {
                if(response === 1) {
                    // Do nothing.
                } else if (response === 0) {
                    m_this.m_saveRecent(true);
                    m_this.m_save();
                }
            });
        } else {
            m_this.m_saveRecent(false);
            m_this.m_save();
        }
};

/**
 * ...
 *
 * @param overwrite
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_saveRecent = function(overwrite) {
    var m_this = this;
    if(window.localStorage.getItem('recentProjects') !== null) {
        this.m_saveRecentUnshift(overwrite);
    } else {
        var recentP = {
            projects: [m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value]
        };
        window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
    }
};

/**
 * ...
 *
 * @param overwrite
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_saveRecentUnshift = function(overwrite) {
    var m_this = this;
    var recent = JSON.parse(window.localStorage.getItem('recentProjects'));
    if (overwrite === false) {
        recent.projects.unshift(m_this.path + "/" + m_this.inputs[0].value);
        if(recent.projects.length > 5) {
            recent.projects.splice(5);
        }
    } else {
        var path = m_this.path + "/" + m_this.inputs[0].value;
        for (var i = 0; i < recent.projects.length; i++) {
            if (recent.projects[i].toLowerCase() === path.toLowerCase()) {
                recent.projects.splice(i, 1);
            }
        }
        recent.projects.unshift(path);

        //recentP.projects.unshift(m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value);
        if(recent.projects.length > 5) {
            recent.projects.splice(5);
        }
    }
    window.localStorage.setItem('recentProjects', JSON.stringify(recent));
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_save = function() {
    var m_this = this;

    var projectObj = {
        name: m_this.inputs[0].value,
        location: m_this.path,
        id: m_this.inputs[1].value,
        title: m_this.inputs[2].value
    };

    window.sessionStorage.setItem('loaded', 'true');
    window.sessionStorage.setItem('name', projectObj.name);
    window.sessionStorage.setItem('projectLocation', projectObj.location + "/" + projectObj.name);
    window.sessionStorage.setItem('output', projectObj.location + "/" + projectObj.name + '/src/data');

    var pd = new birka.project.Projectdirectory(projectObj);
    pd.create();

    m_this.m_close();
    this.callback(m_this.m_parent);
};

/**
 * ...
 *
 * @param dir
 * @param newPath
 * @returns {boolean}
 */
birka.project.NewProjectDialog.prototype.m_walkDir = function(dir, newPath) {
    var m_this = this;
    var paths = [];
    var replace = true;
    var newPath = newPath.toLowerCase();

    birka.project.NewProjectDialog.fs.readdirSync(dir).forEach(function(file) {
        var fullPath = birka.project.ProjectManager.path.join(dir, file);
            if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
                paths.push(fullPath);
        }
    });

    for(var i=0; i<paths.length; i++) {
        if(paths[i].toLowerCase() === newPath){
            replace = false;
        }
    }

    return replace;
};

/**
 * ...
 *
 * @returns undefined
 */
birka.project.NewProjectDialog.prototype.m_chooseLocation = function(){
    var m_this = this;

    birka.project.NewProjectDialog.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
             if (m_this.path === "") {
                 m_this.spans[1].innerHTML = "Please choose a location for your project.";
                 m_this.spans[1].className = "spanerror active";
             }
            return;
        } else {
            //@TODO
            if(m_this.spans.length > 0){
                m_this.spans[1].innerHTML = "";
                m_this.spans[1].className = "spanerror";
            }
            m_this.locationpath.innerHTML = folderPaths[0];
        }
    });
};