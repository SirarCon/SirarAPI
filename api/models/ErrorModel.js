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
  fecha:{
    type: Number,
  },
});

module.exports = mongoose.model('Error', Error);

