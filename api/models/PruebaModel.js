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
      unique: true,
    },
    deporte:{
        type: Schema.Types.ObjectId,
        ref: 'Deporte',
        required: 'Digite un deporte por favor',
    },
    activo: {
        type: Boolean,
        required: "Seleccione si la prueba es activa"
    },
    tipo:{
        type: Number,
    },
    fases: {
        type:[{
            posicion:{
              type: Number,
            },
            descripcion: {
              type: String, 
            }, 
        }]
    }
  });

  PruebaSchema.pre('save', function(next) {
    this.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')) + this._id; 
    next();
  });
  
  PruebaSchema.pre('update', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre + this._id) 
                } 
              });
    next();
  });
  
  PruebaSchema.pre('findOneAndUpdate', function(next) {
    this.update({},{
                   $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre)  + this._id
                  } 
                });
    next();
    });
  
  PruebaSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
      fases: this.fases.sort((a, b)=>{ return a.posicion - b.posicion}),
      activo: this.activo
    };
  
  });
  
  PruebaSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
      fases: this.fases.sort((a, b)=>{ return a.posicion - b.posicion}),
    };
  
  });
  
  module.exports = mongoose.model('Prueba', PruebaSchema);