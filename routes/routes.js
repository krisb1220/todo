const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require('passport');
const Schemas = require("../database/schemas/schema");
const UserModel = Schemas.UserModel;
let makeNewUser = function (db, pw, email, first, last) {


  let userData = {
    first: first,
    last: last,
    email: email,
    password: bcrypt.hashSync(pw, 13, (err, hash) => {
      if (err) console.error(err)
      else return hash;
    }),
    data: new Schemas.ToDoMasterInstance
  }

  let newUser = new UserModel(userData);
  newUser.save((err, data) => {
    if (err) console.error(err);
    else console.log(`User ${first} ${last}  saved`);
  })
}





let ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/")
  }
}




module.exports = async function (app, db) {

  let updateNestedObject = async function (email, nestedObjectsArray, data) {
    let doc = await UserModel.findOneAndUpdate({ "email": email }, {
      $set: {
        [nestedObjectsArray.join(".")]: data
      }
    }, { upsert: true, useFindAndModify: false })
  }


  let addNewTask = function(req, res){
    if (req.body.title == ' ') res.json({ error: "No title provided" });
    if (req.body.description == '') res.json({ error: "No description provided" });
    if (req.body.date == '') res.json({ error: "No date provided" })
    else res.json({ error: null });
    console.log(req.user.email);
    let ToDo = new Schemas.ToDoInstance(req.body);
    updateNestedObject(req.user.email, ["data", "tasks", `${ToDo.ObjectID}`], ToDo);
  }


  app.route("/").get((req, res) => {
    res.render(process.cwd() + "/routes/pug/index");
  })


  app.route("/login").post(passport.authenticate('local', { successRedirect: "/profile", failureRedirect: "/" }), (req, res) => {
    console.log(req.isAuthenticated());
  });

  app.route("/register").post(async (req, res) => {

    await db.collection('user').findOne({ email: req.body.email }, (err, doc) => {
      if (!doc) makeNewUser(db, req.body.password, req.body.email, req.body.firstName, req.body.lastName);
      if (doc) console.log("User exists");
    });

    res.redirect("/");

  });



  app.route("/getUserData").get(ensureAuthenticated, (req, res) => {
    res.json(req.user.data);
  })

  app.route("/profile").get(ensureAuthenticated, (req, res) => {
    console.log(req.user.data.tasks);
    let user = req.body.user ? req.body.user : 'null'
    res.render(process.cwd() + "/routes/pug/profile", { user: req.user, tags: req.user.data.tags.tags });
  });

  app.route("/updateUser").post((req, res) => {
    if (req.query.action == "newtask") {
      addNewTask(req, res);
    }
  })

}