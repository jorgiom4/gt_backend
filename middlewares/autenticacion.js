var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


// ==========================================
//  Verificar token
// ==========================================
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

        req.usuario = decoded.usuario;

        next();

    });

}

// ==========================================
//  Verificar admin rol
// ==========================================
exports.verificaAdminRole = (req, res, next) => {

    var usuario = req.usuario;

    if(usuario.role === "ADMIN_ROL"){
        next();
    }else{
        return res.status(401).json({
            ok: false,
            err: {
                mensaje: 'El usuario no es administrador'
            }
        });
    }
};