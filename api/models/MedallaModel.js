'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;

var Medalla = new Schema({
    atletaCompetidor: {
            type: Schema.Types.ObjectId,
            ref: "AtletaCompetidor"
    },
    equipoCompetidor: {
          type: Schema.Types.ObjectId,
          ref: "EquipoCompetidor"
    },
    tipoMedalle: {
          type: String
    },
    tipo: { //Tipo por equipo o individual
        type: Number,
        req: 'Defina el tipo, es individual o grupal'
    }
});

module.exports = mongoose.model('Medalla', Medalla)