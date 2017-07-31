var weapon1 = new Image();
weapon1.src = "assets/little_laser.png";

const MovingObject = require("./moving_object");

class Weapon extends MovingObject {
  constructor(options) {
    super(options);
  }
}
