// ===================================================
// Rutas para la actualización de los datos de usuario
// ===================================================

var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Usuario = require('../../models/usuario');
var Roles = require('../../models/role');

// =============================================
// Actualizamos los datos personales del usuario
// Se guardan todos los datos en conjunto
// =============================================
app.put('/personales', (req, res) => {

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

// ============================================================================
// Actualizamos los datos de contacto del usuario
// Se guardan todos en conjunto por ahora no se puede modificar individualmente
// ============================================================================
app.put('/contacto', (req, res) => {

    var body = req.body;
    var id = body.id;
    var contacto = body.contacto;

    Usuario.findByIdAndUpdate(id, {
        $set: {
            "datos_personales.contacto": contacto
        }
    }, (err, contactoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar los datos personales',
                errors: err
            });
        }
        if (!contactoGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Contacto actualizado correctamente',
                contacto: contacto
            });
        }
    });
});

// ==================================
// Actualizamos la imagen del usuario
// ==================================
app.put('/img', (req, res) => {

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
app.put('/ubicacion', (req, res) => {

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
app.put('/email', (req, res) => {
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
app.put('/pass', (req, res) => {
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
app.put('/desc', (req, res) => {

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
app.put('/laboral', (req, res) => {

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
// Se guardan todos los titulos en conjunto
// ==================================================
app.put('/titulo', (req, res) => {

    var body = req.body;
    var id = body.id;
    
    Usuario.findByIdAndUpdate(id, {
        $set: {            
            'datos_laborales.titulos': body.titulos
        }
    }, (err, tituloGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar título del usuario',
                errors: err
            });
        }
        if (!tituloGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Título actualizado correctamente',
                titulo: tituloGuardado
            });
        }
    });
});

// ============================================
// Actualizamos los datos de cursos del usuario
// Se guardan todos los cursos en conjunto
// ============================================
app.put('/curso', (req, res) => {

    var body = req.body;
    var id = body.id;
    
    Usuario.findByIdAndUpdate(id, {
        $set: {            
            'datos_laborales.cursos': body.cursos
        }
    }, (err, cursoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar curso del usuario',
                errors: err
            });
        }
        if (!cursoGuardado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se ha encontrado usuario con ID: ' + id,
                error: 'No se ha encontrado usuario con ID: ' + id
            });
        } else {
            return res.status(200).json({
                ok: true,
                mensaje: 'Curso actualizado correctamente',
                curso: cursoGuardado
            });
        }
    });
});

// ===============================
// Actualizamos el rol del usuario
// ===============================
app.put('/rol', (req, res) => {

    var body = req.body;
    var id = body.id;
    var newRol = body.rol;

    // Obtenemos primero los roles activos
    var rolesDB = [];

    Roles.find({}, (err, roles) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: 'Error al obtener los roles de DB ' + err
            });
        }else{
            
            // Nos quedamos con los nombres de los roles activos
            roles.forEach(rol => {
                if(rol.active){                    
                    rolesDB.push(rol.nombre);                    
                }                
            });

            console.log("Roles activos: " + rolesDB);

            // Si tenemos los roles activos comprobamos que el rol que nos pasan está dentro de la lista de roles activos
            if(rolesDB.length > 0){
                var rol = rolesDB.indexOf(newRol);

                console.log("Resultado de buscar el newRol en el array: " + rol);

                if(rol >= 0){
                    console.log("Rol a poner como nuevo: " + newRol);
                    UpdateRol(id, newRol)
                        .then(rol =>{
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
                }else{
                    return res.status(500).json({
                        ok: false,
                        error: 'No se ha encontrado el rol a modificar: ' + newRol
                    });    
                }
            }else{
                return res.status(500).json({
                    ok: false,
                    error: 'No se han encontrado roles activos'
                });    
            }                        
        }
    });    
});

// Promesa encargada de actualizar el rol de un usuario
function UpdateRol (id, rol) {

    return new Promise((resolve, reject) => {

        Usuario.findByIdAndUpdate(id, {
            $set: {            
                'role': rol
            }
        }, (err, rolGuardado) => {
            if (err) {                    
                reject('Error al actualizar el rol del usuario');
            }else{             
                resolve(rolGuardado);
            } 
        });
    });

};

module.exports = app;