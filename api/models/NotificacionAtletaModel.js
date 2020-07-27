'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var NotificacionAtletaSchema = new Schema({
    token:{
        type: String,
        required: "Token requerido",
    },
    atleta:{
      type: Number,
      ref: 'Atleta',
      required: "Atleta requerido" 
    }
});

module.exports = mongoose.model('NotificacionAtleta', NotificacionAtletaSchema);