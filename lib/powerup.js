const MovingObject = require("./moving_object");

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
