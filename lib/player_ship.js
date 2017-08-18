const MovingObject = require("./moving_object");

var weapon1 = new Image();
weapon1.src = "assets/little_laser.png";

var weapon2 = new Image();
weapon2.src = "assets/rounded_laser.png";

var weapon3 = new Image();
weapon3.src = "assets/laser_lance.png";

var weapon4 = new Image();
weapon4.src = "assets/glow_laser.png";

var weapon5 = new Image();
weapon5.src = "assets/glow_laser.png";

const WEAPON_1={
  sizeX: 6,
  sizeY: 15,
  coolDown: 1000,
  damage: 10,
  speed: 1000,
  image: weapon1,
  spread: 0,
  name: "MK1 laser",
  passthrough: false
};

const WEAPON_2={
  sizeX: 8,
  sizeY: 10,
  coolDown: 300,
  damage: 5,
  speed: 1200,
  image: weapon4,
  spread: 0,
  name: "Repeater laser",
  ammo: 100,
  passthrough: false
};

const WEAPON_3={
  sizeX: 7,
  sizeY: 16,
  coolDown: 1200,
  damage: 25,
  speed: 800,
  image: weapon2,
  spread: 0,
  name: "Maser cannon",
  ammo: 30,
  passthrough: false
};

const WEAPON_4={
  sizeX: 9,
  sizeY: 15,
  coolDown: 200,
  damage: 10,
  speed: 2000,
  image: weapon4,
  spread: .5,
  name: "Phoenix gun",
  ammo: 150,
  passthrough: false
};

const WEAPON_5={
  sizeX: 15,
  sizeY: 35,
  coolDown: 1200,
  damage: 50,
  speed: 800,
  image: weapon5,
  spread: 0,
  name: "Heavy ion cannon",
  ammo: 25,
  passthrough: false
};

const WEAPON_6={
  sizeX: 50,
  sizeY: 55,
  coolDown: 2000,
  damage: 100,
  speed: 500,
  image: weapon5,
  spread: .1,
  name: "Antimatter Bombs",
  ammo: 25,
  passthrough: false
};

const WEAPON_7={
  sizeX: 10,
  sizeY: 25,
  coolDown: 200,
  damage: 12,
  speed: 1500,
  image: weapon3,
  spread: 0.2,
  name: "Energy Pulse Gun",
  ammo: 250,
  passthrough: false
};

const WEAPON_8={
  sizeX: 20,
  sizeY: 50,
  coolDown: 900,
  damage: 60,
  speed: 1200,
  image: weapon3,
  spread: 0.1,
  name: "Cryohydra Lance",
  ammo: 50,
  passthrough: true
};

const WEAPON_9={
  sizeX: 15,
  sizeY: 35,
  coolDown: 600,
  damage: 50,
  speed: 800,
  image: weapon5,
  spread: 0,
  name: "Repeater Ion",
  ammo: 100,
  passthrough: false
};

const WEAPON_10={
  sizeX: 20,
  sizeY: 30,
  coolDown: 200,
  damage: 40,
  speed: 2500,
  image: weapon3,
  spread: 0.1,
  name: "Zero Cannon",
  ammo: 300,
  passthrough: true
};

const WEAPON_LIST=[
  WEAPON_1,
  WEAPON_2,
  WEAPON_3,
  WEAPON_4,
  WEAPON_5,
  WEAPON_6,
  WEAPON_7,
  WEAPON_8,
  WEAPON_9,
  WEAPON_10
];

class PlayerShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 0];
    options.edgeBehavior = "stop";
    options.pos = [375, 500];
    super(options);
    this.accel=800;
    this.maxSpeed=150;
    this.ammo=[true,0,0,0,0,0,0,0,0,0];
    this.selectedWeapon=WEAPON_1;
    this.guns=[[+12,-15],[-12,-15]];
    this.currentGun=0;
    this.maxHP=options.maxHP;
  }

  addHealth(hp){
    this.hitPoints+=hp;
    if(this.hitPoints>this.maxHP){this.hitPoints=this.maxHP;}
  }

  getAmmoCount(){
    if(this.selectedWeapon===WEAPON_1){return "inf";}
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
