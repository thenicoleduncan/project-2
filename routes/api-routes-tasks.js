// API TASK ROUTES 
var db = require("../models");

module.exports = function (app) {

    // Get all of user's tasks
    app.get("/api/:goal/tasks/", function (req, res) {
        db.Task.findAll({
            where: {
                GoalId: req.params.goal
            }
        }).then(function (dbTask) {
            res.redirect(`/${req.params.goal}/tasks`)
        });
    });

    // Create a new task 
    app.post("/api/:goal/tasks", function (req, res) {
        var goal = `${req.params.goal}`;
        var goalId = goal.slice(1);
        db.Task.create({ description: req.body.description, UserId: req.user.id, GoalId: goalId }).then(function (dbGoal) {
            res.redirect(`/${req.params.goal}/tasks`);
        });
    });

    // Update existing task  
    app.put("/api/task/:id", function (req, res) {
        db.Task.update(
            req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    // Delete existing task. 
    app.delete("/api/task/:id", function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

};
