


class Powerup {
    
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 8;
        this.colour = "red";
        this.timeLeft = 2;
    }
    
    pickUp(player, game){
        player.speed = game.playerSpeed/2;
        this.player = player;
        this.game = game;
        game.addUpdateListener(this.update.bind(this), this);
//         console.log("picket up by player "+player.name);
    }
    
    update(timePassed){
        this.timeLeft -= timePassed;
        if (this.timeLeft <= 0){
            this.game.removeUpdateListener(this);
            this.undo();
        }
    }
    
    undo(){
        this.player.speed = this.game.playerSpeed;
    }
}
