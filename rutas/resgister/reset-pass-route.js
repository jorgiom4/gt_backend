// ================================================================
// Endpoints para la recuperación de contraseña del usuario/cliente
// ================================================================
const express = require('express');
const app = express();
const urlHost = require('../../config/config').SERVER_HOST_DEV;
const portHost = require('../../config/config').SERVER_HOST_DEV_PORT;
const htmlEmail = require('../../middlewares/htmlemail');
const mailService = require('../../middlewares/mailservice');
const NewUser = require('../../models/new-user');

// ================================================================================
// Creamos el proceso para el recuperado/reset de la contraseña del usuario/cliente
// ================================================================================
app.post('/', (req, res) => {

    const body = req.body;
    const mail = body.email;

    // Buscamos el usuario por email en la tabla de nuevos usuarios
    buscarNewUserByMail(mail)
        .then(usuario => {

            console.log("Usuario encontrado: " + usuario);

            // Enviamos email con el token de seguridad para que puean cambiar la contraseña
            var userRandom = usuario.randomText;
            const urlServer = urlHost + portHost + '/register/newpass/' + userRandom;

            console.log("userRandom: " + userRandom);
            console.log("Reset de contraseña url en mail: " + urlServer);

            const texto = htmlEmail.getHtmlForResetPass(enlace);
            mailService.sendMail(mail, "Geritronic - Recuperación contraseña", texto);

            res.status(200).json({
                ok: true,
                usuario: usuario
            });
        }).catch(err => {
            res.status(500).json({
                ok: false,
                error: err
            });
    });

});

function buscarNewUserByMail(mail){

    return new Promise((resolve, reject) => {

        NewUser.find({ "email": mail })
            .exec((err, usuario) => {

                if (err) {
                    reject('Error al buscar nuevo usuario con email: ' + mail + '', err);
                }
                if (Object.keys(usuario).length <= 0) {
                    reject('No se ha encontrado nuevo usuario con email: ' + mail);
                } else {
                    resolve(usuario);
                }
            });
    });
}


module.exports = app;

