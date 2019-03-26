'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tiempo = require('../recursos/Tiempo.js');

var EquipoCompetidor = new Schema({
            equipo: {
                type: Schema.Tyoes.ObjectId,
                ref: 'Equipo',
                required: 'Seleccionar un equipo'
            },
            competencia: {
                type: Shcema.Types.ObjectId,
                ref: 'Competencia'
            },
            esUltimoRegistro: {
                type: Boolean,
            },
            esLocal: {
                    type: Boolean, //Si es true el atleta es local
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

module.exports = mongoose.model('EquipoCompetidor', EquipoCompetidor);

