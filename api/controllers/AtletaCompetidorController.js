var mongoose = require('mongoose'),
AtletaC = mongoose.model('AtletaCompetidor'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
atletaService = require("../services/AtletaService");


//todo: no se que significa este comentario: ver update de atleta (deporte no cambia)
exports.ingresarAtletaACompetencia = async function(req, res){
    atletaService.agregarAtleta(req, res)
    };


exports.ingresarAtletasACompetencia = async function(req, res){
     await atletaService.ingresarMultiplesAtletasCompeticion(req, res);
        res.json({token: res.locals.token, datos: globales.mensajes(-7, "Atletas a Competencia", " ")});    
        //Todo Implementar una forma para manejar el error 
};

exports.eliminarAtletaDeCompetencia = async function(req, res){
        AtletaC.findOneAndRemove({_id: req.params.idAtletaCompetencia})
        .exec()
        .then(atleta=>{
            if(atleta){
                atletaService.removerDispositivoAtletaDeCompetencia(res, atleta)
                res.json({token: res.locals.token, datos: globales.mensajes(-2, "Atleta", " ")});    
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
            }
        }).catch(err=>{
            funcionesGlobales.registrarError("eliminarAtletaDeCompetencia/AtletaCompetidorController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(20, "atleta.", funcionesGlobales.manejarError(err))});        
        });
    };

exports.modificarMarcadores = async function(req, res){
    var marcador ={
        ...req.body.marcador,
        momentoRegistro: new Date().getTime()
    }
    var modificar = req.params.agregar == 1 ? {$push:{ marcadores: marcador}} :
    req.body.marcador.idMarcador ?
    {$pull:{ marcadores: {_id: mongoose.Types.ObjectId(req.body.marcador.idMarcador)} } }
    : {$pull:{ marcadores: null } };//Por si existe un null
    AtletaC.findOneAndUpdate({_id: req.params.idAtleta}, modificar, {new: true}).exec()
    .then(atleta=>{
        if(atleta){
            res.json({token: res.locals.token, datos: globales.mensajes(-3, "Atleta", atleta._id)});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
                }
            }).catch(err=>{
                funcionesGlobales.registrarError("modificarmarcadores/AtletaCompetidorController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(14, "atleta.", funcionesGlobales.manejarError(err))}); 
            })
            
};

exports.modificarAtletaCompetidor = async function(req, res) {
    AtletaC.findOneAndUpdate(
        {_id: req.params.idAtleta},
        {
         $set:{
            esLocal: req.body.esLocal,            
         }
        },
        {projection:{}, new: true, runValidators: true})
        .exec()
        .then(atleta=>{
            if(atleta){
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Atleta", atleta._id)});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
            }
        }).catch(err=>{
            funcionesGlobales.registrarError("modificarAtletaCompetidor/AtletaCompetidorController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(14, "atleta.", funcionesGlobales.manejarError(err))}); 
        })
};


exports.listarAtletasCompetencia = async function(req, res){ 
    AtletaC.aggregate([
        {
            $match:{
                competencia: Number(req.params.idCompetencia),                               
            }
        },
        {
            $lookup: {
                "localField": "atleta",
                "from": "atletas",
                "foreignField": "_id",
                "as": "atletainfo"
            }
        },
        {
            $unwind: "$atletainfo"
        },
        {
            $project:{
                    atleta:{                        
                        nombre : "$atletainfo.nombre", 
                        id: "$atletainfo._id",
                        pais: "$atletainfo.pais"
                    },
                    marcadores: 1,
                    esLocal: 1,         
            }
        }
    ]).exec()
    .then(atletas =>{
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, 
            atletas.map(a=>{  
                a.marcadores = [].slice.call(a.marcadores)//Convert to array to work with jest
                                    .sort((a, b)=>{ return a.set - b.set})
                return a;
            }
        ))});          
      }).catch(err=>{
        funcionesGlobales.registrarError("listarAtletasCompetencia/AtletaCompetidorController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", " ")});  
    });
    };

