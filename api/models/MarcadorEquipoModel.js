'use strict';
var mongoose = require("mongoose");
var funcionesGlobales = require("../FuncionesGlobales.js");
var Schema = mongoose.Schema;
class Tiempo{
    constructor(hora, minuto, segundo, milisegundo){
    this.hora = hora;
    this.miunto = minuto,
    this.segundo = segundo;
    this.milisegundo = milisegundo;
    }

    constructor(minuto, segundo, milisegundo){
        this.miunto = minuto,
        this.segundo = segundo;
        this.milisegundo = milisegundo;
    }
    constructor(minuto, segundo){
        this.miunto = minuto,
        this.segundo = segundo;
    }
}
var MarcadorEquipoSchema = new Schema({
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: "Ingrese el equipo local"
      },
    visita: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: "Ingrese el equipo visita"
    }, 
    momento: { //Momento en el encuentro en que ocurrió el marcador
        type: Tiempo,
    },   
    marcadorPuntosLocal: {
        type: Number,
    },
    marcadorPuntosVisita: {
        type: Number,
    },
    marcadorFinal: {
        type: Boolean,
        default: false
    },
    set:{
        type: String
    },
    competencia:{
      type: Schema.Types.ObjectId,
      ref: "CompetenciaEquipo"  
    }
      
});