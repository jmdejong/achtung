"use strict";


class GameRound{
    
    
    constructor(options){
        this.options = options
        this.field = new GameField(options.width, options.height);
        this.players = new Map();
        
        this.width = options.width;
        this.height = options.height;
        this.recentDeaths = 0;
        this.lastId = 1;
    }
    
    
    makeHead(name, colour){
        
        
        var player = new Head(name, this.lastId++, colour, this, {
            x: this.options.spawnedgedistance + Math.random() * (this.width - 2 * this.options.spawnedgedistance),
            y: this.options.spawnedgedistance + Math.random() * (this.height - 2 * this.options.spawnedgedistance),
            dir: Math.random() * 2 * Math.PI,
            speed: this.options.speed,
            size: this.options.radius,
            rotSpeed: this.options.rotationspeed
        });
        this.players.set(name, player);
        
    }
    
    controlPlayer(name, control){
        this.players.get(name).control = control;
    }
    
    removePlayer(name){
        this.players.delete(name);
    }
    
    halfUpdate(timePassed){
        for (let player of this.players.values()){
            player.updateDir(timePassed)
        }
    }
    
    update(timePassed){
        this.recentDeaths = 0;
        for (let player of this.players.values()){
            player.update(timePassed)
        }
    }
    
    isInGame(playername){
        return this.players.has(playername)
    }
    
    livingPlayers(){
        return new Set(this.players.keys());
    }
}
