// Requires
var express = require('express');
var app = express();

// Importar rutas
var registerUserRuta = require('../rutas/resgister/register-usuario-route');
var validateEmailRuta = require('../rutas/resgister/validate-email-route');

var usuarioRuta = require('../rutas/usuario/usuario-route');
var usuarioUpdateRuta = require('../rutas/usuario/usuario-update-route');

var loginRuta = require('../rutas/login-route');

// Rutas registro nuevos usuarios/clientes
app.use('/register/new', registerUserRuta);
app.use('/register/validatemail', validateEmailRuta);

// Rutas de usuario
app.use('/usuario', usuarioRuta);
app.use('/usuario/update', usuarioUpdateRuta);

// Ruta login usuarios/clientes/pacientes
app.use('/login', loginRuta);


module.exports = app;