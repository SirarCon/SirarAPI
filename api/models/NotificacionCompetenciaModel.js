'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var NotificacionCompetenciaSchema = new Schema({
    token:{
        type: String,
        required: "Token requerido",
    },
    competencia:{
      type: Number,
      ref: 'Equipo',
      required: "Competencia requerido" 
    }
});

module.exports = mongoose.model('NotificacionCompetencia', NotificacionCompetenciaSchema);