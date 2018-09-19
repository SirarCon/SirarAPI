'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsuarioSchema = new Schema({
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
    mmaxlength: 15,
    minlength: 9
  },
  correo: {
    type: String,
    required: 'Digite el correo por favor',
    unique:true,
    maxlength: 40,
    minlength: 10
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
    maxlength: 8,
  },
  rol:{
    type: Number,
    required: 'Seleccione el rol por favor'
  }
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
