const Productos = require('../models/productos.model');

//OBTENER PRODUCTOS
function ObtenerProductos (req, res)  {
    Productos.find({}, (err, productosEncontrados) => {
        
        return res.send({ productos: productosEncontrados })
    })
}

//AGREGAR PRODUCTOS
function AgregarProductos (req, res) {
    var parametros = req.body; //Obtener todos lo parametros de postman body
    var modeloProductos = new Productos();

    //Siempre que vay agregar un producto, obligatoriamente tiene que traer el nombre y el proveedor
    if( parametros.nombre && parametros.proveedor ) {
        modeloProductos.nombre = parametros.nombre;
        modeloProductos.proveedor = parametros.proveedor;
        modeloProductos.sabores = [];

        //Agregar y almacenar este
        modeloProductos.save((err, productoGuardado) => {

            //Verificaciones
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion '});
            if(!productoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el producto'});
            //Verificaciones

            return res.status(200).send({ productos: productoGuardado});
        });
    } else {
        return res.status(500).send({ mensaje: "Debe enviar los parámetros obligatorios."})
    }
    

}


// EDITAR PRODUCTOS
function EditarProductos(req, res) {
    var idProd = req.params.idProducto; //Obtener el valor de la variable en ruta
    var parametros = req.body; //Obtener los los parámetros en el body

    Productos.findByIdAndUpdate(idProd, parametros, { new:true } ,(err, productoEditado)=>{
      
        //Verificaciones
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });
        //Verificaciones

        return res.status(200).send({ productos: productoEditado});
    })
}

function EliminarProductos(req, res) {
    var idProd = req.params.idProducto; //Obtener el valor de la variable en ruta

    Productos.findByIdAndDelete(idProd, (err, productoEliminado)=>{

        //Verificaciones
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })
        //Verificaciones

        return res.status(200).send({ producto: productoEliminado });
    })
}

module.exports = {
    ObtenerProductos,
    AgregarProductos,
    EditarProductos,
    EliminarProductos
}