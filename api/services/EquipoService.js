const mongoose = require('mongoose'),
Competencia = mongoose.model('Competencia'),
EquipoC = mongoose.model('EquipoCompetidor'),
Equipo = mongoose.model('Equipo'),
funcionesGlobales = require("../FuncionesGlobales.js"),
notificacionHelper = require("../fireBase/NotificacionHelper"),
registroNotificacion = require("../fireBase/RegistroNotificacion"),
globales =  require("../Globales.js");

exports.agregarEquipo = async function(req, res, devolverMensaje = true){
    Competencia.findOne()
    .where({_id : req.body.competencia})
    .exec()
    .then(competencia =>{
        if(competencia){
            EquipoC.findOne()
            .where({competencia: req.body.competencia,
                equipo: req.body.equipo})
            .exec()
            .then(equipoC => {
                if(!equipoC){
                    var nuevoEquipo = new EquipoC(req.body);
                    nuevoEquipo.save().then(equipo=>{
                        registroNotificacion.migrarDispositivoEquipoCompetencia(res, equipo)
                        notificacionHelper.notificarIngresoEquipo(EquipoC, equipo)
                        if(devolverMensaje)
                            res.json({token: res.locals.token, datos: globales.mensajes(-7, "Equipo a Competencia", " ")});    
                    }).catch(async err=>{
                        if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta       
                            funcionesGlobales.registrarError("ingresarEquipoACompetencia/EquipoService", err)
                            if(devolverMensaje)
                                res.json({token: res.locals.token, datos: globales.mensajes(21, "Equipo a Competencia ", funcionesGlobales.manejarError(err))});
                          }else{//Error llave duplicada
                            await funcionesGlobales.restarContador('equipoCompetidor'); 
                            if(devolverMensaje)
                                res.json({token: res.locals.token, datos: globales.mensajes(15, "id de equipo a competencia", " ")});
                          }
                    });
                }else{
                    if(devolverMensaje)
                        res.json({token: res.locals.token, datos: globales.mensajes(22, "equipo", " ")});    
                }
            }).catch(err =>{
                funcionesGlobales.registrarError("ingresarEquipoACompetencia/EquipoService", err)
                if(devolverMensaje)
                    res.json({token: res.locals.token, datos: globales.mensajes(19, "equipo.", funcionesGlobales.manejarError(err))})
            });
        }else{
            if(devolverMensaje)
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("ingresarEquipoACompetencia/EquipoService", err)
        if(devolverMensaje)
            res.json({token: res.locals.token, datos: globales.mensajes(19, "equipo.", funcionesGlobales.manejarError(err))});        
    })
}

exports.ingresarMultiplesEquiposCompeticion = async function(req, res){
    await funcionesGlobales.asyncForEach(req.body.equipos, async (equipo, indice, equipos)=>{
        let req = {
            body: equipo
        }
           await module.exports.agregarEquipo(req, res, false);
    })
}

exports.registrarDispositivoEquipo = async function(req, res, devolverMensaje = true){
    await registroNotificacion.registrarDispositivoEnEquipo(req, res, devolverMensaje);
    await migrarAlertasCompetencias(req, res);
}

// //Migra las competencias "viejas" o donde el equipo ya se encontraba registrado
// //luego de darle seguir a un equipo
async function migrarAlertasCompetencias(req, res){
    await buscarCompetenciasEquipos(req, res,
        registroNotificacion.registrarDispositivoEnCompetencia);
}

exports.removerDispositivoEquipo = async function(req, res, devolverMensaje = true){
    registroNotificacion.removerDispositivoEnEquipo(req, res, devolverMensaje);
    await removerAlertasCompetencias(req, res)
}

// //Remueve las competencias "viejas" o donde el equipo ya se encontraba registrado
// //luego de dejar de seguir a un equipo
async function removerAlertasCompetencias(req, res){
    await buscarCompetenciasEquipos(req, res,
        registroNotificacion.removerDispositivoEnCompetencia);
}


async function buscarCompetenciasEquipos(req, res, registrarRemover){
    EquipoC.find()
    .where({"equipo" : req.body.equipo})
    .select({"competencia": 1, _id: 0})
    .exec()
    .then(async competencias =>{
        let idCompetencias = Array.from(new Set(competencias));
        await funcionesGlobales.asyncForEach(idCompetencias , async (idComp, indice, deportes) => { 
            let tReq ={
                body:{
                    token: req.body.token,
                    competencia: idComp.competencia
                }                
            }
            await registrarRemover(tReq, res, false);
        })
    }).catch(err=>{
        funcionesGlobales.registrarError("buscarCompetenciasAltetas/EquipoService", err);
    })
}

exports.removerDispositivoEquipoDeCompetencia = async function(res, equipoC) {
    registroNotificacion.removerDispositivoEquipoCompetencia(res, equipoC);
}

exports.notificiarCambioMarcador = async function(Model, equipoC){
    notificacionHelper.notificarCambioMarcadorEquipo(Model, equipoC);
} 

exports.iterarEquipos = async function (token, equipos){
    await funcionesGlobales.asyncForEach(equipos ,async (element, indice, equipos) => {
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
         equipos[indice] = element.infoPublica(tieneNotificacion);
     });
     return equipos;
 }

 exports.tieneNotificacion = async function(token , equipoId){
    return await notificacionHelper.tieneNotificacionEquipo(token, equipoId);
 }

 exports.migrarAlertasEquipos = async function(req, res){
    await migracionAlertasEquipos(req, res,
        module.exports.registrarDispositivoEquipo);
 }

 exports.removermigracionAlertasEquipos = async function(req, res){
   await migracionAlertasEquipos(req, res,
        module.exports.removerDispositivoEquipo);
 }

exports.migrarRemoverAlerta = async function(req, res, agregar){
   if(agregar == 1){
       module.exports.migrarAlertasEquipos(req. res);
   }else{
       module.exports.removermigracionAlertasEquipos(req, res);
   }
}


 async function migracionAlertasEquipos(req, res, removerRegistrarEnEquipo){
    await Equipo.find()
    .where({atletas: req.body.atleta})
    .select({_id: 1})
    .then(async equipos=>{
       await funcionesGlobales.asyncForEach(equipos , async (equipoId, indice, equipos) => { 
           let tReq ={
               body:{
                   token: req.body.token,
                   equipo: equipoId._id
               }                
           }
           await removerRegistrarEnEquipo(tReq, res, false); 
       })
    })
    .catch(err=>{
       funcionesGlobales.registrarError("migracionAlertasEquipos/EquipoService", err)
    })
 }