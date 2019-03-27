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
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Pais", req.body.name).instance});
      
    }).catch(err => {                
          res.json({token: res.locals.token, datos: globales.mensajes(10, "País.", funcionesGlobales.manejarError(err)).instance});
    })
}

exports.borrarPais = function(req, res){
    Pais.findOneAndRemove({_id: req.body.idPais}).exec().then(pais => {
        if(pais){
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "País", " ").instance});    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "País", " ").instance});
        }
    }).catch(err=>{
        res.json({token: res.locals.token, datos: globales.mensajes(20, "país.", funcionesGlobales.manejarError(err)).instance});        
    })
}

exports.obtenerPaises = function(req, res){
    Pais.find().sort({name : 1}).exec().then(paises =>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, paises).instance});          
    }).catch(err =>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los paises ", " ").instance});  
    });
}
//#endregion Pais

//#region Fase
exports.crearFase = function(req, res){
    var nuevaFase = new Fase(req.body);
     nuevaFase.save().then(fase => {
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Fase", req.body.descripcion).instance});
    }).catch(err => {                
          res.json({token: res.locals.token, datos: globales.mensajes(10, "Fase.", funcionesGlobales.manejarError(err)).instance});
    })
}

exports.borrarFase = function(req, res){
    Fase.findOneAndRemove({_id: req.body.idFase}).exec().then(fase => {
        if(fase){
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "Fase", " ").instance});    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Fase", " ").instance});
        }
    }).catch(err=>{
      res.json({token: res.locals.token, datos: globales.mensajes(20, "fase.", funcionesGlobales.manejarError(err)).instance});        
    })
}

exports.obtenerFases = function(req, res){
    Fase.find().sort({ _id: 1 }).exec().then(fases=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases).instance});            
        }).catch(err=>{
            console.log(err)
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases ", " ").instance});  
        });
}
//#endregion Fase
