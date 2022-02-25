const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear variable
var ProductosSchema = Schema({
    nombre: String,
    proveedor: String,
    sabores: Array,
    tamanios: [{
        peso: String,
        ancho: String,
        altura: String
    }]
})

module.exports = mongoose.model('productos', ProductosSchema)