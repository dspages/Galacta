/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(9);

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
    this.rot=this.rot+this.spin;
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
      this.game.addDebris({sizeX: this.debris.damaged2X, sizeY: this.sizeY,
        pos: this.pos, game: this.game, image: this.debris.damaged2});
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const PlayerShip = __webpack_require__(6);
const Weapon = __webpack_require__(10);
const EnemyShip = __webpack_require__(4);
const Scenery = __webpack_require__(8);
const Powerup = __webpack_require__(7);
const Debris = __webpack_require__(3);

var powerupLife = new Image();
powerupLife.src = "assets/blue_circle.png";

var powerupWeapon = new Image();
powerupWeapon.src = "assets/red_circle.png";

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
debrisX: 10, debrisY: 50, damaged1X: 43, damaged2X: 36};

var enemy_3 = new Image();
enemy_3.src = "assets/enemy_3.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_3_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_3_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_3_fragment_1.png";
var enemy_3_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 10, debrisY: 40, damaged1X: 46, damaged2X: 37};

var enemy_4 = new Image();
enemy_4.src = "assets/enemy_4.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_4_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_4_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_4_fragment_1.png";
var enemy_4_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 14, debrisY: 60, damaged1X: 47, damaged2X: 39};

var enemy_5 = new Image();
enemy_5.src = "assets/enemy_5.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_5_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_5_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_5_fragment_1.png";
var enemy_5_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 16, debrisY: 75, damaged1X: 55, damaged2X: 45};

var enemy_6 = new Image();
enemy_6.src = "assets/enemy_6.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_6_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_6_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_6_fragment_1.png";
var enemy_6_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 16, debrisY: 75, damaged1X: 33, damaged2X: 31};

var enemy_7 = new Image();
enemy_7.src = "assets/enemy_7.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_7_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_7_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_7_fragment_1.png";
var enemy_7_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 50, damaged1X: 60, damaged2X: 45};

var enemy_8 = new Image();
enemy_8.src = "assets/enemy_8.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_8_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_8_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_8_fragment_1.png";
var enemy_8_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 20, debrisY: 25, damaged1X: 71, damaged2X: 62};

var enemy_9 = new Image();
enemy_9.src = "assets/enemy_9.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_8_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_8_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_8_fragment_1.png";
var enemy_9_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 20, debrisY: 25, damaged1X: 80, damaged2X: 75};

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var playerShip = new Image();
playerShip.src = "assets/player_ship_1.png";

var exhaust = new Image();
exhaust.src = "assets/exhaust.png";

class GameView {
  constructor(game, canvas) {
    this.canvas = canvas;
    this.game = game;
    this.player = this.game.addPlayer({
      type: "player",
      maxHP: 25,
      hitPoints: 25,
      game: game,
      image: playerShip, chidls: [
      {image: exhaust,
      pos: [47,40],
      sizeX: 0,
      sizeY: 0},
      {image: exhaust,
      pos: [3,40],
      sizeX: 0,
      sizeY: 0}
    ]});
    this.playerWeaponCoolDown=0;//Handles the cooldown for player weapon
  }

  start() {
   this.lastTime = 0;
   this.totalTime = 0;
   requestAnimationFrame(this.animate.bind(this));
  }

  keyUI(deltaT) {
    const player = this.player;
    Object.keys(GameView.MOVES).forEach(
      (k) => {
        if(key.isPressed(k)){
        let move = GameView.MOVES[k];
        player.propel(move,deltaT);
        }
      }
    );
    Object.keys(GameView.WEAPONS).forEach(
      (k) => {
        if(key.isPressed(k)){
        let weapon = GameView.WEAPONS[k];
        player.pickWeapon(weapon);
        }
      }
    );
    this.playerWeaponCoolDown+=deltaT;
    if(key.isPressed(GameView.FIRE)){
      if(player.fireWeapon(this.playerWeaponCoolDown)){
        this.playerWeaponCoolDown=0;
      }
    }
  }

