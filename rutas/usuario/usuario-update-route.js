// ===================================================
// Rutas para la actualización de los datos de usuario
// ===================================================

var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Usuario = require('../../models/usuario');

// ===========================================================
// Actualizamos los datos personales del usuario
// ===========================================================
app.put('/personales', (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.nombre": body.datos_personales.nombre,
            "datos_personales.apellido": body.datos_personales.apellido,
            "datos_personales.dni": body.datos_personales.dni,
            "datos_personales.fecha_naci": body.datos_personales.fecha_naci,
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
                datos: datosGuardados
            });
        }
    });
});

// ==============================================
// Actualizamos los datos de contacto del usuario
// ==============================================
app.put('/contacto', (req, res) => {

    var body = req.body;
    var id = body.id;
    var contacto = body.contacto;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.contacto": contacto
        }
    }, (err, contactoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos personales',
                errors: err
            });
        }
        if (!contactoGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Contacto actualizado correctamente',
                contacto: contactoGuardado
            });
        }
    });

});

// ==================================
// Actualizamos la imagen del usuario
// ==================================


// ==============================================
// Actualizamos los datos de ubicación del usuario
// ==============================================


// ============================================
// Actualizamos los datos de acceso del usuario
// ============================================


// ==================================================================
// Actualizamos los datos laborales estudio y experiencia del usuario
// ==================================================================


// ==================================================
// Actualizamos los datos de los titutlos del usuario
// ==================================================


// ============================================
// Actualizamos los datos de cursos del usuario
// ============================================


// ===============================
// Actualizamos el rol del usuario
// ===============================


// =======================================
// Actualizamos la descripción del usuario
// =======================================






module.exports = app;