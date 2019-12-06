// API USER ROUTES

var db = require("../models");

module.exports = function (app) {

  // Get all users
  app.get("/api/user", function (req, res) {
    db.User.findAll({
      include: [db.Goals]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Get one user. 
  app.get("/api/user/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Goals]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user 
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

  // Update existing user.  
  app.put("/api/user/:id", function (req, res) {
    db.User.update(
      req.body, {
      where: {
        id: req.body.id
      }
    }
    ).then(function (dbUser) {
      res.json(dbUser);
    })
  });

  // Delete existing user.  
  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

};
