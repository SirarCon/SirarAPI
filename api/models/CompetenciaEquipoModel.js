'use strict';
var mongoose = require('mongoose');
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var CompetenciaEquipoSchema = new Schema({
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: 40,
        minlength: 2
    },
    nombreNormalizado:{
    type: String,
    maxlength: 40
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: "Evento"
    },
   prueba: {
       type: Schema.Types.ObjectId,
       ref: "Deporte.pruebas"//https://stackoverflow.com/questions/24853383/mongoose-objectid-that-references-a-sub-document
   },
   fecha: {
        type: Date,
        required: "Digite la fecha de la competencia"
   },
   ciudad: {
       type: String,
       required: "Digite la ciudad de la competencia"
   },
   estadio: {
       type: String,
       required: "Digite el estadio"
   },
   local: {
        type:Schema.Types.ObjectId,
        ref: "Equipo",
        required: "Ingrese el equipo local"
   },
   visita: {
    type:Schema.Types.ObjectId,
    ref: "Equipo",
    required: "Ingrese el equipo visita"
},
  marcadores: {
       type:[
           {
            type: Schema.Types.ObjectId,
            ref:"MarcadorEquipo"
           }
       ]
   }
})