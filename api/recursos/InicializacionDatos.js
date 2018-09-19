'use strict';
var mongoose = require('mongoose'),
Mensaje = mongoose.model('Mensaje'),
Usuario = mongoose.model('Usuario');

exports.Errores = async function(){
  //Mensaje.remove({},(e,el)=>e?console.log(e + "error"): console.log(el+ "exitos"));
  var mensajes = [
        {"mensaje": "", "codigo": -1, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 },
        {"mensaje": "Contraseña de {sutantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1},
        {"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 },
        {"mensaje": "Hubo un problema borrando el {sutantivoCambiar} {id}", "codigo": 3, "exito": 0 },
        {"mensaje": "Hubo un problema enviando {sutantivoCambiar} a {id}", "codigo": 4, "exito": 0 },
        {"mensaje": "Hubo un problema buscando el {sutantivoCambiar} {id}", "codigo" : 5, "exito": 0 },
        {"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 },
        {"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 },
        {"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 },
        {"mensaje": "Contraseña actual no coincide con la indicada", "codigo" : 9, "exito": 0 },
        {"mensaje": "Hubo un problema creando {sutantivoCambiar} {id}", "codigo" : 10, "exito": 0 }, 
        {"mensaje": "No hay usuarios que listar", "codigo" : 11, "exito": 0 },
        {"mensaje": "Hubo un problema leyendo los usuarios", "codigo" : 12, "exito": 0 },   
        {"mensaje": "Hubo un problema leyendo el {sutantivoCambiar} {id}", "codigo" : 13, "exito": 0 },
        {"mensaje": "Hubo un error modificando el {sutantivoCambiar} {id}", "codigo" :14, "exito": 0 },
        {"mensaje": "La identificación o correo electrónico indicado ya está registrado", "codigo" :15, "exito": 0 },
        {"mensaje": "El correo electrónico no tiene formato adecuado", "codigo" :16, "exito": 0 },
        {"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 },
        {"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema guardando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 },
        {"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 }
]

var opciones = { upsert: true, new: true, setDefaultsOnInsert: true };
mensajes.forEach(elemento => {
        Mensaje.findOneAndUpdate(elemento, elemento, opciones, function(err, elemento) {
        if (err) return;
        });  
});

var usuario = {
        "nombre" : "William",
        "nombreNormalizado" : "william",
        "identificacion" : "115780376",
        "correo" : "wacvillalobos@hotmail.es",
        "password" : "P123456p",
        "rol" : "1" }

Usuario.findOneAndUpdate(usuario, usuario, opciones, function(err, elemento) {
        if (err) return;
        }); 


 var deportes = [
        {
                nombre: "FEDERACIÓN CENTRAL DE AJEDREZ",
                deporte: "Ajedrez",
                paginaWeb: "www.fcacostarica.com",
                ubicacion: "Oficina 1036, Estadio Nacional, La Sábana, San José",
                telefonos: [25490964, 70823378],
                correoFederacion: "info@fcacostarica.com", 
                presidente : "Stanley Gómez Huertas",
                correoPresidente: "presidencia@fcacostarica.com",
                escudoUrl: "",
                imagenUrl: "" 
                }, 
                
                {
                nombre: "FEDERACIÓN COSTARRICENSE DE ATLETISMO",
                deporte: "Atletismo",
                paginaWeb: "www.fcacostarica.com" ,
                ubicacion: "Oficina 1023, Estadio Nacional, La Sábana, San José",
                telefonos: [5490950, 25490949],
                correoFederacion: "info@fcacostarica.com", 
                presidente : "Geen Clarkes",
                correoPresidente: "presidencia@fcacostarica.com",
                escudoUrl: "",
                imagenUrl: "" 
                }             
        ]        
}