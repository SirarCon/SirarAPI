'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Fase = new Schema({        
    _id:{ //Ordén de las competencias
      type: Number,
    },
    descripcion: {
      type: String, 
    },       
    siglas: {
      type: String
    }
});

module.exports = mongoose.model('Fase', Fase);
