
'use strict';
var mongoose = require('mongoose');
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;


var FederacionSchema = new Schema({ 
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        unique:true,
        maxlength: 40,
        minlength: 2
      },
      nombreNormalizado:{
        type: String,
        maxlength: 40
      },
      escudoUrl: {
        type: String   
      },
      correoFederacion: {
        type: String,
        
        maxlength: 40,
        minlength: 10
      },
      activo:{
        type: Boolean
      },

      paginaWeb: {
        type: String,
        maxlength: 40,
      },
      ubicacion: {
        type: String,
        maxlength: 100,
      },
      telefonos: {
        type:[Number],
      },
      presidente : {
      type: String,
      maxlength: 40,
      minlength: 2,
    },
      correoPresidente:{
        type: String,
        maxlength: 40,
        minlength: 10,
    }
});

FederacionSchema.pre('save', function(next) {
  this.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')); 
  next();
});

FederacionSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

FederacionSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });


FederacionSchema.method('datosFederacion', function() {
  
  return {
    id: this._id,
    nombre: this.nombre ,    
    escudoUrl: this.escudoUrl,  
    paginaWeb: this.paginaWeb,
    ubicacion: this.ubicacion,
    telefonos: this.telefonos, 
    correoFederacion: this.correoFederacion,
    presidente : this.presidente,
    correoPresidente: this.correoPresidente,
    activo: this.activo,    
    nombreNormalizado : this.nombreNormalizado 
   };
  
  });

  FederacionSchema.method('consultaFederacion', function() {
  
    return {
      id: this._id,
      nombre: this.nombre ,    
      escudoUrl: this.escudoUrl,  
      paginaWeb: this.paginaWeb,
      ubicacion: this.ubicacion,
      telefonos: this.telefonos, 
      correoFederacion: this.correoFederacion,
      presidente : this.presidente,
      correoPresidente: this.correoPresidente,
      nombreNormalizado : this.nombreNormalizado  
     };
    
    });
  
  module.exports = mongoose.model('Federacion', FederacionSchema);
  
  