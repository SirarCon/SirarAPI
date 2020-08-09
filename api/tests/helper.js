const globales = require("../Globales");
const contador = require("../models/ContadorModel");
const Mensaje = require("../models/MensajeModel");

jest.mock("../Globales")

var mensajes = [        
                  new Mensaje({"mensaje": "", "codigo": -1, "exito": 1 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 }),
                  new Mensaje({"mensaje": "Contraseña de {sustantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1}),
                  new Mensaje({"mensaje": "Se ha ingresado {sustantivoCambiar} {id} .", "codigo": -7, "exito": 1 }),
                  new Mensaje({"mensaje": "No hay {sustantivoCambiar} que listar", "codigo" : -8, "exito": 1 }),
                  new Mensaje({"mensaje": "Alerta creada para {sustantivoCambiar}", "codigo" : -9, "exito": 1 }),
                  new Mensaje({"mensaje": "Alerta eliminada correctamente", "codigo" : -10, "exito": 1 }),
                  //----------------------------------- Mensajes de error -------------------------------------------------
                  new Mensaje({"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema borrando {sustantivoCambiar} {id}", "codigo": 3, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema enviando {sustantivoCambiar} a {id}", "codigo": 4, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema buscando {sustantivoCambiar} {id}", "codigo" : 5, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 }),
                  new Mensaje({"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 }),
                  new Mensaje({"mensaje": "Contraseñas son distintas", "codigo" : 9, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema creando {sustantivoCambiar} {id}", "codigo" : 10, "exito": 0 }), 
                  new Mensaje({"mensaje": "Hubo un problema leyendo {sustantivoCambiar}", "codigo" : 12, "exito": 0 }),   
                  new Mensaje({"mensaje": "Hubo un problema leyendo {sustantivoCambiar} {id}", "codigo" : 13, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un error modificando {sustantivoCambiar} {id}", "codigo" :14, "exito": 0 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} indicado ya está registrado", "codigo" :15, "exito": 0 }),
                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} no tiene formato adecuado", "codigo" :16, "exito": 0 }),
                  new Mensaje({"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 }),
                  new Mensaje({"mensaje": "No existe {sustantivoCambiar}", "codigo" : 18, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema ingresando {sustantivoCambiar} {id}", "codigo" : 19, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema borrando {sustantivoCambiar} {id}", "codigo" : 20, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema ingresando {sustantivoCambiar} {id}", "codigo" : 21, "exito": 0 }), 
                  new Mensaje({"mensaje": "Ya se ingresó el {sustantivoCambiar} {id}", "codigo" : 22, "exito": 0 }), 
                  new Mensaje({"mensaje": "Hubo un error {sustantivoCambiar} notificación para {id}", "codigo" : 23, "exito": 0 }), 
                  new Mensaje({"mensaje": "Ya existe esa notificación", "codigo" : 24, "exito": 0 }), 
                  new Mensaje({"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema guardando la foto", "codigo" : 100, "exito": 0 }),
                  new Mensaje({"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 }),
                  new Mensaje({"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 }),

                  //----------------------------------- Mensajes de eventos -------------------------------------------------

                  new Mensaje({"mensaje": "{sustantivoCambiar} {id} va a participar en evento  ", "codigo": 1001, "exito": 0 }),

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

  exports.reqGeneral ={
    locals: locals,
    token: 'd89fgk',
    tokenDispositivo: "11",
  }

  exports.locals = locals;
  
  beforeEach(() => {
    globales.mensajes.mockImplementationOnce((codigo, sustantivo, identificador, objeto) => {
      var mensaje = mensajes.find(mensaje=>{return mensaje.codigo == codigo}).obtenerMensaje( sustantivo, identificador, objeto);
      return mensaje;
    });    
  })
  