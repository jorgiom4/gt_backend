// ========================================================================
// Entidad para el registro de nuevos usuarios/clientes
// ========================================================================

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var newUserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email de usuario es obligatorio'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'La constraseña de usuario es obligatorio']
    },
    randomText: {
        type: String,
        required: [true, 'RandomText es obligatorio']
    },
    dateAdd: {
        type: Date
    },
    dateExp: {
        type: Date
    },
    active: {
        type: Boolean,
        default: false
    },
    valid: {
        type: Boolean,
        default: false
    }
});

//Creamos un objeto usuario con los campos que necesitamos para visualización
newUserSchema.methods.toJSON = function() {

    var user = this;
    var userObject = user.toObject();
    delete userObject.pass;
    delete userObject.randomText;

    return userObject;
};

newUserSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('usuarios_nuevos', newUserSchema);