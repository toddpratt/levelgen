function Platform(x, y, width, height,
    xTravel, xSpeed, yTravel, ySpeed, danger) {
  this.xBase = x;
  this.x = x;
  this.yBase = y;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.width = width;
  this.height = height;
  this.danger = danger;
  this.old_x = x;
  this.old_y = y;

  if(danger) {
    this.color = "#300000";
  } else {
    this.color = "#303000";
  }

  this.xTravel = xTravel;
  this.yTravel = yTravel;

  this.update = function() {
    this.old_x = this.x;
    this.old_y = this.y;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.x < this.xBase) {
      this.x = this.xBase;
      this.xSpeed = -this.xSpeed;
    } else if(this.x > this.xBase + this.xTravel) {
      this.x = this.xBase + this.xTravel;
      this.xSpeed = -this.xSpeed;
    }
    if(this.y < this.yBase) {
      this.y = this.yBase;
      this.ySpeed = -this.ySpeed;
    } else if(this.y > this.yBase + this.yTravel) {
      this.y = this.yBase + this.yTravel;
      this.ySpeed = -this.ySpeed;
    }
  };

  this.draw = function (camera) {
    camera.rect(this.color, this.x, this.y, this.width, this.height);
  };
}
