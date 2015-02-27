function Camera(player, width, height) {

  this.player = player;
  this.x = 0;
  this.y = 0;
  // The dimensions of the entire map, not the view port
  this.height = height;
  this.width = width;

  this.update = function() {
    this.x = player.x - canvas.width / 2;
    if(this.x < 0) {
      this.x = 0;
    }
    if(this.x > this.width - canvas.width) {
      this.x = this.width - canvas.width;
    }
    this.y = player.y - canvas.height / 2;
    if(this.y < 0) {
      this.y = 0;
    }
    if(this.y > this.height - canvas.height) {
      this.y = this.height - canvas.height;
    }
  };

  this.rect = function(color, x, y, w, h) {
    context.fillStyle = color;
    context.fillRect(x - this.x, y - this.y, w, h);
  };
}
