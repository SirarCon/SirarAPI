const mongoose = require('mongoose'),
Competencia = mongoose.model('Competencia'),
AtletaC = mongoose.model('AtletaCompetidor'),
funcionesGlobales = require("../FuncionesGlobales.js"),
notificacionHelper = require("../fireBase/NotificacionHelper"),
globales =  require("../Globales.js");


exports.tieneNotificacion = async function(token ,atletaId){
    var resultado = await fireBase.existeDispositivoAtleta({
        atleta: atletaId,
        token: token          
     });
     return resultado.length > 0;
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
                        notificacionHelper.ingresoAtleta(AtletaC, atleta)
                        if(devolverMensaje)
                           res.json({token: res.locals.token, datos: globales.mensajes(-7, "Atleta a Competencia", " ")});                            
                    }).catch(async err=>{
                        if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta       
                            funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaCompetidorController", err)
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
                funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaCompetidorController", err)
                if(devolverMensaje)
                    res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))})
            });
        }else{
            if(devolverMensaje)
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("ingresarAtletaACompetencia/AtletaCompetidorController", err)
        if(devolverMensaje)
            res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))});        
    })
}


exports.registrarMultiplesNotificacionesAtletas = async function(req, res){
    await funcionesGlobales.asyncForEach(req.body.atletas, async (atleta, indice, atletas)=>{
        let req = {
            body: atleta
        }
           await module.exports.agregarAtleta(req, res, false);
    })
}


exports.iterarAtletas = async function (token, atletas){
    await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
         atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);               
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
          atletas[indice] = element.infoPublica(tieneNotificacion);
     });
     return atletas;
 }

 exports.manejarErrorLeerAtleta = async function(err, req, res){
    funcionesGlobales.registrarError("leerAtletaActivo/AtletaController", err)
    res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id)});
}

exports.manejarErrorLeerAtletas = async function (err, res){
    funcionesGlobales.registrarError("listarAtletasActivos/AtletaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", "")}); 
}