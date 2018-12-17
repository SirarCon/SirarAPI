'use strict';
var mongoose = require('mongoose');
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;


var UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: 'Digite un nombre por favor',
    maxlength: [40, "El nombre tiene que ser menor a 40 caracteres"],
    minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
  },
  nombreNormalizado:{
    type: String,
  },
  fotoUrl: {
    type: String   
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  identificacion: {
    type: String,
    required: 'Digite el número de cédula por favor',
    unique: true,
    maxlength: [15, "El nombre tiene que ser menor a 15 caracteres"],
    minlength: [9, "El nombre tiene que ser mayor a 8 caracteres"], 
  },
  correo: {
    type: String,
    required: 'Digite el correo por favor',
    unique:true,
    maxlength: [40, "El correo tiene que ser menor a 41 caracteres"],
    minlength: [10, "El correo tiene que ser mayor a 9 caracteres"],
  },
  password: {
    type: String
  },
  tokenPassword: {
    type: String,
    maxlength: 15,
    minlength: 15
  },
  telefono: {
    type: String,
    maxlength: [8, "El teléfono tiene que ser menor a 9 caracteres"],
  },
  rol:{
    type: Number,
    required: 'Seleccione el rol por favor'
  }
});

UsuarioSchema.pre('save', function(next) {
  this.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')); 
  next();
});

UsuarioSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

UsuarioSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });

UsuarioSchema.method('datosRecuperarContrasena', function() {
  
  return {correo: this.correo, nombre: this.nombre, identificacion: this.identificacion };
  
});

UsuarioSchema.method('datosLogin', function() {
  
  return {correo: this.correo,
          identificacion: this.identificacion, 
          nombre: this.nombre,
          fotoUrl : this.fotoUrl,
          telefono: this.telefono,
          rol: this.rol          
         };

});


module.exports = mongoose.model('Usuario', UsuarioSchema);
