var playerShip = new Image();
playerShip.src = "assets/player_ship_1.png";

var exhaust = new Image();
exhaust.src = "assets/exhaust.png";

class GameView {
  constructor(game, canvas) {
    this.canvas = canvas;
    this.game = game;
    this.player = this.game.addPlayer({
      type: "player",
      maxHP: 25,
      hitPoints: 25,
      game: game,
      image: playerShip, chidls: [
      {image: exhaust,
      pos: [47,40],
      sizeX: 0,
      sizeY: 0},
      {image: exhaust,
      pos: [3,40],
      sizeX: 0,
      sizeY: 0}
    ]});
    this.playerWeaponCoolDown=0;//Handles the cooldown for player weapon
  }

  start() {
   this.lastTime = 0;
   this.totalTime = 0;
   requestAnimationFrame(this.animate.bind(this));
  }

  keyUI(deltaT) {
    const player = this.player;
    Object.keys(GameView.MOVES).forEach(
      (k) => {
        if(key.isPressed(k)){
        let move = GameView.MOVES[k];
        player.propel(move,deltaT);
        }
      }
    );
    Object.keys(GameView.WEAPONS).forEach(
      (k) => {
        if(key.isPressed(k)){
        let weapon = GameView.WEAPONS[k];
        player.pickWeapon(weapon);
        }
      }
    );
    this.playerWeaponCoolDown+=deltaT;
    if(key.isPressed(GameView.FIRE)){
      if(player.fireWeapon(this.playerWeaponCoolDown)){
        this.playerWeaponCoolDown=0;
      }
    }
  }

  nextStageCheck(){
    if(this.totalTime>this.game.stage*45-3 && this.totalTime < this.game.stage*45){
      this.canvas.font = "36px Arial";
      this.canvas.fillStyle = "red";
      this.canvas.fillText("STAGE "+(this.game.stage+1),300,300);
    }
    if(this.totalTime>this.game.stage*45){
      this.game.stage+=1;
    }
  }

 animate(time) {
   const deltaT = time - this.lastTime;
   this.keyUI(deltaT);
   this.game.step(deltaT);
   this.game.collisionsCheck();
   this.game.enemyShots(deltaT);
   this.game.executeRemovals();
   this.game.draw(this.canvas);
   this.lastTime = time;
   //every call to animate requests causes another call to animate
   requestAnimationFrame(this.animate.bind(this));
   this.totalTime+=deltaT/1000;
   this.nextStageCheck();
   this.canvas.font = "14px Arial";
   this.canvas.fillStyle = "red";


   this.canvas.fillText("LIFE: "+this.player.hitPoints,730,540);
   this.canvas.fillText("STAGE: "+this.game.stage,715,555);
   this.canvas.fillText("AMMO: "+this.player.getAmmoCount(),700,570);
   this.canvas.fillText("WEAPON: "+this.player.selectedWeapon.name,600,585);
 }
}

GameView.WEAPONS = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "0": 9,
};

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0]
};

GameView.FIRE = "space";

module.exports = GameView;
