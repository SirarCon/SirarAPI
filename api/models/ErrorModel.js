'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Error = new Schema({
  nombreFuncionArchivo:{
      type: String
  },
  mensaje: {
    type: String    
  },
  codigo:{
    type: String
  },
  fecha:{
    type: Date,
    default: new Date()
  },
}, {collection: "errores"});

module.exports = mongoose.model('Error', Error);

