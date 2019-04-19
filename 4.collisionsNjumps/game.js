var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var PLAYER_SPEED = 2200;
var PLAYER_FRICTION = 0.935;
var PLAYER_MAX_SPEED = 400;
var PLAYER_GRAVITY = 800;
var PLAYER_JUMP = 600;

var player;
var floor1;
var box;

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
  
  //box
  box = game.add.sprite(300, 300, "platform");
  box.width = 50;
  box.height = 50;
  
  //this starts "ARCADE" physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //enable physics for player sprite
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.physics.enable(floor1, Phaser.Physics.ARCADE);
  game.physics.enable(box, Phaser.Physics.ARCADE);
  
  player.body.allowGravity = true;
  player.body.gravity.y = PLAYER_GRAVITY;
  
  box.body.allowGravity = true;
  box.body.gravity.y = PLAYER_GRAVITY;
  
  floor1.body.immovable = true;
  
  
}

function update()
{
  playerMove();
  friction();
  maxSpeed();
  playerCollision();
  boxFunction();
}

function boxFunction()
{
  game.physics.arcade.collide(player, box); 
  game.physics.arcade.collide(floor1, box);
  
  box.body.velocity.x = box.body.velocity.x * PLAYER_FRICTION;
  
  
}

function playerJump()
{
  if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
  {
    player.body.velocity.y = -PLAYER_JUMP;
  }
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
  
  
  // if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
  // {
  //   player.body.acceleration.y = -PLAYER_SPEED;
  // }
  // else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
  // {
  //   player.body.acceleration.y = PLAYER_SPEED;
  // }
  // else
  // {
  //   player.body.acceleration.y = 0;
  // }
  
  // player.body.x
  // player.body.velocity.x
  // player.body.acceleration.x
}

//consistantly set player speed to decay, like friction
function friction()
{
  player.body.velocity.x = player.body.velocity.x * PLAYER_FRICTION;
  
  //friction for y which we will delete later
  // player.body.velocity.y = player.body.velocity.y * PLAYER_FRICTION;
}

function playerCollision()
{
  if( game.physics.arcade.collide(player, floor1) )
  {
    playerJump();
  }
  
  
  
}

