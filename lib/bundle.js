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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const PlayerShip = __webpack_require__(4);
const Weapon = __webpack_require__(7);
const EnemyShip = __webpack_require__(8);
const Scenery = __webpack_require__(9);

var stars = new Image();
stars.src = "assets/Stars.png";

var enemy_1 = new Image();
enemy_1.src = "assets/enemy_1.png";

var enemy_2 = new Image();
enemy_2.src = "assets/enemy_2.png";

var enemy_3 = new Image();
enemy_3.src = "assets/enemy_3.png";

var enemy_4 = new Image();
enemy_4.src = "assets/enemy_4.png";

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

  addScenery(options){
    options.pos=[Math.random()*800,0];
    options.game=this;
    options.sizeX=400;
    options.sizeY=400;
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
        console.log("Attempting to create enemy 1");
        this.addEnemy({damage: 2, hitPoints: 20, image: enemy_1, game: this, weapon: 0, sizeX: 35, sizeY: 40});
        }
        break;
    case 2:
        if(Math.random()*4000<deltaT){
        this.addEnemy({damage: 4, hitPoints: 25, image: enemy_2, game: this, weapon: 1, sizeX: 45});
        }
        break;
    case 3:
        if(Math.random()*4000<deltaT){
        this.addEnemy({damage: 6, hitPoints: 35, image: enemy_3, game: this, weapon: 2, sizeX: 40, sizeY: 55});
        }
        break;

    case 4:
        if(Math.random()*4000<deltaT){
        this.addEnemy({damage: 8, hitPoints: 50, image: enemy_4, game: this, weapon: 3, sizeY: 60, sizeX: 55});
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

  draw(canvas){
    canvas.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    canvas.fillStyle = "#010101";
    canvas.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    canvas.drawImage(stars,0,0,Game.DIM_X,Game.DIM_Y);
    for (let  i = 0; i < this.objs.length; i++) {

      canvas.save();
      let obj=this.objs[i];
      canvas.translate(obj.pos[0],obj.pos[1]);
      canvas.rotate(obj.rot);
      canvas.drawImage(obj.image,-obj.sizeX/2,-obj.sizeY/2,obj.sizeX,obj.sizeY);
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

Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.FPS = 32;

module.exports = Game;


/***/ }),
/* 1 */
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
   this.game.draw(this.canvas);
   this.lastTime = time;
   //every call to animate requests causes another call to animate
   requestAnimationFrame(this.animate.bind(this));
   this.totalTime+=deltaT/1000;
   this.nextStageCheck();
   this.canvas.font = "14px Arial";
   this.canvas.fillStyle = "red";
   this.canvas.fillText("LIFE: "+this.player.hitPoints,730,570);
   this.canvas.fillText("STAGE: "+this.game.stage,730,585);
 }
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

GameView.FIRE = "space";

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


const Game = __webpack_require__(0);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const canvas = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, canvas).start();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

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
  }

  move(deltaT){
    let movX = (this.vel[0] * deltaT/1000) + this.pos[0];
    let movY = (this.vel[1] * deltaT/1000) + this.pos[1];
    if(this.edgeBehavior==="stop"){
      movX=Math.max(Math.min(movX,800),0);
      movY=Math.max(Math.min(movY,550),300);
    }
    if(this.edgeBehavior==="destroy"){
      if(movX>800|movX<0){this.remove();}
      if(movY>600|movY<0){this.remove();}
    }
    this.pos = [movX,movY];
  }

  collideWith(otherObject){
  }

  inflictDamage(amt){
    this.hitPoints-=amt;
    if(this.hitPoints<=0){
      this.remove();
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util={

};

module.exports = Util;


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


const MovingObject = __webpack_require__(3);

class Weapon extends MovingObject {
  constructor(options) {
    options.type = "weapon";
    super(options);
    this.shooter=options.shooter;
    this.damage=options.damage;
  }

  collideWith(otherObject){
    if(otherObject!==this.shooter && otherObject.type!=="scenery"){
      this.remove();
      otherObject.inflictDamage(this.damage);
    }
  }
}

module.exports = Weapon;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);

var nebula1 = new Image();
nebula1.src = "assets/Nebula1.png";
var nebula2 = new Image();
nebula2.src = "assets/Nebula2.png";
var nebula3 = new Image();
nebula3.src = "assets/Nebula3.png";

class Scenery extends MovingObject {
  constructor(options) {
    options.type = "scenery";
    super(options);
  }
}

Scenery.Nebula1={vel: [0,2], image: nebula1};
Scenery.Nebula2={vel: [0,3], image: nebula2};
Scenery.Nebula3={vel: [0,4], image: nebula3};

module.exports = Scenery;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map