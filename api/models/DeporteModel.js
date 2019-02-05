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
});


DeporteSchema.pre('save', function(next) {
  this.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')); 
  next();
});

DeporteSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

DeporteSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });

DeporteSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      activo: this.activo,
      federacion: this.federacion
    };
  
  });
  
  DeporteSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      federacion: this.federacion
    };
  
  });
  
  module.exports = mongoose.model('Deporte', DeporteSchema);
  