// Requires
var express = require('express');
var app = express();

// Importar rutas
var registerUser = require('../rutas/usuario/register-usuario-route');
var usuarioRuta = require('../rutas/usuario/usuario-route');

var loginRuta = require('../rutas/login-route');

// Rutas
app.use('/new/user', registerUser);
app.use('/usuario', usuarioRuta);

app.use('/login', loginRuta);


module.exports = app;