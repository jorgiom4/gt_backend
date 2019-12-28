// ================================================================
// Endpoints para la recuperación de contraseña del usuario/cliente
// ================================================================
const express = require('express');
const app = express();
const urlHost = require('../../config/config').SERVER_HOST_DEV;
const portHost = require('../../config/config').SERVER_HOST_DEV_PORT;
const htmlEmail = require('../../middlewares/htmlemail');
const mailService = require('../../middlewares/mailservice');
const Registro = require('../../models/registros');
const randomstring = require("randomstring");

// ================================================================================
// Creamos el proceso para el recuperado/reset de la contraseña del usuario/cliente
// ================================================================================
app.post('/', (req, res) => {

    const body = req.body;
    const mail = body.email;

    // Buscamos el usuario por email en la tabla de registro
    buscarRegistroByMail(mail)
        .then(cuenta => {

            //Comprobamos si la cuenta está activa y validado
            if(!cuenta.active || !cuenta.valid){
                res.status(500).json({
                    ok: false,
                    mensake: 'La cuenta  no está activa o no está validada'
                });
            }else{

                // Generemos el pass_token del usuario
                const tokenPass = randomstring.generate(128);

                // Guardamos el pass_token del usuario nuevo
                setRegistroPassToken(cuenta._id, tokenPass)
                    .then(updateUser => {

                        // Enviamos email con el token de seguridad para que puean cambiar la contraseña
                        const enlace = urlHost + portHost + '/register/newpass/' + tokenPass;

                        const texto = htmlEmail.getHtmlForResetPass(enlace);
                        mailService.sendMail(mail, "Geritronic - Recuperación contraseña", texto);

                        // Enviamos respuesta de la operacion
                        res.status(200).json({
                            ok: true,
                            cuenta: cuenta
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
function buscarRegistroByMail(mail){

    return new Promise((resolve, reject) => {

        Registro.findOne({ "email": mail })
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
function setRegistroPassToken(id, token){

    // Creamos las fechas de creación y expiracion
    const fecha = new Date();
    const isoDate = fecha.toISOString();
    const fechaToken = new Date(isoDate);
    const fechaAux = new Date(fechaToken);
    // El token expira en un dia
    const fechaExp = new Date(fechaAux.setDate(fechaAux.getDate() + 1)).toISOString();

    return new Promise((resolve, reject) => {

        Registro.findByIdAndUpdate(id, {
            $set: {
                "pass_token.token": token,
                "pass_token.dateAdd": isoDate,
                "pass_token.dateExp": fechaExp
            }
        }, (err, cuenta) => {
            if (err) {
                reject('Error al actualizar la cuenta con id: ' + id);
            }
            if (!cuenta) {
                reject('Error al actualizar la cuenta con id: ' + id);
            } else {
                resolve(cuenta);
            }
        });
    });
}

module.exports = app;

