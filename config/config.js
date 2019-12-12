// ===========
// Semilla JWT
// ===========
module.exports.SEED = 'este-es-un-seed-dificil';

// ==========================================
// URL DB Mongo (desarrollo, produccion VPS)
// ==========================================
module.exports.urlDB = 'mongodb://localhost:27017/geritronic_dev1';
//module.exports.urlDB = 'mongodb://admin:admin@instancia2.com:27017/geritronic_dev1';

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
module.exports.PATH_UPLOAD = 'server/upload';
module.exports.UPLOAD_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'doc', 'txt', 'pdf'];