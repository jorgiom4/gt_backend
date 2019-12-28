// ================================================================================
// Proceso de validación del correo electronico del cliente, el cliente ha recibido
// el correo y ha pulsado en el enlace para su validación
// ================================================================================

const express = require('express');
const UsuarioNuevo = require('../../models/registros');
const app = express();

// ============================================================================
// Validamos contra la base de datos el email del usuario con el token generado
// ============================================================================
app.get('/:token', (req, res) => {

    const token = req.params.token;

    buscarNuevoUsuarioByToken(token)

    .then(data => {

            // Actualizamos el estado de la validación para confirmar el proceso y la cuenta del usuario/cliente pase a estar validada y activa
            actualizaValidacionUsuario(data)

            .then(data => {

                    console.log("Proceso de validación de nuevo usuario OK");

                    res.status(200).json({
                        ok: true,
                        usuario: data
                    });

                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({
                        ok: false,
                        error: err,
                        mensaje: "Error al validar nuevo usuario."
                    });
                });

        })
        .catch(err => {
            console.log(err);

            res.status(400).json({
                ok: false,
                error: err,
                mensaje: "Error al validar nuevo usuario."
            });
        });

});

// ============================
// Buscamos usuario por nombre
// ============================
function buscarNuevoUsuarioByToken(token) {

    return new Promise((resolve, reject) => {

        UsuarioNuevo.findOne({ "account_token.token": token })
            .exec((err, usuario) => {
                if (err) {
                    reject('Error al buscar el usuario con token: ' + token + '', err);
                }
                if (!usuario) {
                    reject('Error al buscar el usuario con token: ' + token + '', err);
                } else {

                    // Comprobamos que el token sigue vigente y no ha caducado
                    var fechaActual = new Date();
                    var fechaExp = new Date(usuario.account_token.dateExp);
                    if (fechaActual > fechaExp) {
                        reject('El token introducido ha caducado el: ' + fechaExp + '', err);
                    } else {
                        resolve(usuario);
                    }
                }
            });
    });
}

// ==============================================================
// Actualizamos en BD para activar y validar la cuenta de usuario
// ==============================================================
function actualizaValidacionUsuario(usuario) {

    return new Promise((resolve, reject) => {

        UsuarioNuevo.updateOne({ _id: usuario._id }, { $set: { active: true, valid: true } })
            .exec((err, usuarioActualizado) => {
                if (err) {
                    reject('Error al actualizar la cuenta del usuario con token: ' + token + '', err);
                }
                if (!usuarioActualizado) {
                    reject('Error al actualizar la cuenta del usuario no se ha encontrado el usuario con id: ' + usuario._id + '', err);
                } else {
                    resolve(usuario);
                }
            });
    });

}

module.exports = app;
