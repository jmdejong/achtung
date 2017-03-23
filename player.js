

// a persistent type of player.
// quite different from the player in the gameround
class Player {
    
    constructor(options){
        this.name = options.name;
        this.options = options;
        this.controller = new Controllers[options.controltype](options, this.name);
        this.score = 0;
    }
    
    control(input, game){
        game.controlPlayer(this.name, this.controller.control(input, game));
    }
    
    
    setController(options){
        this.controller = new Controllers[options.controltype](options, this.name);
    }
}
