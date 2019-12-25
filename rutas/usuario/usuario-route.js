// ==============================================================
// Rutas para la creación y actualización de los datos de usuario
// ==============================================================
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
const app = express();
const Usuario = require('../../models/usuario');
const RegistroUsuarios = require('../../models/new-user');

// ========================================================
// Obtener todos los usuarios filtrado por datos personales
// ========================================================
app.get('/', [verificaToken, verificaAdminRole], (req, res) => {

    Usuario.find({}, 'datos_personales')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                //console.log("Recibiendo listado de usuarios");
                //console.log(usuarios);
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })
});

// ======================
// Crear un nuevo usuario
// ======================
app.post('/', (req, res) => {

    var body = req.body;

    var regex = new RegExp(body.datos_acceso.email, 'i');

    // Primero comprobamos que el usuario tiene validado el email
    buscarUsuarioByEmail(body.datos_acceso.email, regex)
        .then(usuario => {

            // Comprobamos que hemos encontrado el usuario en usuarios registrados
            if (usuario.length <= 0) {
                res.status(401).json({
                    ok: false,
                    mensaje: 'No se ha encontrado ningun usuario registrado con email: ' + body.datos_acceso.email
                });
            } else {
                // Si el usuario está en el registro de usuario, comprobamos si el email está validado y activo
                if (!usuario.valid || !usuario.active) {
                    console.log("Usuario inactivo o no validado");
                    res.status(401).json({
                        ok: false,
                        mensaje: 'Usuario inactivo o no validado ' + body.datos_acceso.email
                    });

                } else {
                    console.log("Usuario valido y activo");

                    //Objeto datos de acceso del usuario para poder encriptar la pass del usuario
                    var usuarioLogin = {
                        email: String,
                        pass: String
                    };

                    usuarioLogin.email = body.datos_acceso.email;
                    usuarioLogin.pass = bcrypt.hashSync(body.datos_acceso.pass, 10);

                    //Obtenemos la fecha de insercion en formato IsoDate
                    var fecha = new Date();
                    var isoDate = fecha.toISOString();

                    var usuario = new Usuario({
                        datos_personales: body.datos_personales,
                        ubicacion: body.ubicacion,
                        datos_acceso: usuarioLogin,
                        desc: body.desc,
                        datos_laborales: body.datos_laborales,
                        role: body.role,
                        dateAdd: isoDate,
                        active: true
                    });

                    usuario.save((err, usuarioGuardado) => {

                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                mensaje: 'Error al crear usuario',
                                errors: err.message
                            });
                        }

                        res.status(201).json({
                            ok: true,
                            mensaje: 'Usuario creado correctamente',
                            usuario: usuarioGuardado.datos_personales
                        });
                    });
                }
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                mensaje: 'Usuario no registrado o no es válido',
                error: err
            });
        });

});

// =============================================
// Añadimos un nuevo tlf de contacto del usuario
// =============================================
app.put('/contact', (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, { $push: { "datos_personales.contacto": { tlf: body.tlf } } }, (err, contactoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear nuevo contacto',
                errors: err
            });
        } else {
            return res.status(200).json({
                ok: true,
                menaaje: 'Nuevo contacto creado correctamente',
                titulo: contactoGuardado
            });
        }
    });

});

// =========================================
// Añadimos una nueva titulacion del usuario
// =========================================
app.put('/titulo', (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, { $push: { "datos_laborales.titulos": { nombre: body.nombre, fecha: body.fecha } } }, (err, titulo) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear nuevo titulo',
                errors: err
            });
        }

        if (!titulo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        } else {
            return res.status(200).json({
                ok: true,
                menaaje: 'Nuevo titulo creado correctamente',
                titulo: titulo
            });
        }

    });

});

// ===================================
// Añadimos un nuevo curso del usuario
// ===================================
app.put('/curso', (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, { $push: { "datos_laborales.cursos": { nombre: body.nombre, fecha: body.fecha } } }, (err, curso) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear nuevo curso',
                errors: err
            });
        }

        if (!curso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        } else {
            return res.status(200).json({
                ok: true,
                menaaje: 'Nuevo curso creado correctamente',
                curso: curso
            });
        }

    });

});


// ============================================
//   Borrar un usuario por el id, solo podrá hacerlo
//   un usuario con perfil administrador
// ============================================
app.delete('/', [verificaToken, verificaAdminRole], (req, res) => {

    var body = req.body;
    var id = body._id;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        //Desactivamos el usuario, no se hace un borrado físico en la base de datos
        usuario.active = false;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al desactivar usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario desactivado correctamente',
                usuario: usuarioGuardado
            });
        });
    });
});


// =================================
// Buscamos usuario por el email
// =================================
function buscarUsuarioByEmail(email, regex) {

    return new Promise((resolve, reject) => {

        RegistroUsuarios.findOne({ email: regex })
            .exec((err, usuario) => {

                if (err) {
                    reject('Error al buscar el usuario con email: ' + email + '', err);
                }
                if (!usuario) {
                    reject('No se ha encontrado un usuario registrado con email válido: ' + email + '', err);
                } else {
                    console.log("buscarUsuarioByEmail: " + usuario);
                    resolve(usuario);
                }
            });
    });
}

module.exports = app;
