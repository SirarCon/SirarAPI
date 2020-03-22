//#region Requires
var mongoose = require('mongoose'),
Prueba = mongoose.model('Prueba'),
Evento = mongoose.model('Evento'),
CompetenciaA = mongoose.model('CompetenciaAtleta'),
AtletaC = mongoose.model('AtletaCompetidor'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");

exports.crearCompetencia = async function(req, res){
    Evento.findOne()
    .where({_id: req.body.evento})
    .exec()
    .then(evento=>{
        if(evento){
        Prueba.findOne()
        .where({_id: req.body.prueba})
        .exec()
        .then(prueba=>{
            if(prueba){
                var nuevaCompetencia = new CompetenciaA(req.body);
                nuevaCompetencia.save().then(competencia=>{
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, "Competencia del", competencia.infoPublica().fechaHora)});
                }).catch(async err=>{
                    funcionesGlobales.registrarError("crearCompetencia/CompetenciaAtletaController", err)
                    await funcionesGlobales.restarContador('competencia');
                    res.json({token: res.locals.token,datos: globales.mensajes(10, "la competencia del", req.body.fechaHora, funcionesGlobales.manejarError(err))});
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", "especificada")});
            }
        }).catch(err=>{
            if(req.body.idPrueba){
                funcionesGlobales.registrarError("crearCompetencia/CompetenciaAtletaController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(13, "prueba", "seleccionado")});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", " ")});
            }});        
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.idEvento)});   
        }
    }).catch((err)=>{
        if(req.body.idEvento){
            funcionesGlobales.registrarError("crearCompetencia/CompetenciaAtletaController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(13, "evento", "seleccionado")});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", " ")});
        }
  });
};

exports.modificarCompetencia = async function(req, res){
CompetenciaA.findOneAndUpdate({_id: req.params.idCompetencia},
    { $set: {
        evento: req.body.evento,
        prueba: req.body.prueba,
        fechaHora: req.body.fechaHora,
        ciudad: req.body.ciudad,
        estadio: req.body.estadio,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        fase: req.body.fase,
        activo: req.body.activo
        }}, {projection:{}, new: false, runValidators: true}
    ).exec()
    .then(competenciaAntigua=>{
        if(competenciaAntigua){
            res.json({token: res.locals.token, datos: globales.mensajes(-3, "Competencia", req.body.descripcion)});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("modificarCompetencia/CompetenciaAtletaController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(14, "competencia.", funcionesGlobales.manejarError(err))});        
    })
};
//todo: no se que significa este comentario: ver update de atleta (deporte no cambia)
exports.ingresarAtletaACompetencia = async function(req, res){
CompetenciaA.findOne()
.where({_id : req.body.competencia})
.exec()
.then(competencia =>{
    if(competencia){
        AtletaC.estimatedDocumentCount(
            {competencia: req.body.competencia,
            atleta: req.body.atleta})
        .exec()
        .then(count => {
            if(count == 0){
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
            funcionesGlobales.registrarError("ingresarAtletaACompetencia/CompetenciaAtletaController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err))})
        });
    }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ")});
    }
}).catch(err=>{
    funcionesGlobales.registrarError("ingresarAtletaACompetencia/CompetenciaAtletaController", err)
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
        funcionesGlobales.registrarError("eliminarAtletaDeCompetencia/CompetenciaAtletaController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(20, "atleta.", funcionesGlobales.manejarError(err))});        
    });
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
                _id:{
                    _idAtleta : "$atletainfo._id",
                    nombre : "$atletainfo.nombre", 
                    marcadores : 1 
            }         
        }
    }
]).exec().then(atletas =>{
    if(atletas.length > 0){
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas)});  
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(11, "atletas", " ")});
    }
  }).catch(err=>{
    funcionesGlobales.registrarError("listarAtletasCompetencia/CompetenciaAtletaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", " ")});  
});
};

//Lista los deportes según el evento seleccionado
exports.listarDeportesXEvento = async function(req, res){
CompetenciaA.find()
.where({ evento: req.params.idEvento, activo: true })
.populate({path:"prueba", select: "deporte"})
.exec()
.then(competencias => {
    if(competencias.length > 0){
        var deportes = Array.from(new Set(competencias.map(c=>  c.prueba.deporte)));
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes)});  
}else{
    res.json({token: res.locals.token, datos: globales.mensajes(11, "deportes", " ")});
  }
})
.catch(err=>{
    funcionesGlobales.registrarError("listarDeportesXEvento/CompetenciaAtletaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes de las competencias", " ")});  
});
};

