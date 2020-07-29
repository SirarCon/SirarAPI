'use strict';

const NotificacionEquipo = require("../models/NotificacionEquipoModel"),
NotificacionAtleta = require("../models/NotificacionAtletaModel"),
NotificacionCompetencia = require("../models/NotificacionCompetenciaModel");
const modelos  = require("./DispositivoHandler/Modelos");
const db  = require("./DispositivoHandler/AccesoDB");


// exports.enviarNotificacionesAtleta = async function(mensaje, idAtleta){
//   NotificacionAtleta
//   .find()
//   .where({atleta: idAtleta})
//   .select({token: 1})
//   .exec()
//   .then(async tokens=>{
//       await funcionesGlobales.asyncForEach(tokens, async (token)=>{
//                               await enviarNotificacion(mensaje, token.token)
//             });
//   }).catch(err =>{
//     funcionesGlobales.registrarError("enviarNotificacionesAtleta/FireBaseRecurso", err)
//   })
// } 


//-------------------------------- Atleta -------------------------------------
exports.registrarDispositivoAtleta = async function(body){
  return db.registrarDispositivo(NotificacionAtleta, body);
};

exports.removerDispositivoAtleta = async function(body){
  return db.removerDispositivo(NotificacionAtleta, modelos.getDispositivoAtleta(body));
};

exports.existeDispositivoAtleta = async function(body){
  return db.existeDispositivo(NotificacionAtleta, modelos.getDispositivoAtleta(body));
};

exports.enviarNotificacionesAtleta = async function(mensaje, idAtleta){
  return db.enviarNotificaciones(NotificacionAtleta, mensaje, modelos.getAtleta(idAtleta));
};

//-------------------------------- Equipo -------------------------------------

exports.registrarDispositivoEquipo = async function(body){
  return db.registrarDispositivo(NotificacionEquipo, body);
};

exports.removerDispositivoEquipo = async function(body){
  return db.removerDispositivo(NotificacionEquipo, modelos.getDispositivoEquipo(body));
};

exports.existeDispositivoEquipo = async function(body){
  return db.existeDispositivo(NotificacionEquipo, modelos.getDispositivoEquipo(body));
};

exports.enviarNotificacionesEquipo = async function(mensaje, idEquipo){
       return db.enviarNotificaciones(NotificacionEquipo, mensaje, modelos.getEquipo(idEquipo));
};


//-------------------------------- Competencia -------------------------------------

exports.registrarDispositivoCompetencia = async function(body){
    return db.registrarDispositivo(NotificacionCompetencia, body)
};

exports.removerDispositivoCompetencia = async function(body){
    return db.removerDispositivo(NotificacionCompetencia, modelos.getDispositivoCompetencia(body));
};
  
exports.existeDispositivoCompetencia = async function(body){
    return db.existeDispositivo(NotificacionCompetencia, modelos.getDispositivoCompetencia(body));
};

exports.enviarNotificacionesCompetencia = async function(mensaje, idCompetencia){
  return db.enviarNotificaciones(NotificacionCompetencia, mensaje, modelos.getCompetencia(idCompetencia));
};