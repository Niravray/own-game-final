var fixedRect,movingRect;
var backgroundimg;
var boyimg;
var bg,restartImg,restart;
var sea;
var boy;
var islandImg,island;
var tImg,t;
var ball,ballImg;
var dock1,dock1Img;
var dock2,dock2Img;
var score = 0;
var gameState = "play";
var dockGroup;
var ballGroup;
function preload() {
  islandImg = loadImage("image/island.png");
  backgroundimg = loadImage("image/background.jpg");
  boyimg = loadImage("image/boy.png");
  ballImg = loadImage("image/ball.png");
  restartImg = loadImage("image/restart.gif")
  dock1Img = loadImage("image/docks64.jpg");
  dock2Img = loadImage("image/docks64.png");
  tImg = loadImage("image/t.png");
}

function setup() {
  createCanvas(1200,700);

  

  bg = createSprite(0,0,1200,700);
 bg.addImage ("bgImg",backgroundimg);
 bg.velocityX=-2;
 bg.x = bg.width/2;

   

 boy = createSprite(100,400,10,10);
 boy.addImage ("boy1",boyimg);
 boy.scale = 0.2;
 
 ballGroup=new Group();
 dockGroup=new Group();
 
 t = createSprite(600,400);
 t.addImage ("tImg",tImg);
 t.visible = false;
 t.scale = 0.1;
 
 wallup = createSprite(50,30,200,10);
 wallup.visible = false;
 walldown = createSprite(50,680,200,10);
 walldown.visible = false;

 island = createSprite(600,400);
  island.addImage ("islandImg",islandImg);
  island.visible = false;
  island.scale = 0.9;
 
  
 

}

function draw() {
  background(0); 
  
 
  
  if(gameState==="play"){
    if(keyDown("up")){
      boy.y=boy.y-5;
    }
  
    score = score+Math.round(getFrameRate()/60);

    boy.bounceOff(wallup);
    boy.bounceOff(walldown);

    if(keyDown("down")){
      boy.y=boy.y+5;
    }
   
    if (bg.x<0) {
      bg.x=bg.width /2;
    }
  
    spawnBall();
    spawnDocks();

    for(var i=0;i<ballGroup.length;i++){
      if (boy.isTouching(ballGroup.get(i))) {
        ballGroup.get(i).destroy();
        gameState = "end";
      }
    }

    if(score===600){
      island.visible = true;
      t.visible = true;
      island.velocityX = -3
      t.velocityX = -3
      island.depth = boy.depth;
      boy.depth=boy.depth+1;
      dockGroup.destroyEach();
      ballGroup.destroyEach();
      gameState = "won"
    }

    for(var i=0;i<dockGroup.length;i++){
      if (boy.isTouching(dockGroup.get(i))) {
        dockGroup.get(i).destroy();
        gameState = "end";
      }
    }
  }
  if(gameState==="end"){
    ballGroup.destroyEach();
    bg.destroy();
    boy.destroy();
    dockGroup.destroyEach();
    fill("blue");
    textSize(70);
    text("GAME OVER",450,400);
    
  }
  if(gameState==="won"){
    fill("blue");
      textSize(70);
      text("GAME WON",450,400);
    if(boy.isTouching(t)){
      ballGroup.destroyEach();
      bg.destroy();
      island.destroy();
      t.destroy();
      boy.destroy();
      dockGroup.destroyEach();
      console.log(gameState);
      drawSprites();

      
    }
    if(keyDown("down")){
      boy.y=boy.y+5;
    }
    if(keyDown("up")){
      boy.y=boy.y-5;
    }
    
    
  }

  if(mousePressedOver(restart)) {
    reset();
  }
 
  
  drawSprites();
  fill("red");
  textSize(35);
  text("Score:"+score,600,30);
}

function spawnBall() {
  if(frameCount%60===0){
  var rand = Math.round(random(10,680))
  ball = createSprite(1200,rand,10,10);
  ball.addImage("ball",ballImg);
  ball.velocityX =-7;
  ball.scale = 0.2;
  ball.lifetime = 450;
  ballGroup.add(ball);
  }
}

function spawnDocks() {
  if(frameCount%120===0){
  var rand = Math.round(random(50,650));
  var dockRand =Math.round(random(1,2));
  if(dockRand===1){
    dock1 = createSprite(1200,rand,10,10);
    dock1.addImage("docks",dock1Img);
    dock1.velocityX =-7;
    dock1.scale = 0.5;
    dock1.lifetime = 450;
    dockGroup.add(dock1);
  }
  else if(dockRand===2){
  dock2 = createSprite(1200,rand,10,10);
  dock2.addImage("docks1",dock2Img);
  dock2.velocityX =-7;
  dock2.scale = 0.5;
  dock2.lifetime = 450;
  dockGroup.add(dock2);
  }
  
  }

}
