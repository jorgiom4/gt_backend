// ==================================================
// Rutas para subir y gestionar ficheros del proyecto
// ==================================================
var express = require('express');
var fileupload = require('express-fileupload');
var pathUpload = require('../config/config').PATH_UPLOAD;
var fileExtensions = require('../config/config').UPLOAD_FILE_EXTENSIONS;
var app = express();

// Uso del middleware configuramos las subidas
var pathUploadTmp = pathUpload + "/tmp";
app.use(fileupload({
    useTempFile: true,
    tempFileDir: pathUploadTmp,
    limits: { fileSize: 3 * 1024 * 1024 * 1024 } // 3MB

}));

// ============================================================
// Subida de ficheros al servidor por parde del usuario/cliente
// ============================================================
app.post('/', (req, res) => {

    // Comprobamos que tenemos ficheros para subir
    if (!req.files) {
        res.status(400).json({
            ok: false,
            error: 'No hay fichero seleccionado para subir'
        });

    }

    // Obtenemos el fichero
    var archivo = req.files.archivo;

    // Validamos la extensión del fichero sa subir
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