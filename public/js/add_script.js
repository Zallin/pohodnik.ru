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
  }),
        yellowCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'islands#yellowIcon'
        }),
        yellowCoords = [[55.73, 37.75], [55.81, 37.75]];
        
        for (var i = 0, l = yellowCoords.length; i < l; i++) {
        yellowCollection.add(new ymaps.Placemark(yellowCoords[i]));
    }

    firstButton = new ymaps.control.Button("Объекты");
firstButton.events
  .add(
    'select',
    function () {
      showObjexts(true);
    }
  )
  .add(
    'deselect',
    function () {
      showObjexts(false);
    }
  );
    myMap.controls.add(firstButton, {float: 'right'});  
 
var showObjexts = function(show){
  if(show){
    myMap.geoObjects.add(yellowCollection);
  }else{
      myMap.geoObjects.remove(yellowCollection);
  }}



   myMap.events.add('click', function (e){
    var coords = e.get('coords');

    var val = $('.coords').attr('value') || '';
    $('.coords').attr('value', val + coords[0] + ', ' + coords[1] + ';');
    myMap.geoObjects.add(Point(coords));

    if(lastPoint){
      myMap.geoObjects.add(Line(lastPoint, coords));
    }

    lastPoint = coords;

    //$.post('/point_in_radius', lastPoint).success(function(res){
      //

  //var myPlacemark = new ymaps.Placemark({{geometry:
   // {
    //  type:'balloon',
    //coords:[coords[0]+0.3, coords[1]+0.6] 



    //}}}
    //[coords[0]+0.3, coords[1]+0.6],
    //{
      //  name: 'Москва',
     //   description: 'Столица. Много людей.',
     //   metro: true
    //},

     
 //   {balloonContentLayout: MyBalloonContentLayoutClass}
//);
var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
    '<h3>$[properties.name]</h3>' +
    '<p>Описание: $[properties.description]</p>' +
    '<p>Население: $[properties.population|неизвестно]</p>' +
    '<p>Метрополитен: [if properties.metro]да[else]нет[endif]</p>'
);
     
var count=0;

count++
      myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",// тип геометрии - точка
            coordinates: [coords[0]+0.2, coords[1]+0.4] // координаты точки
       }, properties:{
        balloonContentBody: '<div>Католическая церковь святых апостоло</div>',
       }});

      myPlacemark2 = new ymaps.GeoObject({
        geometry: {
            type: "Point",// тип геометрии - точка
            coordinates: [coords[0]+0.5, coords[1]+0.6] // координаты точки
       }, properties:{
        balloonContentBody: '<div>Чистоозерный краеведческий музей</div>',
       }    }); 
      if(count==1){

myMap.geoObjects.add(myPlacemark);
}

if(count==2)
myMap.geoObjects.add(myPlacemark2);
    //})
  });
}
