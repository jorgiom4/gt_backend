/**
 * Usuarios.
 * Schema para los clientes.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    datos_personales: {
        nombre: {
            type: String,
            required: [true, 'El nombre del candidato es necesario']
        },
        apellido: {
            type: String,
            required: [true, 'Los apellidos son necesarios.']
        },
        dni: {
            type: String,
            unique: true,
            required: [true, 'El DNI es necesario.']
        },
        direc: {
            type: String,
            required: [true, 'La dirección es necesaria.']
        },
        city: {
            type: String,
            unique: false,
            required: false
        },
        cp: {
            type: String,
            unique: false,
            required: false
        },
        locali: {
            type: String,
            unique: false,
            required: false
        },
        contacto: [{
            tlf: {
                type: String,
                unique: true,
                required: [true, 'El contacto es necesario']
            }
        }],
        img: {
            type: String,
            unique: false,
            required: false
        }
    },
    ubicacion: {
        lat: {
            type: String
        },
        lon: {
            type: String
        }
    },
    datos_acceso: {
        email: {
            type: String,
            unique: true,
            required: [true, 'El correo electronico es obligatorio']
        },
        pass: {
            type: String,
            required: [true, 'El password es necesario.']
        }
    }

});

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Cliente', clienteSchema);