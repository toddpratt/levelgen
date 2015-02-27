
function Player(xMax, yMax, platforms) {
  this.xMax = xMax;
  this.yMax = yMax;
  this.width = 10;
  this.height = 20;
  this.lineWidth = 1;
  this.color = "#003030";
  this.ySpeed = 8;
  this.yJumpSpeed = -12;
  this.xSpeed = 0;
  this.xSpeedMax = 7;
  this.platforms = platforms;
  this.flight = true;
  this.platform = null;
  this.running = false;

  this.initPos = function() {
    this.x = 35;
    this.y = 35;
    this.old_x = 35;
    this.old_y = 35;
  };

  this.initPos();

  this.handleCollision = function(p) {
    console.log("collision: old: " + this.old_y + " new: " + this.y +
        " height " + this.height + " with old: " + p.old_y +
        " new: " + p.y);
    if(this.old_y + this.height <= p.old_y) { // was above
      console.log('land');
      this.y = p.y - this.height;
      return true;
    } else if(this.old_y > p.old_y + p.height) { // was below
      console.log("hit head");
      this.y = p.y + p.height;
    } else {  // from a side?
      this.xSpeed = -this.xSpeed;
      if(this.old_x + this.width < p.old_x) {
        console.log("from left");
        this.x = p.x - this.width - this.xSpeedMax;
      } else if(this.old_x > p.old_x + p.width) {
        console.log("from right");
        this.x = p.x + p.width + this.xSpeedMax;
      } else {
        console.log("unhandled");
      }
    }
    return false;
  };

  this.toggleFlight = function() {
    this.flight = !this.flight;
  };

  this.updateX = function() {
    this.x += this.xSpeed;
    if(this.platform) {
      this.x += this.platform.xSpeed;
    }
    var oldXSpeed = this.xSpeed;
    if(Math.abs(this.xSpeed) > this.xSpeedMax) {
      this.xSpeed = Math.abs(this.xSpeed) / this.xSpeed * this.xSpeedMax;
    }
    if(this.jumping) {
      if(this.xSpeed > 0) {
        this.xSpeed--;
      } else if(this.xSpeed < 0) {
        this.xSpeed++;
      }
    }
    if( (oldXSpeed < 0 && this.xSpeed > 0) ||
        (oldXSpeed > 0 && this.xSpeed < 0) ||
        Math.abs(this.xSpeed) < 0.1) {
      this.xSpeed = 0;
    }
    if(this.x < 0) {
      this.x = 0;
      this.xSpeed = -this.xSpeed;
    } else if(this.x + this.width > this.xMax) {
      this.x = this.xMax - this.width;
      this.xSpeed = -this.xSpeed;
    }
  };

  this.update = function() {
    this.updateX();
    this.y += this.ySpeed;
    if(this.ySpeed < 6) {
      this.ySpeed++;
    }
    this.platform = null;
    for(var i=0; i<this.platforms.length; i++) {
      var p = this.platforms[i];
      if(this.collidesWith(p)) {
        if(p.danger) {
          this.initPos();
          return;
        }
        if(this.handleCollision(p)) {
          this.platform = this.platforms[i];
          break;
        }
      } else if(this.y + this.height === p.y &&
                ((this.x > p.x && this.x < p.x + p.width) ||
                 (this.x + this.width < p.x + p.width &&
                 this.x + this.width > p.x))) {
        if(!p.danger) {
          this.platform = p;
        }
        break;
      }
    }
    this.old_x = this.x;
    this.old_y = this.y;
  };

  this.collidesWith = function(object) {
    var tx2 = this.x + this.width;
    var ox2 = object.x + object.width;
    var ty2 = this.y + this.height;
    var oy2 = object.y + object.height;
    var xc = ((this.x > object.x && this.x < ox2) ||
              (tx2 > object.x && tx2 < ox2));
    var yc = ((this.y > object.y && this.y < oy2) ||
              (ty2 > object.y && ty2 < oy2));
    return xc && yc;
  };

  this.draw = function(camera) {
    camera.rect(this.color, this.x, this.y, this.width, this.height);
  };

  this.jump = function() {
    if(this.isFalling() || this.isJumping()) {
      if(this.flight) {
        this.ySpeed = this.yJumpSpeed / 3;
      }
    } else {
      this.ySpeed = this.yJumpSpeed;
    }
  };

  this.run = function(factor) {
    this.running = true;
    if(this.isJumping() || this.isFalling()) {
      this.xSpeed += factor/2;
    } else {
      this.xSpeed = factor;
    }
  };

  this.runLeft = function() {
    this.run(-this.xSpeedMax);
  };

  this.runRight = function() {
    this.run(this.xSpeedMax);
  };

  this.stopRunning = function() {
    this.running = false;
  };

  this.isJumping = function() {
    return this.ySpeed < 0;
  };

  this.isFalling = function() {
    return this.ySpeed > 0;
  };
}
