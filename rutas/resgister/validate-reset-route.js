// ========================================================================
// Endpoints para validar la recuperación de contraseña del usuario/cliente
// ========================================================================
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const urlHost = require('../../config/config').SERVER_HOST_DEV;
const portHost = require('../../config/config').SERVER_HOST_DEV_PORT;
const mailService = require('../../middlewares/mailservice');
const Registro = require('../../models/registros');
const Usuario = require('../../models/usuario');
const Cliente = require('../../models/cliente');
const utils = require('util');

// =================================
// Validamos el cambio de contraseña
// =================================
app.put('/', (req, res) => {

    const body = req.body;

    // Comprobamos si el token enviado está vigente
    buscarRegistroByMail(body.email)
        .then(registro => {

            console.log("Datos de registro: " + registro);

            // Vemos si se trata de usuario o cliente
            if(registro.role === 'USER_ROL'){

                // Obtenemos su ID de la tabla de usuario
                getIdByEmail(registro.role, body.email)
                    .then(usuario => {
                        updateUserPass(usuario._id, body.newpass)
                            .then(cuenta => {
                                return res.status(200).json({
                                    ok: true,
                                    mensaje: 'Dentro de validación de cambio de contraseña',
                                    cuenta: cuenta
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    ok: false,
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            ok: false,
                            error: err
                        });
                    });
            }else{
                updateClientePass(usuario._id, body.newpass)
                    .then(cuenta => {
                        return res.status(200).json({
                            ok: true,
                            mensaje: 'Dentro de validación de cambio de contraseña',
                            cuenta: cuenta
                        });
                    })
                    .catch(err => {
                        return res.status(200).json({
                            ok: false,
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        });
});


// ==============================================================================
// Buscamos el email en la tabla de registros para saber si está registrado
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
                    // Comprobamos que el token sigue vigente y no ha caducado
                    var fechaActual = new Date();
                    var fechaExp = new Date(usuario.pass_token.dateExp);
                    if (fechaActual > fechaExp) {
                        reject('El token introducido ha caducado el: ' + fechaExp + '', err);
                    } else {
                        resolve(usuario);
                    }
                }
            });
    });
}

// ==========================================================
// Obtenemos el id de usuario o cliente partiendo de su email
// ==========================================================
function getIdByEmail(rol, email){

    console.log("Dentro de getIdByEmail, rol: " + rol + " email: " + email);

    return new Promise((resolve, reject) => {
        if(rol === 'USER_ROL'){
            Usuario.findOne({"datos_acceso.email": email}, (err, usuario) => {
                if(err){
                    reject('Error al buscar usuario con email: ' + email);
                }else{
                    resolve(usuario);
                }
            });
        }else{
            Cliente.findOne({"datos_acceso.email": email}, (err, cliente) => {
                if(err){
                    reject('Error al buscar cliente con email: ' + email);
                }else{
                    resolve(cliente);
                }
            });
        }
    });
}

// ======================================
// Actualizamos la contraseña del usuario
// ======================================
function updateUserPass(id, pass){

    console.log("Dentro de updateUserPass, id: " + id + " pass: " + pass);

    return new Promise((resolve, reject) => {

        Usuario.findByIdAndUpdate(id, {
            $set: {
                "datos_acceso.pass": bcrypt.hashSync(pass, 10),
            }
        }, (err, cuenta) => {
            if (err) {
                reject('Error al actualizar la contraseña del usuario con id: ' + id);
            }
            if (!cuenta) {
                reject('Error al actualizar la contraseña del usuario con id: ' + id);
            } else {
                resolve(cuenta);
            }
        });
    });
}

// ======================================
// Actualizamos la contraseña del cliente
// ======================================
function updateClientePass(id, pass){

    return new Promise((resolve, reject) => {

        Cliente.findByIdAndUpdate(id, {
            $set: {
                "pass_token.token": bcrypt.hashSync(pass, 10),
            }
        }, (err, cuenta) => {
            if (err) {
                reject('Error al actualizar la contraseña del cliente con id: ' + id);
            }
            if (!cuenta) {
                reject('Error al actualizar la contraseña del cliente con id: ' + id);
            } else {
                resolve(cuenta);
            }
        });
    });
}


module.exports = app;
