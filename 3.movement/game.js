var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var PLAYER_SPEED = 2200;
var PLAYER_FRICTION = 0.935;
var PLAYER_MAX_SPEED = 400;

var player;
var floor1;

function preload()
{
  game.load.image("background", "asset/gray.jpg");
  game.load.image("player",     "asset/man.gif");
  game.load.image("platform",   "asset/platform.jpg");
}

function create()
{
  var back = game.add.tileSprite(0, 0, 800, 600, "background");
  
  player = game.add.sprite(700, 300, "player");
  
  //width and height of sprites can be changed like below:
  
  floor1 = game.add.sprite(100, 500, "platform");
  floor1.width = 600;
  // floor1.height = 130;
  
  //this starts "ARCADE" physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //enable physics for player sprite
  game.physics.enable(player, Phaser.Physics.ARCADE);
  
  
}

function update()
{
  playerMove();
  friction();
  maxSpeed();
}

//set player speed to MAX if it goes overboard
function maxSpeed()
{
  if(player.body.velocity.x >= PLAYER_MAX_SPEED)
  {
    player.body.velocity.x = PLAYER_MAX_SPEED;
  }
  if(player.body.velocity.x <= -PLAYER_MAX_SPEED)
  {
    player.body.velocity.x = -PLAYER_MAX_SPEED;
  }
  
  
}

function playerMove()
{
  //if left keyboard key is pressed, move to left, and so on
  if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    player.body.acceleration.x = -PLAYER_SPEED;
  }
  else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    player.body.acceleration.x = PLAYER_SPEED;
  }
  else
  {
    player.body.acceleration.x = 0;
  }
  // player.body.x
  // player.body.velocity.x
  // player.body.acceleration.x
}

//consistantly set player speed to decay, like friction
function friction()
{
  player.body.velocity.x = player.body.velocity.x * PLAYER_FRICTION;
}



