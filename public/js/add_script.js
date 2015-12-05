ymaps.ready(init);

var myMap, lastPoint;

function Point(coords){
  return new ymaps.GeoObject({
    geometry : {
      type : 'Point',
      coordinates : coords
    }
  });
}

function Line(prev, cur){
  var myPolyline = new ymaps.GeoObject({
    geometry: {
      type: "LineString",
      coordinates: [prev, cur]
    }
  });
  return myPolyline;
}

function init(){
  myMap = new ymaps.Map("map", {
    center: [62.76, 74.64],
    zoom: 4
  });

  myMap.events.add('click', function (e){
    var coords = e.get('coords');

    var val = $('.coords').attr('value') || '';
    $('.coords').attr('value', val + coords[0] + ', ' + coords[1] + ';');
    myMap.geoObjects.add(Point(coords));

    if(lastPoint){
      myMap.geoObjects.add(Line(lastPoint, coords));
    }

    lastPoint = coords;
  });
}
