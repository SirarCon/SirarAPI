'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 //https://stackoverflow.com/questions/24853383/mongoose-objectid-that-references-a-sub-document
  
  
var CompetenciaAtletaSchema = new Schema({
    evento:{
        type: Schema.Types.ObjectId,
        ref: 'Evento',
        required: 'Digite un evento por favor',
    },
    prueba:{
        type: Schema.Types.ObjectId,
        ref: 'Prueba',
        required: 'Digite una prueba por favor',
    },
    fechaHora:{
        type: Date,
        required: 'Digite la fecha y hora por favor'
    },
    ciudad: {
        type: String,
        required: "Digite la ciudad de la competencia"
    },
    estadio: {
        type: String,
        required: "Digite el estadio"
    },
    genero:{
        type: Number,
        required: "Seleccione el genero de la competencia", 
    },
    descripcion:{//Hit 1, Partido 1, etc
        type: String,
        required: "Digite una descripción para la competencia"
    },
    fase:{
        type: Schema.Types.ObjectId,
        ref: "Fase",
        required: "Digite la fase a la que pertenece la competencia"
    },
    activo: {
        type: Boolean,
        required: "Seleccione si la prueba es activa",
    }
});
 
CompetenciaAtletaSchema.method('todaInformacion',function (){
    return {
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: this.fechaHora,
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        estadio: this.estadio,
        ciudad: this.ciudad,
        activo: this.activo,        
    }
});
CompetenciaAtletaSchema.method('infoPublica',function (){
    return {
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: this.fechaHora,
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        estadio: this.estadio,
        ciudad: this.ciudad,
    }
});

module.exports = mongoose.model('CompetenciaAtleta', CompetenciaAtletaSchema);