require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars")
const passport = require('passport');
const session = require('express-session');
const db = require("./models");
const cloudinary = require(`./cloudinary/cloudinary`);
const flash = require("connect-flash")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// For Passport
app.use(flash())
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Handlebar helper for cloudinary
//This takes the images that the user inputted and displays them to the screen
handlebars.registerHelper("cloudinaryIMG", function (url, params) {
  return new handlebars.SafeString(cloudinary.image(url, { width: params.hash.width, height: params.hash.height, radius: 20, crop: "fill" }));
});

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/passportRoutes")(app, passport);

//load passport strategies
require('./passport/passport.js')(passport, db.User);

const syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
