// ====================================================================================
// Endpoints para la búsqueda de clientes, se podrán realizar búsquedas por id, nombre
// apellidos, dni, dirección, ciudad, localidad, contacto, ubicación e email
// Sólo los administradores podrán hacer uso de estos endpoints
// ====================================================================================
var express = require('express');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Cliente = require('../../models/cliente');

app.get('/', (req, res) => {

    var body = req.body;
    var campo = body.campo;
    var termino = body.termino;

    var regex = new RegExp(termino, 'i');

    var promesa;

    switch (campo) {
        case 'id':
            promesa = buscarClienteById(termino);
            break;
        case 'dni':
            promesa = buscarClienteByDni(termino);
            break;
        case 'nombre':
            promesa = buscarClienteByName(termino, regex);
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

// =================================
// Buscamos usuario por el id
// =================================
function buscarClienteById(id) {

    return new Promise((resolve, reject) => {

        Cliente.findById(id)
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar el cliente con id: ' + id + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con id: ' + id);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// ============================
// Buscamos cliente por el dni
// ============================
function buscarClienteByDni(dni) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.dni": dni })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar el cliente con dni: ' + dni + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con dni: ' + dni);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =================================
// Buscamos cliente por nombre
// =================================
function buscarClienteByName(nombre, regex) {
    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.nombre": regex })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con nombre: ' + nombre + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con nombre: ' + nombre);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =================================
// Buscamos usuario por el apellido
// =================================
function buscarClienteByApe(ape, regex) {
    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.apellido": regex })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con apellido: ' + ape + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con apellido: ' + ape);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =======================================
// Buscamos cliente por el tlf de contacto
// =======================================
function buscarClienteByContacto(tlf) {
    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.contacto": { $elemMatch: { tlf: tlf } } })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con tlf de contacto: ' + tlf + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con contacto: ' + tlf);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =================================
// Buscamos cliente por la dirección
// =================================
function buscarClienteByAddr(addr, regex) {
    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.direc": regex })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con dirección: ' + addr + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con dirección: ' + addr);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =================================
// Buscamos cliente por localidad
// =================================
function buscarClienteByLoca(loca, regex) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.locali": regex })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con localidad: ' + loca + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con localidad: ' + loca);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// =============================
// Buscamos cliente por el email
// =============================
function buscarClienteByEmail(email) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_acceso.email": email })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con email: ' + email + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con email: ' + email);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// ===========================
// Buscamos cliente por ciudad
// ===========================
function buscarClienteByCity(city, regex) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.city": regex })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con ciudad: ' + city + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con ciudad: ' + city);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// ==================================
// Buscamos cliente por código postal
// ==================================
function buscarClienteByCp(cp) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "datos_personales.cp": cp })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente con cp: ' + cp + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente con cp: ' + cp);
                } else {
                    resolve(cliente);
                }
            });
    });
}

// ======================================
// Buscamos clientes activos o no activos
// ======================================
function buscarClienteActive(active) {

    return new Promise((resolve, reject) => {

        Cliente.find({ "active": active })
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar cliente activo: ' + active + '', err);
                }
                if (Object.keys(cliente).length <= 0) {
                    reject('No se ha encontrado Cliente activo: ' + active);
                } else {
                    resolve(cliente);
                }
            });
    });
}



module.exports = app;