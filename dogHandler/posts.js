const db = require("../models");

module.exports = {
    //TODO have error handling if the user doesn't upload a post photo, or have a placeholder photo until they do
    createPost: async function (newPost, userID, ) {
        //Add the user's ID to the new post object, so we can assign the foreign key in the posts table
        newPost.UserId = userID;

        // Write the new post that was just inputted into the database
        await db.Posts.create(newPost).then(function (dbPost) {
            console.log("Success")
            console.log(newPost);
            console.log(dbPost);
        });
        //Must have return outside of the functions above to get the await working
        return userID
    }
};