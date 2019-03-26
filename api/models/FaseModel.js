'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Fase = new Schema({        
    posicion:{ //Ordén de las competencias
      type: Number,
      unique: true,
    },
    descripcion: {
      type: String, 
    },       
    siglas: {
      type: String
    }
});

module.exports = mongoose.model('Fase', Fase);
