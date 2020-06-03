let mongoose = require("mongoose"); 

let UserSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  username:String,
  password:String,
  data: Object
});

let UserModel = mongoose.model("User", UserSchema);

exports.data = UserModel; 