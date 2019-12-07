require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
//require("./routes/api-routes-auth")(app);
require("./routes/api-routes-goals")(app);
require("./routes/api-routes-milestones")(app);
require("./routes/api-routes-tasks")(app); 
require("./routes/api-routes-users") (app); 
require("./routes/htmlRoutes")(app); 

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "wootwoot",
    saveUninitialized: true,
    resave: true
  })
);

const syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
