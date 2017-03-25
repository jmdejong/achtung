"use strict";

class Achtung {
    
    constructor(outputElement){
        this.boundUpdate = this.update.bind(this);
        this.input = new InputManager();
        this.draw = new Draw(outputElement, 1, 1);
    }
    
    getPlayerData(){
        var gameround = this.gameround;
        return [...this.players.values()].map(p=>p.getData(gameround))
    }
    
    start(options){
        this.options = options;
        this.draw.setSize(options.width, options.height);
        this.players = new Map();
        for (var id in options.players){
            var player = options.players[id];
            while (player.template){
                let template = options.templates[player.template];
                delete player.template;
                player = Object.assign({}, template, player)
            }
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
            var player = this.players.get(id);
            player.control(this.input, this.gameround);
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

