var mongoose = require('mongoose'),
EquipoC = mongoose.model('EquipoCompetidor'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");

//todo: no se que significa este comentario: ver update de equipo (deporte no cambia)
exports.ingresarEquipoACompetencia = async function(req, res){
    Competencia.findOne()
    .where({_id : req.body.competencia})
    .exec()
    .then(competencia =>{
        if(competencia){
            EquipoC.estimatedDocumentCount(
                {competencia: req.body.competencia,
                equipo: req.body.equipo})
            .exec()
            .then(count => {
                if(count == 0){
                    var nuevoEquipo = new EquipoC(req.body);
                    nuevoEquipo.save().then(equipo=>{
                        res.json({token: res.locals.token, datos: globales.mensajes(-7, "Equipo a Competencia", " ")});    
                    }).catch(async err=>{
                        res.json({token: res.locals.token, datos: globales.mensajes(21, "Equipo a Competencia", " ")});//Todo Cambiar
                    });
                }else{
                    res.json({token: res.locals.token, datos: globales.mensajes(22, "equipo", " ")});    
                }
            }).catch(err =>{
                funcionesGlobales.registrarError("ingresarEquipoACompetencia/CompetenciaController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(19, "equipo.", funcionesGlobales.manejarError(err))})
            });
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("ingresarEquipoACompetencia/CompetenciaController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(19, "equipo.", funcionesGlobales.manejarError(err))});        
    })
    };
    
    exports.eliminarEquipoDeCompetencia = async function(req, res){
        EquipoC.findOneAndRemove({_id: req.params.idEquipoCompetencia})
        .exec()
        .then(equipo=>{
            if(equipo){
                res.json({token: res.locals.token, datos: globales.mensajes(-2, "Equipo", " ")});    
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
            }
        })
        .catch(err=>{
            funcionesGlobales.registrarError("eliminarEquipoDeCompetencia/CompetenciaController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(20, "equipo.", funcionesGlobales.manejarError(err))});        
        });
    };



exports.listarEquiposCompetencia = async function(req, res){ 
    EquipoC.aggregate([
        {
            $match:{
                competencia: Number(req.params.idCompetencia),                               
            }
        },
        {
            $group:{
                _id: {
                    equipo: "$equipo",
                    marcadores: "$marcadores"
                }
        }
        },
        {
            $lookup: {
                "localField": "_id.equipo",
                "from": "equipos",
                "foreignField": "_id",
                "as": "equipoinfo"
            }
        },
        {
            $unwind: "$equipoinfo"
        },
        {
            $project:{
                    _id:{
                        _idEquipo : "$equipoinfo._id",
                        nombre : "$equipoinfo.nombre", 
                        marcadores : 1 
                }         
            }
        }
    ]).exec().then(equipos =>{
        if(equipos.length > 0){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipos)});  
        }else{
          res.json({token: res.locals.token, datos: globales.mensajes(11, "equipos", " ")});
        }
      }).catch(err=>{
        funcionesGlobales.registrarError("listarEquiposCompetencia/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los equipos", " ")});  
    });
    };

//Lista los deportes de un evento seleccionado donde participó un equipo específico
exports.listarDeportesEventosEquipo = async function(req, res){
    EquipoC.aggregate([
       {
           $match: { 
               equipo: Number(req.params.idEquipo)
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "Competencias",
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
        if(eventos.length > 0){ 
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarDeportesEventosEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del equipo", " ")});  
    });
    }
    


//Lista las pruebas según deporte de un evento seleccionado donde participó un equipo específico
exports.listarPruebasDeporteEventosEquipo = async function(req, res){
    EquipoC.aggregate([
       {
           $match: { 
               equipo: Number(req.params.idEquipo),
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "Competencias",
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
    ]).exec().then(eventos=> {
        if(eventos.length > 0){                                               
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarPruebasDeporteEventosEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del equipo", " ")});  
    });
    }
    
//Lista las competencias según prueba de un evento seleccionado donde participó un equipo específico
exports.listarCompetenciasPorPruebaEquipo = async function(req, res){
    EquipoC.aggregate([
       {
           $match: { 
               equipo: Number(req.params.idEquipo),
           }
        },
         {  $lookup: {
                "localField": "competencia",
                "from": "Competencias",
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
        if(competencias.length > 0){                                               
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "competencias", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarCompetenciasPorPruebaEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del equipo", " ")});  
    });
    }
