'use strict';
var mongoose = require('mongoose');
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;


var DeporteSchema = new Schema({
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: [40, "El nombre tiene que ser menor a 41 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
        unique: true
      },
      nombreNormalizado:{
        type: String,
      },
      imagenDeporteUrl: {
        type: String   
      },
      federacion: {
                    type: Schema.Types.ObjectId,
                     ref: 'Federacion',
                     required: 'Digite una federación por favor',                      
          },
      activo:{
        type: Boolean
      },                    
      pruebas:{
        type: [
                {
                  nombre: {
                          type: String,
                          maxlength: [40, "El correo de la federación tiene que ser menor a 41 caracteres"],
                          required: 'Digite el nombre de la prueba',
                  },
                  nombreNormalizado: {
                    type: String,
                  },
                  activo: {
                          type: Boolean,
                  }
                }
              ]
      }
});


DeporteSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      activo: this.activo,
      pruebas: this.pruebas.sort(funcionesGlobales.ordenarPorNombre),
      federacion: this.federacion
    };
  
  });
  
  DeporteSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      pruebas: this.pruebas.sort(funcionesGlobales.ordenarPorNombre),
      federacion: this.federacion
    };
  
  });
  
  module.exports = mongoose.model('Deporte', DeporteSchema);
  