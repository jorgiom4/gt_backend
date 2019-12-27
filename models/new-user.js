// ========================================================================
// Entidad para el registro de nuevos usuarios/clientes
// ========================================================================

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const newUserSchema = new Schema({
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
    account_token: {
        token: {
          type: String
        },
        dateAdd: {
            type: Date
        },
        dateExp: {
            type: Date
        }
    },
    pass_token: {
        token: {
            type: String
        },
        dateAdd: {
            type: Date
        },
        dateExp: {
            type: Date
        },
    },
    dateAdd: {
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

    const user = this;
    const userObject = user.toObject();
    delete userObject.pass;
    delete userObject.account_token;
    delete userObject.pass_token;

    return userObject;
};

newUserSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('usuarios_nuevos', newUserSchema);
