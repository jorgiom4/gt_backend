/**
 * Enfermedades.
 * Schema para las enfermedades de los pacientes.
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var enfermedadSchema = new Schema({
    idPaciente: { // Identificador del paciente al que pertenece la enfermedad
        type: String,
        unique: false,
        required: [true, 'El identificador del paciente es obligatorio']
    },
    enfermedad: {
        type: String,
        require: [true, 'El nombre de la enfermedad es obligatorio']
    },
    fechaEnfermedad: {
        type: Date,
        required: false
    },
    fechaCuracion: {
        type: Date,
        required: false
    },
    hospitalizacion: [{
        ingreso: {
            type: Date,
            require: false
        },
        hospital: {
            type: String,
            require: false,
            default: 'NONE'
        },
        alta: {
            type: Date,
            require: false
        },
    }],
    datos_medico: [{
        nombre: {
            type: String,
            require: [true, 'El nombre y apellidos del médico es obligatorio']
        },
        numColegiado: {
            type: String,
            require: [true, 'El número de colegiado del médidco es obligatorio']
        },
    }],
    tratamiento: [{
        nombre: {
            type: String,
            require: [true, 'El nombre del tratamiento es obligatorio']
        },
        comienzo: {
            type: Date,
            require: [true, 'La fecha de comienzo del tratamiento es obligatorio']
        },
        final: {
            type: Date,
            require: [true, 'La fecha de fin del tratamiento es obligatorio']
        },
        desc: {
            type: String,
            require: [true, 'La descripción del tratamiento es obligatorio']
        },
    }],
    dateAdd: {
        type: Date,
        require: [true, 'La fecha es obligatoria']
    }
});

enfermedadSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('enfermedades', enfermedadSchema);