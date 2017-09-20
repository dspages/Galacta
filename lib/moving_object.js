
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
    this.debris = options.debris;
    this.spin=options.spin || 0;
  }

  move(deltaT){
    let movX = (this.vel[0] * deltaT/1000) + this.pos[0];
    let movY = (this.vel[1] * deltaT/1000) + this.pos[1];
    if(this.edgeBehavior==="stop"){
      movX=Math.max(Math.min(movX,750),50);
      movY=Math.max(Math.min(movY,550),300);
    }
    if(this.edgeBehavior==="destroy"){
      if(movX>800|movX<0){this.remove();}
      if(movY>600|movY<0){this.remove();}
    }
    this.pos = [movX,movY];
    this.rot = this.rot + this.spin * deltaT/1000;
  }

  collideWith(otherObject){
  }

  dropPiece(){
    this.game.addDebris({game: this.game, image: this.debris.dropPiece, pos: this.pos,
    sizeX: this.debris.debrisX, sizeY: this.debris.debrisY});
  }

  releaseDebris(death){
    if((this.alreadyDamaged===1)&&(!death)){
      this.dropPiece();
      this.image=this.debris.damaged2;
      this.sizeX=this.debris.damaged2X;
      this.alreadyDamaged=2;
    }
    if((!this.alreadyDamaged)&&(!death)){
      this.dropPiece();
      this.sizeX=this.debris.damaged1X;
      this.image=this.debris.damaged1;
      this.alreadyDamaged=1;
    }
    if((!this.alreadyDamaged)&&death){
      this.dropPiece();
      this.dropPiece();
    }
    if((this.alreadyDamaged===1)&&death){
      this.dropPiece();
    }
    if(death){
      // this.game.addDebris({sizeX: this.debris.damaged2X, sizeY: this.sizeY,
      //   pos: this.pos, game: this.game, image: this.debris.damaged2});
      this.dropPiece();
    }
  }

  inflictDamage(amt){
    this.hitPoints-=amt;
    if(this.hitPoints<=0){
      if(this.type==="enemy"){
        if(this.debris){
          this.releaseDebris(true);
        }
        if(Math.random()<(1/3)){
          this.game.addPowerup({game: this.game, pos: this.pos, vel: [0, 100], sizeX: 25, sizeY: 25});
        }
      }
      this.remove();
    }else if(this.debris){
      this.releaseDebris(false);
      this.dir = Math.floor(Math.random()*2);
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
