"use strict";

// This file should serve as a bridge between the html and the js



function main(){
    
    var canvas = document.getElementById("gamecanvas");
    var scoreList = document.getElementById("scorelist");
    
    var startButton = document.getElementById("startbutton");
    var stopButton = document.getElementById("stopbutton");
    var optionsForm = document.getElementById("optionsform");
    
    var game = new Achtung(canvas, scoreList);
    
    function start(e){
        e.preventDefault();
        var form = document.getElementById("optionsform");
        blurform(form);
        disableForm(form);
        startButton.hidden = true;
        stopButton.hidden = false;
        var options = JSON.parse(document.getElementById("optionstext").value)
        game.start(options)
    }

    function stop(e){
        disableForm(optionsForm, false);
        startButton.hidden = false;
        stopButton.hidden = true;
        game.stop();
    }
    stop();
    optionsForm.addEventListener("submit", start);
    stopButton.addEventListener("click", stop);
    startButton.focus();

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
