const db = require("../models");
const userDogs = require(`../dogHandler/userDogs`);

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function () {
      res.render("index", {});
    });
  });

  app.get("/createdog", isLoggedIn, function (req, res) {
    res.render("createDog");
  });

  app.get("/dog/:dogID", function (req, res) {
    db.Dog.findOne({ where: { id: req.params.dogID } }).then(function (dog) {
      res.render("updateDog", { dog });
    });
  })

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
    res.render("signin", { message: req.flash("error") });
  });

  app.get("/signup", function (req, res) {
    res.render("signup", { message: req.flash("error") });
  });

  //Displays the user information and the dogs which they have registered to the site
  app.get("/user/:userID", async function (req, res) {

    //Goes to the dogHandler object and grabs all the dogs for the user
    //This is used to keep the routes page clean
    const user = await userDogs.getUserDogs(req.params.userID);

    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("userProfile", {
      userProfile: user.userProfile,
      userDogsArray: user.userDogsArray
    });
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
