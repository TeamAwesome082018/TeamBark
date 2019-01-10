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

  app.get("/home", isLoggedIn, function (req, res) {
    const userId = req.user.id;
    res.redirect(`/user/${userId}`);
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
  });

  app.get("/lostdogs", async function (req, res) {
    let userId = "";
    let lostDogArray = [];
    //TODO edit this so it's better than sending them to the first user
    //The reason for this right now is because we want everyone, even those not logged in to see lost dogs if they want
    if (typeof req.user === "undefined") {
      userId = "1";
      lostDogArray = await userDogs.getLostDogs();
    } else {
      userId = req.user.id;
      lostDogArray = await userDogs.getLostDogs(userId);
    }

    res.render("lostDogs", { lostDogArray, userId })
  })


  app.get("/posts", function (req, res) {
    const userId = req.user.id;

    res.render("createPosts", { message: req.flash("error"), userId });
  });

  app.get("/post/:postId", function (req, res) {
    const userId = req.user.id;

    db.Posts.findOne({ where: { id: req.params.postId } }).then(function (post) {
      if (typeof req.user === "undefined") {
        post.isCurrentUser = false;
      } else if (req.user.id === post.UserId) {
        post.isCurrentUser = true;
      };

      res.render("updatePost", { post, userId });
    });
  });

  app.get("/allPosts", isLoggedIn, async function (req, res) {
    const userId = req.user.id;
    //Goes to the dogHandler object and grabs all the dogs for the user
    //This is used to keep the routes page clean
    const user = await userPosts.getAllPosts(req.params.userID);

    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("allPosts", {
      userProfile: user.userProfile,
      allPostsArray: user.allPostsArray,
      userId,
    });
  });

  //Displays the user information and the posts which they have made to the site
  app.get("/user/posts/:userID", isLoggedIn, async function (req, res) {
    const userId = req.user.id;
    //Goes to the dogHandler object and grabs all the dogs for the user
    //This is used to keep the routes page clean
    const user = await userPosts.getUserPosts(req.params.userID);

    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("viewposts", {
      userProfile: user.userProfile,
      userPostsArray: user.userPostsArray,
      userId,
    });
  });

  app.get("/signin", function (req, res) {
    res.render("signin", { message: req.flash("error") });
  });

  app.get("/signup", function (req, res) {
    res.render("signup", { message: req.flash("error") });
  });

  //Displays the user information and the dogs which they have registered to the site
  app.get("/user/:userID", isLoggedIn, async function (req, res) {
    //Goes to the dogHandler object and grabs all the dogs for the user
    //This is used to keep the routes page clean
    let user = {};
    const userId = req.user.id;

    if (typeof req.user === "undefined") {
      user = await userDogs.getUserDogs(req.params.userID);
    } else {
      user = await userDogs.getUserDogs(req.params.userID, req.user.id);
    };
    console.log(user.userProfile)
    //Then sending the userProfile object and the userDogsArray to handlebars for processing
    res.render("userProfile", {
      userProfile: user.userProfile,
      userDogsArray: user.userDogsArray,
      userId
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
