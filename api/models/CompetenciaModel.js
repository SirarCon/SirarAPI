'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");

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
    },
    ciudad: {
        type: String,
    },
    recinto: {
        type: String,
    },
    genero:{
        type: Number,
        required: "Seleccione el genero de la competencia", 
    },
    descripcion:{//Hit 1, Partido 1, etc
        type: String,
    },
    fase:{
        type: Number,
        ref: "Fase",
        required: "Digite la fase a la que pertenece la competencia"
    },
    enVivo:{
        type: Number, //0: Concluyo, 1: Ejecutándose, 2: Futuro
    },
    activo: {
        type: Boolean,
        required: "Seleccione si la prueba es activa",
    }
}, {_id: false});
 
CompetenciaSchema.pre('save',  async function(next) {
  var doc = this;
  //Actualizar estado de enVivo
  doc.enVivo = doc.fechaHora && new Date() > doc.fechaHora ?
               0 : 2
  await Contador.findOneAndUpdate(
        { _id: 'competencia' },
        { $inc : { sequence_value : 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            next();
        })
    .catch(err=> {
        funcionesGlobales.registrarError("Error en competencia Model pre", err);
    })
});

CompetenciaSchema.method('todaInformacion',function (){
    return {
        _id: this._id,
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: funcionesGlobales.construirFecha(this.fechaHora),
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        recinto: this.recinto,
        ciudad: this.ciudad,
        enVivo: this.enVivo,
        activo: this.activo,        
    }
});
CompetenciaSchema.method('infoPublica',function (tieneAlerta){
    return {
        _id: this._id,
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: funcionesGlobales.construirFecha(this.fechaHora),
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        recinto: this.recinto,
        ciudad: this.ciudad,
        enVivo: this.enVivo,
        tieneAlerta : tieneAlerta,
    }
});

module.exports = mongoose.model('Competencia', CompetenciaSchema);
