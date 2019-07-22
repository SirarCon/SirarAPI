'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Fase = new Schema({        
    _id:{ //Orden de las competencias
      type: Number,
      required: "Digite el orden de la fase.",
      },
    descripcion: {
      type: String, 
      required: "Digite la descripción de la fase.",
      unique: true
    },       
    siglas: {
      type: String,
      required: "Digite las siglas de la fase.",
      unique: true
    }
});

module.exports = mongoose.model('Fase', Fase);
