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
  exito: {
    type: Boolean,
  required: "Digite si fue exitoso o no"
  }
});


MensajeSchema.method("obtenerMensaje" , function(nuevoMensaje, id , objeto){
  if(id && nuevoMensaje){
    if(!objeto){
    return {exito: this.exito,codigo: this.codigo, mensaje: this.mensaje.replace("{sutantivoCambiar}", nuevoMensaje).replace("{id}", id)};
    }
    else{
    return {exito: this.exito,codigo: this.codigo, mensaje: objeto};
    }
  }
  else{
    if(!objeto){
      return {exito: this.exito, codigo: this.codigo, mensaje: this.mensaje};
    }
    else{
      return {exito: this.exito, codigo: this.codigo, mensaje: objeto};
    }
  }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
 

