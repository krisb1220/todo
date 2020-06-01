let mongoose = require("mongoose"); 

let UserSchema = new mongoose.Schema({
  email: String,
  username:String,
  password:String,
  data: Object,
  tags: Object
});

let UserModel = mongoose.model("User", UserSchema);

exports.data = UserModel; 