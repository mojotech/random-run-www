;(function() {
  var c           = logo;
  var ctx         = c.getContext('2d');
  var radius      = 80;
  var xModulation = 3;
  var yModulation = 4;
  var xOffset     = radius/xModulation + radius;
  var yOffset     = radius/yModulation + radius;
  var pixels      = [];

  (function tick(i) {
    setTimeout(function(i) {
      var x = Math.cos(i) + Math.cos(i*1.3)/xModulation;
      var y = Math.sin(i) + Math.sin(i*0.6)/yModulation;
      pixels.push(new Pixel(x,y));
      tick(i+Math.PI/128);
    }.bind(this, i), 2);
  })(0)


  function Pixel(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 0.9;
  }

  Pixel.prototype.draw = function() {
    if (this.opacity <= 0) {
      return this;
    }

    ctx.clearRect(this.x*radius+xOffset, this.y*radius+yOffset, 10, 10);
    ctx.fillStyle = "rgba(255, 255, 255," + this.opacity + ")";

    ctx.fillRect(this.x*radius+xOffset, this.y*radius+yOffset, this.opacity * 10, 10 * this.opacity);
    this.opacity -= 0.005;

    return this;
  };

  (function render() {
    pixels.forEach(function(p) {
      if (p.draw().opacity <= 0) {
        pixels = pixels.slice(1);
      }
    });

    setTimeout(render, 20);
  })();
})();
