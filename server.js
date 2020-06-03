const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const auth = require("./auth/auth");
const Schemas = ("./database/schemas/schemas");
const mongooseOptions = {useUnifiedTopology:true, useNewUrlParser:true};
const app = express();


dotenv.config();

app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave:true
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE, mongooseOptions, (err, db)=>{
  
  if(err) console.error(err);  
  else { 
    console.log("Connected to remote database");
    auth(app, db);
    routes(app, db);
  }
});

// console.log(process.env);

app.listen(process.env.PORT || 3000, ()=>{
  console.log("App is listening on port " + process.env.PORT);
})

