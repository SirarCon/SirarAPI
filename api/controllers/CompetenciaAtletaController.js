//#region Requires
var mongoose = require('mongoose');
var Prueba = mongoose.model('Prueba');
var Evento = mongoose.model('Evento');
var CompetenciaA = mongoose.model('CompetenciaAtleta');
var AtletaC = mongoose.model('AtletaCompetidor');
var globales =  require("../Globales.js");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Tiempo = require('../recursos/Tiempo.js');
var Schema = mongoose.Schema;

exports.crearCompetenciaAtleta = async function(req, res){
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
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, "Competencia del", req.body.fechaHora).instance});
                }).catch(err=>{
                    console.log(err);
                    res.json({token: res.locals.token,datos: globales.mensajes(10, "la competencia", funcionesGlobales.manejarError(err)).instance});
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", "especificada").instance});
            }
        }).catch(err=>{
            if(req.body.idPrueba){
                res.json({token: res.locals.token, datos: globales.mensajes(13, "prueba", "seleccionado").instance});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", " ").instance});
            }});        
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.idEvento).instance});   
        }
    }).catch((err)=>{
        if(req.body.idEvento){
            res.json({token: res.locals.token, datos: globales.mensajes(13, "evento", "seleccionado").instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", " ").instance});
        }
  });
};

exports.modificarCompetenciaAtleta = async function(req, res){
CompetenciaA.findOneAndUpdate({_id: req.params.idCompetencia},
    { $set: {
        evento: req.body.evento,
        prueba: req.body.prueba,
        fechaHora: req.body.fechaHora,
        lugar: req.body.lugar,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        fase: req.body.fase,
        activo: req.body.activo
        }}, {projection:{}, new: false, runValidators: true}
    ).exec()
    .then(competenciaAntigua=>{
        if(competenciaAntigua){
            res.json({token: res.locals.token, datos: globales.mensajes(-3, "Competencia", req.body.descripcion).instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ").instance});
        }
    }).catch(err=>{
        res.json({token: res.locals.token, datos: globales.mensajes(14, "competencia.", funcionesGlobales.manejarError(err)).instance});        
    })
};
//todo Revisar mensaje y validación de repetidos, ver update de atleta (deporte no cambia)
exports.ingresarAtletaACompetencia = async function(req, res){
CompetenciaA.findOne()
.where({_id : req.body.competencia})
.exec()
.then(competencia =>{
    if(competencia){
        var nuevoAtelta = new AtletaC(req.body);
        nuevoAtelta.save(); //Todo cambiar a -7 no -2
        res.json({token: res.locals.token, datos: globales.mensajes(-2, "Atleta a Competencia", " ").instance});    
    }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Competencia", " ").instance});
    }
}).catch(err=>{
    console.log(err);
    res.json({token: res.locals.token, datos: globales.mensajes(19, "atleta.", funcionesGlobales.manejarError(err)).instance});        
})
};

exports.eliminarAtletaDeCompetencia = async function(req, res){
    AtletaC.findOneAndRemove({_id: req.params.idAtletaCompetencia})
    .exec()
    .then(atleta=>{
        if(atleta){
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "Atleta", " ").instance});    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ").instance});
        }
    })
    .catch(err=>{
        res.json({token: res.locals.token, datos: globales.mensajes(20, "atleta.", funcionesGlobales.manejarError(err)).instance});        
    });
};

exports.listarAtletasCompetencia = async function(req, res){ 
AtletaC.find()
.where({competencia: req.params.idCompetencia})
.populate("atleta", ["_id", "nombre"], null, { sort:{ "nombreNormalizado" : 1 }})
.exec().then(atletas =>{
    if(atletas.length > 0){
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas).instance});  
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(11, "atletas", " ").instance});
    }
  }).catch(err=>{
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", " ").instance});  
});
};

//Lista los deportes según el evento seleccionado
exports.listarDeportesXEvento = async function(req, res){
CompetenciaA.find()
.where({ evento: req.params.idEvento, activo: true })
.populate({path:"prueba", select: "deporte", populate:{path: "deporte", select: "id nombre"}})
.exec()
.then(competencias => {
    if(competencias.length > 0){
        var deportes = Array.from(new Set(competencias.map(c=>  c.prueba.deporte)));
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes).instance});  
}else{
    res.json({token: res.locals.token, datos: globales.mensajes(11, "deportes", " ").instance});
  }
})
.catch(err=>{
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes de las competencias", " ").instance});  
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
                        "pruebaPertenciente.deporte": mongoose.Types.ObjectId(req.params.idDeporte),
                        "pruebaPertenciente.activo": true,
                        evento : mongoose.Types.ObjectId(req.params.idEvento),                               
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
                            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias).instance});  
                     }else{
                            res.json({token: res.locals.token, datos: globales.mensajes(11, "deportes", " ").instance});
                     }
                }).catch(err => {
                    res.json({token: res.locals.token,datos: globales.mensajes(12, "las categorias de las competencias", " ").instance});  
                });
};

//Lista las fases de las pruebas basadas en el evento, prueba y genero seleccionados
exports.listarFasesxPruebaEvento= function(req, res){
 CompetenciaA.aggregate([
            {   
                $match: {
                     evento: mongoose.Types.ObjectId(req.params.idEvento),
                     prueba: mongoose.Types.ObjectId(req.params.idPrueba),
                     genero: req.params.genero == 1,
                    activo: true
                    }
            },
            {
                $group:{
                        _id: {
                            fase: "$fase"
                        }
                }
           }
        ])
        .exec().then(fases=>{
            if(fases.length > 0){
                res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases).instance});  
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(11, "fases", " ").instance});
            }
        }).catch(err=>{            
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases de las competencias", " ").instance});  
        })
}

//Lista las competencias basadas en el evento, prueba genero y fase seleccionados
exports.listarCompetenciasEventoPruebaFase = function(req, res){
    CompetenciaA.find({
        evento: mongoose.Types.ObjectId(req.params.idEvento),
        prueba: mongoose.Types.ObjectId(req.params.idPrueba),
        genero: req.params.genero == 1,
        fase: req.params.fase,
    })
    .sort({descripcion: 1})
    .exec()
    .then(competencias=>{
        if(competencias.length > 0){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias).instance});  
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "competencias", " ").instance});
        }
    }).catch(err=>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias", " ").instance});  
    })
}

//Lista los deportes de un evento seleccionado donde participó un atleta específico
exports.listarDeportesEventosAtleta = async function(req, res){
    AtletaC.aggregate([
       {
           $match: { 
               atleta: mongoose.Types.ObjectId(req.params.idAtleta),
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
                "competencias.evento" : mongoose.Types.ObjectId(req.params.idEvento)
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
            $lookup: {
                "localField": "pruebas.deporte",
                "from": "deportes",
                "foreignField": "_id",
                "as": "deportes" 
                }            
        },{
            $unwind: "$deportes"
        },
        {
            $group:  { 
                _id: {
                    _id: "$deportes._id",
                    nombre: "$deportes.nombre"
                }
            }
        }
    ]).exec().then(eventos=> {
        if(eventos.length > 0){                                               
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos).instance});  
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ").instance});
     }
    }).catch(err => {
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del atleta", " ").instance});  
    });
    }
    



// var groupBy = function(xs, key, key2) {
//     return xs.reduce(function(rv, x) {
//       ((rv[x[key]] = rv[x[key]] && rv[x[key2]] = rv[x[key2]]) || []).push(x);
//       return rv;
//     }, {});
//   };

