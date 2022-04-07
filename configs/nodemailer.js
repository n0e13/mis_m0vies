const nodemailer = require('nodemailer');

//TODO: Esto es necesario?
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "fullmovies.team@gmail.com",
        pass: "Meencantamac-2022"
    }
});

module.exports = transporter;