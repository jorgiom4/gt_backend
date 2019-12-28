// ===================================================================
// Middleware para la validación del token JWT y del rol administrador
// ===================================================================
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const util = require('util');

// ================
//  Verificar token
// ================
exports.verificaToken = (req, res, next) => {

    var token = req.get('token');

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.datos = decoded;

        next();

    });

};

// ====================
//  Verificar admin rol
// ====================
exports.verificaAdminRole = (req, res, next) => {

    var datos = req.datos;

    if (datos.entidad.role === "ADMIN_ROL") {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                mensaje: 'El ' + datos.entidad.role + ' no es administrador'
            }
        });

    }
};
