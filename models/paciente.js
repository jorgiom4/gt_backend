/**
 * Pacientes.
 * Schema para los pacientes.
 * Nota: Los pacientes no disponen de usuario/contraseña para acceder a la aplicación
 * Se entiende que al ser personas dependientes deberían de estar supervisados
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var pacienteSchema = new Schema({
    datos_personales: {
        idCliente: {
            type: Schema.ObjectId,
            required: [true, 'El identificador del cliente es obligatorio']
        },
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
            nombre: {
                type: String,
                required: [true, 'El nombre del contacto es obligatorio']
            },
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
        tlfEmerSanitaria: {
            type: String,
            default: '112'
        },
        numSegSocial: {
            type: String,
            require: false,
            unique: true
        },
        segMedico: {
            type: String,
            require: false
        },
        tlfSegMedico: {
            type: String,
            required: [true, 'El teléfono del seguro médido es necesario'],
            default: "NONE"
        },
        numTarSanitaria: {
            type: String,
            require: false
        },
        grpSanguineo: {
            type: String,
            required: false,
            default: 'NONE'
        },
        observaciones: [{ //Se puede poner algun tipo de alergias
            observ: {
                type: String,
                require: false,
                default: 'NONE'
            },
            fecha: {
                type: Date,
                required: false
            }
        }]
    },
    datos_enfermedades: [{
        idE: {
            type: Schema.ObjectId,
            required: false
        }
    }],
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
        reuired: [true, 'El estado del paciente es necesario']
    }
});

pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('pacientes', pacienteSchema);