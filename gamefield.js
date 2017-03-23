"use strict";

// drawing on a hidden canvas might give better performance
// no it doesn't: https://jsperf.com/typedarray-vs-canvas-drawing/1

class GameField {
    
    constructor(width, height){
        
        this.width = width;
        this.height = height;
        
        this.field = new Uint32Array(width*height)
    }
    
    isValid(x, y){
        return x >= 0 && y >=0 && x < this.width && y < this.height && x == (x|0) && y == (y|0);
    }
    
    set(x, y, value){
        this.field[x + y*this.width] = value;
    }
    
    get(x, y, def){
        if (this.isValid(x, y)){
            return this.field[x + y*this.width];
        }
        return def;
    }
    
    // set all cells in the circle to value
    setCircle(x, y, radius, value){
        this.forAnyCircle(x, y, radius, (_val, [x, y], field)=>{
            field.set(x, y, value)
        })
    }
    
    // get the first nonzero value in the circle
    getCircle(x, y, radius){
        var value = 0;
        this.forAnyCircle(x, y, radius, (val)=>{
            if (val){
                value = val;
                return true;
            }
        });
        return value
    }
    
    // execute a callback for all values in a circle, until the callback returns true (or any truthy value)
    forAnyCircle(x, y, radius, callback){
        for (let i=Math.floor(x-radius); i<=Math.ceil(x+radius); i++){
            for (let j=Math.floor(y-radius); j<=Math.ceil(y+radius); j++){
                if (Math.hypot(i-x, j-y) < radius &&
                    this.isValid(i, j) &&
                    callback(
                        this.get(i,j),
                        [i, j],
                        this)
                ){
                    return true;
                }
            }
        }
        return false;
    }
}
