const MovingObject = require("./moving_object");

var weapon1 = new Image();
weapon1.src = "assets/little_laser.png";

const WEAPON_1={
  sizeX: 5,
  sizeY: 12,
  coolDown: 1000,
  damage: 10,
  speed: 1000,
  image: weapon1
};

class PlayerShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 0];
    options.edgeBehavior = "stop";
    options.pos = [375, 500];
    super(options);
    this.accel=800;
    this.maxSpeed=150;
    this.selectedWeapon=WEAPON_1;
    this.guns=[[+12,-15],[-12,-15]];
    this.currentGun=0;
  }

  fireWeapon(timeSinceLastFire){
    let numGuns=this.guns.length;
    if(this.selectedWeapon.coolDown/numGuns<timeSinceLastFire){
      let wep=this.selectedWeapon;
      let sin=Math.sin(this.rot);
      let cos=Math.cos(this.rot);
      let gun=this.guns[this.currentGun];
      this.game.addWeapon({
        rot: this.rot,
        pos: [this.pos[0]+gun[0]*cos,
        this.pos[1]+gun[1]*sin],
        vel: [sin*wep.speed,cos*-wep.speed],
        image: wep.image,
        sizeX: wep.sizeX,
        sizeY: wep.sizeY,
        game: this.game,
        shooter: this,
        damage: wep.damage,
        edgeBehavior: "destroy"
      });
      this.currentGun+=1;
      if(this.currentGun>=numGuns){this.currentGun=0;}
      return true;
    }
    return false;
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
