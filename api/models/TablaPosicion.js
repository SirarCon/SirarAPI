'use strict';
var mongoose = require("mongoose"),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;

var TablaPosicionSchema = new Schema({
    _id: {
        type: Number,
    },
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
}, {collection: 'TablaPosiciones', _id: false});

TablaPosicionSchema.pre('save', async function(next) {
    var doc = this;
    await Contador.findOneAndUpdate(
          { _id: 'tablaPosicion' },
          { $inc : { sequence_value : 1 } },
          { new : true },)  
          .then(async seq =>{
              doc._id = seq.sequence_value;
              doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(doc.get('nombre')); 
              next();
          })
      .catch(err=> {
        console.log("Error en tabla posición Model pre")
      })
  });
    

module.exports = mongoose.model('TablaPosicion', TablaPosicionSchema)
