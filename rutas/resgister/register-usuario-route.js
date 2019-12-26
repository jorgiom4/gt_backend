// ================================================================================
// Proceso de registro de un nuevo usuario/cliente antes del proceso de alta
// El nuevo usuario/cliente tendrá que registrar su direccion de correo y validarlo
// ================================================================================

const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const NewUser = require('../../models/new-user');
const htmlEmail = require('../../middlewares/htmlemail');
const mailService = require('../../middlewares/mailservice');
const app = express();

// Obtenemos los datos del usuario que quiere registrarse
app.post('/', (req, res) => {

    // Obtenemos la informacion del usuario
    const body = req.body;

    //Generamos el seed aleatorio
    const random = randomstring.generate(128);

    // Creamos las fechas de creación y expiracion
    const fecha = new Date();
    const isoDate = fecha.toISOString();
    const fechaToken = new Date(isoDate);
    const fechaAux = new Date(fechaToken);
    // El token expira en un dia
    const fechaExp = new Date(fechaAux.setDate(fechaAux.getDate() + 1)).toISOString();

    // Guardamos en base de datos el nuevo registro
    const usuarioNuevo = new NewUser({
        nombre: body.userName,
        email: body.userMail,
        pass: bcrypt.hashSync(body.userPass, 10),
        account_token: random,
        pass_token: "NONE",
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
        const enlace = "http://localhost:3000/register/validatemail/" + random;

        const texto = htmlEmail.getHtmlForRegisterUserEmail(enlace);
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
