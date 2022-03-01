const { model } = require("mongoose");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');

function Registrar(req, res) {
    var parametros = req.body;//Variable para obtener los datos des cuerpo
    var modeloUsuario = new Usuario();

    Usuario.find({ email : parametros.email }, (err, usuarioEncontrados) => { //Verificar si un correo ya existe     
        if ( usuarioEncontrados.length > 0 ) {  //Si el array tiene algo no lo dejo agregar
            return res.status(500)
                .send({ mensaje: "Este correo ya se encuentra utilizado" });
        } else {
            if(parametros.nombre && parametros.apellido && parametros.email
                && parametros.password) {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.apellido = parametros.apellido;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = 'USUARIO';
                modeloUsuario.imagen = null;

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, usuarioGuardado) => {
                    if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                    if(!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al registrar Usuario' });
    
                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                })

            } else {
                 return res.status(500)
                   .send({ mensaje : 'Debe ingresar los parametros obligatorios'});                   }             
           }   

        });    
    }
    

function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
             // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                 })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}

module.exports = {
    Registrar
}