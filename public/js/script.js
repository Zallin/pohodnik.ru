ymaps.ready(init);
var myMap;

var getHikes = function (fn){
  $.get('/hikes_points', function (data){
    fn(JSON.parse(data));
  });
}

function Point(coords){
  return new ymaps.GeoObject({
    geometry : {
      type : 'Point',
      coordinates : coords
    }
  });
}

function init(){
  myMap = new ymaps.Map("map", {
    center: [62.76, 74.64],
    zoom: 4
  });

  getHikes(function (coords){
    console.log(coords);
    for(var i = 0; i < coords.length; i++){
      // myMap.geoObjects.add(Point(coords[i]));
    }
  });
}
