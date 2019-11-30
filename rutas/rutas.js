// Requires
var express = require('express');
var app = express();

// Importar rutas
var usuarioRuta = require('../rutas/usuario/usuario-route');

var loginRuta = require('../rutas/login-route');

// Rutas
app.use('/usuario', usuarioRuta);

app.use('/login', loginRuta);


module.exports = app;