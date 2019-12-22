// ====================================================================================
// Rutas para la creación y actualización de los datos de enfermedades de los pacientes
// ====================================================================================
var express = require('express');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Enfermedad = require('../../models/enfermedad');
var util = require('util');

// =============================
// Listar todas las enfermedades
// =============================
app.get('/', [verificaToken, verificaAdminRole], (req, res) => {

    Enfermedad.find({}, (err, enfermedad) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                error: 'Error al lista las enfermedades',
                err
            });
        }
        if (Object.keys(enfermedad).length <= 0) {
            res.status(200).json({
                ok: false,
                mensaje: 'No se han encontrado enfermedades en DB',
            });
        } else {
            res.status(200).json({
                ok: true,
                enfermedad: enfermedad
            });
        }
    });
});

// =================
// Crear enfermedad
// =================
app.post('/', verificaToken, (req, res) => {

    var body = req.body;
    var idP = body.idP;

    // Primero comprobamos si existe el paciente registrado, activo y valido
    buscarPacienteById(idP)

    .then(paciente => {
            console.log("Paciente encontrado " + paciente.id);
            // Comprobamo si el paciente está activo
            if (!paciente.active) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El paciente no está activo en BD'
                });
            } else {
                //Guardamos la información de la enfermedad
                var fecha = new Date();
                var isoDate = fecha.toISOString();

                // Creamos el objeto enfermedad que guardaremos en bd
                var newEnfermedad = new Enfermedad({
                    idPaciente: idP,
                    enfermedad: body.enfermedad,
                    fechaEnfermedad: body.fechaEnfermedad,
                    fechaCuracion: body.fechaCuracion,
                    hospitalizacion: body.hospitalizacion,
                    datos_medico: body.datos_medico,
                    tratamiento: body.tratamiento,
                    dateAdd: isoDate,
                });

                newEnfermedad.save((err, enfermedad) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al crear enfermedad',
                            errors: err
                        });
                    } else {
                        // Si hemos creado la enfermdad correctamente actualizamos los datos del paciente incorporando la nueva enfermedad
                        updatePacienteWithEnfermedad(idP, newEnfermedad._id)
                            .then(enfermedad => {
                                res.status(200).json({
                                    ok: true,
                                    mensaje: 'Enfermedad creada y actualizada en paciente correctamente',
                                    enfermedad: enfermedad
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    ok: false,
                                    mensaje: 'Enfermedad creada correctamente pero hubo un error al actualizar la enfermedad en paciente',
                                    errors: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log("Error al buscar paciente " + err);
            return res.status(500).json({
                ok: false,
                error: err
            });
        });
});

// ==============================
// Añadimos nueva hospitalización
// ==============================
app.put('/hospi', (req, res) => {

    var body = req.body;
    var id = body.id;

    // Objecto hospital a guardar
    var hospi = {
        hospital: body.hospital,
        ingreso: body.ingreso,
        alta: body.alta,
        coment: body.coment
    };

    Enfermedad.findByIdAndUpdate(id, { $push: { "hospitalizacion": hospi } })
        .exec((err, hospital) => {
            if (err) {
                console.log("Error al buscar enfermedad " + err);
                return res.status(500).json({
                    ok: false,
                    error: 'Error al añadir una nueva hospitalización en enfermedad ' + err
                });
            }
            if (!hospital) {
                return res.status(500).json({
                    ok: false,
                    error: 'No se ha encontrado enfermedad con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    error: 'Hospitalización creada correctamente',
                    hospitalizacion: hospital
                });
            }
        });
});

// ===============================
// Añadir médico a la enfermedad
// ===============================
app.put('/medico', (req, res) => {

    var body = req.body;
    var id = body.id;

    // Objecto hospital a guardar
    var medico = {
        nombre: body.nombre,
        numColegiado: body.numColegiado,
        coment: body.coment
    };

    Enfermedad.findByIdAndUpdate(id, { $push: { "datos_medico": medico } })
        .exec((err, medico) => {
            if (err) {
                console.log("Error al buscar enfermedad " + err);
                return res.status(500).json({
                    ok: false,
                    error: 'Error al añadir un nuevo médico en enfermedad ' + err
                });
            }
            if (!medico) {
                return res.status(500).json({
                    ok: false,
                    error: 'No se ha encontrado enfermedad con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    error: 'Médico creado correctamente',
                    medico: medico
                });
            }
        });
});

// ==================================
// Añadir tratamiento a la enfermedad
// ==================================
app.put('/tratamiento', (req, res) => {

    var body = req.body;
    var id = body.id;

    // Objecto hospital a guardar
    var tratamiento = {
        nombre: body.nombre,
        comienzo: body.comienzo,
        final: body.final,
        desc: body.desc
    };

    Enfermedad.findByIdAndUpdate(id, { $push: { "tratamiento": tratamiento } })
        .exec((err, tratamiento) => {
            if (err) {
                console.log("Error al buscar enfermedad " + err);
                return res.status(500).json({
                    ok: false,
                    error: 'Error al añadir nuevo tratamiento en enfermedad ' + err
                });
            }
            if (!tratamiento) {
                return res.status(500).json({
                    ok: false,
                    error: 'No se ha encontrado enfermedad con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    error: 'Tratamiento creado correctamente',
                    tratamiento: tratamiento
                });
            }
        });
});


// ==========================
// Buscamos cliente por su ID
// ==========================
function buscarPacienteById(id) {

    return new Promise((resolve, reject) => {

        Paciente.findOne({ "_id": id })
            .exec((err, paciente) => {
                if (err) {
                    reject('Error al buscar paciente con ID: ' + id + '', err);
                }
                if (!paciente) {
                    reject('No se ha encontrado ningún paciente registrado o válido: ' + id + '', err);
                } else {
                    resolve(paciente);
                }
            });
    });
}

// =============================================
// Actualiza cliente con nueva enfermedad creada
// ============================================
function updatePacienteWithEnfermedad(idp, ide) {

    return new Promise((resolve, reject) => {

        Paciente.findByIdAndUpdate(idp, { $push: { "datos_enfermedades": ide } })
            .exec((err, pacienteActualizado) => {
                if (err) {
                    reject('No se ha encontrado paciente con ID: ' + idp);
                }
                if (!pacienteActualizado) {
                    reject('No se ha encontrado paciente con ID: ' + idp);
                } else {
                    resolve(pacienteActualizado);
                }
            });
    });
}

module.exports = app;