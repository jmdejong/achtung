

// This file should serve as a bridge between the html and the js

var game;


function start(e){
    e.preventDefault();
//     document.body.focus();
    var form = document.getElementById("optionsform")
    blurform(form);
    disableForm(form);
    var options = JSON.parse(document.getElementById("optionstext").value)
    game.start(options)
}

function main(){
    var canvas = document.getElementById("gamecanvas");
    game = new Achtung(canvas);
    disableForm(document.getElementById("optionsform"), false);
    document.getElementById("optionsform").addEventListener("submit", start);
    document.getElementById("startbutton").focus();
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
