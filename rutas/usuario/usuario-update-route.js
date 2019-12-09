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
                datos: body.datos_personales
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
                contacto: contacto
            });
        }
    });
});

// ==================================
// Actualizamos la imagen del usuario
// ==================================
app.put('/img', (req, res) => {

    var body = req.body;
    var id = body.id;
    var img = body.img;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.img": img
        }
    }, (err, imgGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la imagen del usuario',
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

// ==============================================
// Actualizamos los datos de ubicación del usuario
// ==============================================
app.put('/ubicacion', (req, res) => {

    var body = req.body;
    var id = body.id;
    var ubicacion = body.ubicacion;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "ubicacion": ubicacion
        }
    }, (err, ubicacionGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la ubicación del usuario',
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

// ============================================
// Actualizamos el email del usuario
// ============================================
app.put('/email', (req, res) => {
    var body = req.body;
    var id = body.id;
    var email = body.email;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_acceso.email": email
        }
    }, (err, emailGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el email del usuario',
                errors: err
            });
        }
        if (!emailGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Email actualizado correctamente',
                email: email
            });
        }
    });
});

// ============================================
// Actualizamos la contraseña
// ============================================
app.put('/pass', (req, res) => {
    var body = req.body;
    var id = body.id;
    var pass = body.pass;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_acceso.pass": bcrypt.hashSync(pass, 10)
        }
    }, (err, passGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la contraseña del usuario',
                errors: err
            });
        }
        if (!passGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Contraseña actualizada correctamente',
                pass: ':-)'
            });
        }
    });
});

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