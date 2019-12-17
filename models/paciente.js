/**
 * Pacientes.
 * Schema para los pacientes.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var pacienteSchema = new Schema({
    datos_personales: {
        nombre: {
            type: String,
            required: [true, 'El nombre del cliente es necesario']
        },
        apellido: {
            type: String,
            required: [true, 'Los apellidos son necesarios.']
        },
        dni: {
            type: String,
            required: [true, 'El DNI es necesario.']
        },
        contacto: [{
            tlf: {
                type: String,
                unique: true,
                required: [true, 'El contacto es necesario']
            }
        }],
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
        }
    },
    datos_ficha: {
        fnacimiento: {
            type: Date,
            required: [true, 'La fecha de nacimiento es obligatoria.']
        },
        sexo: {
            type: String, // H: Hombre, M: Mujer
            required: true
        },
        contactosEmer: [{
            nombre: {
                type: String
            },
            tlf: {
                type: String
            }
        }],
        tlfEmerSanitaria: {
            type: String,
            default: '112'
        },
        numSegSocial: {
            type: String,
            unique: true
        },
        segMedico: {
            type: String
        },
        tlfSegMedico: {
            type: String,
            required: [true, 'El teléfono del seguro médido es necesario'],
            default: "NONE"
        },
        numTarSanitaria: {
            type: String
        },
        grpSanguineo: {
            type: String,
            required: [true, 'El grupo sanguineo es obligatorio']
        },
        observaciones: [{ //Se puede poner algun tipo de alergias
            observ: {
                type: String
            },
            fecha: {
                type: Date,
            }
        }]
    },    
    dateAdd: {
        type: Date,
        required: [true, 'La fecha de alta en necesaria.']
    },
    role: {
        type: String,
        required: [true, 'El del cliente es necesario.']
    },
    active: {
        type: Boolean,
        reuired: [true,'El estado del paciente es necesario']
    }
});

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Paciente', pacienteSchema);