var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Usuario = require('../../models/usuario');

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

                console.log("Recibiendo listado de usuarios");
                console.log(usuarios);
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })
});

// ==========================================
// Crear un nuevo usuario
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

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
});

// ==========================================
// Actualizar usuario
// ==========================================
app.put('/', verificaToken, (req, res) => {

    //var id = req.params.id;
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

        usuario.nombre = body.nombre;
        usuario.apellido = body.apellido;
        usuario.dni = body.dni;
        usuario.tlf = body.tlf;
        usuario.tlf2 = body.tlf2;
        usuario.direc = body.direc;
        usuario.city = body.city;
        usuario.cp = body.cp;
        usuario.locali = body.locali;
        usuario.email = body.email;
        usuario.img = body.img;
        usuario.desc = body.desc;
        usuario.role = body.role;
        usuario.active = body.active;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado corretamente',
                usuario: usuarioGuardado
            });
        });
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

module.exports = app;