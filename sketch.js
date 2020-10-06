var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400, 400);

  monkey = createSprite(80,315,20,20); 
    monkey.addAnimation("moving",monkey_running);
    monkey.scale = 0.1;

  ground = createSprite(400,350,900,10)
  ground.velocityX = -4;
  
survivalTime = 0;
    obstaclesGroup = createGroup();
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
}


function draw() {

  background("white");
   
 ground.x = ground.width /4;
   
  text("survivalTime: "+0+0+0+survivalTime, 300,50);
  
   if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -12;
        
    }
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
   monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
 
  if(monkey.isTouching(obstaclesGroup)){
        monkey.changeImage("sprite_0.png",monkey_stop );
 obstaclesGroup.setVelocityXEach(0);
  monkey.velocityY=0;  
  obstaclesGroup.setLifetimeEach(-1);
   survivalTime =0;
  }
  
  spawnObstacles()
 drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstaceImage)
   obstacle.scale = 0.1;
   obstacle.lifetime = 110;
   obstaclesGroup.add(obstacle);   
 }
}


