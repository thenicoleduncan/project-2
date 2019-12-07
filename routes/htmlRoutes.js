var db = require("../models");
const passport = require("passport");
require("../config/passport-config")(passport);

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.user) {
      res.render("dashboard");
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
      res.render("dashboard")
    } else {
      res.redirect("/");
    }
  });

  app.get("/add", function (req, res) {
    res.render("create-account");
  });

  app.get("/tasks", passport.authenticate("jwt", { session: false }), function (req, res) {
    if (req.user) {
      res.render("tasks")
    } else {
      res.redirect("/");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};
