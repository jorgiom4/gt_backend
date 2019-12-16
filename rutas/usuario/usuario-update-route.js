// ===================================================
// Rutas para la actualización de los datos de usuario
// ===================================================

var express = require('express');
var bcrypt = require('bcryptjs');
var { verificaToken } = require('../../middlewares/autenticacion');
var app = express();
var Usuario = require('../../models/usuario');
var Roles = require('../../models/role');

// =============================================
// Actualizamos los datos personales del usuario
// Se guardan todos los datos en conjunto
// =============================================
app.put('/personales', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.nombre": body.datos_personales.nombre,
            "datos_personales.apellido": body.datos_personales.apellido,
            "datos_personales.dni": body.datos_personales.dni,
            "datos_personales.fecha_naci": body.datos_personales.fecha_naci,
            "datos_personales.direc": body.datos_personales.direc,
            "datos_personales.city": body.datos_personales.city,
            "datos_personales.cp": body.datos_personales.cp,
            "datos_personales.locali": body.datos_personales.locali
        }
    }, (err, datosGuardados) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos personales',
                errors: err
            });
        }
        if (!datosGuardados) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Datos personales actualizados correctamente',
                datos: body.datos_personales
            });
        }
    });
});

// ==============================================
// Actualizamos los datos de contacto del usuario
// ==============================================
app.put('/contacto', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var idc = body.contacto.idc;

    var update = {
        tlf: body.contacto.tlf
    };

    Usuario.updateOne({ "datos_personales.contacto._id": idc }, { $set: { "datos_personales.contacto.$": update } })
        .exec((err, contactoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar contacto del usuario',
                    errors: err
                });
            }
            if (!contactoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado contacto con ID: ' + idcon,
                    error: 'No se ha encontrado contacto con ID: ' + idcon
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Contacto actualizado correctamente',
                    contacto: contactoActualizado
                });
            }
        });
});

// ==================================
// Actualizamos la imagen del usuario
// ==================================
app.put('/img', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var img = body.img;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.img": img
        }
    }, (err, imgGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la imagen del usuario',
                errors: err
            });
        }
        if (!imgGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen actualizada correctamente',
                img: img
            });
        }
    });
});

// ========================================================
// Actualizamos los datos de ubicación del usuario
// Se guardan los dos datos latitud y longuitud en conjunto
// ========================================================
app.put('/ubicacion', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var ubicacion = body.ubicacion;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "ubicacion": ubicacion
        }
    }, (err, ubicacionGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la ubicación del usuario',
                errors: err
            });
        }
        if (!ubicacionGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Ubicación actualizada correctamente',
                ubicacion: ubicacion
            });
        }
    });
});

// ============================================
// Actualizamos el email del usuario
// ============================================
app.put('/email', verificaToken, (req, res) => {
    var body = req.body;
    var id = body.id;
    var email = body.email;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_acceso.email": email
        }
    }, (err, emailGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el email del usuario',
                errors: err
            });
        }
        if (!emailGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Email actualizado correctamente',
                email: email
            });
        }
    });
});

// ==========================
// Actualizamos la contraseña
// ==========================
app.put('/pass', verificaToken, (req, res) => {
    var body = req.body;
    var id = body.id;
    var pass = body.pass;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_acceso.pass": bcrypt.hashSync(pass, 10)
        }
    }, (err, passGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la contraseña del usuario',
                errors: err
            });
        }
        if (!passGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Contraseña actualizada correctamente',
                pass: ':-)'
            });
        }
    });
});

// =======================================
// Actualizamos la descripción del usuario
// =======================================
app.put('/desc', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "desc": body.desc
        }
    }, (err, descGuardada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la descripción del usuario',
                errors: err
            });
        }
        if (!descGuardada) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Descripción actualizada correctamente',
                desc: body.desc
            });
        }
    });
});

