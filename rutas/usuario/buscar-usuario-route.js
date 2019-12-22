/*
Endpoint para búsquedas de usuarios
Sólo los administradores podrán hacer uso
*/
var express = require('express');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Usuario = require('../../models/usuario');

// ====================================================================================
// Buscar Usuario por campo y término, los campos podrán ser id, dni, nombe, apellido, 
// dirección, localidad, ciudad, cp, activos, por un determinado rol
// ====================================================================================
app.get('/', [verificaToken, verificaAdminRole], (req, res) => {

    var body = req.body;
    var campo = body.campo;
    var termino = body.termino;

    var regex = new RegExp(termino, 'i');

    var promesa;

    switch (campo) {
        case 'id':
            promesa = buscarUsuarioById(termino);
            break;
        case 'dni':
            promesa = buscarUsuarioByDni(termino);
            break;
        case 'nombre':
            promesa = buscarUsuarioByName(termino, regex);
            break;
        case 'ape':
            promesa = buscarUsuarioByApe(termino, regex);
            break;
        case 'tlf':
            promesa = buscarUsuarioByTlf(termino, regex);
            break;
        case 'tlf2':
            promesa = buscarUsuarioByTlf2(termino, regex);
            break;
        case 'addr':
            promesa = buscarUsuarioByAddr(termino, regex);
            break;
        case 'loca':
            promesa = buscarUsuarioByLoca(termino, regex);
            break;
        case 'email':
            promesa = buscarUsuarioByEmail(termino, regex);
            break;
        case 'city':
            promesa = buscarUsuarioByCity(termino, regex);
            break;
        case 'cp':
            promesa = buscarUsuarioByCp(termino, regex);
            break;
        case 'active':
            promesa = buscarUsuarioActive();
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
            usuario: data
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

// =================================
// Buscamos usuario por el id
// =================================
function buscarUsuarioById(id) {

    return new Promise((resolve, reject) => {

        Usuario.find({ _id: id })
            .exec((err, usuario) => {

                if (err) {
                    reject('Error al buscar el usuario con id: ' + id + '', err);
                }
                if (Object.keys(usuario).length <= 0) {
                    reject('No se ha encontrado usuario con id: ' + id);
                } else {
                    resolve(usuario);
                }
            });
    });
}

// =================================
// Buscamos usuario por el dni
// =================================
function buscarUsuarioByDni(dni) {

    return new Promise((resolve, reject) => {

        Usuario.find({ dni: dni })
            .exec((err, usuario) => {

                if (err) {
                    reject('Error al buscar el usuario con dni: ' + dni + '', err);
                }
                if (Object.keys(usuario).length <= 0) {
                    reject('No se ha encontrado usuario con dni: ' + dni);
                } else {
                    resolve(usuario);
                }
            });
    });
}

// =================================
// Buscamos usuario por nombre
// =================================
function buscarUsuarioByName(nombre, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ nombre: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con nombre: ' + nombre + '', err);
                }
                if (Object.keys(usuario).length <= 0) {
                    reject('No se ha encontrado usuario con nombre: ' + nombre);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// ============================
// Buscamos usuario por el tlf
// ============================
function buscarUsuarioByTlf(tlf, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ tlf: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con tlf: ' + tlf + '', err);
                }
                if (Object.keys(usuario).length <= 0) {
                    reject('No se ha encontrado usuario con tlf: ' + tlf);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por el tlf2
// =================================
function buscarUsuarioByTlf2(tlf2, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ tlf2: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con tlf2: ' + tlf2 + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por el tlf2
// =================================
function buscarUsuarioByApe(ape, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ apellido: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con apellido: ' + ape + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por la dirección
// =================================
function buscarUsuarioByAddr(addr, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ direc: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con dirección: ' + addr + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por localidad
// =================================
function buscarUsuarioByLoca(loca, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ locali: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con localidad: ' + loca + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por el email
// =================================
function buscarUsuarioByEmail(email) {
    return new Promise((resolve, reject) => {

        Usuario.find({ email: email })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con email: ' + email + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por ciudad
// =================================
function buscarUsuarioByCity(city, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ city: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con ciudad: ' + city + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuario por el cp
// =================================
function buscarUsuarioByCp(cp, regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({ cp: regex })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar el usuario con CP: ' + ape + '', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

// =================================
// Buscamos usuarios activos
// =================================
function buscarUsuarioActive() {
    return new Promise((resolve, reject) => {

        Usuario.find({ active: true })
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al buscar usuarios activos, err');
                } else {
                    resolve(usuarios);
                }
            });
    });
}

module.exports = app;