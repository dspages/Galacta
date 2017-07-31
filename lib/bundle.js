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

class Game {
  constructor() {
    this.bullets = [];
    this.objs = [];
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

  step(deltaT){
    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].move(deltaT);
    }
  }

  draw(canvas){
    canvas.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    canvas.fillStyle = "#010101";
    canvas.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
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
    this.player = this.game.addPlayer({game: game, image: playerShip, chidls: [
      {image: exhaust,
      pos: [47,40],
      sizeX: 0,
      sizeY: 0},
      {image: exhaust,
      pos: [3,40],
      sizeX: 0,
      sizeY: 0}
    ]});
    this.weaponCoolDown=0;
  }

  start() {
   this.lastTime = 0;
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
    this.weaponCoolDown+=deltaT;
    if(key.isPressed(GameView.FIRE)){
      if(player.fireWeapon(this.weaponCoolDown)){
        this.weaponCoolDown=0;
      }
    }
  }

 animate(time) {
   const deltaT = time - this.lastTime;
   this.keyUI(deltaT);
   this.game.step(deltaT);
   this.game.draw(this.canvas);
   this.lastTime = time;

   //every call to animate requests causes another call to animate
   requestAnimationFrame(this.animate.bind(this));
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

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel || [0,0];
    this.sizeX = options.sizeX || 50;
    this.sizeY = options.sizeY || 50;
    this.rot = options.rot || 0;
    this.game = options.game;
    this.image = options.image;
    this.chidls = options.chidls || [];
  }

  move(deltaT){
    let movX = this.vel[0] * deltaT/1000;
    let movY = this.vel[1] * deltaT/1000;
    this.pos = [this.pos[0] + movX, this.pos[1] + movY];
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
  coolDown: 200,
  damage: 10,
  speed: 1000,
  image: weapon1
};

class PlayerShip extends MovingObject {
  constructor(options) {
    options.vel = [0, 0];
    options.pos = [375, 500];
    super(options);
    this.accel=800;
    this.maxSpeed=150;
    this.selectedWeapon=WEAPON_1;
    this.guns=[[+12,-10],[-12,-10]];
    this.currentGun=0;
  }

  fireWeapon(timeSinceLastFire){
    if(this.selectedWeapon.coolDown<timeSinceLastFire){
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
        game: this.game
      });
      this.currentGun+=1;
      if(this.currentGun>=this.guns.length){this.currentGun=0;}
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const MovingObject = __webpack_require__(3);



class Weapon extends MovingObject {
  constructor(options) {
    super(options);
  }
}

module.exports = Weapon;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map