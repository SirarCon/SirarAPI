//#region Requires
var mongoose = require('mongoose'),
Prueba = mongoose.model('Prueba'),
Evento = mongoose.model('Evento'),
Competencia = mongoose.model('Competencia'),
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
                var nuevaCompetencia = new Competencia(req.body);
                nuevaCompetencia.save().then(competencia=>{
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, "Competencia del", competencia.infoPublica().fechaHora)});
                }).catch(async err=>{
                    if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta       
                        funcionesGlobales.registrarError("crearCompetencia/CompetenciaController", err)                          
                        res.json({token: res.locals.token, datos: globales.mensajes(10, "Competencia ", funcionesGlobales.manejarError(err))});
                      }else{//Error llave duplicada
                        await funcionesGlobales.restarContador('competencia'); 
                        res.json({token: res.locals.token, datos: globales.mensajes(15, "id Competencia ", " ")});
                      }
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", "especificada")});
            }
        }).catch(err=>{
            if(req.body.idPrueba){
                funcionesGlobales.registrarError("crearCompetencia/CompetenciaController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(13, "prueba", "seleccionado")});
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", " ")});
            }});        
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.idEvento)});   
        }
    }).catch((err)=>{
        if(req.body.idEvento){
            funcionesGlobales.registrarError("crearCompetencia/CompetenciaController", err)
            res.json({token: res.locals.token, datos: globales.mensajes(13, "evento", "seleccionado")});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", " ")});
        }
  });
};

exports.modificarCompetencia = async function(req, res){
Competencia.findOneAndUpdate({_id: req.params.idCompetencia},
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
        funcionesGlobales.registrarError("modificarCompetencia/CompetenciaController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(14, "competencia.", funcionesGlobales.manejarError(err))});        
    })
};

//Lista los deportes según el evento seleccionado
exports.listarDeportesXEvento = async function(req, res){
Competencia.find()
.where({ evento: req.params.idEvento, activo: true })
.populate({path:"prueba", select: "deporte"})
.exec()
.then(competencias => {
    var deportes = competencias.length > 0 ?
                   Array.from(new Set(competencias.map(c=>  c.prueba.deporte)))
                   : new Array();
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes)});  
})
.catch(err=>{
    funcionesGlobales.registrarError("listarDeportesXEvento/CompetenciaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes de las competencias", " ")});  
});
};

//Agrupa y lista las pruebas de los deportes practicados durante un evento seleccionado
exports.listarPruebasXDeporte = async function(req, res){
     Competencia.aggregate([  
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
                .exec()
                .then(competencias => {            
                    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
                }).catch(err => {
                    funcionesGlobales.registrarError("listarCategoriasXDeporte/CompetenciaController", err)
                    res.json({token: res.locals.token,datos: globales.mensajes(12, "las categorias de las competencias", " ")});  
                });
};

//Lista las fases de las pruebas basadas en el evento, prueba y genero seleccionados
exports.listarFasesxPruebaEvento= function(req, res){
 Competencia.aggregate([
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
        .exec()
        .then(fases=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases)});  
        }).catch(err=>{     
            funcionesGlobales.registrarError("listarFasesxPruebaEvento/CompetenciaController", err)
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases de las competencias", " ")});  
        })
}

//Lista las competencias basadas en el evento, prueba genero y fase seleccionados
exports.listarCompetenciasEventoPruebaFase = function(req, res){
    Competencia.find({
        evento: req.params.idEvento,
        prueba: req.params.idPrueba,
        genero: Number(req.params.genero),
        fase: req.params.fase,
    })
    .sort({descripcion: 1})
    .exec()
    .then(competencias=>{
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, competencias)});  
    }).catch(err=>{
        funcionesGlobales.registrarError("listarCompetenciasEventoPruebaFase/CompetenciaController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las competencias", " ")});  
    })
}




// var groupBy = function(xs, key, key2) {
//     return xs.reduce(function(rv, x) {
//       ((rv[x[key]] = rv[x[key]] && rv[x[key2]] = rv[x[key2]]) || []).push(x);
//       return rv;
//     }, {});
//   };

