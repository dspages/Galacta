const Util = require("./util");

let ID=0;

class MovingObject {

  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel || [0,0];
    this.sizeX = options.sizeX || 50;
    this.sizeY = options.sizeY || 50;
    this.rot = options.rot || 0;
    this.hitPoints = options.hitPoints || 1;
    this.game = options.game;
    this.image = options.image;
    this.chidls = options.chidls || [];
    this.edgeBehavior = options.edgeBehavior || "destroy";
    this.type = options.type || "none";
  }

  move(deltaT){
    let movX = (this.vel[0] * deltaT/1000) + this.pos[0];
    let movY = (this.vel[1] * deltaT/1000) + this.pos[1];
    if(this.edgeBehavior==="stop"){
      movX=Math.max(Math.min(movX,800),0);
      movY=Math.max(Math.min(movY,550),300);
    }
    if(this.edgeBehavior==="destroy"){
      if(movX>800|movX<0){this.remove();}
      if(movY>600|movY<0){this.remove();}
    }
    this.pos = [movX,movY];
  }

  collideWith(otherObject){
  }

  inflictDamage(amt){
    this.hitPoints-=amt;
    if(this.hitPoints<=0){
      this.remove();
    }
  }

  isCollidedWith(otherObject) {
    const xDist = Math.abs(this.pos[0]-otherObject.pos[0]);
    const yDist = Math.abs(this.pos[1]-otherObject.pos[1]);
    // console.log(xDist);
    // console.log(yDist);
    return (xDist<(this.sizeX/2)+(otherObject.sizeX/2))&&
    (yDist<(this.sizeY/2)+(otherObject.sizeY/2));
  }

  remove() {
    this.game.remove(this);
  }

}

module.exports = MovingObject;
