'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var TablaPosicion = new Schema({
    prueba: {
        type: Schema.Types.ObjectId,
        ref: 'Prueba'
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento'
    },

    atletas: {
        type: [{
              atleta: {
                  type: Schema.Types.ObjectId,
                  ref: 'Atleta',
                  },
                puntos: {
                   type: Number 
                }              
            }]
    },
    equipos: {
        type: [{
              equipo: {
                  type: Schema.Types.ObjectId,
                  ref: 'Equipo',
                  },
                puntos: {
                   type: Number 
                }              
            }]
    },
     tipo: { //Tipo por equipo o individual
      type: Number,
      req: 'Defina el tipo, es individual o grupal'
  }
}, {collection: 'TablaPosiciones'});

module.exports = mongoose.model('TablaPosicion', TablaPosicion)
