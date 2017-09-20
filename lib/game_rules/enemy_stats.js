var enemy_1 = new Image(); enemy_1.src = "assets/enemy_1.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_1_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_1_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_1_fragment_1.png";
var enemy_1_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 8, debrisY: 35, damaged1X: 29, damaged2X: 23};

var enemy_2 = new Image();
enemy_2.src = "assets/enemy_2.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_2_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_2_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_2_fragment_1.png";
var enemy_2_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 50, damaged1X: 42, damaged2X: 39};

var enemy_3 = new Image();
enemy_3.src = "assets/enemy_3.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_3_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_3_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_3_fragment_1.png";
var enemy_3_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 25, debrisY: 40, damaged1X: 46, damaged2X: 37};

var enemy_4 = new Image();
enemy_4.src = "assets/enemy_4.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_4_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_4_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_4_fragment_1.png";
var enemy_4_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 35, debrisY: 60, damaged1X: 47, damaged2X: 39};

var enemy_5 = new Image();
enemy_5.src = "assets/enemy_5.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_5_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_5_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_5_fragment_1.png";
var enemy_5_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 40, debrisY: 75, damaged1X: 55, damaged2X: 45};

var enemy_6 = new Image();
enemy_6.src = "assets/enemy_6.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_6_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_6_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_6_fragment_1.png";
var enemy_6_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 40, debrisY: 75, damaged1X: 33, damaged2X: 31};

var enemy_7 = new Image();
enemy_7.src = "assets/enemy_7.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_7_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_7_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_7_fragment_1.png";
var enemy_7_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 60, debrisY: 50, damaged1X: 60, damaged2X: 45};

var enemy_8 = new Image();
enemy_8.src = "assets/enemy_8.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_8_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_8_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_8_fragment_1.png";
var enemy_8_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 50, debrisY: 75, damaged1X: 46, damaged2X: 42};

var enemy_9 = new Image();
enemy_9.src = "assets/enemy_9.png";
var damaged2 = new Image(); damaged2.src = "assets/debris/enemy_9_fragment_3.png";
var damaged1 = new Image(); damaged1.src = "assets/debris/enemy_9_fragment_2.png";
var dropPiece = new Image(); dropPiece.src = "assets/debris/enemy_9_fragment_1.png";
var enemy_9_debris = {damaged2: damaged2, damaged1: damaged1, dropPiece: dropPiece,
debrisX: 50, debrisY: 25, damaged1X: 80, damaged2X: 75};

let ENEMY_0 = {debris: enemy_1_debris, damage: 2, hitPoints: 20, image: enemy_1, weapon: 0, sizeX: 35, sizeY: 40};
let ENEMY_1 = {debris: enemy_2_debris, damage: 4, hitPoints: 25, image: enemy_2, weapon: 1, sizeX: 45};
let ENEMY_2 = {debris: enemy_3_debris, damage: 6, hitPoints: 35, image: enemy_3, weapon: 2, sizeX: 40, sizeY: 55};
let ENEMY_3 = {debris: enemy_4_debris, damage: 8, hitPoints: 50, image: enemy_4, weapon: 3, sizeY: 60, sizeX: 55};
let ENEMY_4 = {debris: enemy_5_debris, damage: 10, hitPoints: 75, image: enemy_5, weapon: 4, sizeY: 75, sizeX: 65};
let ENEMY_5 = {debris: enemy_6_debris, damage: 12, hitPoints: 100, image: enemy_6, weapon: 4, sizeX: 35, sizeY: 80};
let ENEMY_6 = {debris: enemy_7_debris, damage: 16, hitPoints: 120, image: enemy_7, weapon: 5, sizeX: 75};
let ENEMY_7 = {debris: enemy_8_debris, damage: 20, hitPoints: 160, image: enemy_8, weapon: 6, sizeY: 95};
let ENEMY_8 = {debris: enemy_9_debris, damage: 24, hitPoints: 225, image: enemy_9, weapon: 7, sizeX: 85, sizeY: 105};

let ENEMIES = [ ENEMY_0,
                ENEMY_1,
                ENEMY_2,
                ENEMY_3,
                ENEMY_4,
                ENEMY_5,
                ENEMY_6,
                ENEMY_7,
                ENEMY_8];



module.exports = ENEMIES;
