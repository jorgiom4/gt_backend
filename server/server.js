// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlDB = require('../config/config').urlDB;
var portDev = require('../config/config').SERVER_HOST_DEV_PORT;
var portProd = require('../config/config').SERVER_HOST_PROD_PORT;

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas globales
app.use(require('../rutas/rutas'));

// Escuchar peticiones
var port = portDev
app.listen(port, () => {

    console.log('Express server puerto ' + port + ': \x1b[32m%s\x1b[0m', 'online');

});

// Conexión a la base de datos
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(urlDB, (err, res) => {

    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});