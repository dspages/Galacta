const PlayerShip = require("./player_ship");

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
