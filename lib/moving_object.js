const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos || [0,0];
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
