const globales = require("../Globales");
const contador = require("../models/ContadorModel");
const Mensaje = require("../models/MensajeModel");
jest.mock("../Globales")

var mensajes = [
    new Mensaje({"mensaje": "", "codigo": -1, "exito": 1 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 }),
    new Mensaje({"mensaje": "Contraseña de {sutantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1}),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} se ha ingresado.", "codigo": -7, "exito": 1 }),
    new Mensaje({"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema borrando {sutantivoCambiar} {id}", "codigo": 3, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema enviando {sutantivoCambiar} a {id}", "codigo": 4, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema buscando {sutantivoCambiar} {id}", "codigo" : 5, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 }),
    new Mensaje({"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 }),
    new Mensaje({"mensaje": "Contraseña actual no coincide con la indicada", "codigo" : 9, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema creando {sutantivoCambiar} {id}", "codigo" : 10, "exito": 0 }), 
    new Mensaje({"mensaje": "No hay {sutantivoCambiar} que listar", "codigo" : 11, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema leyendo {sutantivoCambiar}", "codigo" : 12, "exito": 0 }),   
    new Mensaje({"mensaje": "Hubo un problema leyendo {sutantivoCambiar} {id}", "codigo" : 13, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un error modificando {sutantivoCambiar} {id}", "codigo" :14, "exito": 0 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} indicado ya está registrado", "codigo" :15, "exito": 0 }),
    new Mensaje({"mensaje": "{sutantivoCambiar} {id} no tiene formato adecuado", "codigo" :16, "exito": 0 }),
    new Mensaje({"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 }),
    new Mensaje({"mensaje": "No existe {sutantivoCambiar}", "codigo" : 18, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema ingresando {sutantivoCambiar} {id}", "codigo" : 19, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema borrando {sutantivoCambiar} {id}", "codigo" : 20, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema guardando la foto", "codigo" : 0, "exito": 0 }),
    new Mensaje({"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 }),
    new Mensaje({"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 })
  ]

 var locals = {
    token: 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoic2xheEdVRjdXc1BIYlJYMHluMDQzeHZmWmQxSXlVMWl1dnJ3WkdudUdNbFd1TjQ4VjQiLCJpYXQiOjE1ODIwODQ2NDYsImV4cCI6MTU4MjA4NzY0Nn0.K1dbac-CAN80onOQhr7eAS_XEGNToebZMZOxjf-ucOA'
  };
  
  exports.resp ={
    locals: {
      token:{
         locals: locals
      }
    }
  }

  exports.locals = locals;
  
  beforeEach(() => {
    globales.mensajes.mockImplementationOnce((codigo, sustantivo, identificador, objeto) => {
      var mensaje = mensajes.find(mensaje=>{return mensaje.codigo == codigo}).obtenerMensaje( sustantivo, identificador, objeto);
      return mensaje;
    });    
  })
  