# Galacta

# Live site link

[Galacta live][live]

[live]: https://dspages.github.io/Galacta/

## Background

Galacta is a shoot'em'up game based around simple controls and inspired by the classic arcade game Galaga - it is intended to be flashy, easy to learn, and fun. A player can move using the WASD keys and fire using the space bar. Enemies of progressively increasing difficulty will attack, and you must hold them off to survive!

## Features

The player can control a spaceship using WASD keys that control the ship's direction. The ship itself banks and flares its engines in response to the user's movement commands, creating a greater sense of interactivity and control.

![image of ship stationary](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot1.png)
![image of ship banking](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot2.png)

When the game begins, enemies begin to spawn and drop bombs on the player, in addition nebulas drift along the screen as decoration. The lower right hand corner gives the player basic information about the status of the ship.

![image of game view](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot3.png)

As the game progresses, new and more difficult enemies appear, with different appearances, more hit points, and greater damage potential. But the player can shoot them down, resulting in pieces visibly breaking off the enemies that spin off into space with a random vector and rotation. The enemies missing pieces are visibly damaged and can be destroyed with additional shots.

![enemies break into debris](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot4.png)

Players can pick up hit point and weapon powerups. There are a total of ten different weapons. Better types of weapons can have different appearances, faster rates of fire, larger hitboxes, greater damage potential so enemies are destroyed in fewer hits, or other special effects such as hitting multiple enemies.

![weapons can be upgraded](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot5.png)

If the player is hit too many times without finding a hit point powerup and runs out of hit points, the ship is removed from play and the player is delivered to a game over screen.

![you lose](https://github.com/dspages/Galacta/blob/master/docs/images/ScreenShot6.png)

Other minor features include the ability to pause the game with the "p" key, and an intro screen that informs the user of the game rules.

## Code snippet

The MovingObject parent class encompasses several types of children: PlayerShip, Weapon, Powerup, Scenery, and Debris are all subclasses of MovingObject. This class inheritance pattern allows me to place general logic related to movement inside the MovingObject class, such as movement, acceleration, rotation, angular velocity, collision detection, damage infliction, destruction, and edge detection.

```Javascript
move(deltaT){
  let movX = (this.vel[0] * deltaT/1000) + this.pos[0];
  let movY = (this.vel[1] * deltaT/1000) + this.pos[1];
  if(this.edgeBehavior==="stop"){
    movX = Math.max(Math.min(movX, 750), 50);
    movY = Math.max(Math.min(movY, 550), 300);
  }
  if(this.edgeBehavior==="destroy"){
    if(movX>800|movX<0) {this.remove();}
    if(movY>600|movY<0) {this.remove();}
  }
  this.pos = [movX,movY];
  this.rot = this.rot + (this.angVel * deltaT/1000);
}
```

A hierarchical design is likewise used to allow each of the ten types of weapon to have common behaviors, while modifying each of the specific attributes of a given weapon including speed, hitbox size, damage, and fire rate.

## Implementation and technology

Galactica was programmed in a week by Daniel Pages using Vanilla JavaScript with an HTML canvas. Webpack was used to aid in bundling and serving the finished product.

## Attributions

Art assets by Skorpio

[artist link](https://opengameart.org/content/space-ship-construction-kit)
