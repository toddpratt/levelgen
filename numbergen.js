function NumberGenerator() {
}

NumberGenerator.prototype.get = function() {
  return Math.random() * 1000;
};
