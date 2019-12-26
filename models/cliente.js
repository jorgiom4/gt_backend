/**
 * Usuarios.
 * Schema para los clientes.
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
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
            type: String,
            require: false
        },
        lon: {
            type: String,
            require: false
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
    },
    role: {
        type: String,
        required: [true, 'El rol en obligatorio']
    },
    active: {
        type: Boolean,
        required: ['El estado del cliente es obligatorio']
    },
    dateAdd: {
        type: Date,
        required: [true, 'La fecha de creación es obligatoria']
    }

});

//Creamos un objeto cliente con los campos que necesitamos para visualización
clienteSchema.methods.toJSON = function() {

    const cliente = this;
    const clienteObject = cliente.toObject();
    delete clienteObject.datos_acceso;

    return clienteObject;
};


clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('clientes', clienteSchema);
