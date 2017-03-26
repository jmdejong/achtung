
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
        super(x, y, 8, "green", 3);
    }
    
    onPick(player, game){
        player.speed /= 2;
    }
    
    
    undo(player, game){
        player.speed *= 2;
    }
}

class ChangeControls extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "purple", 3);
    }
    
    onPick(player, game){
        game.swapControls = !game.swapControls;
    }
    
    undo(player, game){
        game.swapControls = !game.swapControls;
    }
}

class TIENWASMACHIEN extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "#0f7", 1);
    }
    
    onPick(player, game){
        
        var ids = shuffle([...game.players.keys()]);
        var playersById = new Map();
        for (var i=0; i<ids.length; i++){
            let id = ids[i];
            let player = game.players.get(id);
            let newId = ids[mod(i-1, ids.length)];
            player.name = newId;
            playersById.set(newId, player);
            player.invulnerable++;
            player.speed /= 2;
        }
        game.players = playersById;
    }
    
    undo(player, game){
        for (let player of game.players.values()){
            player.invulnerable--;
            player.speed *= 2;
        }
    }
}

class Invulnerable extends Powerup {
    
    constructor(x, y){
        super(x, y, 8, "orange", 2);
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
