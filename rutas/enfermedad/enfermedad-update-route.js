// ======================================================
// Rutas para la actualización de los datos de enfermedad
// ======================================================
var express = require('express');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Enfermedad = require('../../models/enfermedad');

// =================================================
// Actualizamos los datos generales de la enfermedad
// =================================================
app.put('/general', verificaToken, (req, res) => {

    var body = req.body;

    var id = body.id;
    var enfermedad = body.enfermedad;
    var fecha = body.fecha;
    var curacion = body.curacion;

    Enfermedad.findByIdAndUpdate(id, {
        $set: {
            "enfermedad": enfermedad,
            "fechaEnfermedad": fecha,
            "fechaCuracion": curacion,
        }
    }, (err, datosGuardados) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos generales de la enfermedad',
                errors: err
            });
        }
        if (!datosGuardados) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado enfermedad con ID: ' + id,
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Datos generales actualizados correctamente',
                datos: datosGuardados
            });
        }
    });
});

// ======================================
// Actualizamos los datos hospitalización
// ======================================
app.put('/hospi', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var idh = body.hospitalizacion.id;

    // Objeto a guardar
    var hospi = {
        hospital: body.hospitalizacion.hospital,
        ingreso: body.hospitalizacion.ingreso,
        alta: body.hospitalizacion.alta,
        coment: body.hospitalizacion.coment
    };

    Enfermedad.updateOne({ "hospitalizacion._id": idh }, { $set: { "hospitalizacion.$": hospi } })
        .exec((err, hospitalActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospitalización de la enfermedad',
                    errors: err
                });
            }
            if (!hospitalActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado enfermedad con ID: ' + id,
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Hospitalización actualizado correctamente',
                    hospitalizacion: hospitalActualizado
                });
            }
        });
});

// ==============================
// Actualizamos los datos médico
// ==============================
app.put('/medico', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var idm = body.medico.id;

    // Objeto a guardar
    var medico = {
        nombre: body.medico.nombre,
        numColegiado: body.medico.numColegiado,
        coment: body.medico.coment
    };

    Enfermedad.updateOne({ "datos_medico._id": idm }, { $set: { "datos_medico.$": medico } })
        .exec((err, medicoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar datos médico',
                    errors: err
                });
            }
            if (!medicoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado enfermedad con ID: ' + id,
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Datos médico actualizado correctamente',
                    medico: medicoActualizado
                });
            }
        });
});

// ========================
// Actualizamos tratamiento
// ========================
app.put('/tratamiento', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var idt = body.tratamiento.id;

    // Objeto a guardar
    var tratamiento = {
        nombre: body.tratamiento.nombre,
        comienzo: body.tratamiento.comienzo,
        final: body.tratamiento.final,
        desc: body.tratamiento.desc
    };

    Enfermedad.updateOne({ "tratamiento._id": idt }, { $set: { "tratamiento.$": tratamiento } })
        .exec((err, tratamientoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar datos de tratamiento',
                    errors: err
                });
            }
            if (!tratamientoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado enfermedad con ID: ' + id,
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Tratamiento actualizado correctamente',
                    tratamiento: tratamientoActualizado
                });
            }
        });
});

module.exports = app;