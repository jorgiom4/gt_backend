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
const utils = require('util');

// ================================================================================
// Creamos el proceso para el recuperado/reset de la contraseña del usuario/cliente
// ================================================================================
app.post('/', (req, res) => {

    const body = req.body;
    const mail = body.email;

    // Buscamos el usuario por email en la tabla de nuevos usuarios
    buscarNewUserByMail(mail)
        .then(usuario => {
            // Enviamos email con el token de seguridad para que puean cambiar la contraseña
            const tokenAccount = usuario.account_token;
            const enlace = urlHost + portHost + '/register/newpass/' + tokenAccount;

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

// ==============================================================================
// Buscamos el email en la tabla de nuevos usuarios para saber si está registrado
// ==============================================================================
function buscarNewUserByMail(mail){

    return new Promise((resolve, reject) => {

        NewUser.findOne({ "email": mail })
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

