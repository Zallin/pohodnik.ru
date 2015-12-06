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

    myMap.geoObjects.events.add('click', function (e){
      var object = e.get('target');

      var coords = object.geometry.getCoordinates();

      $.post('/hike_by_coordinate', {"0" : coords[0], "1" : coords[1]}, function (data){
        location.replace('/hikes/' + data.permalink);
      }, 'json');

    });
  });
}
