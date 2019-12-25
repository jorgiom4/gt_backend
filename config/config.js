// ===========
// Semilla JWT
// ===========
//module.exports.SEED = 'este-es-un-seed-dificil';
module.exports.SEED = 'P.B_@ptBh_;BQ9((|CUG/aHg¿HT4S#3PKsx0Y&RSNaoz{U;gY7';

// ==========================================
// URL DB Mongo (desarrollo, produccion VPS)
// ==========================================
//module.exports.urlDB = 'mongodb://localhost:27017/geritronic_dev1';
module.exports.urlDB = 'mongodb://admin:Minotm4_1@instancia2.com:27017/geritronic_dev1';

// ============
// Server/Port
// ============
module.exports.SERVER_HOST_DEV = 'http://localhost:';
module.exports.SERVER_HOST_DEV_PORT = 3000;
module.exports.SERVER_HOST_PROD = 'http://instancia2.com:';
module.exports.SERVER_HOST_PROD_PORT = 4200;


// ============
// Mail Service
// ============
module.exports.SERVER_SMPT = 'smtp.ionos.com';
module.exports.SERVER_SMPT_PORT = '587';
module.exports.SERVER_SMPT_USER = 'pruebas@instancia2.es';
module.exports.SERVER_SMPT_PASS = 'minotm4';
module.exports.SERVER_SMPT_FROM = 'pruebas@instancia2.es';

// ==================
// Path Files Uploads
// ==================
module.exports.PATH_UPLOAD = './upload';
module.exports.FILE_DOC_MAX_SIZE = 3072; // 3MB
module.exports.FILE_IMG_MAX_SIZE = 1024; // 1MB
module.exports.UPLOAD_FILE_DOC_EXTENSIONS = ['docx', 'doc', 'txt', 'pdf'];
module.exports.UPLOAD_FILE_IMG_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];