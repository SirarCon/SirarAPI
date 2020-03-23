'use strict';
var mongoose = require("mongoose"),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;

var EquipoSchema = new Schema({  
  _id: {
    type: Number,
  },          
  prueba: {
    type: Number,              
    ref: 'Prueba'
  },
  pais: {
    type: Number,
    ref: 'Pais',
    required: "Seleccione el país del equipo"
  },
  evento: {//Se ingresa a un Evento y se da añadir equipo, ahí ya se filtran las competencias
    type: Number,
    ref: 'Evento',
    required: "Seleccione un evento"
  },  
  atletas: {
    type: [
            {
              type: Number,
              ref: "Atleta"
            }
    ]
  },
  medallas: {
    type: [
      {
          posicion: {
            type: Number,//1 (Oro), 2 (Plata), 3 (Bronze),  
          },
          evento:{
            type: Number,
            ref: 'Evento',
          },
          prueba:{
            type: Number,
            ref: 'Prueba',
          },
      }
    ]
  }
}, {_id: false}) ;

EquipoSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'equipo' },
        { $inc : { sequence_value : 1 } },
        { new : true },)
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
      console.log("Error en equipo Model pre")
    })
});

module.exports = mongoose.model('Equipo', EquipoSchema);