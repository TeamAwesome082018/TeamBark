const db = require("../models");
const cloudinary = require(`../cloudinary/cloudinary`);

//Multer is to handle the image of the dog coming in with the post route
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

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
  app.post("/api/createdog", upload.single("dog_photo"), isLoggedIn, async function (req, res) {
    //First assign the inputted values of the new dog to an object
    const newDog = req.body;
    //Add the user's ID to the new dog object, so we can assign the foreign key in the dogs table
    newDog.UserId = req.user.id;
    newDog.photo_url = "";
    //Upload the image the user selected to cloudinary
    await cloudinary.uploader.upload(req.file.path, function (error, result) {
      if (error) {
        throw error
      }
      //Get the URL from cloudinary and assign it to the user's dog they inputted
      newDog.photo_url = result.secure_url;
      newDog.cloudinary_public_id = result.public_id;
    });

    //Write the new dog that was just inputted into the database
    await db.Dog.create(newDog).then(function (dbDog) {
      res.redirect(`/user/:${dbDog.UserId}`)
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
