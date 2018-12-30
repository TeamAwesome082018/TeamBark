const db = require("../models");
const userDogs = require(`../dogHandler/userDogs`);

//Multer is to handle the image of the dog coming in with the post route
//Is used with the api/createdog route
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
  // Get all our database data for all tables
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (users) {
      res.json(users);
    });
  });

  //Lists all the dogs to the screen as json data
  app.get("/api/dog", isLoggedIn, function (req, res) {
    db.Dog.findAll({}).then(function (dogs) {
      res.json(dogs);
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
  app.post("/api/createdog", upload.single("dog_photo"), isLoggedIn, async function (req, res) {
    //Goes to the userDogs object to create the new dog to make the routes cleaner
    const userID = await userDogs.createDog(req.body, req.file.path, req.user.id)

    //This then takes them to the page which displays all of their dogs
    res.redirect(`/user/${userID}`)
  });

  //This has to be a post request because a form is the way I've found to send an image
  app.post("/api/updatedog", upload.single("dog_photo"), async function (req, res) {
    //Checks if the user passed in a file and builds the request accordingly
    //TODO make this a string so I can have it redirect to the user page
    let userID = {}

    //If the user uploaded a file then send the file path, otherwise don't
    if (req.file) {
      userID = await userDogs.updateDog(req.body, req.file.path);
    } else {
      userID = await userDogs.updateDog(req.body);
    };

    await res.redirect(`/user/${userID}`)
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
