//API MILESTONE ROUTES

var db = require("../models");

module.exports = function (app) {

  // Get all user's milestones
  app.get("/api/milestone", function (req, res) {
    db.Milestone.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(dbMilestone){
        res.json(dbMilestone); 
    })
  });

  // Create a new milestone
  app.post("/api/milestone", function (req, res) {
    db.Milestones.create(req.body).then(function(dbMilestone){
        res.json(dbMilestone); 
    });
  });

  // Update existing milestone 
  app.put("/api/milestone/:id", function (req, res) {
    db.Milestone.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbMilestone){
            res.json(dbMilestone); 
        });
  });   

  // Delete existing milestone.  
  app.delete("/api/milestone/:id", function (req, res) {
    db.Milestone.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbMilestone){
        res.json(dbMilestone); 
    }); 
  });

};