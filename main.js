

// This file should serve as a bridge between the html and the js

var game;


function start(e){
    e.preventDefault();
    var canvas = document.getElementById("gamecanvas");
//     document.body.focus();
    var form = document.getElementById("optionsform")
    blurform(form);
    disableForm(form);
    var options = JSON.parse(document.getElementById("optionstext").value)
    game.start(options, canvas)
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

function blurform(form){
    for (var element of form){
        element.blur();
    }
}

window.addEventListener('load', main)