const db = require("../models");
const cloudinary = require(`../cloudinary/cloudinary`);

module.exports = function (app) {
  // Get all our database data for all tables
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  //Lists all the dogs to the screen as json data
  app.get("/api/dog", isLoggedIn, function (req, res) {
    db.Dog.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/posts", function (req, res) {
    db.Posts.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  //Create a new dog
  //Only availiable when logged in
  app.post("/api/dog", isLoggedIn, function (req, res) {
    // console.log(req.body.dogPicture)
    //Get the new dog that the user inputted
    const newDog = req.body;
    console.log(req.body)
    //Add the user's ID to the new dog object, so we can assign the foreign key to it
    newDog.UserId = req.user.id;
    db.Dog.create(req.body).then(function (dbDog) {
      res.json(dbDog);
    });

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  //This function checks if the user is logged in
  //Is used when the user is trying to access any part of the site
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  };

};
