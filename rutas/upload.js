// ==================================================
// Rutas para subir y gestionar ficheros del proyecto
// ==================================================
var express = require('express');
var { verificaToken } = require('../middlewares/autenticacion');
var fileupload = require('express-fileupload');
var fs = require('fs');
var pathUpload = require('../config/config').PATH_UPLOAD;
var fileMaxSize = require('../config/config').FILE_MAX_SIZE;
var fileExtensions = require('../config/config').UPLOAD_FILE_EXTENSIONS;
var utils = require ('util');
var app = express();

// ============================================================
// Subida de ficheros al servidor por parde del usuario/cliente
// ============================================================
app.post('/', (req, res) => {

    // Comprobamos que tenemos ficheros para subir
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            error: 'No hay fichero seleccionado para subir'
        });

    }

    //console.log("Datos de usuario logado con token válido: " + req.datos);

    // Obtenemos el fichero
    var archivo = req.files.archivo;

    // Comprobamos el tamaño del fichero
    if (archivo.size > fileMaxSize){
        return res.status(400).json({
            ok: false,
            error: 'Fichero supera máximo tamaño permitido: ' + fileMaxSize
        });
    }

    // Validamos la extensión del fichero a subir
    var nombreFichero = archivo.name.split('.');
    var extension = nombreFichero[nombreFichero.length - 1];
    if (fileExtensions.indexOf(extension) < 0) {
        return res.status(500).json({
            ok: false,
            error: {
                desc: 'Extension del fichero no válido ' + extension,
                extensiones: 'Extensiones permitidas son ' + fileExtensions.join(', ')
            }
        });
    }

    // Comprobamos si el directorio del usuario está creado, si no lo está lo creamos
    /*
    var dirUser = pathUpload + '/' + 
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    */

    // Construimos el path se subida
    var path = pathUpload + "/file.png";

    // Subimos el fichero al servidor
    archivo.mv(path, (err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: 'Error al subir fichero, ' + err
            });
        } else {
            res.status(200).json({
                ok: true,
                mensaje: 'Fichero subido correctamente',
                file: path

            });
        }
    });    
});




module.exports = app;