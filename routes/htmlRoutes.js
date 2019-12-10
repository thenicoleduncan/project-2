const passport = require("passport");
require("../config/passport-config")(passport);
//const flash = require("connect-flash");
const db = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//jwt
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwt-config");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.user) {
      db.Goal.findAll({ where: { UserId: req.user.id } }).then(function(dbGoals){
        res.render("dashboard", { goals: dbGoals }); 
      }); 
    } else {
      res.render("index");
    }
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (dbUser) {
      res.render("dashboard");
    });
  });


  app.get("/dashboard", passport.authenticate("jwt", { session: false }), function (req, res) {
    if (req.user) { 
      db.Goal.findAll({ where: { UserId: req.user.id } }).then(function(dbGoals){
        res.render("dashboard", { goals: dbGoals }); 
      });  
    } else {
      res.redirect("/");
    }
  });

  app.get("/add", function (req, res) {
    res.render("create-account");
  });

  app.get("/:goal/tasks", passport.authenticate("jwt", { session: false }), function (req, res) {
   var goal = `${req.params.goal}`; 
   var goalId = goal.slice(1); 
   console.log(`Goal ID is ${goalId}`);
    if (req.user) {
      console.log(req.user); 
      db.Task.findAll({ where: { GoalId: goalId } }).then(function(dbTasks){
        res.render("tasks", { tasks: dbTasks, idgoal: goalId  })
      });
    } else {
      res.redirect("/");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};
