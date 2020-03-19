'use strict';
var mongoose = require("mongoose"),
funcionesGlobales = require("../FuncionesGlobales.js"),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema;

var EventoSchema = new Schema({
  _id: Number,
    nombre: {
        unique: true,
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: [40,  "El nombre tiene que ser menor a 41 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
      },
      nombreNormalizado:{
        type: String,
      },
      fotoUrl: {
        type: String   
      },      
      fechaInicio: {
        type: String,
        required: 'Digite la fecha de inicio del evento'
      },
      fechaFinal: {
        type: String,
        required: 'Digite la fecha final del evento'
      },
      ciudad:{
        type: String,
        required: "Digite la ciudad del evento"
      },
      activo: {
        type: Boolean,
    },
    pais: {
      type: Number,
      ref: "Pais",
    },
  },{ _id: false});


  EventoSchema.pre('save', async function(next) {
    var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'evento' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(doc.get('nombre')); 
            next()
        })
    .catch(err=> {
      console.log("Error en evento Model pre")
    })
  });
  
  EventoSchema.pre('update', async function(next) {
    this.updateOne({},{
        $set: {
        nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
      } 
    });
    next();
  });
  
  EventoSchema.pre('findOneAndUpdate', function(next) {
    this.updateOne({},{
                   $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                  } 
                });
    next();
    });

    EventoSchema.method('todaInformacion', function() {
      return {
        id: this._id,
        nombre: this.nombre, 
        fotoUrl : this.fotoUrl,
        fechaInicio: this.fechaInicio,
        fechaFinal: this.fechaFinal,
        ciudad: this.ciudad,
        pais: this.pais,
        anno: funcionesGlobales.obtenerAnno(this.fechaInicio),
        activo: this.activo
      };
    
    });
    
    EventoSchema.method('infoPublica', function() {
      return {
        id: this._id,
        nombre: this.nombre, 
        fotoUrl : this.fotoUrl,
        fechaInicio: this.fechaInicio,
        fechaFinal: this.fechaFinal,
        ciudad: this.ciudad,
        pais: this.pais,
        anno: funcionesGlobales.obtenerAnno(this.fechaInicio)
      };
    
    });

    module.exports = mongoose.model('Evento', EventoSchema);