

// a persistent type of player.
// quite different from the player in the gameround
class Player {
    
    constructor(id, options, templates){
        options = this.loadTemplate(options, templates)
        this.id = id;
        this.name = options.name || "";
        this.controller = new Controllers[options.controltype](options, this.name);
        this.score = 0;
        this.colour = options.colour || options.color || "white";
    }
    
    
    
    loadTemplate(playerOptions, templates){
        if (playerOptions.template){
            return Object.assign(this.loadTemplate(templates[playerOptions.template], templates), playerOptions);
        } else {
            return Object.assign({}, playerOptions);
        }
    }
    
    control(input, game){
        game.controlPlayer(this.id, this.controller.control(input, this.getData(game), game));
    }
    
    
    setController(options){
        this.controller = new Controllers[options.controltype](options, this.id);
    }
    
    getData(gameround){
        var data = {
            name: this.name,
            id: this.id,
            score: this.score,
            colour: this.colour,
            alive: false
        }
        if (gameround && gameround.players.has(this.id)){
            var head = gameround.players.get(this.id);
            data.alive = true;
            data.x = head.x;
            data.y = head.y;
            data.dir = head.dir;
            data.size = head.size;
            data.hole = !head.leaveTrail();
        }
        data.controller = this.controller;
        return data;
    }
}
