'use strict';
var mongoose = require('mongoose'),
Mensaje = mongoose.model('Mensaje');

exports.Errores = async function(){
 // Mensaje.remove({},(e,el)=>e?console.log(e + "error"): console.log(el+ "exitos"));
  var errores = [
    {"mensaje": "Usuario {usuario} no encontrado", "codigo": 2, "Exito": 0 },
    {"mensaje": "Contraseña errónea", "codigo": 1, "Exito": 0 },
    {"mensaje": "Hubo un problema enviando correo a {correo}", "codigo": 4, "Exito": 0 },
    {"mensaje": "No tiene permisos", "codigo": 403, "Exito": 0 },
    {"mensaje": "Hubo un problema borrando el usuario {usuario}", "codigo": 3, "Exito": 0 },
    {"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "Exito": 0 },
    {"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "Exito": 0 },
    {"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "Exito": 0 },
    {"mensaje": "Contraseñas no coinciden", "codigo" : 9, "Exito": 0 },
    {"mensaje": "Hubo un problema creando usuario {usuario}", "codigo" : 10, "Exito": 0 },
    {"mensaje": "Hubo un problema buscando el usuario {usuario}", "codigo" : 5, "Exito": 0 },
    {"mensaje": "Hubo un problema leyendo el usuario {usuario}", "codigo" : 13, "Exito": 0 },
    {"mensaje": "Hubo un error modificando el usuario {usuario}", "codigo" :14, "Exito": 0 },
    {"mensaje": "No hay usuarios que listar", "codigo" : 11, "Exito": 0 },
    {"mensaje": "Hubo un problema leyendo los usuarios", "codigo" : 12, "Exito": 0 },
    {"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "Exito": 0 },
    {"mensaje": "Hubo un problema guardando la foto", "codigo" : 0, "Exito": 0 },
    {"mensaje": "Hubo un problema creando el token", "codigo" : 50, "Exito": 0 }
]

var opciones = { upsert: true, new: true, setDefaultsOnInsert: true };
errores.forEach(elemento => {
        Mensaje.findOneAndUpdate(elemento, elemento, opciones, function(err, elemento) {
        if (err) return;
        });  
});


}