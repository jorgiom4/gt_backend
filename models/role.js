/**
 * Roles.
 * Schema para los roles.
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const rolSchema = new Schema({
    
    nombre: {
        type: String,
        require: [true, 'El nombre del rol es obligatorio']
    },
    desc: {
        type: String,
        require: [true, 'La descripción del rol es obligatorio']
    },
    active: {
        type: Boolean,
        require: [true, 'El indicador de activo del rol es obligatorio']
    },
    dateAdd: {
        type: Date,
        require: [true, 'La fecha de creación del rol es obligatorio']
    }

});

rolSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('roles', rolSchema);
