const PlayerShip = require("./player_ship");
const Weapon = require("./weapon");
const EnemyShip = require("./enemy_ship");
const Scenery = require("./scenery");
const Powerup = require("./powerup");
const Debris = require("./debris");

var powerupLife = new Image();
powerupLife.src = "assets/gear.png";

var powerupWeapon = new Image();
powerupWeapon.src = "assets/gun.png";

var stars = new Image();
stars.src = "assets/Stars.png";

const ENEMIES = require("./game_rules/enemy_stats");

class Game {
  constructor() {
    this.stage=1;
    this.objs = [];
    this.markedForDeath=[];
  }

  addPlayer(options){
    let playerShip=new PlayerShip(options);
    this.objs.push(playerShip);
    return playerShip;
  }

  addWeapon(options){
    let weapon=new Weapon(options);
    this.objs.push(weapon);
    return weapon;
  }

  getMagnitude(stage){
    let max=9;
    let min=1;
    let mag=max;
    for (let i = 0; i < 4-stage/4; i++) {
      let r=Math.floor(Math.random()*(max-min)+1);
      if(r<mag){mag=r;}
    }
    return mag;
  }

  addPowerup(options){
    let pow=Math.ceil(Math.random()*2);
    if(pow===1){options.power="weapon"; options.image=powerupWeapon;}
    if(pow===2){options.power="health"; options.image=powerupLife;}
    options.magnitude=this.getMagnitude(this.stage);
    let powerup=new Powerup(options);
    this.objs.push(powerup);
    return powerup;
  }

  addScenery(options){
    options.game=this;
    let scenery=new Scenery(options);
    this.objs.push(scenery);
  }

  remove(object) {
    this.markedForDeath.push(object);
    if(object.type==="player"){
      this.gameView.began=2;//tell the game view game is over
    }
  }

  executeRemovals(){
    if(this.markedForDeath.length){
      let newObjs=[];
      for (let i = this.objs.length-1; i >= 0; i--) {
        if(!this.markedForDeath.includes(this.objs[i])){
          newObjs.push(this.objs[i]);
        }
      }
      this.objs=newObjs;
      this.markedForDeath=[];
    }
  }

  addDebris(options){
    let debris=new Debris(options);
    this.objs.push(debris);
    return debris;
  }

  addEnemy(options){
    options.game = this;
    let enemy=new EnemyShip(options);
    this.objs.push(enemy);
    return enemy;
  }

  enemyShots(deltaT){
    for (let i = 0; i < this.objs.length; i++) {
      if(this.objs[i].type==="enemy") {this.objs[i].fireWeapon(deltaT);}
    }
  }

  step(deltaT){
    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].move(deltaT);
    }
    switch(this.stage){
      case 1:
        if(Math.random()*5000<deltaT){
        this.addEnemy(ENEMIES[0]);
        }
        break;
    case 2:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[1]);
        }
        break;
    case 3:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[2]);
        }
        break;
    case 4:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[3]);
        }
        break;
    case 5:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[4]);
        }
        break;
    case 6:
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[4]);
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[0]);
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[1]);
        }
        break;
    case 7:
        if(Math.random()*3000<deltaT){
        this.addEnemy(ENEMIES[5]);
        }
        break;
    case 8:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[6]);
        }
        break;
    case 9:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[7]);
        }
        break;
    case 10:
        if(Math.random()*4000<deltaT){
        this.addEnemy(ENEMIES[8]);
        }
        break;
  case 11:
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[8]);
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[6]);
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy(ENEMIES[3]);
        }
      break;
    default: break;
    }
    if(Math.random()*90000<deltaT){
      this.addScenery(Scenery.Nebula1);
    }
    if(Math.random()*90000<deltaT){
      this.addScenery(Scenery.Nebula2);
    }
    if(Math.random()*90000<deltaT){
      this.addScenery(Scenery.Nebula3);
    }
  }

  collisionsCheck(){
    let objs=this.objs;
    for (let i = 0; i < objs.length; i++) {
      for (let j = 0; j < objs.length; j++) {
        if(i!==j&&objs[i].isCollidedWith(objs[j])){
          objs[i].collideWith(objs[j]);
        }
      }
    }
  }

  draw(canvas, sceneryOnly=false){
    if(sceneryOnly){
      canvas.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      canvas.fillStyle = "#010101";
      canvas.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
      canvas.drawImage(stars,0,0,Game.DIM_X,Game.DIM_Y);
    }
    for (let  i = 0; i < this.objs.length; i++) {
      let obj=this.objs[i];
      if((obj.type==="scenery")===sceneryOnly){
        canvas.save();
        canvas.translate(obj.pos[0],obj.pos[1]);
        canvas.rotate(obj.rot);
        let yRender=obj.sizeY;
        let xRender=obj.sizeX;
        if(obj.muzzleFlash){yRender=yRender*2, xRender=xRender*2, obj.muzzleFlash-=1;}
        canvas.drawImage(obj.image,-xRender/2,-yRender/2,xRender,yRender);
        for (let j = 0; j < obj.chidls.length; j++) {
          let chidl=obj.chidls[j];
          canvas.drawImage(chidl.image,
          (-obj.sizeX/2)+chidl.pos[0]-(chidl.sizeX/2),
          (-obj.sizeY/2)+chidl.pos[1],
          chidl.sizeX,chidl.sizeY);
        }
        canvas.restore();
      }
    }
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 600;

module.exports = Game;
