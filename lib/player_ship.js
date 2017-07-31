const MovingObject = require("./moving_object");



class PlayerShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 0];
    options.pos = [375, 500];
    super(options);
    this.accel=600;
    this.maxSpeed=150;
  }

  propel(move,deltaT){
    this.vel[0]=this.vel[0]+(this.accel*move[0]*deltaT/1000);
    this.vel[1]=this.vel[1]+(this.accel*move[1]*deltaT/1000);
    this.capVel();
    let Exhaust1=this.chidls[0];
    let Exhaust2=this.chidls[1];
    let propMag=(Math.abs(this.vel[0])-(2*this.vel[1]))+300;
    Exhaust1.sizeX=propMag/50; Exhaust2.sizeX=propMag/50;
    Exhaust1.sizeY=propMag/10; Exhaust2.sizeY=propMag/10;
    this.calcRot();
  }

  calcRot(){
    let maxBank=0.5;
    let bank=(this.vel[0]/this.maxSpeed)*maxBank;
    this.rot=bank;
  }

  capVel(){
    if(this.vel[0]>this.maxSpeed){this.vel[0]=this.maxSpeed;}
    if(this.vel[1]>this.maxSpeed){this.vel[1]=this.maxSpeed;}
    if(this.vel[0]<-this.maxSpeed){this.vel[0]=-this.maxSpeed;}
    if(this.vel[1]<-this.maxSpeed){this.vel[1]=-this.maxSpeed;}
  }
}

module.exports = PlayerShip;
