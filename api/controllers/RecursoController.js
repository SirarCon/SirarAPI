'use strict';

//#region Requires
var mongoose = require('mongoose');
var Bandera = mongoose.model('Bandera');
var globales =  require("../Globales.js");
//#endregion Requires

//#region Banderas
exports.obtenerBanderas = function(req, res){
    Bandera.find().exec().then(banderas =>{
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, banderas).instance});          
    }).catch(err =>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "las banderas ", " ").instance});  
    });
}
//#endregion Banderas