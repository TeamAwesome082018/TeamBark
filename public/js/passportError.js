$(`.errorMessage`).hide();

const validateSignUp = () => {

};

// //Getting the phone number & zip code into a standardized format
// let phone_number = "";
// //Converts the inputted number into an array, gets rid of all the spaces and adds only the numbers onto a string
// req.body.phone_number.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { phone_number += item } });

// let zip = "";
// req.body.zip.trim().replace(/\s+/g, '').split("").forEach(item => { if (!isNaN(item)) { zip += item } });

// //Input Verification
// const inputChecking = function (password, zip, phone_number) {
//     //Returns the error code which will be used later to break out of this function
//     //TODO Make this an array, logging each of the errors and displaying them at once
//     if (typeof zipcodes.lookup(zip) === "undefined") {
//         return 1;
//     };
//     if (!password || password.length < 6) {
//         return 2;
//     };
//     if (phone_number.length != 10) {
//         return 3
//     };
// };

// const inputErrors = inputChecking(password, zip, phone_number);

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