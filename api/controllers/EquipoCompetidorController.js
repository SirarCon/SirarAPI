var mongoose = require('mongoose'),
EquipoC = mongoose.model('EquipoCompetidor'),
Prueba = mongoose.model('Prueba'),
Fase = mongoose.model('Fase'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
equipoService = require("../services/EquipoService"),
competenciaService = require("../services/CompetenciaService");


//todo: no se que significa este comentario: ver update de equipo (deporte no cambia)
exports.ingresarEquipoACompetencia = async function(req, res){
    equipoService.agregarEquipo(req, res)
    };

exports.ingresarEquiposACompetencia = async function(req, res){
        await equipoService.ingresarMultiplesEquiposCompeticion(req, res);
        res.json({token: res.locals.token, datos: globales.mensajes(-7, "Equipos a Competencia", " ")});    
        //Todo Implementar una forma para manejar el error                
    };
    
exports.eliminarEquipoDeCompetencia = async function(req, res){
        EquipoC.findOneAndRemove({_id: req.params.idEquipoCompetencia})
        .exec()
        .then(equipo=>{
            if(equipo){
                equipoService.removerDispositivoEquipoDeCompetencia(res, equipo)
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

    exports.modificarMarcador = async function(req, res){
        var modificar ={
                "$set" : {
                    "marcadores.$.esUltimoRegistro" : req.body.marcador.esUltimoRegistro,
                    "marcadores.$.set" : req.body.marcador.set,
                    "marcadores.$.puntaje" : req.body.marcador.puntaje,
                    "marcadores.$.momentoTiempo" : req.body.marcador.momentoTiempo,
                    "marcadores.$.momentoOportunidad" : req.body.marcador.momentoOportunidad,
                    "marcadores.$.cantidadOportunidades" : req.body.marcador.cantidadOportunidades,
                }
        }
    
        EquipoC.findOneAndUpdate({_id: req.params.idEquipo, "marcadores._id": mongoose.Types.ObjectId(req.body.marcador.idMarcador)},
                                 modificar, {new: true})
        .exec()
        .then(equipo=>{
            if(equipo){
                equipoService.notificiarCambioMarcador(EquipoC, equipo)
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Registro")});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
                }
        }).catch(err=>{
            funcionesGlobales.registrarError("modificarmarcadores/EquipoCompetidorController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))}); 
        })
                
    };

exports.agregarRemoverMarcador = async function(req, res){
    var marcador ={
        ...req.body.marcador,
        momentoRegistro: new Date().getTime()
    }
    var modificar = req.params.agregar == 1 ? {$push:{ marcadores: marcador}} :
    req.body.marcador.idMarcador ?
    {$pull:{ marcadores: {_id: mongoose.Types.ObjectId(req.body.marcador.idMarcador)} } }
    : {$pull:{ marcadores: null } };//Por si existe un null
    EquipoC.findOneAndUpdate({_id: req.params.idEquipo}, modificar, {new: true}).exec()
    .then(equipo=>{
        if(equipo){
            equipoService.notificiarCambioMarcador(EquipoC, equipo)
            res.json({token: res.locals.token, datos: globales.mensajes(req.params.agregar == 1 ?  -4 : -2, "Registro")});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
            }
    }).catch(err=>{
        funcionesGlobales.registrarError("agregarRemoverMarcador/EquipoCompetidorController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))});                                })
            
};

exports.modificarEquipoCompetidor = async function(req, res) {
    EquipoC.findOneAndUpdate(
        {_id: req.params.idEquipo},
        {
         $set:{
            esLocal: req.body.esLocal,            
         }
        },
        {projection:{}, new: true, runValidators: true})
        .exec()
        .then(equipo=>{
            if(equipo){
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Equipo", equipo._id)});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
            }
        }).catch(err=>{
            funcionesGlobales.registrarError("modificarEquipoCompetidor/EquipoCompetidorController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))}); 
        })
};

exports.listarEquiposCompetencia = async function(req, res){ 
    EquipoC.aggregate([
        {
            $match:{
                competencia: Number(req.params.idCompetencia),                               
            }
        },
        {
            $lookup: {
                "localField": "equipo",
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
                equipo:{    
                    nombre: "$equipoinfo.nombre",                    
                    id: "$equipoinfo._id",
                    pais : "$equipoinfo.pais", 
                },
                marcadores: 1,
                esLocal: 1,
            }
        },
    ]).exec()
    .then(equipos =>{
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,  
            equipos.map(e=>{        
                e.marcadores = [].slice.call(e.marcadores).sort((a, b)=>{ return a.set - b.set})
                return e;
            })
        )});          
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
    .exec()
    .then(eventos=> {
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarDeportesEventosEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes del equipo", " ")});  
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
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarPruebasDeporteEventosEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas del equipo", " ")});  
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
    ]).exec()
    .then(competencias=> {
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarCompetenciasPorPruebaEquipo/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del equipo", " ")});  
    });
    }

//Lista las competencias del equipo agrupadas por evento
exports.listarCompetenciasPorEquipo = async function(req, res){
    EquipoC.aggregate([
       {
           $match: { 
               equipo: Number(req.params.idEquipo),
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
            $unwind: "$competencia"
        },
        {
            $lookup: {
             "localField": "competencia.evento",
             "from": "eventos",
             "foreignField": "_id",
             "as": "evento"
             }
         },
         {
             $unwind: "$evento"
         },
        {
            $group: { 
                    _id: {_id: "$evento._id", nombre: "$evento.nombre"},
                    competencias: {$push: "$competencia"}
            }
        },
       
    ]).exec().then(async competencias=> {
        competencias = await Prueba.populate(competencias, 
            [{path: "competencias.prueba", 
            select: "_id nombre tipo tipoMarcador deporte"
            } 
        ]);
            competencias = await Fase.populate(competencias, [{path: "competencias.fase", select: "_id, descripcion"} ]);
            competencias = await competenciaService.tienenNotificacion(req.header('tokenDispositivo'), competencias);
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
    }).catch(err => {
        funcionesGlobales.registrarError("listarCompetenciasPorEquipo/EquipoCompetidorController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del equipo", " ")});  
    });
    }