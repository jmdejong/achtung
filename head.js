"use strict";


class Head {
    
    
    constructor(name, id, colour, game, options){
        this.name = name;
        this.id = id;
        this.colour = colour;
        this.game = game;
        
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.dir = options.dir || 0;
        
        this.speed = options.speed || 1; // moving speed, pixels/second
        this.size = options.size || 1; // radius in pixels
        this.rotSpeed = options.rotSpeed || 1; // rotation speed, radians/second
        
        this.control = 0;
        
        this.tail = [{x: this.x, y: this.y}];
    }
    
    
    setDir(dir){
        this.dir = dir;
    }
    
    
    setSpeed(speed){
        this.speed = speed;
    }
    
    setSize(size){
        this.size = size;
    }
    
    setRotationSpeed(rs){
        this.rotSpeed = rs;
    }
    
    updateDir(timePassed){
        this.dir += ((this.control > 0) - (this.control < 0)) * this.rotSpeed * timePassed;
    }
        
    
    update(timePassed){
        // todo: check the signs
        
        this.updateDir(timePassed);
        
        this.x += Math.cos(this.dir) * this.speed * timePassed;
        this.y -= Math.sin(this.dir) * this.speed * timePassed;
        
        if (!this.game.field.isValid(this.x|0, this.y|0)){
            this.die();
        }
        
        var self = this;
        this.game.field.forAnyCircle(this.x, this.y, this.size, function(val, [x, y], field){
            if (val && val != self.id){
                self.die();
            }
            field.set(x, y, self.id);
        });
        
        // to remember:
        // If there ever is a possibility that the size changes during the gameplay
        // then the size should be stored in the tail
        this.tail.push({x: this.x, y: this.y});
        while(this.tail[0] && Math.hypot(this.x - this.tail[0].x, this.y - this.tail[0].y) > this.size*2 + 1){
            this.game.field.setCircle(this.tail[0].x, this.tail[0].y, this.size, -1);
            this.tail.shift();
        }
    }
    
    die(){
        this.game.removePlayer(this.name);
    }
}
