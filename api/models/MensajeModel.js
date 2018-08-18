'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = new Schema({
  mensaje: {
    type: String    
  },
  codigo:{
    type: Number,
    required: 'Seleccione el codigo por favor'
  },
  Exito: {
    type: Boolean,
  required: "Digite si fue exitoso o no"
  }
});


MensajeSchema.method("obtenerMensaje" , function(id, nuevoMensaje){
  if(id && nuevoMensaje)
  return {exito: this.Exito,codigo: this.codigo, mensaje: this.mensaje.replace("{" + id,nuevoMensaje + "}")};
  else
  return {exito: this.Exito, codigo: this.codigo, mensaje: this.mensaje};
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
 

