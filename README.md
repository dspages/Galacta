# Galactica

## Background

Galactica is a shoot'em'up game based around simple controls - it is intended to be flashy, easy to learn, and fun. A player can move using the WASD keys and fire using the space bar. Enemies of progressively increasing difficulty will attack, and you must hold them off to survive!

## Functionality and MVP

Users should be able to...

-Move a ship around in space on a canvas

-Fire a weapon at enemies

-Damage and destroy enemies with weapon hits

-Enemies should shoot back and damage the player

-Enemies should grow more difficult over time

In addition, the project will include a Production README.

## Wireframes

The app will consist of a single screen with a canvas. Buttons to reset, pause, and mute the game should also exist.

## Architecture and technologies

The game will be made in vanilla JS using canvas. Webpack will be used to bundle and serve the actual content. Subclasses should be used for different parts of the game to support a modular, object-oriented design.

## Implementation timeline

-Weekend prior: set up game structure with a moving player ship

Day 1: Implement ship shooting and put in the framework for destructible enemies.

Day 2: Enemy AI and behavior, they should shoot at the player and cause the player to lose if too many hits are taken. Also the player should take damage if rammed.

Day 3: Polish the UI and include status indicators for player's health and other information. Multiple levels with more diverse types of enemies.

Day 4: Polish, bugfixes, possible bonus features.

## Bonus features

There are numerous bonus features possible with this game. Anticipated features include:

-Sometimes enemies will drop powerups on defeat, giving the player health boosts or more powerful weapons

-Player can select from multiple ship types before the game, each with a different appearance and different attributes (speed, fire rate, acceleration, size/hitbox, hit points)

-Pretty starfield background with nebulas and other visually appealing decor

-A challenging endgame boss fight and a victory display

-A minimal backend that keeps track of high scores and keeps certain ship types locked until an account activates them by achieving a certain amount of progress in a game (EG getting to level 5 unlocks a new kind of ship)
