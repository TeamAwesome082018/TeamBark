$(`.errorMessage`).hide();

const validateSignUp = () => {
    //Grabs the user inputs
    const phoneInput = $(".phone_number").val();
    const zipInput = $(".zip").val();
    const passwordInput = $(".password").val();

    //Sets up the phone number and zip for future manipulation
    let phone_number = "";
    let zip = "";
    const errorArray = []; //Error array collects the errors then writes them to the screen

    //Getting the phone number & zip code into a standardized format
    //Converts the inputted number into an array, gets rid of all the spaces and adds only the numbers onto a string
    if (phoneInput != "") {
        phoneInput.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { phone_number += item } });
    };
    if (zipInput != "") {
        //TODO Test zipcodes on the front end
        //Currently a zip is tested if it's blank on the front end but tested if it's valid on the back end
        zipInput.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { zip += item } });
    };

    //Returns the error code which will be used later to break out of this function
    if (zip.length != 5 || zipInput === "") {
        errorArray.push("Zip must be a 5 digit US zip");
    };
    if (passwordInput === "" || passwordInput.length < 6) {
        errorArray.push("Password must be 6 characters long");
    };
    if (phone_number.length != 10 || phoneInput === "") {
        errorArray.push("Phone Number must be 10 digit US Phone Number")
    };

    //Checks if there are any errors, if so display them all to the screen
    if (errorArray.length > 0) {
        const errorDiv = $("<div>");
        errorArray.forEach(error => {
            errorDiv.append(`<p>${error}</p>`)
        });
        $(".errorMessages").append(errorDiv);
        event.preventDefault();
    };
};