  nextStageCheck(){
    if(this.totalTime>this.game.stage*45-3 && this.totalTime < this.game.stage*45){
      this.canvas.font = "36px Arial";
      this.canvas.fillStyle = "red";
      this.canvas.fillText("STAGE "+(this.game.stage+1),300,300);
    }
    if(this.totalTime>this.game.stage*45){
      this.game.stage+=1;
    }
  }

 animate(time) {
   const deltaT = time - this.lastTime;
   this.keyUI(deltaT);
   this.game.step(deltaT);
   this.game.collisionsCheck();
   this.game.enemyShots(deltaT);
   this.game.executeRemovals();
   this.game.draw(this.canvas, true);//draw scnery first
   this.game.draw(this.canvas, false);
   this.lastTime = time;
   //every call to animate requests causes another call to animate
   requestAnimationFrame(this.animate.bind(this));
   this.totalTime+=deltaT/1000;
   this.nextStageCheck();
   this.canvas.font = "14px Arial";
   this.canvas.fillStyle = "red";


   this.canvas.fillText("LIFE: "+this.player.hitPoints,730,540);
   this.canvas.fillText("STAGE: "+this.game.stage,715,555);
   this.canvas.fillText("AMMO: "+this.player.getAmmoCount(),700,570);
   this.canvas.fillText("WEAPON: "+this.player.selectedWeapon.name,600,585);
 }
}

GameView.WEAPONS = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "0": 9,
};

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0]
};

GameView.FIRE = "space";

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Debris extends MovingObject {
  constructor(options) {
    options.type = "debris";
    options.rot=Math.random()*10;
    options.vel=([Math.random()*10-5,150]);
    options.hitPoints=1;
    options.spin=(Math.random()*0.2)-0.1;
    super(options);
  }

}

module.exports = Debris;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

var enemyWeapon1 = new Image();
enemyWeapon1.src = "assets/rounded_laser.png";

const ENEMY_WEAPON_1={
  sizeX: 4,
  sizeY: 8,
  coolDown: 3000,
  damage: 1,
  speed: 200,
  image: enemyWeapon1
};

const ENEMY_WEAPON_2={
  sizeX: 6,
  sizeY: 12,
  coolDown: 3000,
  damage: 2,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_3={
  sizeX: 8,
  sizeY: 16,
  coolDown: 2500,
  damage: 3,
  speed: 350,
  image: enemyWeapon1
};

const ENEMY_WEAPON_4={
  sizeX: 12,
  sizeY: 12,
  coolDown: 2000,
  damage: 4,
  speed: 400,
  image: enemyWeapon1
};

const ENEMY_WEAPON_5={
  sizeX: 15,
  sizeY: 20,
  coolDown: 3000,
  damage: 6,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_6={
  sizeX: 12,
  sizeY: 18,
  coolDown: 2000,
  damage: 6,
  speed: 400,
  image: enemyWeapon1
};

const ENEMY_WEAPON_7={
  sizeX: 20,
  sizeY: 50,
  coolDown: 3500,
  damage: 10,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_8={
  sizeX: 30,
  sizeY: 70,
  coolDown: 4000,
  damage: 12,
  speed: 250,
  image: enemyWeapon1
};

let ENEMY_WEAPON_ARRAY=[ENEMY_WEAPON_1,ENEMY_WEAPON_2, ENEMY_WEAPON_3,
  ENEMY_WEAPON_4, ENEMY_WEAPON_5, ENEMY_WEAPON_6, ENEMY_WEAPON_7, ENEMY_WEAPON_8];

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
      this.remove();
    }
  }

}

module.exports = EnemyShip;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const canvas = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, canvas).start();
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

var weapon1 = new Image();
weapon1.src = "assets/little_laser.png";

var weapon2 = new Image();
weapon2.src = "assets/rounded_laser.png";

var weapon3 = new Image();
weapon3.src = "assets/laser_lance.png";

const WEAPON_1={
  sizeX: 5,
  sizeY: 12,
  coolDown: 1000,
  damage: 10,
  speed: 1000,
  image: weapon1,
  spread: 0,
  name: "MK1 laser",
  passthrough: false
};

