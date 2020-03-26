'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");


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
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
      funcionesGlobales.registrarError("Error en mensaje Model pre", err);
    })
});

MensajeSchema.method("obtenerMensaje" , function(nuevoMensaje, id , objeto){
  var mensaje = objeto || this.mensaje.replace("{sutantivoCambiar}", nuevoMensaje || "")
                           .replace("{id}", id || "")
                           .replace(/\s+/g, ' ').trim();
                           
  return {exito: this.exito, codigo: this.codigo, mensaje: mensaje};
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
 

