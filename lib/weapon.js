
const MovingObject = require("./moving_object");

class Weapon extends MovingObject {
  constructor(options) {
    options.type = "weapon";
    super(options);
    this.shooter=options.shooter;
    this.damage=options.damage;
    this.passthrough=options.passthrough;
  }

  collideWith(otherObject){
    if(otherObject!==this.shooter && otherObject.type!=="scenery" && otherObject.type!=="powerup"){
      otherObject.inflictDamage(this.damage);
      if(otherObject.hitPoints>0 || this.passthrough===false)
      {this.remove();}
    }
  }
}

module.exports = Weapon;
