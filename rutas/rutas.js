// Requires
const express = require('express');
const app = express();

// Importar rutas
const registerUserRuta = require('../rutas/resgister/register-usuario-route');
const validateEmailRuta = require('../rutas/resgister/validate-email-route');
const resetPassRuta = require('../rutas/resgister/reset-pass-route');

const usuarioRuta = require('../rutas/usuario/usuario-route');
const usuarioUpdateRuta = require('../rutas/usuario/usuario-update-route');
const usuarioBuscarRuta = require('../rutas/usuario/buscar-usuario-route');

const clienteRuta = require('../rutas/cliente/cliente-route');
const clienteUpdateRuta = require('../rutas/cliente/cliente-update-route');
const clienteBuscarRuta = require('../rutas/cliente/buscar-cliente-route');

const pacienteRuta = require('../rutas/paciente/paciente-route');
const pacienteUpdateRuta = require('../rutas/paciente/paciente-update-route');
const pacienteBuscarRuta = require('../rutas/paciente/buscar-paciente-route');

const enfermedadRuta = require('../rutas/enfermedad/enfermedad-route');
const enfermedadUpdateRuta = require('../rutas/enfermedad/enfermedad-update-route');
const enfermedadBuscarRuta = require('../rutas/enfermedad/buscar-enfermedad-route');

const roleRuta = require('../rutas/role/role-route');

const loginRuta = require('../rutas/login-route');
const uploadRuta = require('../rutas/upload');

// Rutas registro nuevos usuarios/clientes
app.use('/register/new', registerUserRuta);
app.use('/register/validatemail', validateEmailRuta);
app.use('/register/reset', resetPassRuta);

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
app.use('/paciente/update', pacienteUpdateRuta);
app.use('/paciente/buscar', pacienteBuscarRuta);

// Rutas para las enfermedades
app.use('/enfermedad', enfermedadRuta);
app.use('/enfermedad/update', enfermedadUpdateRuta);
app.use('/enfermedad/buscar', enfermedadBuscarRuta);

// Rutas para los roles
app.use('/role', roleRuta);

// Ruta login usuarios/clientes/pacientes
app.use('/login', loginRuta);

// Ruta gestion de ficheros
app.use('/upload', uploadRuta);


module.exports = app;
