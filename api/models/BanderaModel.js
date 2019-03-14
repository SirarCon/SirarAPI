'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bandera = new Schema({
    name: {
        type: String
    },
    numericCode: {
        type: String
    },
    flag: {
        type: String
    }
});

module.exports = mongoose.model("Bandera", Bandera)