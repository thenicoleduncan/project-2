var db = require("../models");

module.exports = function (app) {

  // Get all of user's goals 
  app.get("/api/goals", function (req, res) {
    db.Goal.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoal){
      res.json(dbGoal); 
    }); 
  });

  // Get one particular goal.  
  app.get("/api/goals/:id", function (req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }, 
      include: [db.User]
    }).then(function(dbGoal){
      res.json(dbGoal); 
    }); 
  });

  // Create a new goal.  
  app.post("/api/goal", function (req, res) {
    db.Goal.create({ description: req.body.description }).then(function(dbGoal){
      res.json(dbGoal); 
    }); 
  });
 /*
  app.post("/api/user", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function (dbUser) {
      res.json(dbUser);
      console.log("new user has been added");
    }).catch(function (err) {
      console.log(err, req.body)
    });
  });
  */

  // Update existing goal. 
  app.put("/api/goal/:id", function (req, res) {
    db.Goal.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function(dbGoal){
        res.json(dbGoal);
      });
  });

  // Delete existing goal. 
  app.delete("/api/goal/:id", function (req, res) {
    db.Goal.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoal){
      res.json(dbGoal)
    })
  });

};

