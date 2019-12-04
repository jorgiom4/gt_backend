// Requires
var express = require('express');
var app = express();

// Importar rutas
var registerUserRuta = require('../rutas/usuario/register-usuario-route');
var validateEmailRuta = require('../rutas/usuario/validate-email-route');
var usuarioRuta = require('../rutas/usuario/usuario-route');

var loginRuta = require('../rutas/login-route');

// Rutas
app.use('/usuario/new', registerUserRuta);
app.use('/usuario/validatemail', validateEmailRuta);
app.use('/usuario', usuarioRuta);

app.use('/login', loginRuta);


module.exports = app;