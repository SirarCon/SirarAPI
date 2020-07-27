'use strict';

const {admin} = require("./FireBaseConfig"),
funcionesGlobales = require("../FuncionesGlobales.js"),
NotificacionEquipo = require("../models/NotificacionEquipoModel"),
NotificacionAtleta = require("../models/NotificacionAtletaModel");
const { mensajes } = require("../Globales");

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

function mensajeaEnviar(titulo, mensaje){
    var mensaje ={
                  notification: {
                      title: titulo,
                      body: mensaje
                      }
                }
    return mensaje;
}
  
async function  enviarNotificacion(mensaje, registrationToken){
  console.log(registrationToken)
      const options =  notification_options,
      notificacion = mensajeaEnviar("SIRAR", mensaje);
      admin.messaging().sendToDevice(registrationToken, notificacion, options)
      .then( response => {

        console.log(response);
       })
      .catch( err => {
        funcionesGlobales.registrarError("enviarNotificacion/FireBaseRecurso", err)
      });
}

exports.enviarNotificacionesAtleta = async function(mensaje, idAtleta){
  NotificacionAtleta
  .find()
  .where({atleta: idAtleta})
  .select({token: 1})
  .exec()
  .then(async tokens=>{
      await funcionesGlobales.asyncForEach(tokens, async (token)=>{
                              await enviarNotificacion(mensaje, token.token)
            });
  }).catch(err =>{
    funcionesGlobales.registrarError("enviarNotificacionesAtleta/FireBaseRecurso", err)
  })
} 
exports.enviarNotificacionesEquipo = async function(mensaje, idEquipo){
  NotificacionEquipo
  .find()
  .where({equipo: idEquipo})
  .select({token: 1})
  .exec()
  .then(async tokens=>{
      await funcionesGlobales.asyncForEach(tokens, async (token)=>{
                              await enviarNotificacion(mensaje, token)
            });
  }).catch(err =>{
    funcionesGlobales.registrarError("enviarNotificacionesEquipo/FireBaseRecurso", err)
  })
}

exports.registrarNotificacionAtleta = async function(body){
  var nuevaNotificacion = new NotificacionAtleta(body)
  return nuevaNotificacion.save();
}

exports.registrarNotificacionEquipo = async function(body){
  var nuevaNotificacion = new NotificacionEquipo(body);
  return nuevaNotificacion.save();
}
