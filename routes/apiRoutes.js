const db = require("../models");
const userDogs = require(`../dogHandler/userDogs`);
const userPosts = require('../dogHandler/posts')

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
    db.Posts.findAll({}).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });

  //Create a post
  //Only availiable when logged in
  app.post("/api/newpost", isLoggedIn, async function (req, res) {

    //Goes to the userDogs object to create the new dog to make the routes cleaner
    const userID = await userPosts.createPost(req.body, req.user.id)

    //This then takes them to the page which displays all of their dogs
    res.redirect(`/user/posts/${userID}`)
  });

  app.post("/api/updatepost", async function (req, res) {
    let userID = "";

    //If the user uploaded a file then send the file path, otherwise don't
    userID = await userPosts.updatePost(req.body);

    await res.redirect(`/user/posts/${userID}`)
  });
  //delete post
  app.delete("/api/deletepost", async function (req, res) {
    //Goes to the post handler and deletes the post from the database as well as the cloudinary
    const userID = await userPosts.deletePost(req.body.id);

    res.end(JSON.stringify(userID));
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
    let userID = "";

    //If the user uploaded a file then send the file path, otherwise don't
    if (req.file) {
      userID = await userDogs.updateDog(req.body, req.file.path);
    } else {
      userID = await userDogs.updateDog(req.body);
    };

    await res.redirect(`/user/${userID}`)
  });

  app.delete("/api/deletedog", async function (req, res) {
    //Goes to the dog handler and deletes the dog from the database as well as the cloudinary
    const userID = await userDogs.deleteDog(req.body.id);

    res.end(JSON.stringify(userID));
  });

  app.post("/api/lostdog", async function (req, res) {
    await userDogs.lostDog(req.body);

    res.redirect("/lostdogs")
  });

  //This function checks if the user is logged in
  //Is used when the user is trying to access any part of the site
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  };

};
