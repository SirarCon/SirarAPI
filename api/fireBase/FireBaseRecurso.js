'use strict';

const NotificacionEquipo = require("../models/NotificacionEquipoModel"),
NotificacionAtleta = require("../models/NotificacionAtletaModel"),
NotificacionCompetencia = require("../models/NotificacionCompetenciaModel");
const modelos  = require("./DispositivoHandler/Modelos");
const db  = require("./DispositivoHandler/AccesoDB");


//-------------------------------- Atleta -------------------------------------
exports.registrarDispositivoAtleta = async function(body){
  return db.registrarDispositivo(NotificacionAtleta, body);
};

exports.removerDispositivoAtleta = async function(body){
  return db.removerDispositivo(NotificacionAtleta, modelos.getDispositivoAtleta(body));
};

exports.existeDispositivoAtleta = async function(body, sinToken = false){
  let modelo = sinToken ? modelos.getDispositivoSinTokenAtleta(body) 
                        : modelos.getDispositivoAtleta(body);
  return db.existeDispositivo(NotificacionAtleta, modelo);
};

exports.enviarNotificacionesAtleta = async function(mensaje, idAtleta, objeto){
  return db.enviarNotificaciones(NotificacionAtleta, mensaje, modelos.getAtleta(idAtleta), objeto);
};

//-------------------------------- Equipo -------------------------------------

exports.registrarDispositivoEquipo = async function(body){
  return db.registrarDispositivo(NotificacionEquipo, body);
};

exports.removerDispositivoEquipo = async function(body){
  return db.removerDispositivo(NotificacionEquipo, modelos.getDispositivoEquipo(body));
};

exports.existeDispositivoEquipo = async function(body, sinToken = false){
  let modelo = sinToken ? modelos.getDispositivoSinTokenEquipo(body) 
                        : modelos.getDispositivoEquipo(body);
  return db.existeDispositivo(NotificacionEquipo, modelo);
};

exports.enviarNotificacionesEquipo = async function(mensaje, idEquipo, objeto){
       return db.enviarNotificaciones(NotificacionEquipo, mensaje, modelos.getEquipo(idEquipo), objeto);
};


//-------------------------------- Competencia -------------------------------------

exports.registrarDispositivoCompetencia = async function(body){
    return db.registrarDispositivo(NotificacionCompetencia, body)
};

exports.removerDispositivoCompetencia = async function(body){
    return db.removerDispositivo(NotificacionCompetencia, modelos.getDispositivoCompetencia(body));
};
  
exports.existeDispositivoCompetencia = async function(body, sinToken = false){
  let modelo = sinToken ? modelos.getDispositivoSinTokenCompetencia(body) 
                        : modelos.getDispositivoCompetencia(body);
    return db.existeDispositivo(NotificacionCompetencia, modelo);
};

exports.enviarNotificacionesCompetencia = async function(mensaje, idCompetencia, objeto){
  return db.enviarNotificaciones(NotificacionCompetencia, mensaje, modelos.getCompetencia(idCompetencia), objeto);
};