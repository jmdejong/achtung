"use strict";


class Head {
    
    
    constructor(name, colour, game, options){
        this.name = name;
        this.colour = colour;
        this.game = game;
        
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.dir = options.dir || 0;
        
        this.speed = options.speed || 1; // moving speed, pixels/second
        this.size = options.size || 1; // radius in pixels
        this.rotSpeed = options.rotSpeed || 1; // rotation speed, radians/second
        
        this.control = 0;
    }
    
    place(x, y){
        this.x = x;
        this.y = y;
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
    
    update(timePassed){
        // todo: check the signs
        
        this.dir += ((this.control > 0) - (this.control < 0)) * this.rotSpeed * timePassed;
        
        var checkX = Math.round(this.x + Math.cos(this.dir) * (this.size + 1))
        var checkY = Math.round(this.y - Math.sin(this.dir) * (this.size + 1))
        if (this.game.field.get(checkX,checkY) || !this.game.field.isValid(checkX, checkY)){
            this.die();
        }
        
        this.x += Math.cos(this.dir) * this.speed * timePassed;
        this.y -= Math.sin(this.dir) * this.speed * timePassed;
        
        this.game.field.setCircle(this.x, this.y, this.size, 0xffffffff)
    }
    
    die(){
        this.game.removePlayer(this.name);
    }
}
