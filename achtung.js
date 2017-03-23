"use strict";

class Achtung {
    
    constructor(options, outputid){
        this.options = options;
        
        this.draw = new Draw(document.getElementById(outputid), options.width, options.height);
        this.boundUpdate = this.updateGame.bind(this);
        
        this.input = new InputManager();
        
        this.players = new Map();
        for (var player of options.players){
            this.players.set(player.name, new Player(player));
        }
        
        this.waitForStart();
    }
    
    makeRound(){
        
        this.gameround = new GameRound(this.options);
        for (let player of this.options.players){
            this.gameround.makeHead(player.name, player.colour);
        }
        this.draw.reset();
    }
    
    
    waitForStart(){
        this.makeRound();
        this.draw.draw(this.gameround, true);
        setTimeout(this.startRound.bind(this), this.options.waitbefore*1000);
    }
    
    startRound(){
        this.lastUpdateTime = Date.now();
        this.updateGame();
    }
    
    updateGame(){
        var now = Date.now();
        
        for (var name of this.gameround.livingPlayers()){
            this.players.get(name).control(this.input, this.gameround);
        }
        
        this.gameround.update(Math.min((now-this.lastUpdateTime)/1000,this.options.maxtimestep));
        this.draw.draw(this.gameround);
        this.lastUpdateTime = now;
        
        if (this.gameround.players.size < 1) {
            this.postGame();
        } else {
            requestAnimationFrame(this.boundUpdate);
        }
    }
    
    postGame(){
        this.draw.draw(this.gameround);
        setTimeout(this.waitForStart.bind(this), this.options.waitafter*1000);
    }
    
    
}