//Lista los deportes de un evento seleccionado donde participó un atleta específico
exports.listarDeportesEventosAtleta = async function(req, res){
    AtletaC.aggregate([
       {
           $match: { 
               atleta: Number(req.params.idAtleta)
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "competencias",
                "foreignField": "_id",
                "as":  "competencias"
           }
        },
        {
            $match: {
                "competencias.evento" : Number(req.params.idEvento)
            }
        },
        {
            $project: {
                competencias: {
                    prueba: 1
                },
                _id: 0
            }
        },
        {
            $unwind: "$competencias"
         },
        {
            $lookup: {
                "localField": "competencias.prueba",
                "from": "pruebas",
                "foreignField": "_id",
                "as": "pruebas"
            }
        },
        {
            $project: {
                pruebas: { 
                    deporte: 1
                }
            }
        },
        {
            $group:  { 
                _id: {
                    _id: "$pruebas.deporte",
                }
            }
        }
    ])
    .exec().then(eventos=> {
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarDeportesEventosAtleta/AtletaCompetidorController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes del atleta", " ")});  
    });
    }  

//Lista las pruebas según deporte de un evento seleccionado donde participó un atleta específico
exports.listarPruebasDeporteEventosAtleta = async function(req, res){
    AtletaC.aggregate([
       {
           $match: { 
               atleta: Number(req.params.idAtleta),
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "competencias",
                "foreignField": "_id",
                "as":  "competencias"
           }
        },
        {
            $match: {
                "competencias.evento" : Number(req.params.idEvento)
            }
        },
        {
            $project: {
                competencias: {
                    prueba: 1
                },
                _id: 0
            }
        },
        {
            $unwind: "$competencias"
         },
        {
            $lookup: {
                "localField": "competencias.prueba",
                "from": "pruebas",
                "foreignField": "_id",
                "as": "pruebas"
            }
        },
        {
            $project: {
                pruebas: { 
                    _id: 1,
                    nombre: 1,
                    nombreNormalizado: 1,
                    deporte: 1
                }
            },
        },
        {
            $match:{
                "pruebas.deporte": Number(req.params.idDeporte)
            }
        },
        {
            $unwind: "$pruebas"
         },
        {
            $group: {
                _id: {
                _id: "$pruebas._id",
                nombre: "$pruebas.nombre",
                nombreNormalizado: "$pruebas.nombreNormalizado"
            }
            }
        }
    ]).exec()
    .then(eventos=> {
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarPruebasDeporteEventosAtleta/AtletaCompetidorController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los pruebas del atleta", " ")});  
    });
    }
    
//Lista las competencias según prueba de un evento seleccionado donde participó un atleta específico
exports.listarCompetenciasPorPruebaAtleta = async function(req, res){
    AtletaC.aggregate([
       {
           $match: { 
               atleta: Number(req.params.idAtleta),
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "competencias",
                "foreignField": "_id",
                "as":  "competencia"
           },
        },
        {
            $match: {
                "competencia.evento" : Number(req.params.idEvento),
                "competencia.prueba" : Number(req.params.idPrueba)
            }
        },
        {
            $unwind: "$competencia"
        },
        {
           $lookup: {
            "localField": "competencia.fase",
            "from": "fases",
            "foreignField": "_id",
            "as": "competencia.fase"
            }
        },
        {
            $unwind: "$competencia.fase"
        },
        {
            $project: {
                competencia: { 
                    _id: 1,
                    descripcion: 1,
                    fase: {
                        _id: 1,
                        descripcion: 1,
                        siglas: 1
                    }
                },
                _id: 0
                
            },
        },
    ]).exec().then(competencias=> {
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarCompetenciasPorPruebaAtleta/AtletaCompetidorController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del atleta", " ")});  
    });
    }

