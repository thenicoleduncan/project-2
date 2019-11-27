var db = require("../models");

module.exports = function (app) {

    // Get all of user's tasks
    app.get("/api/tasks/", function (req, res) {
        db.Task.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(dbTask){
            res.json(dbTask);
        }); 
    });

    // Create a new task 
    app.post("/api/tasks", function (req, res) {
        db.Task.create(req.body).then(function(dbTask){
            res.json(dbTask); 
        }); 
    });

    // Update existing task  
    app.put("/api/task/:id", function (req, res) {
        db.Task.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbTask){
                res.json(dbTask); 
            }); 
    });

    // Delete existing task. 
    app.delete("/api/task/:id", function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbTask){
            res.json(dbTask); 
        }); 
    });

};