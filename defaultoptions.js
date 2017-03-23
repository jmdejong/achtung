

const DEFAULT_OPTIONS = {
    width: 800,
    height: 600,
    speed: 100,
    radius: 3,
    rotationspeed: 3,
    waitbefore: 3,
    waitafter: 3,
    maxtimestep: 0.0333,
    wrapboundaries: false,
    
    players:[
        {
            name: "player",
            colour: "blue",
            controltype: "input",
            leftcontrol: "key_ArrowLeft",
            rightcontrol: "key_ArrowRight"
        },
        {
            name: "Gronald1",
            colour: "red"/*,
            controltype: "static",
            controlvalue: 1*/
        },
        {
            name: "Gronald2",
            colour: "green",
            controltype: "random",
            controlvalue: 1
        }
    ]
}

deepFreeze(DEFAULT_OPTIONS);
