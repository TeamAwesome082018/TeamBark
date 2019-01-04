$(`.errorMessage`).hide();

const validateSignUp = () => {
    let phoneInput = $(".phone_number").val();
    let zipInput = $(".zip").val();
    let phone_number = "";
    let zip = "";
    const errorArray = []; //Error array collects the errors then writes them to the screen

    event.preventDefault();

    if (phoneInput === "") {
        phoneInput = "BadData";
    } else {
        //Getting the phone number & zip code into a standardized format
        //Converts the inputted number into an array, gets rid of all the spaces and adds only the numbers onto a string
        phoneInput.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { phone_number += item } });
    };
    if (zipInput === "") {
        //TODO Test zipcodes on the front end
        //Currently a zip is tested if it's blank on the front end but tested if it's valid on the back end
        zipInput = "BadData";
    } else {
        zipInput.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { zip += item } });
    };
    console.log(phoneInput, zipInput, phone_number, zip);
    // //Returns the error code which will be used later to break out of this function
    // //TODO Make this an array, logging each of the errors and displaying them at once
    // if (typeof zipcodes.lookup(zip) === "undefined") {
    //     return 1;
    // };
    // if (!password || password.length < 6) {
    //     return 2;
    // };
    // if (phone_number.length != 10) {
    //     return 3
    // };

    // //Doing this to break out of the signup function before going to submit it to the database
    // if (inputErrors === 1) {
    //     return done(null, false, {
    //         message: "Please input a valid US zip"
    //     });
    // } else if (inputErrors === 2) {
    //     return done(null, false, {
    //         message: "Please input a password at least 6 characters long"
    //     });
    // } else if (inputErrors === 3) {
    //     return done(null, false, {
    //         message: "Please input a US phone number ex. 123-456-7890"
    //     });
    // };
};

