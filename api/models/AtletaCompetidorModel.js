'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");

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
        ref: 'Competencia',
        required:'Seleccione una competencia por favor'
    },
    esLocal: {
        type: Boolean, //Si es true el atleta es local
    },
    marcadores:{
        type:[{
            esUltimoRegistro: {
                type: Boolean,
            },
            set: {
                type: Number,
                required: 'Digite el set por favor'
            },      
            puntaje: {
                type: String,
            },            
            momentoTiempo: {
                type: String,
            },
            momentoOportunidad:{ //Va por la oportunidad 1
                type: Number,
            },
            cantidadOportunidades: { //Por ejemplo en Arcquería 3 oprtunidades
                type: Number,
            },
            momentoRegistro:{
                type: Number,
            }
        }]
    }
}, {_id: false, collection: "atletascompetidores"});


AtletaCompetidorSchema.pre('save', async function(next){
    var doc = this;
await Contador.findOneAndUpdate(
        { _id: 'atletaCompetidor' },
        { $inc : { sequence_value : 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;           
            next();
        })
    .catch(err=> {
        funcionesGlobales.registrarError("Error en atleta competidor Model pre", err);
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
