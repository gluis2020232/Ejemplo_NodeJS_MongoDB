
function ejemplo (req, res) {
    res.send('Hola mundo, estoy usando express!!!');
}

function EjemploParametrosObligatorios (req, res) {
    var id = req.params.idKinal;
    res.send('Esta es una ruta para Kinalito y este es el valor del parámetro en ruta: ' + id);
}

function EjemploParametrosOpcionales (req, res) {
    var idOp = req.params.idOpcional;

    if (idOp !== undefined) {
        res.send('Este es el valor del parámetro en ruta Opcional: ' + idOp);
    } else {
        res.send('No hay ningun valor en la ruta.')
    }
}

module.exports = {
    ejemplo,
    EjemploParametrosObligatorios,
    EjemploParametrosOpcionales
}