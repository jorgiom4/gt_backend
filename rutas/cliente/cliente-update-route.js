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

// ==============================================
// Actualizamos los datos de contacto del cliente
// ==============================================
app.put('/contacto', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var idc = body.contacto.idc;

    var update = {
        tlf: body.contacto.tlf
    };

    Cliente.updateOne({ "datos_personales.contacto._id": idc }, { $set: { "datos_personales.contacto.$": update } })
        .exec((err, contactoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar contacto del cliente',
                    errors: err
                });
            }
            if (!contactoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado contacto con ID: ' + idcon,
                    error: 'No se ha encontrado contacto con ID: ' + idcon
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Contacto actualizado correctamente',
                    contacto: contactoActualizado
                });
            }
        });
});

// ==================================
// Actualizamos la imagen del cliente
// ==================================
app.put('/img', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var img = body.img;

    Cliente.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.img": img
        }
    }, (err, imgGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la imagen del cliente',
                errors: err
            });
        }
        if (!imgGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen actualizada correctamente',
                img: img
            });
        }
    });
});

// ========================================================
// Actualizamos los datos de ubicación del cliente
// Se guardan los dos datos latitud y longuitud en conjunto
// ========================================================
app.put('/ubicacion', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var ubicacion = body.ubicacion;

    Cliente.findByIdAndUpdate(id, {
        $set: {
            "ubicacion": ubicacion
        }
    }, (err, ubicacionGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la ubicación del cliente',
                errors: err
            });
        }
        if (!ubicacionGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Ubicación actualizada correctamente',
                ubicacion: ubicacion
            });
        }
    });
});


module.exports = app;