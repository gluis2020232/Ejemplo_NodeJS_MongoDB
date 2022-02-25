//  IMPORTACIONES
const express = require('express');
const productosControlador = require('../controllers/productos.controller');

//RUTAS
const api = express.Router();

api.get('/productos', productosControlador.ObtenerProductos);
api.post('/agregarProductos', productosControlador.AgregarProductos);
api.put('/editarProducto/:idProducto', productosControlador.EditarProductos);//Obtener una variable por medio de ruta
api.delete('/eliminarProducto/:idProducto', productosControlador.EliminarProductos);//Obtener una variable por medio de ruta

module.exports = api;