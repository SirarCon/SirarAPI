'use strict';
var mongoose = require('mongoose');
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var PruebaSchema = new Schema({
    nombre: {
            type: String,
            maxlength: [40, "El correo de la federación tiene que ser menor a 41 caracteres"],
            required: 'Digite el nombre de la prueba',
    },
    nombreNormalizado: {
      type: String,
    },
    deporte:{
        type: Schema.Types.ObjectId,
        ref: 'Deporte',
        required: 'Digite una federación por favor',
    },
    activo: {
            type: Boolean,
    }
  });

  PruebaSchema.pre('save', function(next) {
    this.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')); 
    next();
  });
  
  PruebaSchema.pre('update', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
                } 
              });
    next();
  });
  
  PruebaSchema.pre('findOneAndUpdate', function(next) {
    this.update({},{
                   $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                  } 
                });
    next();
    });
  
  PruebaSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
      activo: this.activo
    };
  
  });
  
  PruebaSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
    };
  
  });
  
  module.exports = mongoose.model('Prueba', PruebaSchema);