const db = require("../models");
const userDogs = require(`../dogHandler/userDogs`);
const userPosts = require(`../dogHandler/posts`);

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function () {
      res.render("index", {});
    });
  });

  app.get("/home", function (req, res) {
    db.Example.findAll({}).then(function () {
      res.render("home", {});
    });
  });

  app.get("/createdog", isLoggedIn, function (req, res) {
    res.render("createDog");
  });

  app.get("/dog/:dogID", function (req, res) {
    db.Dog.findOne({ where: { id: req.params.dogID } }).then(function (dog) {
      //First checks if the current user that's signed in owns this dog
      //This will show or hide the form on the update dog page
      if (typeof req.user === "undefined") {
        dog.isCurrentUser = false;
      } else if (req.user.id === dog.UserId) {
        dog.isCurrentUser = true;
      };

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

  app.get("/posts", function (req, res) {
    res.render("createPosts", { message: req.flash("error") });
  });

  //Displays the user information and the posts which they have made to the site
  app.get("/user/posts/:userID", async function (req, res) {

    //Goes to the dogHandler object and grabs all the dogs for the user
    //This is used to keep the routes page clean
    const user = await userPosts.getUserPosts(req.params.userID);

    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("viewposts", {
      userProfile: user.userProfile,
      userPostsArray: user.userPostsArray
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
    let user = {};
    if (typeof req.user === "undefined") {
      user = await userDogs.getUserDogs(req.params.userID);
    } else {
      user = await userDogs.getUserDogs(req.params.userID, req.user.id);
    };
    console.log(user.userProfile)
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
