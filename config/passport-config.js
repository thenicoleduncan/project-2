const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const jwtSecret = require("./jwt-config");
const db = require("../models");

module.exports = function(passport) {

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.user.findOne({ where: { id: id } }).then(function(data) {
      cb(null, data);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true
      },
      function(email, password, done) {
        db.user.findOne({ where: { email: email } }).then(function(data) {
          if (data) {
            return done(null, false, {
              message: "Oops! Email already signed-up."
            });
          } else {
            db.user
              .create({
                email: email,
                password: db.user.generateHash(password)
              })
              .then(function(data) {
                const record = {
                  status: "SignUp",
                  userId: data.dataValues.id
                };
                db.history.create(record).then(function() {
                  return done(null, data);
                });
              });
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      function(email, password, done) {
        db.user.findOne({ where: { email: email } }).then(function(user) {
          if (!user) {
            return done(null, false, { message: "No email found." });
          }
          if (!db.user.validPassword(password, user.password)) {
            return done(null, false, { message: "Oops! Wrong password!" });
          }

          const record = {
            status: "LogIn",
            userId: user.id
          };
          db.history.create(record).then(function() {
            return done(null, data);
          });
        });
      }
    ) //end new LocalStrategy
  ); // end passport.use local-login

  const opts = {
    jwtFromRequest: function(req) {
      return req.cookies.jwt;
    },
    secretOrKey: jwtSecret.secret
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, function(jwtpayload, cb) {
      db.user.findOne({ id: jwtpayload.sub }).then(function(data) {
        if (data) {
          return cb(null, data);
        } else {
          return cb(null, false, { message: "No user found." });
        }
      });
    })
  );
};
