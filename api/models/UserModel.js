'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: 'Digite un nombre por favor'
  },
  fotoUrl: {
    type: String    
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  identificacion: {
    type: String,
    required: 'Digite el número de cédula por favor',
    unique: true
  },
  correo: {
    type: String,
    required: 'Digite el correo por favor',
    unique:true
  },
  password: {
    type: String
  },
  token: {
    type: String,
    max:15
  },
  telefono: {
    type: String    
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
          nombre: this.nombre,
          identificacion: this.identificacion,
          fotoUrl : this.fotoUrl,
          telefono: this.telefono,
          rol: this.rol
         };

});


module.exports = mongoose.model('Usuario', UsuarioSchema);
