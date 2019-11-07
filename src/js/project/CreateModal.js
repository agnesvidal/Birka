//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @constructor
 * @param modal
 * @param options
 *
 *
 * @class
 * @classdesc
 */
//@TODO Fix inheritance
birka.project.CreateModal = function() {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    //birka.project.Modal.call(modal, options);

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
 */
birka.project.CreateModal.dialog = require('electron').remote.dialog;

/**
 * Reference to Node.js FileSystem module
 *
 * @type {module:fs}
 * @constant
 * @default
 */
birka.project.CreateModal.fs = require('fs');

/**
 * Reference to Node.js Path module
 *
 * @type {module:path}
 * @constant
 * @default
 */
birka.project.CreateModal.path = require('path');

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
birka.project.CreateModal.prototype = Object.create(birka.project.Modal.prototype);
birka.project.CreateModal.prototype.constructor = birka.project.CreateModal;

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------
// Overrides method
//@TODO Optimize
birka.project.CreateModal.prototype.m_initCustom = function() {
    var m_this = this;
    var div = Elem.appendNewElem(this.m_content,'div');

    var span = Elem.appendNewElem(div,'span');
    Elem.setText(span, "Project name");
    this.inputs = [];

    var projectName = Elem.appendNewClassElem(div,'input','game-name');
    projectName.setAttribute('type', 'text');
    projectName.setAttribute('placeholder', 'Write your project name...');
    projectName.setAttribute('required','');
    projectName.setAttribute('minlength','1');

    this.inputs.push(projectName);

    this.spans = [];
    for(var j=0; j<4; j++){
        this.spans.push(Elem.createClassElem('span','spanerror'));
    }
    //var spanError = Elem.appendNewClassElem(div,'span', 'spanerror');
    div.appendChild(this.spans[0]);

    var fieldsets = [];
    var legends = [];
    for(var i=0; i<2; i++){
        fieldsets.push(Elem.appendNewElem(this.m_content,'fieldset'));
        legends.push(Elem.appendNewElem(fieldsets[i],'legend'));
    }
    legends[0].innerHTML = 'Project location';
    legends[1].innerHTML = 'Configuration settings';

    var locationField = Elem.appendNewClassElem(fieldsets[0],'div','input-field');
    this.locationpath = Elem.appendNewClassElem(locationField,'div','filepath');
    this.browseBtn = Elem.appendNewClassElem(locationField,'input','project-browse');
    this.browseBtn.setAttribute('type','button');

    fieldsets[0].appendChild(this.spans[1]);

    var labels = [];
    for(var i=0; i<2; i++){
        //labels.push(Elem.appendNewElem(fieldsets[1],'label'));
        //configInputs.push(Elem.appendNewElem(fieldsets[1],'input'));
    }
    labels[0] = Elem.appendNewElem(fieldsets[1],'label');
    this.inputs[1] = Elem.appendNewElem(fieldsets[1],'input');
    fieldsets[1].appendChild(this.spans[2]);

    labels[1] = Elem.appendNewElem(fieldsets[1],'label');
    this.inputs[2] = Elem.appendNewElem(fieldsets[1],'input');
    fieldsets[1].appendChild(this.spans[3]);

    labels[0].innerHTML = 'Id';
    this.inputs[1].setAttribute('type', 'number'); //@TODO change later
    this.inputs[1].setAttribute('placeholder', 'E.g. 0');
    this.inputs[1].setAttribute('required','');

    labels[1].innerHTML = 'Title';
    this.inputs[2].setAttribute('type', 'text');
    this.inputs[2].setAttribute('placeholder', 'Title');
    this.inputs[2].setAttribute('required','');

    locationField.addEventListener('click',function(){m_this.m_chooseLocation(this)});

    this.inputs[0].addEventListener("input", function (event) {
        // Each time the user types something, we check if the
        // email field is valid.
        if ( m_this.inputs[0].validity.valid) {
            // In case there is an error message visible, if the field
            // is valid, we remove the error message.
            m_this.spans[0].innerHTML = ""; // Reset the content of the message
            m_this.spans[0].className = "spanerror"; // Reset the visual state of the message
        }
    }, false);

    this.inputs[1].addEventListener("input", function (event) {
        // Each time the user types something, we check if the
        // email field is valid.
        if (m_this.inputs[1].validity.valid) {
            m_this.spans[2].innerHTML = "";
            m_this.spans[2].className = "spanerror";
            event.preventDefault();
        }
    }, false);

    this.inputs[2].addEventListener("input", function (event) {
        // Each time the user types something, we check if the
        // email field is valid.
        if (m_this.inputs[2].validity.valid) {
            m_this.spans[3].innerHTML = "";
            m_this.spans[3].className = "spanerror";
        }
    }, false);
};

//@TODO Optimize
birka.project.CreateModal.prototype.save = function(callback, caller) {
    var m_this = this;


    if (!m_this.inputs[0].validity.valid) {
        m_this.spans[0].innerHTML = "Fill in a project name.";
        m_this.spans[0].className = "spanerror active";
    }
    if (!m_this.inputs[1].validity.valid) {
        m_this.spans[2].innerHTML = "Fill in an id for your project.";
        m_this.spans[2].className = "spanerror active";
    }
    if (!m_this.inputs[2].validity.valid) {
        m_this.spans[3].innerHTML = "Fill in a title for your project.";
        m_this.spans[3].className = "spanerror active";
    }

    if (m_this.locationpath.innerHTML === "") {
        m_this.spans[1].innerHTML = "Please choose a location for your project."; // Reset the content of the message
        m_this.spans[1].className = "spanerror active"; // Reset the visual state of the message
    }

    if(m_this.inputs[0].validity.valid)
        if(m_this.inputs[1].validity.valid)
            if(m_this.inputs[2].validity.valid)
                if(m_this.locationpath.innerHTML !== "") {

                    if(m_this.m_walkDir(m_this.locationpath.innerHTML, m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value) === false){
                        var filename = m_this.locationpath.innerHTML.replace(/^.*[\\\/]/, '');

                        birka.project.CreateModal.dialog.showMessageBox({
                            title: "Warning",
                            type: "warning",
                            message: "A file or folder with this name already exists in the folder " + filename + ". Replacing it will overwrite its current contents.",
                            icon: './src/img/error.png',
                            buttons: ['Overwrite', 'Cancel'],
                            cancelId: 1
                        }, function (response) {
                            if(response === 1) {

                            } else if (response === 0) {

                                var projectObj = {
                                    name: m_this.inputs[0].value,
                                    location: m_this.locationpath.innerHTML,
                                    id: m_this.inputs[1].value,
                                    title: m_this.inputs[2].value
                                };

                                window.sessionStorage.setItem('loaded', 'true');
                                window.sessionStorage.setItem('name', m_this.inputs[0].value);
                                window.sessionStorage.setItem('projectLocation', m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value);
                                window.sessionStorage.setItem('output', m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value + '/src/data');
                                //console.log(projectObj);

                                if(window.localStorage.getItem('recentProjects') !== null) {
                                    var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
                                    console.log(recentP);
                                    var path = m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value;
                                    for (var i = 0; i < recentP.projects.length; i++) {

                                        if (recentP.projects[i].toLowerCase() === path.toLowerCase()) {
                                            recentP.projects.splice(i, 1);
                                        }
                                    }
                                    recentP.projects.unshift(path);

                                    //recentP.projects.unshift(m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value);
                                    if(recentP.projects.length > 5) {
                                        recentP.projects.splice(5);
                                    }
                                    window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
                                } else {
                                    var recentP = {
                                        projects: [m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value]
                                    };
                                    window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
                                    console.log(window.localStorage.getItem('recentProjects'))
                                    //window.localStorage.setItem('', JSON.stringify());
                                }

                                var pd = new birka.Projectdirectory(projectObj);
                                pd.create();

                                m_this.m_close();
                                callback(m_this.m_parent);

                            }
                        });
                    } else {

                        var projectObj = {
                            name: m_this.inputs[0].value,
                            location: m_this.locationpath.innerHTML,
                            id: m_this.inputs[1].value,
                            title: m_this.inputs[2].value
                        };

                        window.sessionStorage.setItem('loaded', 'true');
                        window.sessionStorage.setItem('name', m_this.inputs[0].value);
                        window.sessionStorage.setItem('projectLocation', m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value);
                        window.sessionStorage.setItem('output', m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value + '/src/data');
                        //console.log(projectObj);

                        if(window.localStorage.getItem('recentProjects') !== null) {
                            var recentP = JSON.parse(window.localStorage.getItem('recentProjects'));
                            //console.log(recentP);
                            recentP.projects.unshift(m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value);
                            if(recentP.projects.length > 5) {
                                recentP.projects.splice(5);
                            }
                            window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
                        } else {
                            var recentP = {
                                projects: [m_this.locationpath.innerHTML + "/" + m_this.inputs[0].value]
                            };
                            window.localStorage.setItem('recentProjects', JSON.stringify(recentP));
                            console.log(window.localStorage.getItem('recentProjects'))
                        }

                        var pd = new birka.Projectdirectory(projectObj);
                        pd.create();

                        m_this.m_close();
                        callback(m_this.m_parent);

                    }

                }

};

birka.project.CreateModal.prototype.m_walkDir = function(dir, newPath) {
    var m_this = this;
    var paths = [];
    var replace = true;
    var newPath = newPath.toLowerCase();

    birka.project.CreateModal.fs.readdirSync(dir).forEach(function(file) {
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


birka.project.CreateModal.prototype.m_electronDialog = function(msg, details) {
    birka.project.CreateModal.dialog.showMessageBox({
        title: "Warning",
        type: "warning",
        message: msg,
        icon: './src/img/error.png',
        buttons: ['Replace', 'Cancel'],
        cancelId: 1,
        detail: details
    }, function (response) {
        console.log(response);
        });
};

birka.project.CreateModal.prototype.m_chooseLocation = function(){
    var m_this = this;

    birka.project.CreateModal.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined || folderPaths.length === 0){
            //console.log("No destination folder selected");
            return;
        } else {
            //@TODO

            if(m_this.spans.length > 0){
                m_this.spans[1].innerHTML = "";
                m_this.spans[1].className = "spanerror";
            }

            // m_this.m_loadProject(folderPaths[0]);
            m_this.locationpath.innerHTML = folderPaths[0];

        }
    });

};

// Overrides method
birka.project.CreateModal.prototype.m_initFooterButtons = function() {
    var m_this = this;
    for(var i=0; i<2; i++){
        this.m_buttons.push(Elem.createClassElem('input', 'button'));
        this.m_footer.appendChild(this.m_buttons[i]);
        this.m_buttons[i].setAttribute('type', 'button');
    }
    this.m_buttons[0].value = 'Cancel';
    this.m_buttons[1].value = 'Create';

    //this.m_footer.appendChild(this.buttons[0]);
    //this.m_footer.appendChild(this.buttons[1]);

    this.m_buttons[0].addEventListener('click', function(){m_this.m_close(this)});
    console.log(m_this.m_options.callback);
    this.m_buttons[1].addEventListener('click', function(){m_this.save(m_this.m_options.callback)});

};