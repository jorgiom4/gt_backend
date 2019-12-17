// ===============================================================
// Rutas para la creación y actualización de los datos de paciente
// ===============================================================
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Cliente = require('../../models/cliente');

// ==========================
// Listar todos los pacientes
// ==========================
app.get('/', [verificaToken, verificaAdminRole], (req, res) => {

    Paciente.find({}, (err, pacientes) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al listar pacientes',
                error: err
            });
        }
        if (Object.keys(pacientes).length <= 0) {
            res.status(200).json({
                ok: false,
                mensaje: 'No se han encontrado pacientes en DB',
            });
        } else {
            res.status(200).json({
                ok: true,
                paciente: pacientes
            });
        }
    });

});

// ====================
// Crear nuevo paciente
// ====================
app.post('/', verificaToken, (req, res) => {

    var body = req.body;
    var idCliente = body.datos_personales.idCliente;

    // Primero comprobamos si existe el cliente registrado, activo y valido
    buscarClienteById(idCliente)
        .then(cliente => {
            // Comprobamos si el cliente está activo
            if (cliente.active) {
                // Procedemos a guardar el nuevo paciente                
                var fecha = new Date();
                var isoDate = fecha.toISOString();

                // Creamos el objeto paciente que guardaremos en bd
                var newPaciente = new Paciente({
                    datos_personales: body.datos_personales,
                    datos_ficha: body.datos_ficha,
                    datos_enfermedades: body.datos_enfermedades,
                    dateAdd: isoDate,
                    role: "PCT_ROL",
                    active: true
                });

                newPaciente.save((err, pacienteGuardado) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al crear paciente',
                            errors: err
                        });
                    }

                    res.status(200).json({
                        ok: true,
                        mensaje: 'Paciente creado correctamente',
                        usuario: pacienteGuardado.datos_personales
                    });
                });

            } else {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Cliente registrado pero no está activo',
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                mensaje: 'Cliente no registrado o no es válido',
                error: err
            });
        });
});


// ==========================
// Buscamos cliente por su ID
// ==========================
function buscarClienteById(id) {

    return new Promise((resolve, reject) => {

        Cliente.findOne({ "_id": id })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con ID: ' + id + '', err);
                }
                if (!cliente) {
                    reject('No se ha encontrado ningún cliente registrado o válido: ' + id + '', err);
                } else {
                    console.log("buscarClienteById: " + cliente._id);
                    resolve(cliente);
                }
            });
    });

}

module.exports = app;