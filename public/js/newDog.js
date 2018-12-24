//This file is to get the new dog working with the Sequelize / Cloudinary and to keep it seperate from the rest of the app
$(`.fileUpload`).on(`change`, (event) => {
    //TODO Input validation to ensure it's a jpeg
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile)
});

$(`.newDogSubmit`).on(`click`, () => {
    const newDog = {
        dog_name: $(`.inputDogName`).val(),
        breed: $(`.inputBreed`).val(),
    };
    $.post(`/api/dog`, newDog).then((thing) => { console.log(thing) }); //The then needs to have a redirect to the user info / dog page
});