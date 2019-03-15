'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var Equipo = new Schema({            
  prueba: {
    type: Schema.Types.ObjectId,              
    ref: 'Prueba'
  },
  pais: {
    type: Schema.Types.ObjectId,
    ref: 'Pais',
    required: "Seleccione el país del equipo"
  },
  atletas: {
    type: [
            {
              type: Schema.Types.ObjectId,
              ref: "Atleta"
            }
    ]
  }
}) ;


module.exports = mongoose.model('Equipo', Equipo);