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
const randomstring = require("randomstring");
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

            //Comprobamos si el usuario está activo y validado
            if(!usuario.active || !usuario.valid){
                res.status(500).json({
                    ok: false,
                    mensake: 'El usuario no está activo o no está validado'
                });
            }else{

                // Generemos el pass_token del usuario
                const tokenPass = randomstring.generate(128);

                // Guardamos el pass_token del usuario nuevo
                setNewUserPassToken(usuario._id, tokenPass)
                    .then(updateUser => {

                        // Enviamos email con el token de seguridad para que puean cambiar la contraseña
                        const enlace = urlHost + portHost + '/register/newpass/' + tokenPass;

                        const texto = htmlEmail.getHtmlForResetPass(enlace);
                        mailService.sendMail(mail, "Geritronic - Recuperación contraseña", texto);

                        // Enviamos respuesta de la operacion
                        res.status(200).json({
                            ok: true,
                            usuario: usuario
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            ok: false,
                            error: err
                        });
                    });
            }

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

// ==================================================================
// Insertamos el pass_token en el usuario nuevo para poder realizar
// operaciones de cambio de contraseña por olvido
// ==================================================================
function setNewUserPassToken(id, token){

    // Creamos las fechas de creación y expiracion
    const fecha = new Date();
    const isoDate = fecha.toISOString();
    const fechaToken = new Date(isoDate);
    const fechaAux = new Date(fechaToken);
    // El token expira en un dia
    const fechaExp = new Date(fechaAux.setDate(fechaAux.getDate() + 1)).toISOString();

    return new Promise((resolve, reject) => {

        NewUser.findByIdAndUpdate(id, {
            $set: {
                "pass_token.token": token,
                "pass_token.dateAdd": isoDate,
                "pass_token.dateExp": fechaExp
            }
        }, (err, usuario) => {
            if (err) {
                reject('Error al actualizar el usuario con id: ' + id);
            }
            if (!usuario) {
                reject('Error al actualizar el usuario con id: ' + id);
            } else {
                resolve(usuario);
            }
        });
    });
}

module.exports = app;

