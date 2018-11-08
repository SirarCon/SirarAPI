'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var EventoSchema = new Schema({
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: [40,  "El nombre tiene que ser menor a 41 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
      },
      nombreNormalizado:{
        type: String,
      },
      fotoUrl: {
        type: String   
      },
      anno: {
        type: Number,
        required: "Digite el año del evento"
      },      
      fechaInicio: {
        type: Date,
        required: 'Digite la fecha de inicio del evento'
      },
      fechaFinal: {
        type: Date,
        required: 'Digite la fecha final del evento'
      },
      ciudad:{
        type: String,
        required: "Digite la ciudad del evento"
      },
      pais:{
        type: String,
        required: "Digite el país del evento"
      },
      activo: {
        type: Boolean,
    },
});