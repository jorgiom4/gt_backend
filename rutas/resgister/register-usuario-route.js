// ================================================================================
// Proceso de registro de un nuevo usuario/cliente antes del proceso de alta
// El nuevo usuario/cliente tendrá que registrar su direccion de correo y validarlo
// ================================================================================

var express = require('express');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var NewUser = require('../../models/new-user');
var htmlEmail = require('../../middlewares/htmlemail');
var mailService = require('../../middlewares/mailservice');
var app = express();

// Obtenemos los datos del usuario que quiere registrarse
app.post('/', (req, res) => {

    // Obtenemos la informacion del usuario
    var body = req.body;

    //Generamos el seed aleatorio
    var random = randomstring.generate(128);

    // Creamos las fechas de creación y expiracion
    var fecha = new Date();
    var isoDate = fecha.toISOString();
    var fechaToken = new Date(isoDate);
    var fechaAux = new Date(fechaToken);
    // El token expira en un dia
    var fechaExp = new Date(fechaAux.setDate(fechaAux.getDate() + 1)).toISOString();

    // Guardamos en base de datos el nuevo registro
    var usuarioNuevo = new NewUser({
        nombre: body.userName,
        email: body.userMail,
        pass: bcrypt.hashSync(body.userPass, 10),
        randomText: random,
        dateAdd: isoDate,
        dateExp: fechaExp,
        active: false,
        valid: false
    });

    usuarioNuevo.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al registrar usuario',
                errors: err
            });
        }

        //Componemos y enviamos el mail para validación del email del usuario
        var enlace = "http://localhost:3000/register/validatemail/" + random;

        var texto = htmlEmail.getHtmlForRegisterUserEmail(enlace);
        //console.log("Registrando nuevo usuario, texto html: " + texto);
        mailService.sendMail(body.userMail, "Geritronic - Validación correo electrónico", texto);

        //Envío de respuesta
        res.status(200).json({
            ok: true,
            message: 'Usuario registrado correctamente',
            nombre: usuarioGuardado.nombre,
            email: usuarioGuardado.email
        });
    });
});


module.exports = app;