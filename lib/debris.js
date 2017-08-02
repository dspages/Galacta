const MovingObject = require("./moving_object");

class Debris extends MovingObject {
  constructor(options) {
    options.type = "debris";
    options.rot=Math.random()*10;
    options.vel=([Math.random()*10-5,150]);
    options.hitPoints=1;
    super(options);
  }

}

module.exports = Debris;
