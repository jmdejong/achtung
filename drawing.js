"use strict";



class Draw {
    
    
    constructor(canvas, scoreList){
        
        this.canvas = canvas;
        this.scoreList = scoreList;
        this.ctx = canvas.getContext('2d');
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.reset();
    }
    
    reset(){
        this.bgcanvas = document.createElement('canvas');
        this.bgcanvas.width = this.width;
        this.bgcanvas.height = this.height;
        this.bgctx = this.bgcanvas.getContext('2d');
    }
    
    setSize(width, height){
        this.width = this.canvas.width = this.bgcanvas.width = width;
        this.height = this.canvas.height = this.bgcanvas.height = height;
        this.scoreList.style.height = height + "px";
    }
    
    drawPlayer(player, ctx){
        ctx.fillStyle = player.colour;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, 2*Math.PI)
        ctx.fill();
    }
    
    debugPlayer(player, ctx){
        ctx.lineWidth = 2;
        ctx.fillStyle = player.colour;
        ctx.beginPath();
        
        var points = [];
        
        if (player.controller && player.controller.points){
            points = player.controller.points;
        }
        
        for (let point of points){
            var fieldX = player.x+Math.cos(player.dir)*point.y + Math.sin(player.dir)*point.x|0;
            var fieldY = player.y-Math.sin(player.dir)*point.y + Math.cos(player.dir)*point.x|0;
            ctx.moveTo(fieldX, fieldY);
            ctx.arc(fieldX, fieldY, 2, 0, 2*Math.PI);
//             ctx.lineTo(fieldX, fieldY);
        }
        ctx.fill();
    }
    
    drawPlayerDirection(player, ctx){
        var length = player.size*3;
        ctx.lineWidth = 2;
        ctx.strokeStyle = player.colour;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y)
        ctx.lineTo(player.x+Math.cos(player.dir)*length, player.y-Math.sin(player.dir)*length);
        ctx.stroke();
    }
    
    draw(players, gameRound, drawDirections){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.ctx.drawImage(this.bgcanvas, 0, 0);
        
        var powerup = gameRound.powerup;
        if(powerup){
            this.ctx.fillStyle = powerup.colour;
            this.ctx.beginPath();
            this.ctx.arc(powerup.x, powerup.y, powerup.size, 0, 2*Math.PI);
            this.ctx.fill();
        }
        
        players.sort((p1, p2) => (p1.score < p2.score) - (p1.score > p2.score));
        var scores = document.createElement("div");
        
        for (let i=0; i<players.length; i++){
            var player = players[i];
            if (player.alive){
                this.drawPlayer(player, this.ctx);
//                 this.debugPlayer(player, this.ctx);
                if (!player.hole){
                    this.drawPlayer(player, this.bgctx);
                }
                if (drawDirections){
                    this.drawPlayerDirection(player, this.ctx);
                }
            }
            
            var nameNode = document.createElement("div");
            nameNode.appendChild(document.createTextNode(player.name));
            var scoreNode = document.createElement("div");
            scoreNode.appendChild(document.createTextNode(player.score));
            scoreNode.style.fontSize = "48px";
            var node = document.createElement("div");
            node.appendChild(nameNode);
            node.appendChild(scoreNode);
            scores.appendChild(node);
            node.style.color = player.colour;
            
        }
        while (this.scoreList.firstChild){
            this.scoreList.removeChild(this.scoreList.firstChild);
        }
        this.scoreList.appendChild(scores);
    }
}