// ==================================================================
// Actualizamos los datos laborales estudio y experiencia del usuario
// Se guardan todos los datos en conjunto
// ==================================================================
app.put('/laboral', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_laborales.estudios": body.datos_laborales.estudios,
            "datos_laborales.experiencia": body.datos_laborales.experiencia
        }
    }, (err, datosGuardados) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos laborales del usuario',
                errors: err
            });
        }
        if (!datosGuardados) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Datos laborales actualizados correctamente',
                datos: body.datos_laborales
            });
        }
    });
});

// ==================================================
// Actualizamos los datos de los titutlos del usuario
// ==================================================
app.put('/titulo', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.titulo.id;
    var idt = body.titulo.idt;

    var update = {
        nombre: body.titulo.nombre,
        fecha: body.titulo.fecha
    };

    Usuario.updateOne({ "_id": id, "datos_laborales.titulos._id": idt }, { $set: { "datos_laborales.titulos.$": update } })
        .exec((err, tituloActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar título',
                    errors: err
                });
            }
            if (!tituloActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado título con ID: ' + id,
                    error: 'No se ha encontrado título con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Título actualizado correctamente',
                    titulo: tituloActualizado
                });
            }
        });
});

// ============================================
// Actualizamos los datos de cursos del usuario
// ============================================
app.put('/curso', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.curso.id;
    var idc = body.curso.idc;

    var update = {
        nombre: body.curso.nombre,
        fecha: body.curso.fecha
    };

    Usuario.updateOne({ "_id": id, "datos_laborales.cursos._id": idc }, { $set: { "datos_laborales.cursos.$": update } })
        .exec((err, cursoActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar curso',
                    errors: err
                });
            }
            if (!cursoActualizado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se ha encontrado curso con ID: ' + id,
                    error: 'No se ha encontrado curso con ID: ' + id
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Curso actualizado correctamente',
                    curso: cursoActualizado
                });
            }
        });
});

// ===============================
// Actualizamos el rol del usuario
// ===============================
app.put('/rol', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;
    var newRol = body.rol;

    // Obtenemos primero los roles activos
    var rolesDB = [];

    Roles.find({}, (err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: 'Error al obtener los roles de DB ' + err
            });
        } else {

            // Nos quedamos con los nombres de los roles activos
            roles.forEach(rol => {
                if (rol.active) {
                    rolesDB.push(rol.nombre);
                }
            });

            console.log("Roles activos: " + rolesDB);

            // Si tenemos los roles activos comprobamos que el rol que nos pasan está dentro de la lista de roles activos
            if (rolesDB.length > 0) {
                var rol = rolesDB.indexOf(newRol);

                console.log("Resultado de buscar el newRol en el array: " + rol);

                if (rol >= 0) {
                    console.log("Rol a poner como nuevo: " + newRol);
                    UpdateRol(id, newRol)
                        .then(rol => {
                            return res.status(200).json({
                                ok: true,
                                mensaje: 'Rol actualizado correctamente: ' + newRol
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                ok: true,
                                error: err
                            });
                        });
                } else {
                    return res.status(500).json({
                        ok: false,
                        error: 'No se ha encontrado el rol a modificar: ' + newRol
                    });
                }
            } else {
                return res.status(500).json({
                    ok: false,
                    error: 'No se han encontrado roles activos'
                });
            }
        }
    });
});

// ==================================
// Actualizamos el estado del usuario
// ==================================
app.put('/active', verificaToken, (req, res) => {

    var body = req.body;
    var id = body.id;    

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "active": body.active            
        }
    }, (err, estadoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el estado del usuario',
                errors: err
            });
        }
        if (!estadoGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Estado actualizado correctamente',
                active: body.active
            });
        }
    });
});


// Promesa encargada de actualizar el rol de un usuario
function UpdateRol(id, rol) {

    return new Promise((resolve, reject) => {

        Usuario.findByIdAndUpdate(id, {
            $set: {
                'role': rol
            }
        }, (err, rolGuardado) => {
            if (err) {
                reject('Error al actualizar el rol del usuario');
            } else {
                resolve(rolGuardado);
            }
        });
    });

};

module.exports = app;