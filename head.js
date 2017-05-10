"use strict";


class Head {
    
    
    constructor(name, id, game, options){
        this.name = name;
        this.id = id;
        this.game = game;
        
        this.options = options;
        
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.dir = options.dir || 0;
        
        this.speed = options.speed || 1; // moving speed, pixels/second
        this.size = options.size || 1; // radius in pixels
        this.rotSpeed = options.rotSpeed || 1; // rotation speed, radians/second
        
        this.hole = Math.random() * game.maxHoleDist;
        
        this.invulnerable = 0;
        
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
        
        this.updateDir(timePassed);
        
        // to remember:
        // If there ever is a possibility that the size changes during the gameplay
        // then the size should be stored in the tail
        this.tail.push({x: this.x, y: this.y});
        
        this.x += Math.cos(this.dir) * this.speed * timePassed;
        this.y -= Math.sin(this.dir) * this.speed * timePassed;
        
        this.hole -= this.speed * timePassed;
        if (this.hole < -this.game.holeSize){
            this.hole = this.game.minHoleDist + Math.random()*(this.game.maxHoleDist - this.game.minHoleDist);
        }
        
        var self = this;
        this.game.field.forAnyCircle(this.x, this.y, this.size, function(val, [x, y], field){
            if (self.game.wrap){
                x = mod(x, self.game.width);
                y = mod(y, self.game.height);
                val = self.game.field.get(x, y, null);
            };
            if (!self.invulnerable && val && val != self.id || val == null){ // yes, the undefind == null is intentional
                self.die();
                return true;
            }
            if (self.leaveTrail()){
                field.set(x, y, self.id);
				self.game.botField.set(x, y, self.id);
            }
        }, null);
        
        
        if (this.game.wrap){
            this.x = mod(this.x, this.game.width);
            this.y = mod(this.y, this.game.height);
        }
        
        
        while(
            this.tail[0] && 
            distanceWrapped(
                this.x,
                this.y,
                this.tail[0].x,
                this.tail[0].y,
                this.game.width,
                this.game.height
            ) > this.size*2 + 1
             ){
            this.game.field.forAnyCircle(this.tail[0].x, this.tail[0].y, this.size, function(val, [x, y], field){
                if (self.game.wrap){
                    x = mod(x, self.game.width);
                    y = mod(y, self.game.height);
                    val = self.game.field.get(x, y, null);
                };
                if (val == self.id){
                    field.set(x, y, -1);
                }
            }, null);
            this.tail.shift();
        }
        
        for (let powerup of [...this.game.powerups]){
            if (Math.hypot(this.x - powerup.x, this.y - powerup.y) < this.size + powerup.size){
                powerup.pickUp(this, this.game);
                this.game.powerups.delete(powerup);
            }
        }
    }
    
    leaveTrail(){
        return this.hole > 0;
    }
    
    die(){
        this.game.removePlayer(this.name);
        ++this.game.recentDeaths;
    }
}
