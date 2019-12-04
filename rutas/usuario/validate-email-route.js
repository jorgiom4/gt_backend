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

app.get('/', (req, res) => {

    var token = req.query.token;

    console.log("Token usuario: " + token);

    UsuarioNuevo.find({ 'randomTe': token }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al validar token nuevo usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el token ' + token + ' no existe',
                errors: { message: 'No existe un usuario con ese token' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Email de usuario validado corretamente',
            usuario: usuario
        });

    });

});

module.exports = app;