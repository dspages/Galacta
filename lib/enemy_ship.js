const MovingObject = require("./moving_object");

const ENEMY_WEAPON_ARRAY = require("./game_rules/enemy_weapon_stats");

class EnemyShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 100];
    options.edgeBehavior = "destroy";
    options.pos = [Math.random()*800, 0];
    options.type = "enemy";
    super(options);
    this.damage=options.damage;
    // this.accel=800;
    // this.maxSpeed=150;
    this.selectedWeapon=ENEMY_WEAPON_ARRAY[options.weapon];
    this.guns=[[0,+5]];
    this.currentGun=0;
    this.stopHeight = (Math.random()*300)+50;
    this.dir = Math.floor(Math.random()*2);
  }

  behave(){
    if(this.pos[1]>this.stopHeight){
      if(this.pos[0]<10+this.sizeX/2){this.dir=1;}
      if(this.pos[0]>790-this.sizeX/2){this.dir=0;}
      if(this.dir===1){this.vel=[100,0];}
      if(this.dir===0){this.vel=[-100,0];}
    }
  }

  move(deltaT){
    this.behave();
    super.move(deltaT);
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
      this.inflictDamage(this.hitPoints);
    }
  }

}

module.exports = EnemyShip;
