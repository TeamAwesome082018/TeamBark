const db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", isLoggedIn, function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //TODO add back isLoggedIn
  app.get("/createdog", isLoggedIn, function (req, res) {
    res.render("createDog");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/signin", function (req, res) {
    res.render("signIn");
  });

  app.get("/signup", function (req, res) {
    res.render("signUp");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  //This function checks if the user is logged in
  //Is used when the user is trying to access any part of the site
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  };
};
