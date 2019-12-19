// ====================================================================================
// Endpoints para la búsqueda de pacientes, se podrán realizar búsquedas por id, nombre
// apellidos, dni, dirección, ciudad, localidad, contacto, seguro médico y activos
// ====================================================================================
var express = require('express');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Paciente = require('../../models/paciente');
var Cliente = require('../../models/cliente');

app.get('/',verificaToken, (req, res) => {

    var body = req.body;
    var campo = body.campo;
    var termino = body.termino;

    var regex = new RegExp(termino, 'i');

    var promesa;

    switch (campo) {
        case 'id':
            promesa = buscarPacienteById(termino);
            break;
        case 'idc': // Buscamos los pacientes que tenga un cliente por su id
            promesa = buscarPacienteRefereClienteById(termino);
            break;
        case 'dni':
            promesa = buscarPacienteByDni(termino);
            break;
        case 'nombre':
            promesa = buscarPacienteByName(termino, regex);
            break;
        case 'ape':
            promesa = buscarClienteByApe(termino, regex);
            break;
        case 'tlf':
            promesa = buscarClienteByContacto(termino);
            break;
        case 'addr':
            promesa = buscarClienteByAddr(termino, regex);
            break;
        case 'loca':
            promesa = buscarClienteByLoca(termino, regex);
            break;
        case 'email':
            promesa = buscarClienteByEmail(termino, regex);
            break;
        case 'city':
            promesa = buscarClienteByCity(termino, regex);
            break;
        case 'cp':
            promesa = buscarClienteByCp(termino);
            break;
        case 'active':
            promesa = buscarClienteActive(termino);
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
            cliente: data
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

// ========================
// Buscamos paciente por id
// ========================
function buscarPacienteById(id) {

    return new Promise((resolve, reject) => {
        
        Paciente.findById(id)
            .exec((err, paciente) => {

                if (err) {
                    reject('Error al buscar el paciente con id: ' + id + '', err);
                }
                if (Object.keys(paciente).length <= 0) {
                    reject('No se ha encontrado paciente con id: ' + id);
                } else {                    
                    resolve(paciente);
                }
            });            
    });    
}

// =====================================================
// Buscamos pacientes que tenga un cliente por idCliente
// =====================================================
function buscarPacienteRefereClienteById(id) {

    return new Promise((resolve, reject) => {
        
        Paciente.find({"datos_personales.idCliente": id})
            .exec((err, paciente) => {

                if (err) {
                    reject('Error al buscar el paciente con id: ' + id + '', err);
                }
                if (Object.keys(paciente).length <= 0) {
                    reject('No se ha encontrado paciente con id: ' + id);
                } else {                    
                    resolve(paciente);
                }
            });            
    });    
}

// ============================
// Buscamos paciente por el dni
// ============================
function buscarPacienteByDni(dni) {

    return new Promise((resolve, reject) => {

        Paciente.find({ "datos_personales.dni": dni })
            .exec((err, paciente) => {

                if (err) {
                    reject('Error al buscar el paciente con dni: ' + dni + '', err);
                }
                if (Object.keys(paciente).length <= 0) {
                    reject('No se ha encontrado paciente con dni: ' + dni);
                } else {
                    resolve(paciente);
                }
            });
    });
}

// ============================
// Buscamos paciente por nombre
// ============================
function buscarPacienteByName(nombre, regex) {

    return new Promise((resolve, reject) => {

        Paciente.find({ "datos_personales.nombre": regex })
            .exec((err, paciente) => {

                if (err) {
                    reject('Error al buscar el paciente con dni: ' + nombre + '', err);
                }
                if (Object.keys(paciente).length <= 0) {
                    reject('No se ha encontrado paciente con nombre: ' + nombre);
                } else {
                    resolve(paciente);
                }
            });
    });
}

module.exports = app;