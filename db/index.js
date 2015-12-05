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
      var coordinates = [];
      for(var i = 0; i < hikes.length; i++){
        coordinates.push(hikes[i].coordinates[0]);
      }
      fn(null, coordinates);
    })
  }
}

module.exports = new Database();
