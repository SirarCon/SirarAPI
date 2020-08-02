const mongoose = require("mongoose"),
Competencia = mongoose.model("Competencia"),
AtletaC = mongoose.model("AtletaCompetidor"),
EquipoC = mongoose.model("EquipoCompetidor"),
funcionesGlobales = require("../FuncionesGlobales.js"),
notificacionHelper = require("../fireBase/NotificacionHelper"),
registroNotificacion = require("../fireBase/RegistroNotificacion"),
globales =  require("../Globales.js");


exports.notificarInicioCierreCompetencia = async function(competencia){
    competencia = await populateCompetencia(competencia);
    notificacionHelper.notificarInicioCierreCompetencia(competencia);
}

exports.notificarCambioCompetencia = async function(competencia){
    competencia = await populateCompetencia(competencia);
    notificacionHelper.notificarCambioEnCompetencia(competencia);
}

exports.notificarAtletasCompetencia = async function(competencia){
    if(competencia.prueba.tipo == 0){
        notificarAtletas(competencia);
    }else{
        notificarEquipos();
    }
}

exports.registrarDispositivoCompetencia = async function(req, res){
    registroNotificacion.registrarDispositivoEnCompetencia(req, res);
}

exports.removerDispositivoCompetencia = async function(req, res){
    registroNotificacion.removerDispositivoEnCompetencia(req, res);
}

exports.iterarCompetencias = async function (token, competencias){
    await funcionesGlobales.asyncForEach(competencias ,async (element, indice, competencias) => {
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
         competencias[indice] = element.infoPublica(tieneNotificacion);
     });
     return competencias;
 }

 exports.tieneNotificacion = async function(token , competenciaId){
    return await notificacionHelper.tieneNotificacionCompetencia(token, competenciaId);
 }


async function notificarAtletas(competencia){
AtletaC.aggregate([
    {
        $match:{
            competencia : competencia._id
        }
    },
    {
        $lookup:{
            "localField" : "atleta",
            "from": "notificacionatletas",
            "foreignField": "atleta",
            "as": "notificacionAtleta"
        }
    },
    {
        $lookup: {
            "localField": "competencia",
            "from": "notificacioncompetencias",
            "foreignField": "competencia",
            "as": "notificacionCompetencia"
        }
    },

]).exec()
.then(alertas=>{
    existeNotificacionEnCompetencias(alertas, competencia)
}).catch(err=>{
    funcionesGlobales.registrarError("notificarAtletas/CompetenciaService", err)
})

}

async function notificarEquipos(){}

function existeNotificacionEnCompetencias(alertas, competencia){
    alertas.forEach(alerta => {
         alerta.existeNotificacionEnCompetencias.forEach(aToken => {
        //     let existe = 
        //     alerta.notificacionCompetencia.some(cToken => aToken.token == cToken.token);
        //     if(existe)
        //     {              
                notificacionHelper.notificarInicioCierreCompetencia(aToken.token, competencia)
            // }else{
            //     console.log("noExiste")
            // }
        })
    })
}

async function populateCompetencia(competencia){
    return await Competencia.populate(competencia,
                                         [{path: "prueba", select: "nombre tipo"},
                                          {path: "fase", select: "descripcion"}]);
}