const mongoose = require('mongoose'),
Competencia = mongoose.model('Competencia'),
AtletaC = mongoose.model('AtletaCompetidor'),
equipoService = require("./EquipoService"),
funcionesGlobales = require("../FuncionesGlobales.js"),
notificacionHelper = require("../fireBase/NotificacionHelper"),
registroNotificacion = require("../fireBase/RegistroNotificacion"),
globales =  require("../Globales.js");

exports.ingresarMultiplesAtletasCompeticion = async function(req, res){
    await funcionesGlobales.asyncForEach(req.body.atletas, async (atleta, indice, atletas)=>{
        let req = {
            body: atleta
        }
           await module.exports.agregarAtleta(req, res, false);
    })
}

exports.agregarAtleta = async function(req, res, devolverMensaje = true){
    await Competencia.findOne()
    .where({_id : req.body.competencia})
    .exec()
    .then(competencia =>{
        if(competencia){
            AtletaC.findOne()
            .where({competencia: req.body.competencia,
                    atleta: req.body.atleta
                })
            .exec()
            .then(atletaC => {
                if(!atletaC){
                    var nuevoAtelta = new AtletaC(req.body);
                    nuevoAtelta.save().then(atleta=>{
                        registroNotificacion.migrarDispositivoAtletaCompetencia(res, atleta)
                        notificacionHelper.notificarIngresoAtleta(AtletaC, atleta);
                        if(devolverMensaje)
                           res.json({token: res.locals.token, datos: globales.mensajes(-7, "Atleta a Competencia", " ")});                            
                    }).catch(async err=>{
                        if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta       
                            funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaService", err)
                            if(devolverMensaje)
                                res.json({token: res.locals.token, datos: globales.mensajes(21, "Atleta a Competencia ", funcionesGlobales.manejarError(err))});
                          }else{//Error llave duplicada
                            await funcionesGlobales.restarContador('atletaCompetidor'); 
                            if(devolverMensaje)
                                res.json({token: res.locals.token, datos: globales.mensajes(15, "id de atleta a competencia", " ")});
                          }     
                        });
                }else{
                    if(devolverMensaje)
                        res.json({token: res.locals.token, datos: globales.mensajes(22, "atleta", " ")});    
                }
            }).catch(err =>{
                funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaService", err)
                if(devolverMensaje)
                    res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))})
            });
        }else{
            if(devolverMensaje)
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaService", err)
        if(devolverMensaje)
            res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))});        
    })
}


exports.registrarDispositivoAtleta = async function(req, res){
    await registroNotificacion.registrarDispositivoEnAtleta(req, res);
    await migrarAlertasCompetencias(req, res);
    await equipoService.migrarAlertasEquipos(req, res);
}

// //Migra las competencias "viejas" o donde el alteta ya se encontraba registrado
// //luego de darle seguir a un atleta
async function migrarAlertasCompetencias(req, res){
    await buscarCompetenciasAltetas(req, res,
        registroNotificacion.registrarDispositivoEnCompetencia);
}

exports.removerDispositivoAtleta = async function(req, res){
    await registroNotificacion.removerDispositivoEnAtleta(req, res);
    await removerAlertasCompetencias(req, res)
    await equipoService.removermigracionAlertasEquipos(req, res);
}

// //Remueve las competencias "viejas" o donde el alteta ya se encontraba registrado
// //luego de dejar de seguir a un atleta
async function removerAlertasCompetencias(req, res){
    await buscarCompetenciasAltetas(req, res,
        registroNotificacion.removerDispositivoEnCompetencia);
}


async function buscarCompetenciasAltetas(req, res, registrarRemover){
    AtletaC.find()
    .where({"atleta" : req.body.atleta})
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
        funcionesGlobales.registrarError("buscarCompetenciasAltetas/AtletaService", err);
    })
}


exports.removerDispositivoAtletaDeCompetencia = async function(res, atletaC) {
    registroNotificacion.removerDispositivoAtletaCompetencia(res, atletaC);
}

exports.notificiarCambioMarcador = async function(Model, atletaC){
    notificacionHelper.notificarCambioMarcadorAtleta(Model, atletaC);
} 


exports.iterarAtletas = async function (token, atletas){
    await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
         atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);               
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
          atletas[indice] = element.infoPublica(tieneNotificacion);
     });
     return atletas;
 }

 
 exports.iterarAtletasAdmin = async function (token, atletas){
    await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
         atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);               
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
          atletas[indice] = element.todaInformacion(tieneNotificacion);
     });
     return atletas;
 }


exports.tieneNotificacion = async function(token ,atletaId){
    return await notificacionHelper.tieneNotificacionAtleta(token, atletaId);
 }

 exports.manejarErrorLeerAtleta = async function(err, req, res){
    funcionesGlobales.registrarError("leerAtletaActivo/AtletaController", err)
    res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id)});
}

exports.manejarErrorLeerAtletas = async function (err, res){
    funcionesGlobales.registrarError("listarAtletasActivos/AtletaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", "")}); 
}