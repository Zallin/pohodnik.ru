var mongoose = require('mongoose'),
    HikeODM = require('./ODM/hike.js'),
    UserODM = require('./ODM/user.js');

mongoose.connect('mongodb://localhost/test');

var users = new UserODM(mongoose),
    hikes = new HikeODM(mongoose);

var Database = function (){
  this.addHike = function (hike, fn){
    hikes.addHike(hike, function (err){
      if(err) return fn(err);
      fn();
    });
  }

  this.getHikes = function(fn){
    hikes.getHikes(function (err, hikes) {
      if(err) return fn(err);
      var coordinates = {};
      for(var i = 0; i < hikes.length; i++){
        coordinates[i] = hikes[i].coordinates[0];
      }
      fn(null, coordinates);
    })
  }

  this.getHike = function (permalink, fn){
    hikes.getHike(permalink, function (err, doc){
      if(err) return fn(err);
      fn(null, doc);
    })
  }

  this.getPermalinkByCoordinate = function (arr, fn){
    var coords = arr.join(', ');
    hikes.getHikeByCoordinate(coords, function (err, doc){
      if(err) return fn(err);
      fn(null, doc.permalink);
    });
  }

  this.addUserToHike = function(obj, fn){
    hikes.addUserToHike(obj, function (err){
      if (err) return fn(err);
      fn(null);
    })
  }
}

module.exports = new Database();
