'use strict';

//#region Requires
var mongoose = require('mongoose');
var Pais = mongoose.model('Pais');
var Fase = mongoose.model('Fase');
var globales =  require("../Globales.js");
//#endregion Requires

//#region Pais
exports.obtenerPaises = function(req, res){
    Pais.find().sort({nombre : 1}).exec().then(paises =>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, paises).instance});          
    }).catch(err =>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los paises ", " ").instance});  
    });
}
//#endregion Pais

//#region Fase
exports.obtenerFases = function(req, res){
    Fase.find().sort({ posicion: 1 }).exec().then(fases=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, fases).instance});            
        }).catch(err=>{
            console.log(err)
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las fases ", " ").instance});  
        });
}
//#endregion Fase