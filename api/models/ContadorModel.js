'use strict'
var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var ContadorSchema = new Schema({
   _id: String,
   sequence_value: Number
});


ContadorSchema.pre('findOne', function(next) {
this.sequence_value++;
next();
 });

 module.exports = mongoose.model('Contador', ContadorSchema);