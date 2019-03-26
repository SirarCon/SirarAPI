'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pais = new Schema({
    name: {
        type: String
    },
    numericCode: {
        type: String
    },
    flag: {
        type: String
    }
}, {collection: "paises"});

module.exports = mongoose.model("Pais", Pais)