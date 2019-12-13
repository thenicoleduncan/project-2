// API TASK ROUTES 
const passport = require("passport");
require("../config/passport-config")(passport);
const db = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//jwt
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwt-config");

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());

    // Get all of user's tasks
    app.get("/api/:goal/tasks/", passport.authenticate("jwt", { session: false }), function (req, res) {
        var goal = `${req.params.goal}`;
        var goalId = goal.slice(1);
        db.Task.findAll({
            where: {
                UserId: req.user.id, 
                GoalId: goalId, 
                priority: 1
            }
        }).then(function (dbTasks) {
           res.render("dashboard", { tasks: dbTasks }); 
        });
    });

    // Create a new task 
    app.post("/api/:goal/tasks", passport.authenticate("jwt", { session: false }), function (req, res) {
        var goal = `${req.params.goal}`;
        var goalId = goal.slice(1);
        db.Task.create({ description: req.body.description, UserId: req.user.id, GoalId: goalId }).then(function (dbGoal) {
            res.redirect(`/${req.params.goal}/tasks`);
        });
    });

    // Update existing task  
    app.put("/api/task/:id", passport.authenticate("jwt", { session: false }), function (req, res) {
        db.Task.update(
            req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    // Delete existing task. 
    app.delete("/api/task/:id", passport.authenticate("jwt", { session: false }), function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

};
