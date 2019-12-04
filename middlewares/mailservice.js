// ============================
// Servicio de envio de emails
// ============================
var nodemailer = require('nodemailer');
var serverHost = require('../config/config').SERVER_SMPT;
var serverPort = require('../config/config').SERVER_SMPT_PORT;
var serverUser = require('../config/config').SERVER_SMPT_USER;
var serverPass = require('../config/config').SERVER_SMPT_PASS;
var serverFrom = require('../config/config').SERVER_SMPT_FROM;

// Enviamos el mail
exports.sendMail = (eTo, eSubject, eText) => {

    // Configuramos los datos del servidor SMTP
    var transporter = nodemailer.createTransport({
        host: serverHost,
        port: serverPort,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: serverUser,
            pass: serverPass
        }
    });

    // Seteamos los datos del envio
    var mailOptions = {
        from: serverFrom,
        to: eTo,
        subject: eSubject,
        html: eText
    };

    //console.log("mailoptions: " + mailOptions.from + " " + mailOptions.to + " " + mailOptions.subject + " " + mailOptions.html);

    // Realizamos el envio del email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};