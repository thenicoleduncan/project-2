var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index"); 
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("dashboard");
    });
  });

  app.get("/add", function (req,res){
    res.render("create-account"); 
  }); 

  app.get("/tasks", function(req,res){
    res.render("tasks")
  }); 
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  
};
