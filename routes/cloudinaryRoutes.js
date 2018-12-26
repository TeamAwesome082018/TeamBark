const cloudinary = require(`cloudinary`).v2;

//This file is for the post routes to hold the Cloudinary image saving and gathering functionality
module.exports = function (app) {
    app.post(`/api/newDogPhoto`, function (req, res) {
        console.log(req.body)
        // cloudinary.v2.uploader.upload(uploadedImage, function (error, result) {
        //     console.log(result, error);
        //     res.json(result);
        // });
    });

    //TODO Make this a get route
    // app.post("/signup", passport.authenticate("local-signup", {
    //     successRedirect: "/",
    //     failureRedirect: "/signup"
    // }
    // ));
};
