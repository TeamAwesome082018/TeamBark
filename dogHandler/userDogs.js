const db = require("../models");
const cloudinary = require(`../cloudinary/cloudinary`);

module.exports = {
    createDog: async function (newDog, dogPhotoPath, userID) {
        //Add the user's ID to the new dog object, so we can assign the foreign key in the dogs table
        newDog.UserId = userID;
        newDog.photo_url = "";
        //Upload the image the user selected to cloudinary
        await cloudinary.uploader.upload(dogPhotoPath, function (error, result) {
            if (error) {
                throw error
            }
            //Get the image name and type from cloudinary and assign it to the user's dog they inputted
            newDog.photo_url = result.secure_url.split(`/`)[7];
            newDog.cloudinary_public_id = result.public_id;
        });

        // Write the new dog that was just inputted into the database
        await db.Dog.create(newDog).then(function (dbDog) {
            console.log("Success")
        });
        //Must have return outside of the functions above to get the await working
        return userID
    },
    getUserDogs: async function (userID) {
        const user = {};
        user.userProfile = {};
        user.userDogsArray = [];
        user.userProfile.id = userID;
        //First get the username from the user table
        await db.User.findOne({ where: { id: userID } }).then(function (userInfo) {
            user.userProfile.userName = `${userInfo.firstname} ${userInfo.lastname}`
        });

        //Then query the dogs database to get all the dogs that belong to that user
        await db.Dog.findAll({ where: { UserId: userID } }).then(function (dogs) {
            //Gets all the dogs and adds it to the userProfile object to then display to the user
            dogs.forEach(function (dog, index) {
                const userDog = {};
                userDog.name = dog.dog_name;
                userDog.picture = dog.photo_url;
                user.userDogsArray.push(userDog);
            });
        });
        return user;
    }
};