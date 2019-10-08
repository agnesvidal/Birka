var fs = require('fs');
var path = require('path');
var app = require('electron').remote;
var dialog = app.dialog;

var inputBtn = null;
var inputField = null;
var filePaths = [];
var coll = null;

function init() {
    var boxes = document.getElementsByClassName("checkbox");
    //var rows = document.getElementById("tbody").querySelectorAll("tr");
    coll = document.getElementsByClassName("hidden");

    inputField = document.getElementsByClassName("filepath")[0];

    inputBtn = document.getElementById("selectInputBtn");
    inputBtn.addEventListener('click', uploadFiles);

    for(var i=0; i<coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.children[this.children.length -1].classList.toggle("coll-active");
            var content = this.nextElementSibling;
            if(content.style.display === "table-row") {
                content.style.display = "none";
            } else {
                content.style.display = "table-row";
            }
        });
    }

    for(i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('change', toggleSelect);
    }
}

function toggleSelect(e){
    var row = e.path[3];
    row.classList.toggle('ignored');
}

function uploadFiles() {
    dialog.showOpenDialog({
        title: "Select a folder",
        properties: ['openDirectory']
    }, function(folderPaths) {
        if(folderPaths === undefined){
            console.log("No destination folder selected");
            return;
    } else {
        console.log(folderPaths);
        inputField.innerHTML = folderPaths[0];
        // Write file path
        traverseDir(folderPaths[0]);
    }
    });
}

function readFile(path) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        console.log(this.response);
        var reader = new FileReader();
        reader.onload = function(event) {
            var res = event.target.result;
            console.log(res)
        };
        var file = this.response;
        console.log(bytesToSize(file.size));
        //reader.readAsDataURL(file)
    };
    xhr.send()
}


function traverseDir(dir) {
    fs.readdirSync(dir).forEach(function(file) {
        var fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
        //console.log(fullPath);
        traverseDir(fullPath);
    } else {
        console.log(fullPath);
        /*
        if(file.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))) {
            // display files
            console.log("hidden");
        }
        */
        if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
            //console.log("not hidden");
            readFile(fullPath);
            filePaths.push(fullPath);

        }

        if(!fullPath.match(/(^|\/)\.[^\/\.]/g)){
            //console.log("not hidden");
            readFile(fullPath);
            filePaths.push(fullPath);

        }
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        filename = filename.split('.').slice(0, -1).join('.');
        filename = filename.replace(' ', '_');
        console.log(filename);

    }
});
    console.log(filePaths);
}


function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


window.addEventListener('load', init);