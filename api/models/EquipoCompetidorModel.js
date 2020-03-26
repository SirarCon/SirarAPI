'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
Tiempo = require('../recursos/Tiempo.js'),
funcionesGlobales = require("../FuncionesGlobales.js");


var EquipoCompetidorSchema = new Schema({
            _id: {
                type: Number,
            },
            equipo: {
                type: Number,
                ref: 'Equipo',
                required: 'Seleccionar un equipo'
            },
            competencia: {
                type: Number,
                ref: 'Competencia',
                required:'Seleccione una competencia por favor'
            },            
            esUltimoRegistro: {
                type: Boolean,
            },
            esLocal: {
                    type: Boolean, //Si es true el equipo es local
            },
            marcadores: {
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
}, {collection: 'EquiposCompetidores'});


EquipoCompetidorSchema.pre('save', async function(next){
    var doc = this;
await Contador.findOneAndUpdate(
        { _id: 'equipoCompetidor' },
        { $inc : { sequence_value : 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;           
            next();
        })
    .catch(err=> {
        funcionesGlobales.registrarError("Error en equipo competidor Model pre", err);
    })
});

module.exports = mongoose.model('EquipoCompetidor', EquipoCompetidorSchema);

