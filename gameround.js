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
        
        // I keep reading spawned-ge-distance instead of spawn-edge-distance
        this.spawnEdgeDistance = this.options.spawnedgedistance;
        this.playerSpeed = this.options.speed;
        this.playerSize = this.options.radius;
        this.playerRotateSpeed = this.options.rotationspeed;
        this.wrap = this.options.wrapboundaries;
        this.holes = this.options.holes;
        this.holeChance = this.options.holechance;
        this.holeSize = this.options.holesize;
        this.maxHoleDist = this.options.holedistancemax;
        this.minHoleDist = this.options.holedistancemin;
    }
    
    
    makeHead(name){
        
        
        var player = new Head(name, this.lastId++, this, {
            x: this.spawnEdgeDistance + Math.random() * (this.width - 2 * this.spawnEdgeDistance),
            y: this.spawnEdgeDistance + Math.random() * (this.height - 2 * this.spawnEdgeDistance),
            dir: Math.random() * 2 * Math.PI,
            speed: this.playerSpeed,
            size: this.playerSize,
            rotSpeed: this.playerRotateSpeed
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
