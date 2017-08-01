const MovingObject = require("./moving_object");

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
