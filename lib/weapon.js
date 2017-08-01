
const MovingObject = require("./moving_object");

class Weapon extends MovingObject {
  constructor(options) {
    options.type = "weapon";
    super(options);
    this.shooter=options.shooter;
    this.damage=options.damage;
  }

  collideWith(otherObject){
    if(otherObject!==this.shooter && otherObject.type!=="scenery"){
      this.remove();
      otherObject.inflictDamage(this.damage);
    }
  }
}

module.exports = Weapon;
