// ==============================================================
// Rutas para la creación y actualización de los datos de cliente
// ==============================================================
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
const app = express();
const Cliente = require('../../models/cliente');

// ========================================================
// Obtener todos los clientes filtrado por datos personales
// ========================================================
app.get('/', [verificaToken, verificaAdminRole], (req, res) => {

    Cliente.find({}, 'datos_personales')
        .exec(
            (err, clientes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando clientes',
                        errors: err
                    });
                }

                //console.log("Recibiendo listado de clientes");
                //console.log(clientes);
                res.status(200).json({
                    ok: true,
                    clientes: clientes
                });
            });

});

// ======================
// Crear un nuevo cliente
// ======================
app.post('/', (req, res) => {

    var body = req.body;
    var email = body.datos_acceso.email;

    // Primero comprobamos que el usuario tiene validado el email
    buscarClienteByEmail(email)
        .then(usuario => {

            // Comprobamos que hemos encontrado el usuario en usuarios registrados
            if (usuario.length <= 0) {
                res.status(401).json({
                    ok: false,
                    mensaje: 'No se ha encontrado ningun usuario registrado con email: ' + email
                });
            } else {
                // Si el usuario está en el registro de usuario, comprobamos si el email está validado y activo
                if (!usuario.valid || !usuario.active) {
                    console.log("Usuario inactivo o no validado");
                    res.status(401).json({
                        ok: false,
                        mensaje: 'Usuario inactivo o no validado ' + email
                    });

                } else {
                    console.log("Cliente valido y activo");

                    //Objeto datos de acceso del usuario para poder encriptar la pass del usuario
                    var clienteLogin = {
                        email: String,
                        pass: String
                    };

                    //Obtenemos la fecha de insercion en formato IsoDate
                    var fecha = new Date();
                    var isoDate = fecha.toISOString();

                    var cliente = new Cliente({
                        datos_personales: body.datos_personales,
                        ubicacion: body.ubicacion,
                        datos_acceso: {
                            email: usuario.email,
                            pass: usuario.pass
                        },
                        desc: body.desc,
                        datos_laborales: body.datos_laborales,
                        role: body.role,
                        dateAdd: isoDate,
                        active: true
                    });

                    cliente.save((err, clienteGuardado) => {

                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                mensaje: 'Error al crear nuevo cliente',
                                errors: err.message
                            });
                        }

                        res.status(200).json({
                            ok: true,
                            mensaje: 'Cliente creado correctamente',
                            usuario: clienteGuardado.datos_personales
                        });
                    });
                }
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                mensaje: 'Cliente no registrado o no es válido',
                error: err
            });
        });

});

module.exports = app;
