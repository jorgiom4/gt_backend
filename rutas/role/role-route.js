var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {verificaToken, verificaAdminRole} = require('../../middlewares/autenticacion');
var app = express();
var Role = require('../../models/role');


// ==========================================
// Obtener todos los roles
// ==========================================
app.get('/', (req, res) => {

    Role.find({})
        .exec(
            (err, roles) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando roles',
                        errors: err
                    });
                }

                console.log("Recibiendo listado de roles");
                console.log(roles);
                res.status(200).json({
                    ok: true,
                    roles: roles
                });

            });
});

// ==========================================
// Crear un nuevo rol
// ==========================================
app.post('/', [verificaToken, verificaAdminRole], (req, res) => {

    var body = req.body;

        //Obtenemos la fecha de insercion en formato IsoDate
        var fecha = new Date();
        var isoDate = fecha.toISOString();

        var role = new Role({
            nombre: body.nombre,
            desc: body.desc,
            dateAdd: isoDate,
            active: true

        });

        role.save((err, roleGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear role',
                    errors: err
                });
            }
    
            res.status(201).json({
                ok: true,
                mensaje: 'role creado correctamente',
                role: roleGuardado
            });

        });
});

// ===============================
// Actualizamos el rol del usuario
// ===============================
app.put('/rol', (req, res) => {

    var body = req.body;
    var id = body.id;

    // Obtenemos primero los roles activos
    var rolesDB;
    
    Roles.find({}, (err, roles) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: 'Error al obtener los roles de DB ' + err
            });
        }else{
            rolesDB = roles;
            console.log("Roles en bsase de datos: " + rolesDB);
        }
    });
    
});

module.exports = app;