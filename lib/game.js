const PlayerShip = require("./player_ship");
const Weapon = require("./weapon");
const EnemyShip = require("./enemy_ship");
const Scenery = require("./scenery");

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
