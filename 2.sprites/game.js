var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});
//line 1 is like using namespace std in c++
//it setup game object to run physics engines, objects, etc
//800 and 600 are width and height of the game screen.
//They can be modified to change size of the screen

//global varaible:
//  player and floor1 sprites are created in create function,
//  but they will be used in update function as well.
//  So, that's why they should be global
var player;
var floor1;

//preload function will run once automatically in the beginning.
//This is where resource files(images, audio, etc) are uploaded to game
function preload()
{
  // game.load.image("nameOfImage", "asset/imageFile.jpg");
  //name of image can be chosen to whatever
  //second parameter is path and file name of the image
  game.load.image("background", "asset/gray.jpg");
  game.load.image("player",     "asset/man.gif");
  game.load.image("platform",    "asset/platform.jpg");
}

//create function will run once automatically in the beginning.
//This is where game objects or setup are done
function create()
{
  //This creates a "TileSprite," an object that does not interacts with
  //  others.
  //The background will not collide, or move or anything -> tileSprite
  //This is not global variable because it just need to exist.
  //  It won't be used in update function
  // game.add.tileSprite(xPosition, yPosition, width, height, "nameOfImage")
  var back = game.add.tileSprite(0, 0, 800, 600, "background");
  
  //This creats a "sprite," a object in game.
  //Most of moving things will be sprite (player, enemy, bullet...)
  // game.add.sprite(xPosition, yPosition, "nameOfImage");
  player = game.add.sprite(300, 300, "player");
  
  //width and height of sprites can be changed like below:
  // player.width = 200;
  // player.height = 130;
  
  //this creates floor1, the platform where player will stand on
  floor1 = game.add.sprite(200, 600, "platform");
  
  
}

//After preload and create functions are automatically called,
//the system will automatically call update function over and over again
//This means, update is called, and when it is done, update funciton
//  will be called again. And again.
//Most of game logics will be here
function update()
{

}



