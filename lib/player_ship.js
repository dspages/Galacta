const MovingObject = require("./moving_object");

const WEAPON_LIST = require("./game_rules/weapon_stats.js");

class PlayerShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 0];
    options.edgeBehavior = "stop";
    options.pos = [375, 500];
    super(options);
    this.accel=options.accel;
    this.maxSpeed=options.maxSpeed;
    this.ammo=[true,0,0,0,0,0,0,0,0,0];
    this.selectedWeapon=WEAPON_LIST[0];
    this.guns=options.guns; 
    this.currentGun=0;
    this.maxHP=options.maxHP;
  }

  addHealth(hp){
    this.hitPoints+=hp;
    if(this.hitPoints>this.maxHP){this.hitPoints=this.maxHP;}
  }

  getAmmoCount(){
    if(this.selectedWeapon===WEAPON_LIST[0]){return "inf";}
    return this.ammo[WEAPON_LIST.indexOf(this.selectedWeapon)];
  }

  addAmmo(weapon){
    if(WEAPON_LIST.indexOf(this.selectedWeapon)<weapon){
      this.selectedWeapon=WEAPON_LIST[weapon];
    }
    this.ammo[weapon]+=WEAPON_LIST[weapon].ammo;
  }

  fireWeapon(timeSinceLastFire){
    if(this.hitPoints<=0) {return;}//Can't shoot while dead.
    let numGuns=this.guns.length;
    let weaponIdx=WEAPON_LIST.indexOf(this.selectedWeapon);
    // console.log(weaponIdx);
    if(weaponIdx!==0&&this.ammo[weaponIdx]<1){
      this.selectedWeapon=WEAPON_LIST[weaponIdx-1];
      return;
    }
    if(this.selectedWeapon.coolDown/numGuns<timeSinceLastFire){
      let wep=this.selectedWeapon;
      this.ammo[weaponIdx]-=1;
      let sin=Math.sin(this.rot)+Math.random()*wep.spread-(wep.spread/2);
      let cos=Math.cos(this.rot)+Math.random()*wep.spread-(wep.spread/2);
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
        passthrough: wep.passthrough,
        edgeBehavior: "destroy"
      });
      this.currentGun+=1;
      if(this.currentGun>=numGuns){this.currentGun=0;}
      return true;
    }
    return false;
  }

  pickWeapon(weapon){
    this.selectedWeapon=WEAPON_LIST[weapon];
  }

  propel(move,deltaT){
    this.vel[0]=this.vel[0]+(this.accel*move[0]*deltaT/1000);
    this.vel[1]=this.vel[1]+(this.accel*move[1]*deltaT/1000);
    this.capVel();
    let Exhaust1=this.children[0];
    let Exhaust2=this.children[1];
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
