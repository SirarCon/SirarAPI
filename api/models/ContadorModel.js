'use strict'
var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var ContadorSchema = new Schema({
   _id: String,
   sequence_value: Number
}, {collection: "contadores"});

 module.exports = mongoose.model('Contador', ContadorSchema);