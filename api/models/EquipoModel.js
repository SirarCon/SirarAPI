'use strict';
var mongoose = require("mongoose"),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");


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
  genero: {
    type: Number,
    required: "Seleccione el genero de la competencia", 
  },
  activo: {
    type: Boolean,
    required: "Seleccione si el equipo está activo"
  },
  retirado: {
    type: Boolean,
    required: "Seleccione si el equipo está retirado"
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
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
      funcionesGlobales.registrarError("Error en equipo Model pre", err);
    })
});

EquipoSchema.method('infoPublica', function(tieneAlerta) {
  return {
    _id: this.id,          
    prueba: this.prueba,
    pais: this.pais,
    evento: this.evento,  
    activo: this.activo,
    retirado: this.retirado,
    genero: this.genero,
    atletas: this.atletas,
    medallas: this.medallas,
    tieneAlerta: tieneAlerta,
  }
});


module.exports = mongoose.model('Equipo', EquipoSchema);