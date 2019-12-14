// ===================================================
// Rutas para la actualización de los datos de cliente
// ===================================================

var express = require('express');
var bcrypt = require('bcryptjs');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Cliente = require('../../models/cliente');
var Roles = require('../../models/role');

// =============================================
// Actualizamos los datos personales del cliente
// Se guardan todos los datos en conjunto
// =============================================
app.put('/personales', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;

    Cliente.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.nombre": body.datos_personales.nombre,
            "datos_personales.apellido": body.datos_personales.apellido,
            "datos_personales.dni": body.datos_personales.dni,
            "datos_personales.direc": body.datos_personales.direc,
            "datos_personales.city": body.datos_personales.city,
            "datos_personales.cp": body.datos_personales.cp,
            "datos_personales.locali": body.datos_personales.locali
        }
    }, (err, datosGuardados) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos personales',
                errors: err
            });
        }
        if (!datosGuardados) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Datos personales actualizados correctamente',
                datos: body.datos_personales
            });
        }
    });
});


module.exports = app;