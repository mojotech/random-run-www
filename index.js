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

var geocoder;
var map;

var marker;

function initialize()
{
  var mapProp = {
    center: new google.maps.LatLng(41.826314,-71.412145),
    draggable: false,
    scrollwheel: false,
    panControl: false,
    disableDoubleClickZoom: true,
    disableDefaultUI:true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var rendererOptions = { map: map,
    polylineOptions:{
      strokeColor:'#6C3BF9',
      strokeWeight: 8
    }
  };
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions( { suppressMarkers: true } );

  var point1 = new google.maps.LatLng(41.826314,-71.412145);
  var point2 = new google.maps.LatLng(41.856314,-71.452145);
  var point3 = new google.maps.LatLng(41.856314,-71.472145);
  var point4 = new google.maps.LatLng(41.856314,-71.475643);

  var wps = [{ location: point1 }, { location: point2 }, { location: point3 }, { location: point4 }];

  var org = new google.maps.LatLng (41.826314,-71.412145);
  var dest = new google.maps.LatLng (41.826314,-71.412145);

  var request = {
      origin: org,
      destination: dest,
      waypoints: wps,
      travelMode: google.maps.DirectionsTravelMode.WALKING
      };

  directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
        else
          alert ('failed to get directions');
      });
}

google.maps.event.addDomListener(window, 'load', initialize);
