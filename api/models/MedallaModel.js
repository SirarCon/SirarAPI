'use strict';
var mongoose = require("mongoose"),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;

var MedallaSchema = new Schema({
    atletaCompetidor: {
            type: Schema.Types.ObjectId,
            ref: "AtletaCompetidor"
    },
    equipoCompetidor: {
          type: Schema.Types.ObjectId,
          ref: "EquipoCompetidor"
    },
    tipoMedalle: {
          type: String
    },
    tipo: { //Tipo por equipo o individual
        type: Number,
        req: 'Defina el tipo, es individual o grupal'
    }
});

MedallaSchema.pre('save', async function(next) {
    var doc = this;
    await Contador.findOneAndUpdate(
          { _id: 'medalla' },
          { $inc : { sequence_value : 1 } },
          { new : true },)  
          .then(async seq =>{
              doc._id = seq.sequence_value;
              next();
          })
      .catch(err=> {
        console.log("Error en medalla Model pre")
      })
  });
    
module.exports = mongoose.model('Medalla', MedallaSchema)