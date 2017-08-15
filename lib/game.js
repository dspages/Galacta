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

var enemy_1 = new Image(); enemy_1.src = "assets/enemy_1.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_1_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_1_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_1_fragment_1.png";
var enemy_1_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 8, debrisY: 35, damaged1X: 29, damaged2X: 23};

var enemy_2 = new Image();
enemy_2.src = "assets/enemy_2.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_2_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_2_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_2_fragment_1.png";
var enemy_2_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 50, damaged1X: 43, damaged2X: 36};

var enemy_3 = new Image();
enemy_3.src = "assets/enemy_3.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_3_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_3_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_3_fragment_1.png";
var enemy_3_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 40, damaged1X: 46, damaged2X: 37};

var enemy_4 = new Image();
enemy_4.src = "assets/enemy_4.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_4_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_4_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_4_fragment_1.png";
var enemy_4_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 28, debrisY: 60, damaged1X: 47, damaged2X: 39};

var enemy_5 = new Image();
enemy_5.src = "assets/enemy_5.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_5_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_5_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_5_fragment_1.png";
var enemy_5_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 24, debrisY: 75, damaged1X: 55, damaged2X: 45};

var enemy_6 = new Image();
enemy_6.src = "assets/enemy_6.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_6_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_6_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_6_fragment_1.png";
var enemy_6_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 75, damaged1X: 33, damaged2X: 31};

var enemy_7 = new Image();
enemy_7.src = "assets/enemy_7.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_7_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_7_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_7_fragment_1.png";
var enemy_7_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 30, debrisY: 50, damaged1X: 60, damaged2X: 45};

var enemy_8 = new Image();
enemy_8.src = "assets/enemy_8.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_8_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_8_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_8_fragment_1.png";
var enemy_8_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 75, damaged1X: 46, damaged2X: 42};

var enemy_9 = new Image();
enemy_9.src = "assets/enemy_9.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_9_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_9_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_9_fragment_1.png";
var enemy_9_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 25, damaged1X: 80, damaged2X: 75};

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
    for (let i = 0; i < 4-stage/3; i++) {
      let r=Math.ceil(Math.random()*(max-min));
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
    console.log(options);
    let debris=new Debris(options);
    this.objs.push(debris);
    console.log(debris);
    return debris;
  }

  addEnemy(options){
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
        this.addEnemy({debris: enemy_1_debris, damage: 2, hitPoints: 20, image: enemy_1, game: this, weapon: 0, sizeX: 35, sizeY: 40});
        }
        break;
    case 2:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_2_debris, damage: 4, hitPoints: 25, image: enemy_2, game: this, weapon: 1, sizeX: 45});
        }
        break;
    case 3:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_3_debris, damage: 6, hitPoints: 35, image: enemy_3, game: this, weapon: 2, sizeX: 40, sizeY: 55});
        }
        break;
    case 4:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_4_debris, damage: 8, hitPoints: 50, image: enemy_4, game: this, weapon: 3, sizeY: 60, sizeX: 55});
        }
        break;
    case 5:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_5_debris, damage: 10, hitPoints: 75, image: enemy_5, game: this, weapon: 4, sizeY: 75, sizeX: 65});
        }
        break;
    case 6:
        if(Math.random()*6000<deltaT){
        this.addEnemy({debris: enemy_5_debris, damage: 10, hitPoints: 75, image: enemy_5, game: this, weapon: 4, sizeY: 75, sizeX: 65});
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy({debris: enemy_1_debris, damage: 2, hitPoints: 20, image: enemy_1, game: this, weapon: 0, sizeX: 35, sizeY: 40});
        }
        if(Math.random()*6000<deltaT){
        this.addEnemy({debris: enemy_2_debris, damage: 4, hitPoints: 25, image: enemy_2, game: this, weapon: 1, sizeX: 45});
        }
        break;
    case 7:
        if(Math.random()*3000<deltaT){
        this.addEnemy({debris: enemy_6_debris, damage: 6, hitPoints: 100, image: enemy_6, game: this, weapon: 4, sizeX: 35, sizeY: 80});
        }
        break;
    case 8:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_7_debris, damage: 8, hitPoints: 120, image: enemy_7, game: this, weapon: 5, sizeX: 75});
        }
        break;
    case 9:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_8_debris, damage: 10, hitPoints: 160, image: enemy_8, game: this, weapon: 6, sizeY: 95});
        }
        break;
    case 10:
        if(Math.random()*4000<deltaT){
        this.addEnemy({debris: enemy_9_debris, damage: 12, hitPoints: 225, image: enemy_9, game: this, weapon: 7, sizeX: 85, sizeY: 105});
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
Game.FPS = 32;

module.exports = Game;
