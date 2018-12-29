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

  //Displays the user information and the dogs which they have registered to the site
  app.get("/user/:userID", async function (req, res) {
    const userProfile = {};
    const userDogsArray = [];
    userProfile.id = req.params.userID;
    //First get the username from the user table
    await db.User.findOne({ where: { id: req.params.userID } }).then(function (userInfo) {
      userProfile.userName = `${userInfo.firstname} ${userInfo.lastname}`
    });

    //Then query the dogs database to get all the dogs that belong to that user
    await db.Dog.findAll({ where: { UserId: req.params.userID } }).then(function (dogs) {
      //Gets all the dogs and adds it to the userProfile object to then display to the user
      dogs.forEach(function (dog, index) {
        const userDog = {};
        userDog.name = dog.dog_name;
        userDog.picture = dog.photo_url;
        userDogsArray.push(userDog);
      });
    });

    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("userProfile", {
      userProfile,
      userDogsArray
    })
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