//Agrupa y lista las categorias de los deportes practicados durante un evento seleccionado
exports.listarCategoriasXDeporte = async function(req, res){
     CompetenciaA.aggregate([  
                  { $lookup: {
                                    "localField": "prueba",
                                    "from": "pruebas",
                                    "foreignField": "_id",
                                    "as": "pruebaPertenciente"
                                 }
                            },                          
                    { 
                    $match: {   
                        "pruebaPertenciente.deporte": Number(req.params.idDeporte),
                        "pruebaPertenciente.activo": true,
                        evento : Number(req.params.idEvento),                               
                        activo: true
                    }         
                    },
                    {
                        $unwind: "$pruebaPertenciente"
                    }, 
                        { $group:{_id: {
                                    prueba: "$prueba",
                                    nombre: "$pruebaPertenciente.nombre",
                                    genero: "$genero",                                            
                                }    
                            }
                    }, 
                    
                    {
                    $project:{
                            _id: {                                    
                                prueba: 1,
                                nombre: 1,
                                genero: 1,                                                                                                            
                            }                         
                        }
                    }
                             ])
                .exec().then(competencias => {            
                    if(competencias.length > 0){                                               
                            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
                     }else{
                            res.json({token: res.locals.token, datos: globales.mensajes(11, "deportes", " ")});
                     }
                }).catch(err => {
                    funcionesGlobales.registrarError("listarCategoriasXDeporte/CompetenciaAtletaController", err)
                    res.json({token: res.locals.token,datos: globales.mensajes(12, "las categorias de las competencias", " ")});  
                });
};

//Lista las fases de las pruebas basadas en el evento, prueba y genero seleccionados
exports.listarFasesxPruebaEvento= function(req, res){
 CompetenciaA.aggregate([
            {   
                $match: {
                     evento: Number(req.params.idEvento),
                     prueba: Number(req.params.idPrueba),
                     genero: Number(req.params.genero),
                     activo: true
                    }
            },
            {
                $group:{
                        _id: {
                            fase: "$fase"
                        }
                }
           },
          {              
                $lookup:{
                    "localField": "_id.fase",
                    "from": "fases",
                    "foreignField": "_id",                         
                    "as": "fase"
                }               
           },
            {
               $unwind: "$fase"
           },
           {
               $sort: {
                    "fase._id" : -1
               }
           },
           {
               $project: {
                    fase: {
                        _id: 1,
                        descripcion: 1
                    },
                    _id: 0
               }
           }
        ])
        .exec().then(fases=>{
            if(fases.length > 0){
                res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases)});  
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(11, "fases", " ")});
            }
        }).catch(err=>{     
            funcionesGlobales.registrarError("listarFasesxPruebaEvento/CompetenciaAtletaController", err)
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases de las competencias", " ")});  
        })
}

//Lista las competencias basadas en el evento, prueba genero y fase seleccionados
exports.listarCompetenciasEventoPruebaFase = function(req, res){
    CompetenciaA.find({
        evento: req.params.idEvento,
        prueba: req.params.idPrueba,
        genero: Number(req.params.genero),
        fase: req.params.fase,
    })
    .sort({descripcion: 1})
    .exec()
    .then(competencias=>{
        if(competencias.length > 0){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "competencias", " ")});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("listarCompetenciasEventoPruebaFase/CompetenciaAtletaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias", " ")});  
    })
}

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
                "from": "competenciaatletas",
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
        funcionesGlobales.registrarError("listarDeportesEventosAtleta/CompetenciaAtletaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del atleta", " ")});  
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
                "from": "competenciaatletas",
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
        funcionesGlobales.registrarError("listarPruebasDeporteEventosAtleta/CompetenciaAtletaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del atleta", " ")});  
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
                "from": "competenciaatletas",
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
        funcionesGlobales.registrarError("listarCompetenciasPorPruebaAtleta/CompetenciaAtletaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias del atleta", " ")});  
    });
    }



// var groupBy = function(xs, key, key2) {
//     return xs.reduce(function(rv, x) {
//       ((rv[x[key]] = rv[x[key]] && rv[x[key2]] = rv[x[key2]]) || []).push(x);
//       return rv;
//     }, {});
//   };

