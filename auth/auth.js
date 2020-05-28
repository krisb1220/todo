const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  passport.serializeUser((id, done)=>{
    done(null, id);
  })
  
  passport.deserializeUser((user, done)=>{
    db.collection('users').findOne({_id: new ObjectID(id)}, (err, doc)=>{
      if(err) done(err, null);
      else done(null, doc);
    })
  });


  passport.use(new LocalStrategy((username, password, done)=>{
    if(err) {
      console.error(err);
      done(err, false);
    }
    if(!user) done(null, false);
    if(!password) done(null, false)
  }));
}