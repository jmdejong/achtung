
const Powerups = (function(){
"use strict";

class Powerup {
    
    constructor(x, y, size, colour, duration){
        this.x = x;
        this.y = y;
        this.size = size;
        this.colour = colour;
        this.timeLeft = duration;
    }
    
    pickUp(player, game){
        this.onPick && this.onPick(player, game);
        
        if (this.timeLeft > 0){
            this.player = player;
            this.game = game;
            game.addUpdateListener(this.update.bind(this), this);
        }
    }
    
    update(timePassed){
        this.timeLeft -= timePassed;
        if (this.timeLeft <= 0){
            this.game.removeUpdateListener(this);
            this.undo && this.undo(this.player, this.game);
        }
    }
}



class Slowdown extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "lime", 3);
    }
    
    onPick(player, game){
        player.speed = game.playerSpeed/2;
    }
    
    
    undo(){
        this.player.speed = this.game.playerSpeed;
    }
}

class ChangeControls extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "magenta", 3);
    }
    
    onPick(player, game){
        game.swapControls = true;
    }
    
    undo(player, game){
        this.game.swapControls = false;
    }
}

class TIENWASMACHIEN extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "cyan", .5);
    }
    
    onPick(player, game){
        var ids = [...game.players.keys()];
        var playersById = new Map();
        for (let player of game.players.values()){
            var place = Math.random()*ids.length | 0;
            let id = ids[place];
            ids.splice(place, 1);
            player.name = id;
            playersById.set(id, player);
            player.invulnerable++;
        }
        game.players = playersById;
    }
    
    undo(player, game){
        for (let player of game.players.values()){
            player.invulnerable--;
        }
    }
}

class Invulnerable extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "orange", 3);
    }
    
    onPick(player, game){
        player.invulnerable++;
    }
    
    undo(player, game){
        player.invulnerable--;
    }
}




var Powerups = {slow: Slowdown, change: ChangeControls, invulnerable: Invulnerable, randomize: TIENWASMACHIEN};
Powerups["10wasmachien"] = Powerups["10wasmachine"] = TIENWASMACHIEN;

return Powerups

})();
