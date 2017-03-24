"use strict";


class NoController {
    
    control(input){
        return 0;
    }
}

class StaticController {
    
    constructor(options){
        this.value = options.controlvalue;
    }
    
    control(input){
        return this.value;
    }
}


class RandomController {
    
    
    control(input){
        return Math.random()*2-1;
    }
}


class InputController {
    
    constructor(options){
        this.left = options.leftcontrol;
        this.right = options.rightcontrol;
    }
    
    control(input){
        return input.get(this.left) - input.get(this.right);
    }
}

class WhiskerAIController {
    
    constructor(options){
        this.points = [
            {x: 80, y: 90, weight: .1},
            {x: 30, y: 110, weight: .2},
            {x: 10, y: 120, weight: .3},
            {x: 35, y: 45, weight: .5},
            {x: 20, y: 55, weight: 1},
            {x: 7, y: 58, weight: 2},
//             {x: 4, y: 60, weight: 1},
            {x: 10, y: 35, weight: 4},
            {x: 20, y: 30, weight: 6},
            {x: 5, y: 10, weight: 15}
        ];
        for (let point of [...this.points]){
            this.points.push({x: -point.x, y: point.y, weight: -point.weight});
        }
    }
    
    control(input, player, game){
        
        var control = 0;
        
        for (let point of this.points){
            var fieldX = player.x+Math.cos(player.dir)*point.y + Math.sin(player.dir)*point.x|0;
            var fieldY = player.y-Math.sin(player.dir)*point.y + Math.cos(player.dir)*point.x|0;
            if (game.options.wrapboundaries){
                fieldX = mod(fieldX, game.width);
                fieldY = mod(fieldY, game.height);
            }
            var fieldVal = game.field.get(fieldX, fieldY, -1);
            control += (fieldVal !== 0) * point.weight;
        }
        return control;
    }
}


const Controllers = {
    none: NoController,
    static: StaticController,
    input: InputController,
    random: RandomController,
    whisker: WhiskerAIController
};

Controllers[undefined] = Controllers[null] = Controllers[""] = NoController;

