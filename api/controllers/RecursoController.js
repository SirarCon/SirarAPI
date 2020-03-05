'use strict';

//#region Requires
var mongoose = require('mongoose');
var Pais = mongoose.model('Pais');
var Fase = mongoose.model('Fase');
var globales =  require("../Globales.js");
//#endregion Requires

//#region Pais
exports.crearPais = function(req, res){
    var nuevoPais = new Pais(req.body);
     nuevoPais.save().then(pais => {
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Pais", req.body.name)});
      
    }).catch(err => {                
          res.json({token: res.locals.token, datos: globales.mensajes(10, "País.", funcionesGlobales.manejarError(err))});
    })
}

exports.borrarPais = function(req, res){
    Pais.findOneAndRemove({_id: req.body.idPais}).exec().then(pais => {
        if(pais){
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "País", " ")});    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "País", " ")});
        }
    }).catch(err=>{
        res.json({token: res.locals.token, datos: globales.mensajes(20, "país.", funcionesGlobales.manejarError(err))});        
    })
}

exports.obtenerPaises = function(req, res){
    Pais.find().sort({name : 1}).exec().then(paises =>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, paises)});          
    }).catch(err =>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los paises ", " ")});  
    });
}
//#endregion Pais

//#region Fase
exports.crearFase = function(req, res){
    var nuevaFase = new Fase(req.body);
     nuevaFase.save().then(fase => {
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Fase", req.body.descripcion)});
    }).catch(err => {                
          res.json({token: res.locals.token, datos: globales.mensajes(10, "Fase.", funcionesGlobales.manejarError(err))});
    })
}

exports.borrarFase = function(req, res){
    Fase.findOneAndRemove({_id: req.body.idFase}).exec().then(fase => {
        if(fase){
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "Fase", " ")});    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Fase", " ")});
        }
    }).catch(err=>{
      res.json({token: res.locals.token, datos: globales.mensajes(20, "fase.", funcionesGlobales.manejarError(err))});        
    })
}

exports.obtenerFases = function(req, res){
    Fase.find().sort({ _id: 1 }).exec().then(fases=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases)});            
        }).catch(err=>{
            console.log(err)
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases ", " ")});  
        });
}
//#endregion Fase
