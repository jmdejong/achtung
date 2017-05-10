"use strict"


class BotField {
    
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.field = document.createElement("canvas");
        this.field.width = width;
        this.field.height = height;
        this.ctx = this.field.getContext('2d');
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.fillStyle = "#FFFFFF"
    }
    
    drawEdges(size){
        this.ctx.lineWidth = size*2;
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(this.width, 0);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke();
    }
    
    drawCircle(x, y, radius){
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 3*Math.PI);
        this.ctx.fill();
    }
    
    update(players){
        for (var player of players){
            if (!player.hole){
                this.drawCircle(player.x, player.y, player.size*2);
            }
        }
    }
    
    getGameField(){
        var imgData = this.ctx.getImageData(0,0,this.width,this.height)
        return imgData;
//         return new GameField(this.width,this.height, imgData.data.buffer);
    }
}
