"use strict";

const InputManager = (function(){

var keyDetectors = ["code", "key", "which", "keyCode", "char", "charCode", "keyIdentifier"];

return class InputManager{
    
    
    constructor(){
        this.inputs = new Map();
        
        window.addEventListener("keydown", this.onkeydown.bind(this));
        window.addEventListener("keyup", this.onkeyup.bind(this));
    }
    
    onkeydown(e){
        this.setKeyValue(e, true);
//         this.inputs.set("key_"+e.key, true);
    }
    onkeyup(e){
        this.setKeyValue(e, false);
//         this.inputs.set("key_"+e.key, false);
    }
    
    setKeyValue(event, value){
        if (event.code){
            this.inputs.set("keyboard_" + event.code, value);
//             console.log("keyboard_" + event.code, value);
        }
//         console.log(value);
        for (var d of keyDetectors){
            if (event[d]){
                this.inputs.set("keyboard_" + d + "_" + event[d], value);
//                 console.log("keyboard_" + d + "_" + event[d])
            }
        }
//         console.log("-------------------------");
    }
    
    isDown(input){
        return this.inputs.has(input) && this.inputs.get(input);
    }
    
    get(input){
        return +this.isDown(input);
    }
}

})();
