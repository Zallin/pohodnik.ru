module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var hikeSchema = new Schema({
    permalink : String,
    type : String,
    date_start : Date,
    date_end : Date,
    city : String,
    price : String,
    difficulty : String,
    description : String,
    max_participants : Number,
    participants : Array,
    // equip : Array,
    // skills : Array,
    // status : String,
    // participants : Array,
    name : String,
    coordinates : Array
  });

  return mongoose.model('Hike', hikeSchema);
}
