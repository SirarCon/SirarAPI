'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tiempo = require('../recursos/Tiempo.js');


var AtletaCompetidorSchema = new Schema({
    atleta: {
        type: Schema.Types.ObjectId,
        ref: 'Atleta',
        required: 'Seleccione un atleta por favor'
    },
    competencia: {
        type: Schema.Types.ObjectId,
        ref: 'CompetenciaAtleta',
        required:'Seleccione una competencia por favor'
    },
    esUltimoRegistro: {
        type: Boolean,
    },
    marcadores:{
        type:[{
            set: {
                type: Number,
                required: 'Digite el set por favor'
            },
            tiempo: {
                type: Tiempo,
            },
            metros: {
                type: Number,
            },
            puntos: {
                type: Number,
            },
            tipo: {//Puntos, Tiempo, Metros
                type: Number,
                required: 'Seleccione el tipo de marcador',
            },
            momentoTiempo: {
                type: Tiempo,
            },
            momentoOportunidad:{ //Va por la oportunidad 1
                type: Number,
            },
            cantidadOportunidades: { //Por ejemplo en Arcquería 3 oprtunidades
                type: Number,
            }
        }]
    }
});

AtletaCompetidorSchema.method('todaInformacion', function(){
    return {
        atleta: this.atleta,
        competencia: this.competencia,
        marcadores: this.marcadores.sort((a, b)=>{ return a.set - b.set})
    }
});

AtletaCompetidorSchema.method('infoPublica', function(){
    return {
        atleta: this.atleta,
        competencia: this.competencia,
        marcadores: this.marcadores.sort((a, b)=>{ return a.set - b.set})  
    }
});


module.exports = mongoose.model('AtletaCompetidor', AtletaCompetidorSchema);