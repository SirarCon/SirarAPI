'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;
 //https://stackoverflow.com/questions/24853383/mongoose-objectid-that-references-a-sub-document
  
  
var CompetenciaSchema = new Schema({
    _id: {
        type: Number
    },
    evento:{
        type: Number,
        ref: 'Evento',
        required: 'Digite un evento por favor',
    },
    prueba:{
        type: Number,
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
        type: Number,
        ref: "Fase",
        required: "Digite la fase a la que pertenece la competencia"
    },
    activo: {
        type: Boolean,
        required: "Seleccione si la prueba es activa",
    }
}, {_id: false});
 
CompetenciaSchema.pre('save',  async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'competencia' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
        console.log(err);
      console.log("Error en competencia Model pre")
    })
});

CompetenciaSchema.method('todaInformacion',function (){
    return {
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: funcionesGlobales.construirFecha(this.fechaHora),
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        estadio: this.estadio,
        ciudad: this.ciudad,
        activo: this.activo,        
    }
});
CompetenciaSchema.method('infoPublica',function (){
    return {
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: funcionesGlobales.construirFecha(this.fechaHora),
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        estadio: this.estadio,
        ciudad: this.ciudad,
    }
});

module.exports = mongoose.model('Competencia', CompetenciaSchema);
