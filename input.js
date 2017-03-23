


class InputManager{
    
    
    constructor(){
        this.inputs = new Map();
        
        window.addEventListener("keydown", this.onkeydown.bind(this));
        window.addEventListener("keyup", this.onkeyup.bind(this));
    }
    
    onkeydown(e){
        this.inputs.set("key_"+e.key, true);
    }
    onkeyup(e){
        this.inputs.set("key_"+e.key, false);
    }
    
    isDown(input){
        return this.inputs.has(input) && this.inputs.get(input);
    }
    
    get(input){
        return +this.isDown(input);
    }
}
