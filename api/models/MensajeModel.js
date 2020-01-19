'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema;

var MensajeSchema = new Schema({
  _id: {
    type: Number,
  },
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
}, {_id: false});


MensajeSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'mensaje' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
      console.log("Error en mensaje Model pre")
    })
});

MensajeSchema.method("obtenerMensaje" , function(nuevoMensaje, id , objeto){
  if(id && nuevoMensaje){
    if(!objeto){
    return {exito: this.exito,codigo: this.codigo, mensaje: this.mensaje
                                                                  .replace("{sutantivoCambiar}", nuevoMensaje).replace("{id}", id)
                                                                  .replace(/\s+/g, ' ').trim()};
    }
    else{
    return {exito: this.exito,codigo: this.codigo, mensaje: objeto};
    }
  }
  else{
    if(!objeto){
      return {exito: this.exito, codigo: this.codigo, mensaje: this.mensaje.replace(/\s+/g, ' ').trim()};
    }
    else{
      return {exito: this.exito, codigo: this.codigo, mensaje: objeto};
    }
  }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
 

