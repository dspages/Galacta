var playerShip = new Image();
playerShip.src = "assets/player_ship_1.png";

var exhaust = new Image();
exhaust.src = "assets/exhaust.png";

var powerupLife = new Image();
powerupLife.src = "assets/gear.png";

var powerupWeapon = new Image();
powerupWeapon.src = "assets/gun.png";

class GameView {
  constructor(game, canvas) {
    this.canvas = canvas;
    this.game = game;
    game.gameView = this;
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
    key(GameView.PAUSE, () => { this.togglePause() });
  }

  start() {
   this.lastTime = 0;
   this.totalTime = 0;
   requestAnimationFrame(this.animate.bind(this));
  }

  keyUI(deltaT) {
    const player = this.player;
    this.playerWeaponCoolDown+=deltaT;
    if(key.isPressed(GameView.FIRE)){
      if(this.began===1)
      {
        if(player.fireWeapon(this.playerWeaponCoolDown)){
          this.playerWeaponCoolDown=0;
        }
      }else{
        this.began=1;
        return;
      }
    }
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

  togglePause(){
    this.paused ? this.paused=false : this.paused=true;
  }

 animate(time) {
  //  const deltaT = time - this.lastTime;
  let deltaT=20;
  if(this.paused){deltaT=0;}
   this.keyUI(deltaT);
   if(this.began===1)
   {
   this.game.step(deltaT);
   this.game.collisionsCheck();
   this.game.enemyShots(deltaT);
   this.game.executeRemovals();
   this.game.draw(this.canvas, true);//draw scenery first
   this.game.draw(this.canvas, false);
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
  else if((!this.began)||(!this.player)||(this.player.life<=0)){
    this.game.draw(this.canvas, true);//draw scenery first
    this.canvas.font = "24px Arial";
    this.canvas.fillStyle = "red";
    this.canvas.fillText("GALACTA",350,100);
    this.canvas.fillText("Controls:",250,250);
    this.canvas.fillText("Press WASD to move",250,280);
    this.canvas.fillText("Repair powerups look like this: ",250,310);
    this.canvas.drawImage(powerupLife,580,290,25,25);
    this.canvas.fillText("Weapon powerups look like this: ",250,340);
    this.canvas.drawImage(powerupWeapon,600,320,25,25);
    this.canvas.fillText("Hold space bar down to shoot",250,370);
    this.canvas.fillText("Press space bar to begin your journey...",250,400);
    requestAnimationFrame(this.animate.bind(this));
  }else{
    this.game.draw(this.canvas, true);//draw scenery first
    this.canvas.font = "24px Arial";
    this.canvas.fillStyle = "red";
    this.canvas.fillText("GAME OVER",350,100);
    requestAnimationFrame(this.animate.bind(this));
  }
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

GameView.PAUSE = "p";

module.exports = GameView;
