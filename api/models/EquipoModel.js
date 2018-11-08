'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var EquipoSchema = new Schema({
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
      activo: {
          type: Boolean
      },
      atletas: {
        type:[
              {
                 type: Schema.Types.ObjectId,
                 ref: "Atleta"
              }
            ]
        }
    })