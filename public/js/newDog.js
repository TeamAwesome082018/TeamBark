//This file is to get the new dog working with the Sequelize / Cloudinary and to keep it seperate from the rest of the app
$(`.fileUpload`).on(`change`, (event) => {
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile)
});

//TODO Look into Multer for sending the image from the front end to the server
$(`.newDogSubmit`).on(`click`, () => {
    const uploadedPhoto = $(`.fileUpload`)[0].files[0];
    //Needs to be const uploadedPhoto = $(`.fileUpload`)[0].files[0];
    console.log(uploadedPhoto)
    //Currently it's this line that's breaking
    //I don't think it likes this being sent as a post request, it's giving me this error:
    // Uncaught TypeError: Illegal invocation
    $.post({ url: `/api/newDogPhoto`, data: uploadedPhoto, processData: false }).then((cloudinaryURL) => { console.log(cloudinaryURL) })
    const newDog = {
        dog_name: $(`.inputDogName`).val(),
        breed: $(`.inputBreed`).val(),
        photo_url: "TODO"
    };
    console.log(newDog)
    // $.post(`/api/dog`, newDog).then((thing) => { console.log(thing) }); //The then needs to have a redirect to the user info / dog page
});