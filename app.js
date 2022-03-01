const express = require('express');
const cors = require('cors'); //Cabecera
const app = express();

//IMPORTACION RUTAS
const productosRoutes = require('./src/routes/productos.routes');
const ejemplosRoutes = require('./src/routes/ejemplos.routes');
const usuarioRoutes = require('./src/routes/usuario.routes');


//MIDDLEWARE : Un middleware es un intermedio y un verificador de etc
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); //Convertir a json todo

//CABECERAS
app.use(cors()); //Cargo la cabecera


// CARGA DE RUTAS localhost:3000
app.use('/api', productosRoutes, ejemplosRoutes, usuarioRoutes);

module.exports = app;