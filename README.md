# Achtung

[Play here](http://tilde.town/~troido/achtung/)

A clone of the game [Achtung, die Kurve](https://en.wikipedia.org/wiki/Achtung,_die_Kurve!).

Now in your browser with bots, powerups, as many players as you want and many configuration options.

# Instructions

## Default game

With the default options, there are two controllable players:

* player1 is blue and is controlled with the left and right arrow keys
* player2 is red and is controlled with the A and D key

Press your left key to steer to the left and your right key to steer to the right.
Avoid hitting any lines or the edge of the playing field.
The last one to stay alive wins the round.


## Simple configuration

A basic understanding of the [JSON syntax](https://en.wikipedia.org/wiki/JSON#Data_types.2C_syntax_and_example) is assumed.

### Common game options

With the option "wrapboundaries" you can set whether hitting the edges of the playing field will kill the player, or teleport them to the other side.

If you remove the "powerups" option, or set it to an empty list, no powerups will be spawed;

The lines have holes in them at random intervals. To disable this, set the "holes" option to false.

### Players

The "players" options is a list of players.

You copy any player object to duplicate, or remove it.

When creating a new player object, you can set several options:

* name: this will be the name displayed with the score
* colour: the colour of the line and the score.
  Defaults to white.
  Any CSS colour value can be used.
* controltype: set this to "input" if you want to control the player with the keyboard
* leftcontrol and rightcontrol: only available when controltype is "input".
  Set the keycodes to control your left and right.
  keyboard\_KeyA means the A key, keyboard\_ArrowLeft the left arrow key, keyboard\_Digit1 the 1 key in the top digit row, keyboard\_Numpad1 the 1 key on the numpad etc.
* template: When a template is given, all options of the named template are used in this player.
  Options given directly to the player will overwrite the template options.
  The easiest way to get a bot is to set the template to "pointsbot" (assuming you still have the pointsbot template)

## Powerups

There are several powerups in the game:

* green: slow: the player will be slower for 3 seconds.
* orange: invulnerable: the player is invulnerable to other lines fo 2 seconds.
* purple: change: the left and right controls are swapped.
* cyan: randomize aka 10wasmachine: all players places and lines are changed to another player.
  current modifiers (such as slow) are changed as well.
  all player will be invulnerable for 0.5 seconds.


