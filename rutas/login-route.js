var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');
var Cliente = require('../models/cliente');
var util = require('util');

app.post('/', (req, res) => {

    var body = req.body;
    var tipo = body.type;

    // Datos a salvar en JWT
    var entidad = {
        id: "",
        email: "",
        role: ""
    };

    // Dependiendo si es cliente o usuario
    if (tipo === 'cliente') {

        Cliente.findOne({ "datos_acceso.email": body.email }, (err, clienteDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar cliente',
                    errors: err
                });
            }

            if (!clienteDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: err
                });
            }

            if (!bcrypt.compareSync(body.pass, clienteDB.datos_acceso.pass)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                });
            }

            entidad.id = clienteDB._id;
            entidad.email = clienteDB.datos_acceso.email;
            entidad.role = clienteDB.role;

            console.log("\nLogin Cliente - Entidad a guardad en JWT: " + util.inspect(entidad));

            var token = jwt.sign({ entidad: entidad }, SEED, { expiresIn: 3000 }); // 50 minutos

            res.status(200).json({
                ok: true,
                token: token,
                id: entidad._id
            });

        });

    } else {

        Usuario.findOne({ "datos_acceso.email": body.email }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: err
                });
            }

            if (!bcrypt.compareSync(body.pass, usuarioDB.datos_acceso.pass)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                });
            }

            entidad.id = usuarioDB._id;
            entidad.email = usuarioDB.datos_acceso.email;
            entidad.role = usuarioDB.role;

            console.log("\nLogin Usuario - Entidad a guardad en JWT: " + util.inspect(entidad));

            var token = jwt.sign({ entidad: entidad }, SEED, { expiresIn: 3000 }); // 50 minutos

            res.status(200).json({
                ok: true,
                token: token,
                id: entidad._id
            });

        });
    }

});

module.exports = app;