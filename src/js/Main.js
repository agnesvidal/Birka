var inputElem;


function init() {
    var boxes = document.getElementsByClassName("checkbox");
    var rows = document.getElementById("tbody").querySelectorAll("tr");

    inputElem = document.getElementById("fileInput");
    inputElem.addEventListener('change', handleFiles);

    //console.log(rows);
    //console.log(boxes);

    for(var i=0; i<boxes.length; i++) {
        if(boxes[i].checked === true) {
            //console.log(boxes[i]);
            //console.log(rows[i]);
        }
    }

    for(i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('change', toggleSelect);

    }
}

function handleFiles(e){
    console.log(e);
    console.log(this.files);

}

function toggleSelect(e){
    var row = e.path[3];
    row.classList.toggle('ignored');
    /*
    if(row.classList.contains("ignored")){
        row.classList.remove('ignored')
    } else {
        row.classList.add('ignored');
    }
    */
}

window.addEventListener('load', init);