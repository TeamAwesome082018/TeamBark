const cloudinary = require(`cloudinary`).v2;

cloudinary.config({
    cloud_name: 'smushed',
    api_key: '753626427667399',
    api_secret: 'yeU5XwznfoPWEr7W6WtAoYLmgj8'
});

module.exports = cloudinary;