defaults = {
  "fatal": false,
  "solid": true
}

function Drawable(options) {
  for(name in defaults) {
    this[name] = options[name] || defaults[name];
  }
}
