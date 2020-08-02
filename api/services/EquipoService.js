const mongoose = require('mongoose'),
Competencia = mongoose.model('Competencia'),
EquipoC = mongoose.model('EquipoCompetidor'),
funcionesGlobales = require("../FuncionesGlobales.js"),
notificacionHelper = require("../fireBase/NotificacionHelper"),
registroNotificacion = require("../fireBase/RegistroNotificacion"),
globales =  require("../Globales.js");


exports.registrarDispositivoEquipo = async function(req, res){
    registroNotificacion.registrarDispositivoEnEquipo(req, res);
}

exports.removerDispositivoEquipo = async function(req, res){
    registroNotificacion.removerDispositivoEnEquipo(req, res);
}