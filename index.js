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
    pixels.unshift([x, y, 0.9]);

    requestAnimationFrame(tick.bind(this, i+Math.PI/128));
  })(0)

  function draw(arr) {
    var x       = arr[0];
    var y       = arr[1];
    var opacity = arr[2];

    if (opacity <= 0) {
      return this;
    }

    ctx.clearRect(x*radius+xOffset, y*radius+yOffset, 10, 10);
    ctx.fillStyle = "rgba(255, 255, 255," + opacity + ")";

    ctx.fillRect(x*radius+xOffset, y*radius+yOffset, opacity * 10, 10 * opacity);

    arr[2] -= 0.003;
    return arr[2];
  };

  (function render() {
    pixels.forEach(function(p, i, arr) {
      if (draw(arr[arr.length - (i+1)]) <= 0) {
        arr.pop();
      }
    });

    requestAnimationFrame(render);
  })();
})();
