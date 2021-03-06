// ============================
// Servicio de envio de emails
// ============================
const nodemailer = require('nodemailer');
const serverHost = require('../config/config').SERVER_SMPT;
const serverPort = require('../config/config').SERVER_SMPT_PORT;
const serverUser = require('../config/config').SERVER_SMPT_USER;
const serverPass = require('../config/config').SERVER_SMPT_PASS;
const serverFrom = require('../config/config').SERVER_SMPT_FROM;

// Enviamos el mail
exports.sendMail = (eTo, eSubject, eText) => {

    console.log("Dentro de mailservice");

    // Configuramos los datos del servidor SMTP
    const transporter = nodemailer.createTransport({
        host: serverHost,
        port: serverPort,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: serverUser,
            pass: serverPass
        }
    });

    // Seteamos los datos del envio
    const mailOptions = {
        from: serverFrom,
        to: eTo,
        subject: eSubject,
        html: eText
    };

    console.log("mailoptions: " + mailOptions.from + " " + mailOptions.to + " " + mailOptions.subject + " " + mailOptions.html);

    // Realizamos el envio del email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};
