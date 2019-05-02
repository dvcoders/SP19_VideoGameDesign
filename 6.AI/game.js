var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var PLAYER_SPEED = 2200;
var PLAYER_FRICTION = 0.935;
var PLAYER_MAX_SPEED = 400;
var PLAYER_GRAVITY = 800;
var PLAYER_JUMP = 600;
var PLAYER_BULLET_SPEED = 1000;
// var PLAYER_BULLET_FIRERATE = 300;
var PLAYER_BULLET_FIRERATE = 100;
var ENEMY_LIFESPAN = 10000;
var ENEMY_SPEED = 400;
var ENEMY_SPAWN_RATE = 2000;

var player;
var floor1;
var floor2;
var box;
var pistol;
var enemies;

var lastEnemySpawned = 0;

function preload()
{
  game.load.image("background", "asset/gray.jpg");
  game.load.image("player",     "asset/man.gif");
  game.load.image("platform",   "asset/platform.jpg");
  game.load.image("red",        "asset/red.png");
}

function create()
{
  var back = game.add.tileSprite(0, 0, 800, 600, "background");
  
  player = game.add.sprite(700, 300, "player");
  player.anchor.x = 0.5;
  player.anchor.y = 0.5;
  
  //width and height of sprites can be changed like below:
  
  floor1 = game.add.sprite(400, 500, "platform");
  floor1.width = 650;
  floor1.anchor.x = 0.5;
  floor1.anchor.y = 0.5;
  
  // floor1.height = 130;
  
  floor2 = game.add.sprite(400, 350, "platform");
  floor2.width = 450;
  floor2.anchor.x = 0.5;
  floor2.anchor.y = 0.5;
  
  //box
  box = game.add.sprite(300, 250, "platform");
  box.width = 50;
  box.height = 50;
  
  //this starts "ARCADE" physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //enable physics for player sprite
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.physics.enable(floor1, Phaser.Physics.ARCADE);
  game.physics.enable(floor2, Phaser.Physics.ARCADE);
  game.physics.enable(box, Phaser.Physics.ARCADE);
  
  player.body.allowGravity = true;
  player.body.gravity.y = PLAYER_GRAVITY;
  
  box.body.allowGravity = true;
  box.body.gravity.y = PLAYER_GRAVITY;
  
  floor1.body.immovable = true;
  floor2.body.immovable = true;
  
  
  //weapon
  pistol = game.add.weapon(20, 'red');
  pistol.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  pistol.bulletSpeed = PLAYER_BULLET_SPEED;
  pistol.fireRate = PLAYER_BULLET_FIRERATE;
  
  
  //enemies
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  
  enemies.createMultiple(25, 'player');
  enemies.setAll('anchor.x', 0.5);
  enemies.setAll('anchor.y', 0.5);
  
  
}

function update()
{
  playerMove();
  friction();
  maxSpeed();
  boxFunction();
  playerCollision();
  weaponFunction();
  // enemySpawn();
  enemyTimer();
  
  enemies.forEachExists(enemyMove, this);
  
  
  
}

function enemyTimer()
{
  // lastEnemySpawned = game.time.now;
  if(game.time.now >= lastEnemySpawned + ENEMY_SPAWN_RATE)
  {
    enemySpawn();
    lastEnemySpawned = game.time.now;
  }
  
}

function enemyMove(enemy)
{
  enemy.body.velocity.x = Math.abs(enemy.width)/enemy.width * ENEMY_SPEED;
  game.physics.arcade.collide(floor1, enemy);
  game.physics.arcade.collide(floor2, enemy);
  
  if(game.physics.arcade.collide(pistol.bullets, enemy))
  {
    enemy.kill();
  }
  
  if(enemy.body.onWall())
  {
    enemy.width = -1 * enemy.width;
    enemy.body.x = enemy.body.x + Math.abs(enemy.width)/enemy.width * 20;
  }
  
}

function enemySpawn()
{
  var enemy = enemies.getFirstExists(false);
  
  //if "enemy" exists (enemies have at least one un-objectified element)
  if (enemy)
  {
    enemy.reset(400, 250);//set position
    enemy.lifespan = ENEMY_LIFESPAN;//how long enemy lasts
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.allowGravity = true;
    enemy.body.gravity.y = PLAYER_GRAVITY;
    enemy.body.collideWorldBounds = true;//does enemy collided with world bound
  }//if enemy
}


function boxFunction()
{
  game.physics.arcade.collide(player, box); 
  game.physics.arcade.collide(floor1, box);
  game.physics.arcade.collide(floor2, box);
  
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
    player.width = -Math.abs(player.width);
    player.body.acceleration.x = -PLAYER_SPEED;
  }
  else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    player.width = Math.abs(player.width);
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
  game.physics.arcade.collide(player, floor1);
  game.physics.arcade.collide(player, floor2);
  
  if(player.body.touching.down)
  {
    playerJump();
  }
  
  
  
}


function weaponFunction()
{
  
  
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  {
    pistol.trackSprite(player, player.width, 0);
    if(player.width == Math.abs(player.width) )
    {
      pistol.fireAngle = 0;
    }
    else
    {
      pistol.fireAngle = 180;
    }
    pistol.fire();
  }
  
  
}


