const cloudinary = require(`../cloudinary/cloudinary`);

//This file is for the post routes to hold the Cloudinary image saving and gathering functionality
module.exports = function (app) {
    app.post(`/api/newDogPhoto`, function (req, res) {
        const uploadedImage = req.files;
        console.log(JSON.stringify(uploadedImage))
        cloudinary.uploader.upload(uploadedImage, function (error, result) {
            console.log(result, error);
            res.json(result);
        });
    });

    //TODO Make this a get route
    // app.post("/signup", passport.authenticate("local-signup", {
    //     successRedirect: "/",
    //     failureRedirect: "/signup"
    // }
    // ));
};
