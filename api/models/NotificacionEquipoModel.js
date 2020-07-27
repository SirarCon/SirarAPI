'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var NotificacionEquipoSchema = new Schema({
    token:{
        type: String,
        required: "Token requerido",
    },
    equipo:{
      type: Number,
      ref: 'Equipo',
      required: "Equipo requerido" 
    }
});

module.exports = mongoose.model('NotificacionEquipo', NotificacionEquipoSchema);