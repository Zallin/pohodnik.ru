var HikeODM = function (mongoose){
  var Hike = require('../model/hike.js')(mongoose);

  this.addHike = function (data, fn){
    var hike = new Hike({
      name : data.name,
      city : data.city,
      type : data.type,
      difficulty : data.difficulty,
      description : data.description,
      date_start : data.date_start,
      date_end : data.date_end,
      max_participants : data.max_participants,
      price : data.price,
      coordinates : data.coordinates
    });

    hike.save(function (err){
      if(err) return fn(err);
      fn()
    });
  }

  this.getHikes = function (fn){
    Hike.find({}, 'coordinates', function (err, docs){
      if(err) return fn(err);
      fn(null, docs)
    })
  }
}

module.exports = HikeODM;
