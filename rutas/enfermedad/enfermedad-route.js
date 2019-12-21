// ====================================================================================
// Rutas para la creación y actualización de los datos de enfermedades de los pacientes
// ====================================================================================
var express = require('express');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Enfermedad = require('../../models/enfermedad');

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
            console.log("Paciente encontrado " + paciente);
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
                                    mensaje: 'Enfermedad creada correctamente',
                                    enfermedad: enfermedad
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    ok: false,
                                    mensaje: 'Error al actualizar enfermedad en paciente',
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

        Paciente.updateOne({ "_id": idp }, { $put: { "datos_enfermedades": ide } })
            .exec((err, pacienteActualizado) => {
                if (err) {
                    reject('updatePacienteWithEnfermedad No se ha encontrado paciente con ID: ' + idp);
                }
                if (!pacienteActualizado) {
                    reject('updatePacienteWithEnfermedad No se ha encontrado paciente con ID: ' + idp);
                } else {
                    resolve(pacienteActualizado);
                }
            });
    });
}

module.exports = app;