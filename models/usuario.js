/**
 * Usuarios.
 * Schema para los usuarios.
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

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
        },
        cv: {
            type: String,
            unique: false,
            require: false
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
            required: [true, 'El correo electrónico es obligatorio']
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
            type: String,
            require: false
        },
        experiencia: {
            type: String,
            require: false
        },
        titulos: [{
            nombre: {
                type: String,
                require: false
            },
            fecha: {
                type: String,
                require: false
            }
        }],
        cursos: [{
            nombre: {
                type: String,
                require: false
            },
            fecha: {
                type: Date,
                require: false
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

    const user = this;
    const userObject = user.toObject();
    //delete userObject.datos_acceso.pass;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('usuarios', usuarioSchema);
