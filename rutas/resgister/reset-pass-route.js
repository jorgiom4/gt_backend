// ================================================================
// Endpoints para la recuperación de contraseña del usuario/cliente
// ================================================================
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Usuario = require('../../models/usuario');
const RegistroUsuarios = require('../../models/new-user');

// ================================================================================
// Creamos el proceso para el recuperado/reset de la contraseña del usuario/cliente
// ================================================================================
app.post('/', (req, res) => {

});


module.exports = app;

