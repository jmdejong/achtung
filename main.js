

// This file should serve as a bridge between the html and the js




function start(){
    var game = new Achtung(JSON.parse(document.getElementById("optionstext").value), "gamecanvas");
}

function main(){
    
    document.getElementById("optionsform").addEventListener("submit", start);
}



window.addEventListener('load', main)
