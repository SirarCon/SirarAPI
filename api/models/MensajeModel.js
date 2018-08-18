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
  }
});



 module.exports = mongoose.model('Mensaje', MensajeSchema);
 

