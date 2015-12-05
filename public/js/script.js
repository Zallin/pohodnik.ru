ymaps.ready(init);
var myMap;

var getHikes = function (fn){
  $.get('/hikes_points', function (data){
    fn(data);
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

  getHikes(function (list){
    for(key in list){
      var coords = list[key].split(', ');
      myMap.geoObjects.add(Point(coords));
    }
  });
}
