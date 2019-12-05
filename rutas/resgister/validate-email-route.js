// ================================================================================
// Proceso de validación del correo electronico del cliente, el cliente ha recibido
// el correo y ha pulsado en el enlace para su validación
// ================================================================================

var express = require('express');
var UsuarioNuevo = require('../../models/new-user');

var app = express();

// ================================================================================
// Validamos contra la base de datos el email del usuario con el token generado
// ================================================================================
app.get('/:token', (req, res) => {

    var token = req.params.token;

    console.log("Token usuario: " + token);

    var promesa = buscarNuevoUsuarioByToken(token);

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            usuario: data
        });
    }, (err) => {
        console.log(err);
        res.status(400).json({
            ok: false,
            error: err,
            mensaje: "Error al validar nuevo usuario."
        });
    });

});

// =================================
// Buscamos usuario por nombre
// =================================
function buscarNuevoUsuarioByToken(token) {
    return new Promise((resolve, reject) => {

        UsuarioNuevo.findOne({ randomText: token })
            .exec((err, usuario) => {
                if (err) {
                    reject('Error al buscar el usuario con token: ' + token + '', err);
                }
                if (!usuario) {
                    reject('Error al buscar el usuario con token: ' + token + '', err);
                } else {

                    // Comprobamos que el token sigue vigente y no ha caducado
                    var fechaActual = new Date().toISOString();
                    var fechaExp = new Date(usuario.dateExp).toISOString();
                    if (fechaExp < fechaActual) {
                        reject('El token introducido ha caducado el: ' + fechaExp + '', err);
                    } else {
                        resolve(usuario);
                    }
                }
            });
    });
}

module.exports = app;