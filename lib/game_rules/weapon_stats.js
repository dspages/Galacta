var weapon1 = new Image();
weapon1.src = "assets/little_laser.png";

var weapon2 = new Image();
weapon2.src = "assets/rounded_laser.png";

var weapon3 = new Image();
weapon3.src = "assets/laser_lance.png";

var weapon4 = new Image();
weapon4.src = "assets/glow_laser.png";

var weapon5 = new Image();
weapon5.src = "assets/glow_laser.png";

const WEAPON_1={
  sizeX: 6,
  sizeY: 15,
  coolDown: 1000,
  damage: 10,
  speed: 1000,
  image: weapon1,
  spread: 0,
  name: "MK1 laser",
  passthrough: false
};

const WEAPON_2={
  sizeX: 8,
  sizeY: 10,
  coolDown: 300,
  damage: 5,
  speed: 1200,
  image: weapon4,
  spread: 0,
  name: "Repeater laser",
  ammo: 100,
  passthrough: false
};

const WEAPON_3={
  sizeX: 7,
  sizeY: 16,
  coolDown: 1200,
  damage: 25,
  speed: 800,
  image: weapon2,
  spread: 0,
  name: "Maser cannon",
  ammo: 30,
  passthrough: false
};

const WEAPON_4={
  sizeX: 9,
  sizeY: 15,
  coolDown: 200,
  damage: 10,
  speed: 2000,
  image: weapon4,
  spread: .5,
  name: "Phoenix gun",
  ammo: 150,
  passthrough: false
};

const WEAPON_5={
  sizeX: 18,
  sizeY: 40,
  coolDown: 1200,
  damage: 50,
  speed: 750,
  image: weapon5,
  spread: 0,
  name: "Heavy ion cannon",
  ammo: 25,
  passthrough: false
};

const WEAPON_6={
  sizeX: 50,
  sizeY: 55,
  coolDown: 2000,
  damage: 100,
  speed: 500,
  image: weapon5,
  spread: .1,
  name: "Antimatter Bombs",
  ammo: 25,
  passthrough: false
};

const WEAPON_7={
  sizeX: 10,
  sizeY: 25,
  coolDown: 200,
  damage: 12,
  speed: 1500,
  image: weapon3,
  spread: 0.2,
  name: "Energy Pulse Gun",
  ammo: 250,
  passthrough: false
};

const WEAPON_8={
  sizeX: 20,
  sizeY: 50,
  coolDown: 900,
  damage: 60,
  speed: 1200,
  image: weapon3,
  spread: 0.1,
  name: "Cryohydra Lance",
  ammo: 50,
  passthrough: true
};

const WEAPON_9={
  sizeX: 15,
  sizeY: 35,
  coolDown: 600,
  damage: 50,
  speed: 800,
  image: weapon5,
  spread: 0,
  name: "Repeater Ion",
  ammo: 100,
  passthrough: false
};

const WEAPON_10={
  sizeX: 20,
  sizeY: 30,
  coolDown: 200,
  damage: 40,
  speed: 1800,
  image: weapon3,
  spread: 0.1,
  name: "Zero Cannon",
  ammo: 300,
  passthrough: true
};

const WEAPON_LIST=[
  WEAPON_1,
  WEAPON_2,
  WEAPON_3,
  WEAPON_4,
  WEAPON_5,
  WEAPON_6,
  WEAPON_7,
  WEAPON_8,
  WEAPON_9,
  WEAPON_10
];

module.exports = WEAPON_LIST;
