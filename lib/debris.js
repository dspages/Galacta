const MovingObject = require("./moving_object");

class Debris extends MovingObject {
  constructor(options) {
    options.type = "debris";
    options.rot=Math.random()*10;
    options.vel=([(Math.random()*150)-75,(Math.random()*150)-75]);
    options.hitPoints=1;
    options.spin=(Math.random()*0.1)-0.05;
    super(options);
  }

}

module.exports = Debris;
