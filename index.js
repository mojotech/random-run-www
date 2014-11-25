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
    var x = Math.cos(i) + Math.cos(i*1.3)/xModulation;
    var y = Math.sin(i) + Math.sin(i*0.6)/yModulation;
    pixels.unshift(new Pixel(x,y));

    requestAnimationFrame(tick.bind(this, i+Math.PI/128));
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
    this.opacity -= 0.003;

    return this;
  };

  (function render() {
    pixels.forEach(function(p, i, arr) {
      if (arr[arr.length - (i+1)].draw().opacity <= 0) {
        arr.pop();
      }
    });

    requestAnimationFrame(render);
  })();
})();
