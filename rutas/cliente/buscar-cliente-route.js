// ====================================================================================
// Endpoints para la búsqueda de clientes, se podrán realizar búsquedas por id, nombre
// apellidos, dni, dirección, ciudad, localidad, contacto, ubicación e email
// Sólo los administradores podrán hacer uso de estos endpoints
// ====================================================================================
var express = require('express');
var { verificaToken, verificaAdminRole } = require('../../middlewares/autenticacion');
var app = express();
var Cliente = require('../../models/usuario');

app.get('/', (req, res) => {

    var body = req.body;
    var campo = body.campo;
    var termino = body.termino;

    var regex = new RegExp(termino, 'i');

    var promesa;

    switch (campo) {
        case 'id':
            promesa = buscarClienteById(termino);
            break;
        case 'dni':
            promesa = buscarUsuarioByDni(termino);
            break;
        case 'nombre':
            promesa = buscarUsuarioByName(termino, regex);
            break;
        case 'ape':
            promesa = buscarUsuarioByApe(termino, regex);
            break;
        case 'tlf':
            promesa = buscarUsuarioByTlf(termino, regex);
            break;
        case 'tlf2':
            promesa = buscarUsuarioByTlf2(termino, regex);
            break;
        case 'addr':
            promesa = buscarUsuarioByAddr(termino, regex);
            break;
        case 'loca':
            promesa = buscarUsuarioByLoca(termino, regex);
            break;
        case 'email':
            promesa = buscarUsuarioByEmail(termino, regex);
            break;
        case 'city':
            promesa = buscarUsuarioByCity(termino, regex);
            break;
        case 'cp':
            promesa = buscarUsuarioByCp(termino, regex);
            break;
        case 'active':
            promesa = buscarUsuarioActive();
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo pueden ser por: id, dni, nombre, apellido, tlf, tlf2, email, dirección, localidad, Ciudad, CP, active',
                error: { message: 'Campo de búsqueda no válido' }
            });
    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            cliente: data
        });
    }, (err) => {
        console.log(err);
        res.status(400).json({
            ok: false,
            error: err,
            mensaje: "Error al buscar... término no encontrado."
        });
    });
});

// =================================
// Buscamos usuario por el id
// =================================
function buscarClienteById(id) {

    return new Promise((resolve, reject) => {

        console.log("Dentro de buscarClienteById id: " + id);

        Cliente.findById(id)
            .exec((err, cliente) => {

                if (err) {
                    reject('Error al buscar el cliente con id: ' + id + '', err);
                }
                if(!cliente){
                    reject('No se ha encontrado Cliente con id: ' + id);
                }else {
                    console.log("Datos de cliente por id: " + cliente);
                    resolve(cliente);
                }
            });
    });
}

module.exports = app;