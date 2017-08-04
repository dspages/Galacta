# Galacta

# Live site link

[Galactica live][live]

[live]: https://dspages.github.io/Galacta/

## Background

Galacta is a shoot'em'up game based around simple controls and inspired by the classic arcade game Galaga - it is intended to be flashy, easy to learn, and fun. A player can move using the WASD keys and fire using the space bar. Enemies of progressively increasing difficulty will attack, and you must hold them off to survive!

## Features

The player can control a spaceship using WASD keys that control the ship's direction. The ship itself banks and flares its engines in response to the user's movement commands, creating a greater sense of interactivity and control.

![image of ship stationary](docs/images/ScreenShot1)
![image of ship banking](docs/images/ScreenShot2)

When the game begins, enemies begin to spawn and drop bombs on the player, in addition nebulas drift along the screen as decoration. The lower right hand corner gives the player basic information about the status of the ship.

![image of game view](docs/images/ScreenShot3)

As the game progresses, new and more difficult enemies appear, with different appearances, more hit points, and greater damage potential. But the player can shoot them down, resulting in pieces visibly breaking off the enemies that spin off into space with a random vector and rotation. The enemies missing pieces are visibly damaged and can be destroyed with additional shots.

![enemies break into debris](docs/images/ScreenShot4)

Players can pick up hit point and weapon powerups. There are a total of ten different weapons. Better types of weapons can have different appearances, faster rates of fire, larger hitboxes, greater damage potential so enemies are destroyed in fewer hits, or other special effects such as hitting multiple enemies.

![weapons can be upgraded](docs/images/ScreenShot5)

If the player is hit too many times without finding a hit point powerup and runs out of hit points, the ship is removed from play and the player is delivered to a game over screen.

![you lose](docs/images/ScreenShot6)

## Implementation and technology

Galactica was programmed in a week by Daniel Pages using Vanilla JavaScript with an HTML canvas.

## Attributions

Art assets by Skorpio
[link]https://opengameart.org/content/space-ship-construction-kit
