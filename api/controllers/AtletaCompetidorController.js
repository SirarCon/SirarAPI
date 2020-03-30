var mongoose = require('mongoose'),
AtletaC = mongoose.model('AtletaCompetidor'),
Competencia = mongoose.model('Competencia'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");

//todo: no se que significa este comentario: ver update de atleta (deporte no cambia)
exports.ingresarAtletaACompetencia = async function(req, res){
    Competencia.findOne()
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
                        res.json({token: res.locals.token, datos: globales.mensajes(-7, "Atleta a Competencia", " ")});    
                    }).catch(async err=>{
                        res.json({token: res.locals.token, datos: globales.mensajes(21, "Atleta a Competencia", " ")});//Todo Cambiar
                    });
                }else{
                    res.json({token: res.locals.token, datos: globales.mensajes(22, "atleta", " ")});    
                }
            }).catch(err =>{
                funcionesGlobales.registrarError("ingresarAtletaACompetencia/CompetenciaController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))})
            });
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("ingresarAtletaACompetencia/CompetenciaController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))});        
    })
    };
    
exports.eliminarAtletaDeCompetencia = async function(req, res){
        AtletaC.findOneAndRemove({_id: req.params.idAtletaCompetencia})
        .exec()
        .then(atleta=>{
            if(atleta){
                res.json({token: res.locals.token, datos: globales.mensajes(-2, "Atleta", " ")});    
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
            }
        })
        .catch(err=>{
            funcionesGlobales.registrarError("eliminarAtletaDeCompetencia/CompetenciaController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(20, "atleta.", funcionesGlobales.manejarError(err))});        
        });
    };

exports.modificarMarcadores = async function(req, res){
    var modificar = req.params.agregar == 1 ? {$push:{ marcadores: req.body.marcador}} :
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
                res.json({token: res.locals.token, datos: globales.mensajes(14, "atleta.", funcionesGlobales.manejarError(err))});                                })
            
};


exports.listarAtletasCompetencia = async function(req, res){ 
    AtletaC.aggregate([
        {
            $match:{
                competencia: Number(req.params.idCompetencia),                               
            }
        },
        {
            $group:{
                _id: {
                    atleta: "$atleta",
                    marcadores: "$marcadores"
                }
        }
        },
        {
            $lookup: {
                "localField": "_id.atleta",
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
                }         
            }
        }
    ]).exec().then(atletas =>{
        if(atletas.length > 0){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, 
                atletas.map(a=>{  
                    a._id.marcadores = [].slice.call(a._id.marcadores)//Convert to array to work with jest
                                        .sort((a, b)=>{ return a.set - b.set})
                    return a;
                }
            ))});  
        }else{
          res.json({token: res.locals.token, datos: globales.mensajes(11, "atletas", " ")});
        }
      }).catch(err=>{
          console.log(err)
        funcionesGlobales.registrarError("listarAtletasCompetencia/CompetenciaController", err)
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
        if(eventos.length > 0){ 
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "deportes", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarDeportesEventosAtleta/CompetenciaController", err)
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
    ]).exec().then(eventos=> {
        if(eventos.length > 0){                                               
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "pruebas", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarPruebasDeporteEventosAtleta/CompetenciaController", err)
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
        if(competencias.length > 0){                                               
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "competencias", " ")});
     }
    }).catch(err => {
        funcionesGlobales.registrarError("listarCompetenciasPorPruebaAtleta/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del atleta", " ")});  
    });
    }
