"use strict";

class Achtung {
    
    constructor(){
        
        this.boundUpdate = this.update.bind(this);
        
        this.input = new InputManager();
        
        this.players = new Map();
        
        
        
        
    }
    
    start(options,outputElement){
        this.options = options;
        this.draw = new Draw(outputElement, options.width, options.height);
        for (var id in options.players){
            var player = options.players[id];
            this.players.set(player.name, new Player(player));
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
        for (let player of this.options.players){
            this.gameround.makeHead(player.name, player.colour);
        }
        this.draw.reset();
        
        this.timeToWait = this.options.waitbefore * 1000;
        this.state = "preGameWait";
    }
    
    preGameWait(timepassed){
        for (var name of this.gameround.livingPlayers()){
            this.players.get(name).control(this.input, this.gameround);
        }
        
        this.gameround.halfUpdate(Math.min((timepassed)/1000,this.options.maxtimestep));
        this.draw.draw(this.gameround, true);
        
        this.timeToWait -= timepassed;
        if (this.timeToWait <= 0){
            this.state = "updateGame";
        }
    }
    
    
    startRound(){
        this.lastUpdateTime = Date.now();
        this.updateGame();
    }
    
    updateGame(timepassed){
        
        for (var name of this.gameround.livingPlayers()){
            this.players.get(name).control(this.input, this.gameround);
        }
        
        this.gameround.update(Math.min((timepassed)/1000,this.options.maxtimestep));
        this.draw.draw(this.gameround);
        
        if (this.gameround.players.size < 1) {
            this.state = "postGame";
            this.timeToWait = this.options.waitafter * 1000
        }
    }
    
    postGame(timepassed){
        this.timeToWait -= timepassed;
        this.draw.draw(this.gameround);
        if (this.timeToWait <= 0){
            this.initRound()
        }
    }
    
    
}

