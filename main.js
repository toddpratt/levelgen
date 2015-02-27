var canvas;
var context;
var player;
var drawables;
var interval = null;
var camera;

var HEIGHT = 600;
var WIDTH = 10000;

function update() {
  for(var i=0; i<drawables.length; i++) {
    drawables[i].update();
  }
  camera.update();
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for(var i=0; i<drawables.length; i++) {
    drawables[i].draw(camera);
  }
};

window.onkeydown = function(kevent) {
  if(interval) {
    switch(kevent.keyCode) {
      case 37:
      case 72:
        player.runLeft();
        break;
      case 32:
      case 38:
      case 75:
        player.jump();
        break;
      case 39:
      case 76:
        player.runRight();
        break;
    }
  }
}

window.onkeyup = function(kevent) {
  if(interval) {
    switch(kevent.keyCode) {
      case 37: // left arrow
      case 39: // right arrow
      case 72: // 'h' left
      case 76: // 'l' right
        player.stopRunning();
        break;
      case 70: // 'l' right
        player.toggleFlight();
        break;
      case 78: // 'n' Next Frame
        if(!interval) {
          update();
        }
        break;
      case 80: // 'p' Pause
        togglePause();
        break;
      case 82: // 'r' Pause
        player.initPos();
        break;
      case 84: // 't' Toggle Collision Detection Strategy
        player.toggleCollisionStrategy();
        break;
    }
  }
}

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  var platforms = [
    new Platform(30, 90, 100, 30, 0, 0, 0, 0, false),
    new Platform(150, 170, 100, 30, 0, 0, 0, 0, false),
    new Platform(80, 250, 120, 30, 0, 0, 200, 2, false),
    new Platform(30, 500, 100, 30, 0, 0, 0, 0, false),
    //new Platform(80, 410, 120, 30, 0, 0, 0, 0, false),
    //new Platform(150, 490, 310, 30, 0, 0, 0, 0, false),

    new Platform(150, 530, 120, 30, 240, 1, 0, 0, false),
    // right wall of pit
    new Platform(250, 0, 30, 420, 0, 0, 0, 0, false),
    new Platform(250, 420, 180, 30, 0, 0, 0, 0, false),
    new Platform(250, 240, 180, 30, 0, 0, 0, 0, false),

    // upper moving platform
    new Platform(310, 140, 120, 30, 180, 2, 0, 0, false),

    // main wall of the pit
    new Platform(800, 150, 30, 340, 0, 0, 0, 0, false),

    // blah
    new Platform(970, 0, 30, 500, 0, 0, 0, 0, false),

    new Platform(640, 150, 180, 30, 0, 0, 0, 0, false),
    // lower moving platform
    new Platform(320, 320, 120, 30, 340, 3, 0, 0, false),
    new Platform(550, 460, 250, 30, 0, 0, 0, 0, false),
    // short wall blocking the pit
    new Platform(550, 460, 30, 200, 0, 0, 0, 0, false),

    new Platform(1550, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(2050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(2550, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(3550, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(4050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(5050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(6050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(7050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(8050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(9050, 460, 30, 200, 0, 0, 0, 0, false),
    new Platform(9550, 460, 30, 200, 0, 0, 0, 0, false),

    // bottom
    new Platform(550, 570, WIDTH, 30, 0, 0, 0, 0, false),
    new Platform(30, 570, 520, 30, 0, 0, 0, 0, true),
    new Platform(0, 0, WIDTH, 30, 0, 0, 0, 0, false),
    new Platform(0, 0, 30, HEIGHT, 0, 0, 0, 0, false),
    // right-most wall
    new Platform(WIDTH - 30, 0, 30, HEIGHT, 0, 0, 0, 0, false)
  ];
  player = new Player(WIDTH, HEIGHT, platforms);
  camera = new Camera(player, WIDTH, HEIGHT);
  drawables = platforms.concat([player]);
  togglePause();
};

function togglePause() {
  if(interval) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval("update();", 33);
  }
}
