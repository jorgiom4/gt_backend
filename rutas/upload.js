// ==================================================
// Rutas para subir y gestionar ficheros del proyecto
// ==================================================
var express = require('express');
var { verificaToken } = require('../middlewares/autenticacion');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var pathUpload = require('../config/config').PATH_UPLOAD;
var fileDocMaxSize = require('../config/config').FILE_DOC_MAX_SIZE;
var fileImgMaxSize = require('../config/config').FILE_IMG_MAX_SIZE;
var fileDocExtensions = require('../config/config').UPLOAD_FILE_DOC_EXTENSIONS;
var fileImgExtensions = require('../config/config').UPLOAD_FILE_IMG_EXTENSIONS;
var Usuario = require('../models/usuario');
var utils = require('util');
var app = express();
app.use(fileUpload());

// ============================================================
// Subida de ficheros al servidor por parde del usuario/cliente
// ============================================================
app.post('/', verificaToken, (req, res) => {

    // Comprobamos que tenemos ficheros para subir
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            error: 'No hay fichero seleccionado para subir'
        });

    }

    // Obtenemos el identificador de usuario y el tipo de fichero a subir    
    var idUser = req.datos.entidad.id;
    var fileType = req.body.type; //img/doc

    // Obtenemos el fichero
    var archivo = req.files.archivo;
    var nombreFicheroCompleto = archivo.name;
    var nombreFichero = nombreFicheroCompleto.split('.');
    var fileSize = archivo.size / 1024; // Lo pasamos a KB

    // Comprobamos el tamaño del fichero dependiendo del tipo de fichero
    if (fileType === 'doc') {
        if (fileSize > fileDocMaxSize) {
            return res.status(400).json({
                ok: false,
                error: 'Fichero supera máximo tamaño permitido: ' + fileDocMaxSize,
                mensaje: 'El fichero con nombre: ' + archivo.name + ' tiene un tamaño de: ' + archivo.size
            });
        }
    }
    if (fileType === 'img') {
        if (fileSize > fileImgMaxSize) {
            return res.status(400).json({
                ok: false,
                error: 'Fichero supera máximo tamaño permitido: ' + fileImgMaxSize,
                mensaje: 'El fichero con nombre: ' + archivo.name + ' tiene un tamaño de: ' + archivo.size
            });
        }
    }

    // Validamos la extensión del fichero a subir
    var extension = nombreFichero[nombreFichero.length - 1];

    if (fileType === 'doc') {
        if (fileDocExtensions.indexOf(extension) < 0) {
            return res.status(500).json({
                ok: false,
                error: {
                    desc: 'Extension del fichero no válido ' + extension,
                    extensiones: 'Extensiones permitidas son ' + fileDocExtensions.join(', ')
                }
            });
        }
    }
    if (fileType === 'img') {
        if (fileImgExtensions.indexOf(extension) < 0) {
            return res.status(500).json({
                ok: false,
                error: {
                    desc: 'Extension del fichero no válido ' + extension,
                    extensiones: 'Extensiones permitidas son ' + fileImgExtensions.join(', ')
                }
            });
        }
    }
    if (fileType !== 'doc' && fileType !== 'img') {
        return res.status(500).json({
            ok: false,
            error: 'El tipo de fichero a subir ' + extension + ' no está permitido'
        });
    }

    // Comprobamos si el directorio del usuario está creado, si no lo está lo creamos
    var dirUser = pathUpload + '/' + idUser;

    if (!fs.existsSync(dirUser)) {
        fs.mkdirSync(dirUser);
    }

    // Construimos el path se subida
    var path = dirUser + "/" + nombreFicheroCompleto;

    // Subimos el fichero al servidor
    archivo.mv(path, (err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: 'Error al subir fichero, ' + err
            });
        } else {
            // Actualizamos los datos del usuario con la imagen
            saveUserImage(idUser, path)
                .then(img => {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizado' + img
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar imagen de usuario' + err
                    });
                });
        }
    });
});

// ============================================================
// Actualizamos los datos de ubicación de la imagen del usuario
// dentro de la carpeta de descargas
// ========================================================
function saveUserImage(id, path) {

    return new Promise((resolve, reject) => {
        Usuario.findByIdAndUpdate(id, {
            $set: {
                "datos_personales.img": path
            }
        }, (err, imgGuardada) => {
            if (err) {
                reject('Error al actualizar la imagen del cliente');
            }
            if (!imgGuardada) {
                reject('No se ha encontrado usuario con ID: ' + id);
            } else {
                resolve(path);
            }
        });
    });

}


module.exports = app;