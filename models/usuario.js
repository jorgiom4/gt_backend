/**
 * Usuarios.
 * Schema para los usuarios.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
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
        fecha_naci: {
            type: Date,
            required: [true, 'Fecha de nacimiento es obligatorio']
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
    },
    desc: {
        type: String,
        required: [true, 'Necesitamos el comentario de montivación relleno.']
    },
    datos_laborales: {
        estudios: {
            type: String
        },
        experiencia: {
            type: String
        },
        titulos: [{
            nombre: {
                type: String
            },
            fecha: {
                type: String
            }
        }],
        cursos: [{
            nombre: {
                type: String
            },
            fecha: {
                type: Date
            }
        }]
    },
    role: {
        type: String,
        required: [true, 'El del usuario es necesario.']
    },
    dateAdd: {
        type: Date,
        required: [true, 'La fecha de alta en necesaria.']
    },
    active: {
        type: Boolean,
        reuired: [true, 'El estado del usuario es necesario']

    }

});

//Creamos un objeto usuario con los campos que necesitamos para visualización
usuarioSchema.methods.toJSON = function() {

    var user = this;
    var userObject = user.toObject();
    delete userObject.datos_personales.pass;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);