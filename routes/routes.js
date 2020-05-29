const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require('passport');

let makeNewUser = function(db, user, pw) {
  
  console.log(user, pw);

  let userData = {
    $setOnInsert:{ 
      username: user,
      password: bcrypt.hashSync(pw, 13, (err, hash)=>{
        if(err) console.error(err)
        else return hash;
      })
    }
  }

  db.collection("users").findOneAndUpdate({username:user},  userData, {upsert:true, new:true}, (err, doc)=>{
    if(err) console.error(err);
    console.log(doc);
  });
}





module.exports = function(app, db){
 
 
  app.route("/").get((req, res)=>{
    res.render(process.cwd() + "/routes/pug/index");
  })


  app.route("/login").post(passport.authenticate('local', {successRedirect:"/profile", failureRedirect: "/"}), (req, res)=>{
    console.log(req.isAuthenticated());
  });

  app.route("/register").post(async (req, res)=>{
    
    await db.collection('user').findOne({user:req.body.username}, (err, doc)=>{
      if(!doc) makeNewUser(db, req.body.username, req.body.password);
      if(doc) console.log("User exists");
    });

    res.redirect("/");

  });


  app.route("/profile").get((req, res)=>{
    console.log(req.user)
    res.render(process.cwd() + "/routes/pug/profile", {user:req.user.username});
  });
  //end module.exports

}