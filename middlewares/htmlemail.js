// ===========================================================================
// Codigo HTML para el contenido de los emails enviado a los usuarios/clientes
// ===========================================================================

// =======================================================================
// HTML para el envio de email de validación del email del usuario/cliente
// =======================================================================
exports.getHtmlForRegisterUserEmail = (enlace) => {
    var html = `<!doctype html> \
    <html lang="en"> \
    <head> \
        <title>Registro nuevo usuario Geritronic</title>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    
    <body>
    
        <h3>Gracias por registrarte en la plataforma de Geretronic</h3>
        <h4>Antes de poder sacar el máximo partido a Geritronic es necesario validar el correo electróinco que nos has facilitado en el proceso de registro</h4>
        <h5>Haz click Validar email para proceder a su validación</h5>
        <h5>En caso de no redirigir a nuestra página de validación, copia y pega en un navegador web el siguiente enlace</h5>
        <h6><a href="{link}">Validar email</a></h6>
    
    </body>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
    </html>`;

    //Metemos el enlace para validar el correo
    html = html.replace("{link}", enlace);

    return html;
};

// =============================================================
// HTML para el envio de email de recuperación de la contraseña
// =============================================================
exports.getHtmlForResetPass = (enlace) => {
    var html = `<!doctype html> \
    <html lang="en"> \
    <head> \
        <title>Cambio contraseña Geritronic</title>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    
    <body>
    
        <h3>Hemos recibido una petición de recuperación de contraseña.</h3>
        <h5>Haz click en Recuperación de contraseña para proceder a su validación</h5>        
        <h6><a href="{link}">Recuperación de contraseña</a></h6>
        <h5>En caso de no redirigir a nuestra página de validación, copia y pega en un navegador web el siguiente enlace</h5>
        <h5>{link}</h5>
    
    </body>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
    </html>`;

    //Metemos el enlace para validar el correo
    html = html.replace("{link}", enlace);

    return html;
};