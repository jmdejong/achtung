const DEFAULT_OPTIONS = `
{
    "width": 800,
    "height": 600,
    "spawnedgedistance": 40,
    "speed": 100,
    "radius": 2,
    "rotationspeed": 3,
    "waitbefore": 3,
    "waitafter": 3,
    "maxtimestep": 0.0333,
    "wrapboundaries": false,
    "holes": true,
    "holechance": 0.2,
    "holesize": 20,
    "holedistancemax": 200,
    "holedistancemin": 800,
    "powerups": ["change", "slow", "invulnerable", "10wasmachine"],
    "powerupchance": 0.2,
    "maxpowerups": 3,
    
    "templates":{
        "randombot":{
            "controltype":"random",
            "colour": "white"
        },
        "pointsbot":{
            "name": "gronald",
            "controltype": "whisker",
            "colour": "white",
            "controlpoints": [
                {"x": 80, "y": 90, "weight": 0.1},
                {"x": 30, "y": 110, "weight": 0.2},
                {"x": 10, "y": 120, "weight": 0.3},
                {"x": 35, "y": 45, "weight": 0.5},
                {"x": 20, "y": 55, "weight": 1},
                {"x": 7, "y": 58, "weight": 2},
                {"x": 10, "y": 35, "weight": 4},
                {"x": 20, "y": 30, "weight": 6},
                {"x": 5, "y": 10, "weight": 50}
            ]
        }
    },
    
    "players":[
        {
            "name": "player1",
            "colour": "blue",
            "controltype": "input",
            "leftcontrol": "keyboard_ArrowLeft",
            "rightcontrol": "keyboard_ArrowRight"
        },
        {
            "name": "player2",
            "colour": "red",
            "controltype": "input",
            "leftcontrol": "keyboard_KeyA",
            "rightcontrol": "keyboard_KeyD"
        },
        {
            "colour": "lime",
            "template": "pointsbot"
        },
        {
            "template": "pointsbot",
            "colour": "yellow"
        },
        {
            "template": "pointsbot",
            "colour": "cyan"
        },
        {
            "template": "pointsbot",
            "colour": "magenta"
        }
    ],
    
    "others": {
        "pointsbot": 1
    }
}`;
