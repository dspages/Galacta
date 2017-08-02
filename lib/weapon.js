
const MovingObject = require("./moving_object");

class Weapon extends MovingObject {
  constructor(options) {
    options.type = "weapon";
    super(options);
    this.muzzleFlash=1;
    this.shooter=options.shooter;
    this.damage=options.damage;
    this.passthrough=options.passthrough;
  }

  collideWith(otherObject){
    let type=otherObject.type;
    if(type!==this.shooter.type && type!=="scenery" && type!=="powerup"
  && type!=="debris"){
      otherObject.inflictDamage(this.damage);
      if(otherObject.hitPoints>0 || this.passthrough===false)
      {this.remove();}
    }
  }
}

module.exports = Weapon;
