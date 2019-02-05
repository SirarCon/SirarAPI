'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    lugar:{
        type: String,
        maxlength: [40, "El lugar de la competencia tiene que ser menor a 41 caracteres"], 
    },
    genero:{
        type: Boolean,
        required: "Seleccione el genero de la competencia", 
    },
    descripcion:{//Hit 1, Partido 1, etc
        type: String,
        required: "Digite una descripción para la competencia"
    },
    fase:{
        type: Number,
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
        lugar: this.lugar,
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
        activo: this.activo,
    }
});
CompetenciaAtletaSchema.method('infoPublica',function (){
    return {
        evento: this.evento,
        prueba: this.prueba,
        fechaHora: this.fechaHora,
        lugar: this.lugar,
        genero: this.genero,
        descripcion: this.descripcion,
        fase: this.fase,
    }
});

module.exports = mongoose.model('CompetenciaAtleta', CompetenciaAtletaSchema);