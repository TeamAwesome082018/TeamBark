const db = require("../models");
const cloudinary = require(`../cloudinary/cloudinary`);

module.exports = {
    //TODO have error handling if the user doesn't upload a dog photo, or have a placeholder photo until they do
    createDog: async function (newDog, dogPhotoPath, userID) {
        //Add the user's ID to the new dog object, so we can assign the foreign key in the dogs table
        newDog.UserId = userID;
        newDog.photo_url = "";
        console.log(dogPhotoPath)
        //Upload the image the user selected to cloudinary
        await cloudinary.uploader.upload(dogPhotoPath, function (error, result) {
            if (error) {
                throw error
            }
            //Get the image name and type from cloudinary and assign it to the user's dog they inputted
            //The photo_url is what cloudinary assigned as the file name along with the type (jpeg or png)
            newDog.photo_url = result.secure_url.split(`/`)[7];
            newDog.cloudinary_public_id = result.public_id;
        });

        // Write the new dog that was just inputted into the database
        await db.Dog.create(newDog).then(function (dbDog) {
            console.log("Success");
            console.log(newDog);
        });
        //Must have return outside of the functions above to get the await working
        return userID
    },
    getUserDogs: async function (userID, loggedInID) {
        //Build the user object so we can move it to handlebars to display
        const user = {};
        user.userProfile = {};
        user.userDogsArray = [];
        user.userProfile.id = userID;

        //First get the username from the user table
        await db.User.findOne({ where: { id: userID } }).then(function (userInfo) {
            user.userProfile.userName = `${userInfo.firstname} ${userInfo.lastname}`
        });

        //Checking if the current user logged in is the owner of this dog
        //We use this to display the update route
        if (+userID === loggedInID) {
            user.userProfile.isCurrentUser = true;
        };

        //Then query the dogs database to get all the dogs that belong to that user
        await db.Dog.findAll({ where: { UserId: userID } }).then(function (dogs) {
            //Gets all the dogs and adds it to the userProfile object to then display to the user
            dogs.forEach(function (dog) {
                const userDog = {};
                userDog.name = dog.dog_name;
                userDog.picture = dog.photo_url;
                userDog.id = dog.id;
                user.userDogsArray.push(userDog);
            });
        });
        return user;
    },
    updateDog: async function (updatedDog, dogPhotoPath) {
        let userID = "";
        //When querying the dog database pull the userID
        await db.Dog.findOne({ where: { id: updatedDog.id } }).then(function (dog) {
            userID = dog.UserId;
        });

        //If they inputted a new name for the dog then this updates it
        if (updatedDog.dog_name !== "") {
            await db.Dog.update({ dog_name: updatedDog.dog_name }, { where: { id: updatedDog.id } })
        };
        // updatedDog.id updatedDog.dog_name
        if (dogPhotoPath) {
            let photoURL = "";
            const newDog = {};
            //This is to grab the photo values from the dog object to manipulate it with cloudinary
            await db.Dog.findOne({ where: { id: updatedDog.id } }).then(function (dog) {
                photoURL = dog.photo_url;
            });
            await cloudinary.uploader.destroy(photoURL, function (error, result) {
                if (error) {
                    throw error
                }
                console.log("Deleted")
            });
            await cloudinary.uploader.upload(dogPhotoPath, function (error, result) {
                if (error) {
                    throw error
                }
                //Get the image name and type from cloudinary and assign it to the user's dog they inputted
                //The photo_url is what cloudinary assigned as the file name along with the type (jpeg or png)
                newDog.photo_url = result.secure_url.split(`/`)[7];
                newDog.cloudinary_public_id = result.public_id;
            });
            await db.Dog.update({ photo_url: newDog.photo_url, cloudinary_public_id: newDog.cloudinary_public_id }, { where: { id: updatedDog.id } })
        }
        return userID
    }, deleteDog: async function (dogID) {
        let userID = "";
        let dogCloudinaryURL = "";
        await db.Dog.findOne({ where: { id: dogID } }).then(function (dog) {
            userID = dog.UserId;
            dogCloudinaryURL = dog.cloudinary_public_id;
        });

        await cloudinary.uploader.destroy(dogCloudinaryURL, function (error, result) {
            if (error) {
                throw error
            }
            console.log("Deleted")
        });

        await db.Dog.destroy({ where: { id: dogID } });

        return userID;
    }
};