// ====================================================================================
// Endpoints para la búsqueda de pacientes, se podrán realizar búsquedas por id, nombre
// apellidos, dni, dirección, ciudad, localidad, contacto, seguro médico y activos
// ====================================================================================
var express = require('express');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Enfermedad = require('../../models/enfermedad');

app.get('/', verificaToken, (req, res) => {

    var body = req.body;
    var campo = body.campo;
    var termino = body.termino;

    var regex = new RegExp(termino, 'i');

    var promesa;

    switch (campo) {
        case 'id':
            promesa = buscarEnfermedadById(termino);
            break;
        case 'idp': // Buscamos las enfermedades que tenga paciente por su id
            promesa = buscarEnfermedadPacienteById(termino);
            break;
        case 'nombre':
            promesa = buscarEnfermedadByName(termino, regex);
            break;
        case 'hospi':
            promesa = buscarEnfermedadByHospital(termino, regex);
            break;
        case 'medico':
            promesa = buscarEnfermedadByMedico(termino, regex);
            break;
        case 'cole':
            promesa = buscarEnfermedadByColegiado(termino);
            break;
        case 'idt':
            promesa = buscarTratamientoById(termino);
            break;
        case 'nombreT':
            promesa = buscarTratamientoByNombre(termino, regex);
            break;
        case 'cp':
            promesa = buscarPacienteByCp(termino);
            break;
        case 'active':
            promesa = buscarPacienteActive(termino);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo pueden ser por: id, dni, nombre, apellido, tlf, tlf2, email, dirección, localidad, Ciudad, CP, active',
                error: { message: 'Campo de búsqueda no válido' }
            });
    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            enfermedad: data
        });
    }, (err) => {
        console.log(err);
        res.status(400).json({
            ok: false,
            error: err,
            mensaje: "Error al buscar... término no encontrado."
        });
    });
});


// ==========================
// Buscamos enfermedad por id
// ==========================
function buscarEnfermedadById(id) {

    return new Promise((resolve, reject) => {

        Enfermedad.findById(id)
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar enfermedad con id: ' + id + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado enfermedad con id: ' + id);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// =====================================================
// Buscamos enfermedades que tenga un paciente por su id
// =====================================================
function buscarEnfermedadPacienteById(id) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "idPaciente": id })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar el paciente con id: ' + id + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado paciente con id: ' + id);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ==============================
// Buscamos enfermedad por nombre
// ==============================
function buscarEnfermedadByName(nombre, regex) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "enfermedad": regex })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar enfermedad con nombre: ' + nombre + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado enfermedad con nombre: ' + nombre);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ================================
// Buscamos enfermedad por hospital
// ================================
function buscarEnfermedadByHospital(termino, regex) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "hospitalizacion": { $elemMatch: { hospital: regex } } })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar enfermedad con hospital: ' + termino + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado enfermedad con hospital: ' + termino);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ====================================
// Buscamos enfermedad por datos medico
// ====================================
function buscarEnfermedadByMedico(termino, regex) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "datos_medico": { $elemMatch: { nombre: regex } } })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar enfermedad con datos medico: ' + termino + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado enfermedad con datos médico: ' + termino);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ===========================================
// Buscamos enfermedad por número de colegiado
// ===========================================
function buscarEnfermedadByColegiado(termino) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "datos_medico": { $elemMatch: { numColegiado: termino } } })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar enfermedad con número de colegiado: ' + termino + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado enfermedad con número de colegiado: ' + termino);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ========================================================
// Buscamos tratamiento de enfermedad por id de tratamiento
// ========================================================
function buscarTratamientoById(id) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "tratamiento": { $elemMatch: { _id: id } } })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar tratamiento con id: ' + id + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado tratamiento con id: ' + id);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}

// ============================================================
// Buscamos tratamiento de enfermedad por nombre de tratamiento
// ============================================================
function buscarTratamientoByNombre(termino, regex) {

    return new Promise((resolve, reject) => {

        Enfermedad.find({ "tratamiento": { $elemMatch: { nombre: regex } } })
            .exec((err, enfermedad) => {

                if (err) {
                    reject('Error al buscar tratamiento con nombre: ' + termino + '', err);
                }
                if (Object.keys(enfermedad).length <= 0) {
                    reject('No se ha encontrado tratamiento con nombre: ' + termino);
                } else {
                    resolve(enfermedad);
                }
            });
    });
}


module.exports = app;