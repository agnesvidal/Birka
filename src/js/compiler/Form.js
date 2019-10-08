function Form(toolHeader) {
    var m_form = Elem.appendNewElem(toolHeader, 'form');
    this.inputBtn = null;
    this.outputBtn = null;

    this.inputPath = null;
    this.outputPath = null;


this.init = function(){
    m_form.method = "post";
    m_form.enctype = "multipart/form-data";
    // Input
    var labels = [];
    var inputFields = [];
    for(var i=0; i<3; i++){ //@TODO 3?
        labels.push(Elem.appendNewElem(m_form, 'label'));
        inputFields.push(Elem.appendNewClassElem(m_form, 'div', 'input-field'));
    }
    labels[0].setAttribute('for', 'selectInputBtn');
    labels[0].innerText = 'Select input folder';
    labels[1].setAttribute('for', 'selectOutputBtn');
    labels[1].innerText = 'Select output file';

    // BrowserBtns
    var inputBtns = [];
    for(i=0; i<2; i++){
        inputBtns.push(Elem.appendNewElem(inputFields[i], 'input'));
        inputBtns[i].setAttribute('type', 'button');
        inputBtns[i].setAttribute('value', 'Browse...')
    }
    inputBtns[0].id = 'selectInputBtn';
    inputBtns[1].id = 'selectOutputBtn';

    this.inputBtn = inputBtns[0];
    this.outputBtn = inputBtns[1];

    // Filepath
    var filepathBoxes = [];
    for(i=0; i<2; i++){
        filepathBoxes.push(Elem.appendNewElem(inputFields[i], 'div'));
        filepathBoxes[i].setAttribute('class', 'filepath');
    }

    this.inputPath = filepathBoxes[0];
    this.outputPath = filepathBoxes[1];

    //console.log(this.inputBtn);
    //console.log(this.outputBtn);

    //console.log(this.inputPath);
    //console.log(this.outputPath);

    };

    this.init();
}