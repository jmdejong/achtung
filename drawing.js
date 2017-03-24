"use strict";



class Draw {
    
    
    constructor(canvas, width, height){
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
        this.reset();
    }
    
    reset(){
        this.bgcanvas = document.createElement('canvas');
        this.bgcanvas.width = this.width;
        this.bgcanvas.height = this.height;
        this.bgctx = this.bgcanvas.getContext('2d');
    }
    
    
    drawPlayer(player, ctx){
        ctx.fillStyle = player.colour;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, 2*Math.PI)
        ctx.fill()
    }
    
    drawPlayerDirection(player, ctx){
        var length = player.size*3;
        ctx.strokeStyle = player.colour;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y)
        ctx.lineTo(player.x+Math.cos(player.dir)*length, player.y-Math.sin(player.dir)*length);
        ctx.stroke();
    }
    
    draw(gameRound, drawDirections){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.ctx.drawImage(this.bgcanvas, 0, 0);
        for (let player of gameRound.players.values()){
            this.drawPlayer(player, this.ctx);
            this.drawPlayer(player, this.bgctx);
            if (drawDirections){
                this.drawPlayerDirection(player, this.ctx);
            }
        }
    }
}
