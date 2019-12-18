// Requires
var express = require('express');
var app = express();

// Importar rutas
var registerUserRuta = require('../rutas/resgister/register-usuario-route');
var validateEmailRuta = require('../rutas/resgister/validate-email-route');

var usuarioRuta = require('../rutas/usuario/usuario-route');
var usuarioUpdateRuta = require('../rutas/usuario/usuario-update-route');
var usuarioBuscarRuta = require('../rutas/usuario/buscar-usuario-route');

var clienteRuta = require('../rutas/cliente/cliente-route');
var clienteUpdateRuta = require('../rutas/cliente/cliente-update-route');
var clienteBuscarRuta = require('../rutas/cliente/buscar-cliente-route');

var pacienteRuta = require('../rutas/paciente/paciente-route');

var enfermedadRuta = require('../rutas/enfermedad/enfermedad-route');

var roleRuta = require('../rutas/role/role-route');

var loginRuta = require('../rutas/login-route');
var uploadRuta = require('../rutas/upload');

// Rutas registro nuevos usuarios/clientes
app.use('/register/new', registerUserRuta);
app.use('/register/validatemail', validateEmailRuta);

// Rutas de usuario
app.use('/usuario', usuarioRuta);
app.use('/usuario/update', usuarioUpdateRuta);
app.use('/usuario/buscar', usuarioBuscarRuta);

// Rutas de cliente
app.use('/cliente', clienteRuta);
app.use('/cliente/update', clienteUpdateRuta);
app.use('/cliente/buscar', clienteBuscarRuta);

// Rutas de paciente
app.use('/paciente', pacienteRuta);

// Rutas para las enfermedades
app.use('/enfermedad', enfermedadRuta);

// Rutas para los roles
app.use('/role', roleRuta);

// Ruta login usuarios/clientes/pacientes
app.use('/login', loginRuta);

// Ruta gestion de ficheros
app.use('/upload', uploadRuta);


module.exports = app;