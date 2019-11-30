/**
 * Usuarios.
 * Schema para los usuarios.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
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
    tlf: {
        type: String,
        unique: true,
        required: [true, 'El teléfono de contacto es necesario']
    },
    tlf2: {
        type: String,
        unique: true,
        required: [true, 'El teléfono de contacto es necesario']
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
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electronico es obligatorio']
    },
    pass: {
        type: String,
        required: [true, 'El password es necesario.']
    },
    img: {
        type: String,
        unique: false,
        required: false
    },
    desc: {
        type: String,
        required: [true, 'Necesitamos el comentario de montivación relleno.']
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
    delete userObject.pass;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);