'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
Tiempo = require('../recursos/Tiempo.js');


var AtletaCompetidorSchema = new Schema({
    _id: {
      type: Number,
    },
    atleta: {
        type: Number,
        ref: 'Atleta',
        required: 'Seleccione un atleta por favor'
    },
    competencia: {
        type: Number,
        ref: 'CompetenciaAtleta',
        required:'Seleccione una competencia por favor'
    },
    esUltimoRegistro: {
        type: Boolean,
    },
    esLocal: {
        type: Boolean, //Si es true el atleta es local
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
}, {_id: false});


AtletaCompetidorSchema.pre('save', async function(next){
    var doc = this;
await Contador.findOneAndUpdate(
        { _id: 'atletaCompetidor' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;           
            next();
        })
    .catch(err=> {
      console.log("Error en atleta competidor Model pre")
    })
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
