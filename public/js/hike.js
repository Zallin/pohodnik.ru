ymaps.ready(init);

var myMap;

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
  myMap = new ymaps.Map("hike-map", {
    center: [62.76, 74.64],
    zoom: 4
  });

  var lis = $('.hidden').children();
  var coords = [];
  lis.each(function (i, el){
    var text = $(el).text();
    if(text) coords.push(text);
  })

  var prev;

  coords.forEach(function (el){
    var pair = el.split(', ');
    myMap.geoObjects.add(Point(pair));
    if(prev){
      myMap.geoObjects.add(Line(prev, pair));
    }
    prev = pair;
  })
}
