const MovingObject = require("./moving_object");

var enemyWeapon1 = new Image();
enemyWeapon1.src = "assets/rounded_laser.png";

const ENEMY_WEAPON_1={
  sizeX: 4,
  sizeY: 8,
  coolDown: 3000,
  damage: 1,
  speed: 400,
  image: enemyWeapon1
};

const ENEMY_WEAPON_2={
  sizeX: 6,
  sizeY: 12,
  coolDown: 3000,
  damage: 2,
  speed: 600,
  image: enemyWeapon1
};

const ENEMY_WEAPON_3={
  sizeX: 8,
  sizeY: 16,
  coolDown: 2500,
  damage: 3,
  speed: 700,
  image: enemyWeapon1
};

const ENEMY_WEAPON_4={
  sizeX: 12,
  sizeY: 12,
  coolDown: 2000,
  damage: 4,
  speed: 800,
  image: enemyWeapon1
};

let ENEMY_WEAPON_ARRAY=[ENEMY_WEAPON_1,ENEMY_WEAPON_2, ENEMY_WEAPON_3, ENEMY_WEAPON_4];

class EnemyShip extends MovingObject {
  constructor(options) {
    options.vel = [Math.random()*25, 100];
    options.edgeBehavior = "destroy";
    options.pos = [Math.random()*800, 0];
    options.type = "enemy";
    super(options);
    this.damage=options.damage;
    this.accel=800;
    this.maxSpeed=150;
    this.selectedWeapon=ENEMY_WEAPON_ARRAY[options.weapon];
    this.guns=[[+12,0]];
    this.currentGun=0;
  }

  fireWeapon(deltaT){
    let wep=this.selectedWeapon;
    if(Math.random()*wep.coolDown<deltaT)
    {
      let sin=Math.sin(this.rot);
      let cos=Math.cos(this.rot);
      let gun=this.guns[this.currentGun];
      this.game.addWeapon({
        rot: this.rot,
        pos: [this.pos[0]+gun[0]*cos,
        this.pos[1]+gun[1]*sin],
        vel: [sin*wep.speed,cos*wep.speed],
        image: wep.image,
        sizeX: wep.sizeX,
        sizeY: wep.sizeY,
        game: this.game,
        shooter: this,
        damage: wep.damage,
        edgeBehavior: "destroy"
      });
    }
  }

  collideWith(otherObject){
    if(otherObject.type==="player"){
      otherObject.hitPoints-=this.damage;
      this.remove();
    }
  }

}

module.exports = EnemyShip;
