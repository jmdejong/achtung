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
        this.points = [...options.controlpoints];
        for (let point of [...this.points]){
            this.points.push({x: -point.x, y: point.y, weight: -point.weight});
        }
    }
    
    control(input, player, game){
        
        var control = 0;
        
        var cosdir = Math.cos(player.dir);
        var sindir = Math.sin(player.dir);
        
        for (let point of this.points){
            var fieldX = player.x+cosdir*point.y + sindir*point.x |0;
            var fieldY = player.y-sindir*point.y + cosdir*point.x |0;
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


class OldAIController {
    
    control(input, player, game){
        var x = player.x;
        var y = player.y;
        var dir = player.dir;
        var map = game.field;
        var cos = Math.cos;
        var sin = Math.sin;
        function ds_grid_get_disk_sum(field, cx, cy, radius){
            var s = 0;
            field.forAnyCircle(cx, cy, radius, function(val, [x, y], field){
                if (val){
                    ++s;
                }
            });
            return s;
        }
        var l, r;
        l=ds_grid_get_disk_sum(map,x+30*cos(dir+0.5),y+30*sin(dir+0.5),20)
            +ds_grid_get_disk_sum(map,x+60*cos(dir+0.32),y+60*sin(dir+0.32),20)/2
            +ds_grid_get_disk_sum(map,x+40*cos(dir+0.5),y+40*sin(dir+0.5),40)/4
            +ds_grid_get_disk_sum(map,x+60*cos(dir+0.5),y+60*sin(dir+0.5),80)/6;
        r=ds_grid_get_disk_sum(map,x+30*cos(dir-0.5),y+30*sin(dir-0.5),20)
            +ds_grid_get_disk_sum(map,x+60*cos(dir-0.32),y+60*sin(dir-0.32),20)/2
            +ds_grid_get_disk_sum(map,x+40*cos(dir-0.5),y+40*sin(dir-0.5),40)/4
            +ds_grid_get_disk_sum(map,x+60*cos(dir-0.5),y+60*sin(dir-0.5),80)/6
        return r - l;
    }
}

const Controllers = {
    none: NoController,
    static: StaticController,
    input: InputController,
    random: RandomController,
    whisker: WhiskerAIController
//     old: OldAIController
};

Controllers[undefined] = Controllers[null] = Controllers[""] = NoController;

