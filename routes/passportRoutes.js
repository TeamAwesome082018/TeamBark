//This file is for the post routes to hold the passport login and signin functionality
module.exports = function (app, passport) {
    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/createdog",
        failureRedirect: "/signin"
    }
    ));

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup"
    }
    ));
};
