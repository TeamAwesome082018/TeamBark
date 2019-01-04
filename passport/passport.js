const bCrypt = require('bcrypt-nodejs');
const zipcodes = require('zipcodes')

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {

        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function (req, email, password, done) {
            //First input validation checking, then onto passport signup
            //Email isn't case sensitive in passport

            //Getting the phone number & zip code into a standardized format
            let phone_number = "";
            //Converts the inputted number into an array, gets rid of all the spaces and adds only the numbers onto a string
            req.body.phone_number.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { phone_number += item } });

            let zip = "";
            req.body.zip.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { zip += item } });

            //Checks if the zip code inputted is a valid US zip
            if (typeof zipcodes.lookup(zip) === "undefined") {
                return done(null, false, {
                    message: "Please input a valid US zip"
                });
            };

            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    const userPassword = generateHash(password);
                    const data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        zip: zip,
                        phone_number: phone_number
                    };

                    User.create(data)
                        .catch(function (err) {
                            console.log("Error:", err);
                            return done(null, false, {
                                message: 'Something went wrong with your Sign Up'
                            });
                        })
                        .then(function (newUser, created) {
                            if (!newUser) {
                                return done(null, false);
                            }
                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            const User = user;
            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                const userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
};