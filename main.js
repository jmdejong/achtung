

// This file should serve as a bridge between the html and the js

var game;


function start(e){
    e.preventDefault();
    var canvas = document.getElementById("gamecanvas");
//     document.body.focus();
    disableForm(document.getElementById("optionsform"));
    game.start(JSON.parse(document.getElementById("optionstext").value), canvas)
}

function main(){
    game = new Achtung();
    disableForm(document.getElementById("optionsform"), false);
    document.getElementById("optionsform").addEventListener("submit", start);
}

function disableForm(form, value=true){
    for (var element of form){
        element.disabled = value;
    }
}

window.addEventListener('load', main)
