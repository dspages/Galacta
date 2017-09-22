var playerShip = new Image();
playerShip.src = "assets/player_ship_1.png";

var exhaust = new Image();
exhaust.src = "assets/exhaust.png";

let PLAYER_SHIP_1 = {
  type: "player",
  accel: 800,
  maxSpeed: 150,
  guns: [[+12,-15],[-12,-15]],
  maxHP: 25,
  hitPoints: 25,
  image: playerShip, chidls: [
  {image: exhaust,
  pos: [47,40],
  sizeX: 0,
  sizeY: 0},
  {image: exhaust,
  pos: [3,40],
  sizeX: 0,
  sizeY: 0}
]};

const PLAYER_SHIPS = [PLAYER_SHIP_1];

module.exports = PLAYER_SHIPS;
