var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index"); 
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("user", {
        user: dbUser
      });
    });
  });

  app.get("/user/tasks/:id", function(req,res){
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbTask){
      res.render("task", {
        task: dbTask
      }); 
    }); 
  }); 
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  
};
