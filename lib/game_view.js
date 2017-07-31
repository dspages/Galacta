var playerShip = new Image();
playerShip.src = "assets/player_ship_1.png";

var exhaust = new Image();
exhaust.src = "assets/exhaust.png";

class GameView {
  constructor(game, canvas) {
    this.canvas = canvas;
    this.game = game;
    this.player = this.game.addPlayer({game: game, image: playerShip, chidls: [
      {image: exhaust,
      pos: [47,40],
      sizeX: 0,
      sizeY: 0},
      {image: exhaust,
      pos: [3,40],
      sizeX: 0,
      sizeY: 0}
    ]});
  }

  start() {
   this.lastTime = 0;
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
  }

 animate(time) {
   const deltaT = time - this.lastTime;
   this.keyUI(deltaT);
   this.game.step(deltaT);
   this.game.draw(this.canvas);
   this.lastTime = time;

   //every call to animate requests causes another call to animate
   requestAnimationFrame(this.animate.bind(this));
 }
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

module.exports = GameView;
