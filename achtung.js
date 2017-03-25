"use strict";

class Achtung {
    
    constructor(outputElement, scoreList){
        this.boundUpdate = this.update.bind(this);
        this.input = new InputManager();
        this.draw = new Draw(outputElement, scoreList);
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
            this.players.set(id, new Player(id, options.players[id], options.templates));
        }
        this.nextId = options.players.length;
        for (var template in options.others){
            var num = this.options.others[template];
            for (var i=0; i<num; i++){
                var id = this.nextId++;
                this.players.set(id, new Player(id, options.templates[template], options.templates));
            }
        }
        this.continue = true;
        this.initRound();
        this.lastUpdate = performance.now();
        this.update(this.lastUpdate);
    }
    
    stop(){
        this.continue = false;
    }
    
    update(now){
        this[this.state](now - this.lastUpdate);
        this.lastUpdate = now;
        if (this.continue){
            requestAnimationFrame(this.boundUpdate);
        }
    }
    
    initRound(){
        
        this.gameround = new GameRound(this.options);
        for (let player of this.players.values()){
            this.gameround.makeHead(player.id);
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
        this.draw.draw(this.getPlayerData(), this.gameround, true);
        
        this.timeToWait -= timepassed;
        if (this.timeToWait <= 0){
            this.state = "updateGame";
        }
    }
    
    updateGame(timepassed){
        
        
        this.control();
        
        this.gameround.update(Math.min((timepassed)/1000,this.options.maxtimestep));
        if (this.gameround.recentDeaths){
            for (var id of this.gameround.livingPlayers()){
                this.players.get(id).score++;
            }
        }
        this.draw.draw(this.getPlayerData(), this.gameround);
        
        if (this.gameround.players.size <= 1) {
            this.state = "postGame";
            this.timeToWait = this.options.waitafter * 1000
        }
    }
    
    postGame(timepassed){
        this.timeToWait -= timepassed;
        this.draw.draw(this.getPlayerData(), this.gameround);
        if (this.timeToWait <= 0){
            this.initRound()
        }
    }
    
    
}

