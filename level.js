function Level(producer) {
  this.producer = producer;
  this.nodes = {};
  this.head = null;
}

Level.prototype.generate = function(count) {
  this.
  for(var i = 0; i < count; ++i) {
    var n = this.producer.get();
    if(this.nodes[n]) {
      var m = this.producer.get();
      if(this.nodes[m]) {
        this.nodes[n].link(this.nodes[m]);
      }
    } else {
      this.create_node(n);
    }
  }
};

Level.prototype.create_node = function(n) {
  var new_node = Node(this.nodes);
  this.nodes[n] = new_node;
  return new_node;
};