const WEAPON_2={
  sizeX: 4,
  sizeY: 8,
  coolDown: 300,
  damage: 5,
  speed: 1200,
  image: weapon1,
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
  sizeX: 5,
  sizeY: 12,
  coolDown: 200,
  damage: 10,
  speed: 2000,
  image: weapon1,
  spread: .5,
  name: "Phoenix gun",
  ammo: 150,
  passthrough: false
};

const WEAPON_5={
  sizeX: 10,
  sizeY: 25,
  coolDown: 1200,
  damage: 50,
  speed: 800,
  image: weapon2,
  spread: 0,
  name: "Heavy ion cannon",
  ammo: 25,
  passthrough: false
};

const WEAPON_6={
  sizeX: 20,
  sizeY: 50,
  coolDown: 900,
  damage: 60,
  speed: 1200,
  image: weapon3,
  spread: .1,
  name: "Cryohydra Lance",
  ammo: 50,
  passthrough: true
};

const WEAPON_7={
  sizeX: 10,
  sizeY: 25,
  coolDown: 200,
  damage: 12,
  speed: 1500,
  image: weapon3,
  spread: 0,
  name: "Energy Pulse Gun",
  ammo: 250,
  passthrough: false
};

const WEAPON_8={
  sizeX: 50,
  sizeY: 55,
  coolDown: 2000,
  damage: 120,
  speed: 500,
  image: weapon1,
  spread: .1,
  name: "Antimatter Bombs",
  ammo: 25,
  passthrough: false
};

const WEAPON_9={
  sizeX: 15,
  sizeY: 25,
  coolDown: 300,
  damage: 35,
  speed: 800,
  image: weapon2,
  spread: 0,
  name: "Repeater Ion",
  ammo: 100,
  passthrough: false
};

const WEAPON_10={
  sizeX: 20,
  sizeY: 30,
  coolDown: 200,
  damage: 50,
  speed: 2500,
  image: weapon3,
  spread: 0,
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
    console.log(this.maxHP);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Powerup extends MovingObject {
  constructor(options) {
    options.type = "powerup";
    super(options);
    this.power=options.power;
    this.magnitude=options.magnitude;
  }

  collideWith(otherObject){
    if(otherObject.type==="player"){
      this.remove();
      if(this.power==="weapon"){otherObject.addAmmo(this.magnitude);}
      if(this.power==="health"){otherObject.addHealth(this.magnitude);}
      console.log("powerup! power: "+this.magnitude);
    }
  }
}

module.exports = Powerup;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

var nebula1 = new Image();
nebula1.src = "assets/Nebula1.png";
var nebula2 = new Image();
nebula2.src = "assets/Nebula2.png";
var nebula3 = new Image();
nebula3.src = "assets/Nebula3.png";

class Scenery extends MovingObject {
  constructor(options) {
    options.type = "scenery";
    options.pos=[Math.random()*800,0];
    options.sizeX=400;
    options.sizeY=400;
    super(options);
  }
}

Scenery.Nebula1={vel: [0,5], image: nebula1};
Scenery.Nebula2={vel: [0,5], image: nebula2};
Scenery.Nebula3={vel: [0,5], image: nebula3};

module.exports = Scenery;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const Util={

};

module.exports = Util;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


const MovingObject = __webpack_require__(0);

class Weapon extends MovingObject {
  constructor(options) {
    options.type = "weapon";
    super(options);
    this.muzzleFlash=1;
    this.shooter=options.shooter;
    this.damage=options.damage;
    this.passthrough=options.passthrough;
  }

  collideWith(otherObject){
    let type=otherObject.type;
    if(type!==this.shooter.type && type!=="scenery" && type!=="powerup"
  && type!=="debris"){
      otherObject.inflictDamage(this.damage);
      if(otherObject.hitPoints>0 || this.passthrough===false)
      {this.remove();}
    }
  }
}

module.exports = Weapon;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map