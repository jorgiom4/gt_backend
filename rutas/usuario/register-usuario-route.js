// ================================================================================
// Proceso de registro de un nuevo usuario/cliente antes del proceso de alta
// El nuevo usuario/cliente tendrá que registrar su direccion de correo y validarlo
// ================================================================================

var express = require('express');
var randomstring = require("randomstring");
var NewUser = require('../../models/new-user');
var app = express();

// Obtenemos los datos del usuario que quiere registrarse
app.post('/', (req, res) => {

    //Obtenemos la informacion del usuario
    var body = req.body;

    //Generamos el seed aleatorio
    var random = randomstring.generate(128);

    //Componemos y enviamos el mail para validación del email del usuario

    //Guardamos en base de datos el nuevo registro


    //Envío de respuesta
    res.status(200).json({
        ok: true,
        message: 'Dentro del registro de nuevo usuario',
        userMail: body.userMail,
        userName: body.userName,
        userPass: body.userPass
    });

});


module.exports = app;