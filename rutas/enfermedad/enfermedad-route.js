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
app.get('/', [verificaToken, verificaAdminRole], (req, res) =>{
    
    Enfermedad.find({}, (err, enfermedad) => {
        if(err){
            return res.status(200).json({
                ok: false,
                error: 'Error al lista las enfermedades', err
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
app.post('/', verificaToken, (req, res) =>{

    var body = req.body;

    // Primero comprobamos si existe el paciente registrado, activo y valido
    

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
                if (!cliente) {
                    reject('No se ha encontrado ningún paciente registrado o válido: ' + id + '', err);
                } else {
                    console.log("buscarPacienteById: " + paciente._id);
                    resolve(paciente);
                }
            });
    });

}

module.exports = app;