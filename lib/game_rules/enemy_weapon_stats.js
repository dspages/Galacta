var enemyWeapon1 = new Image();
enemyWeapon1.src = "assets/rounded_laser.png";

const ENEMY_WEAPON_1={
  sizeX: 4,
  sizeY: 8,
  coolDown: 3000,
  damage: 1,
  speed: 200,
  image: enemyWeapon1
};

const ENEMY_WEAPON_2={
  sizeX: 6,
  sizeY: 12,
  coolDown: 3000,
  damage: 2,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_3={
  sizeX: 8,
  sizeY: 16,
  coolDown: 2500,
  damage: 3,
  speed: 350,
  image: enemyWeapon1
};

const ENEMY_WEAPON_4={
  sizeX: 12,
  sizeY: 12,
  coolDown: 2000,
  damage: 4,
  speed: 400,
  image: enemyWeapon1
};

const ENEMY_WEAPON_5={
  sizeX: 15,
  sizeY: 20,
  coolDown: 3000,
  damage: 6,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_6={
  sizeX: 12,
  sizeY: 18,
  coolDown: 2000,
  damage: 6,
  speed: 400,
  image: enemyWeapon1
};

const ENEMY_WEAPON_7={
  sizeX: 18,
  sizeY: 35,
  coolDown: 3500,
  damage: 10,
  speed: 300,
  image: enemyWeapon1
};

const ENEMY_WEAPON_8={
  sizeX: 25,
  sizeY: 40,
  coolDown: 4000,
  damage: 12,
  speed: 250,
  image: enemyWeapon1
};

let ENEMY_WEAPON_ARRAY=[ENEMY_WEAPON_1,ENEMY_WEAPON_2, ENEMY_WEAPON_3,
  ENEMY_WEAPON_4, ENEMY_WEAPON_5, ENEMY_WEAPON_6, ENEMY_WEAPON_7, ENEMY_WEAPON_8];


module.exports = ENEMY_WEAPON_ARRAY;
