'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pais = new Schema({
    name: {
        type: String,
        required: "Digite el nombre del paìs.",
        unique: true
    },
    _id: {
        type: Number,
        required: "Digite el código del país.",
    },
    flag: {
        type: String,
        required: "Digite el la bandera del país.",
        unique: true
    }
}, {collection: "paises"});

module.exports = mongoose.model("Pais", Pais)
