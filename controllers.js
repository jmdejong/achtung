"use strict";


class NoController {
    
    control(input, game){
        return 0;
    }
}

class StaticController {
    
    constructor(options, playername){
        this.value = options.controlvalue;
    }
    
    control(input, game){
        return this.value;
    }
}


class RandomController {
    
    
    control(input, game){
        return Math.random()*2-1;
    }
}


class InputController {
    
    constructor(options, playername){
        this.playername = playername || options.name;
        this.left = options.leftcontrol;
        this.right = options.rightcontrol;
    }
    
    control(input, game){
        return input.get(this.left) - input.get(this.right);
    }
}


const Controllers = {none: NoController, static: StaticController, input: InputController, random: RandomController};
Controllers[undefined] = Controllers[null] = Controllers[""] = NoController;

