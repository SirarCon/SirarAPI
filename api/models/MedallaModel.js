'use strict';
var mongoose = require("mongoose"),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");


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

//Todo: Debería tener competencia o evento

MedallaSchema.pre('save', async function(next) {
    var doc = this;
    await Contador.findOneAndUpdate(
          { _id: 'medalla' },
          { $inc : { sequence_value : 1 } },
          { upsert: true, new: true, setDefaultsOnInsert: true },)  
          .then(async seq =>{
              doc._id = seq.sequence_value;
              next();
          })
      .catch(err=> {
        funcionesGlobales.registrarError("Error en medalla Model pre", err);
      })
  });
    
module.exports = mongoose.model('Medalla', MedallaSchema)