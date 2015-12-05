module.exports = function (mongoose){
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    name : String,
    birth_date: Date,
    gender : String,
    email : String,
    phone : String,
    about: String,
    hikes : Array,
    leads : Array,
    rating : Number,
    friends : Array,
    feedback : Array,
    feedback_given : Array
  });

  return mongoose.model('User', userSchema);
};
