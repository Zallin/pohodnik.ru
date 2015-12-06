var HikeODM = function (mongoose){
  var Hike = require('../model/hike.js')(mongoose);

  this.addHike = function (data, fn){
    var hike = new Hike({
      permalink : data.permalink,
      name : data.name,
      city : data.city,
      type : data.type,
      difficulty : data.difficulty,
      description : data.description,
      date_start : data.date_start,
      date_end : data.date_end,
      max_participants : data.max_participants,
      price : data.price,
      coordinates : data.coordinates,
      participants : [data.lead]
    });

    hike.save(function (err){
      if(err) return fn(err);
      fn()
    });
  }

  this.getHike = function (permalink, fn){
    Hike.find({permalink : permalink}, function (err, docs){
      if(err) return fn(err);
      fn(null, docs[0]);
    });
  }

  this.getHikes = function (fn){
    Hike.find({}, 'coordinates', function (err, docs){
      if(err) return fn(err);
      fn(null, docs)
    })
  }

  this.getHikeByCoordinate = function (coords, fn){
    Hike.findOne({coordinates : coords}, 'permalink', function (err, doc){
      if (err) fn(err);
      fn(null, doc)
    });
   }

   this.addUserToHike = function (obj, fn){
     Hike.update({name : obj["hike-name"]}, {$push : {participants : obj.user}}, {multi : false}, function (err){
       if(err) return fn(err);
       fn(null);
     })
   }
}

module.exports = HikeODM;
