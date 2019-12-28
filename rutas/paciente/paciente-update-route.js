// ====================================================
// Rutas para la actualización de los datos de paciente
// ====================================================
var express = require('express');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Roles = require('../../models/role');

// =============================================
// Actualizamos los datos personales del cliente
// Se guardan todos los datos en conjunto
// =============================================
app.put('/personales', verificaToken, (req, res) => {
    var body = req.body;
    var id = body.id;

    Paciente.findByIdAndUpdate(id, {
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
                mensaje: 'No se ha encontrado paciente con ID: ' + id,
                error: 'No se ha encontrado paciente con ID: ' + id
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
// Actualizamos los datos de la ficha del cliente
// Se guardan todos los datos en conjunto
// ==============================================
app.put('/ficha', verificaToken, (req, res) => {
    var body = req.body;
    var id = body.id;

    Paciente.findByIdAndUpdate(id, {
        $set: {
            "datos_ficha.tlfEmerSanitaria": body.datos_ficha.tlfEmerSanitaria,
            "datos_ficha.tlfSegMedico": body.datos_ficha.tlfSegMedico,
            "datos_ficha.grpSanguineo": body.datos_ficha.grpSanguineo,
            "datos_ficha.fnacimiento": body.datos_ficha.fnacimiento,
            "datos_ficha.sexo": body.datos_ficha.sexo,
            "datos_ficha.numSegSocial": body.datos_ficha.numSegSocial,
            "datos_ficha.segMedico": body.datos_ficha.segMedico,
            "datos_ficha.numTarSanitaria": body.datos_ficha.numTarSanitaria
        }
    }, (err, datosGuardados) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos de ficha',
                errors: err
            });
        }
        if (!datosGuardados) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado paciente con ID: ' + id,
                error: 'No se ha encontrado paciente con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Datos de ficha actualizados correctamente',
                datos: body.datos_personales
            });
        }
    });
});

// ===============================================
// Actualizamos los datos de contacto del paciente
// ===============================================
app.put('/contacto', verificaToken, (req, res) => {

    var body = req.body;
    var idc = body.contacto.idc;

    var update = {
        nombre: body.contacto.nombre,
        tlf: body.contacto.tlf
    };

    Paciente.updateOne({ "datos_personales.contacto._id": idc }, { $set: { "datos_personales.contacto.$": update } })
        .exec((err, contactoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar contacto del paciente',
                    errors: err
                });
            }
            if (!contactoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado contacto con ID: ' + idc,
                    error: 'No se ha encontrado contacto con ID: ' + idc
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

// ===========================================
// Actualizamos los datos de las observaciones
// ===========================================
app.put('/observa', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.observacion.id;

    var update = {
        observ: body.observacion.observ,
        fecha: body.observacion.fecha
    };

    Paciente.updateOne({ "datos_ficha.observaciones._id": id }, { $set: { "datos_ficha.observaciones.$": update } })
        .exec((err, observaActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar observación del paciente',
                    errors: err
                });
            }
            if (!observaActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado observación con ID: ' + id,
                    error: 'No se ha encontrado observación con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Observación actualizado correctamente',
                    contacto: observaActualizado
                });
            }
        });
});


module.exports = app;