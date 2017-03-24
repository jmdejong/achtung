"use strict";

class Achtung {
    
    constructor(){
        
        this.boundUpdate = this.update.bind(this);
        
        this.input = new InputManager();
        
        this.players = new Map();
        
        
        
        
    }
    
    getPlayerData(){
        var gameround = this.gameround;
        return [...this.players.values()].map(p=>p.getData(gameround))
    }
    
    start(options,outputElement){
        this.options = options;
        this.draw = new Draw(outputElement, options.width, options.height);
        for (var id in options.players){
            var player = options.players[id];
            this.players.set(id, new Player(id, player));
        }
        this.initRound();
        this.lastUpdate = performance.now();
        this.update(this.lastUpdate);
    }
    
    update(now){
        this[this.state](now - this.lastUpdate);
        this.lastUpdate = now;
        requestAnimationFrame(this.boundUpdate);
    }
    
    initRound(){
        
        this.gameround = new GameRound(this.options);
        for (let player of this.players.values()){
            this.gameround.makeHead(player.id, player.colour);
        }
        this.draw.reset();
        
        this.timeToWait = this.options.waitbefore * 1000;
        this.state = "preGameWait";
    }
    
    control(){
        for (var id of this.gameround.livingPlayers()){
            this.players.get(id).control(this.input, this.gameround);
        }
    }
    
    preGameWait(timepassed){
        
        this.control();
        
        this.gameround.halfUpdate(Math.min((timepassed)/1000,this.options.maxtimestep));
        this.draw.draw(this.getPlayerData(), true);
        
        this.timeToWait -= timepassed;
        if (this.timeToWait <= 0){
            this.state = "updateGame";
        }
    }
    
    updateGame(timepassed){
        
        
        this.control();
        
        this.gameround.update(Math.min((timepassed)/1000,this.options.maxtimestep));
        this.draw.draw(this.getPlayerData());
        
        if (this.gameround.players.size < 1) {
            this.state = "postGame";
            this.timeToWait = this.options.waitafter * 1000
        }
    }
    
    postGame(timepassed){
        this.timeToWait -= timepassed;
        this.draw.draw(this.getPlayerData());
        if (this.timeToWait <= 0){
            this.initRound()
        }
    }
    
    
}

