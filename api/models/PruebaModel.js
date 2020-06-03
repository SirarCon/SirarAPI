'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Schema = mongoose.Schema,
funcionesGlobales = require("../FuncionesGlobales.js");


var PruebaSchema = new Schema({
    _id: {
      type: Number,
    },
    nombre: {
            type: String,
            maxlength: [40, "El correo de la federación tiene que ser menor a 41 caracteres"],
            required: 'Digite el nombre de la prueba',
    },
    nombreNormalizado: {
      type: String,
      unique: true,
    },
    deporte:{
        type: Number,
        ref: 'Deporte',
        required: 'Digite un deporte por favor',
    },
    activo: {
        type: Boolean,
        required: "Seleccione si la prueba es activa"
    },
    tipo:{//Tipo: Individual: 0 o por Equipo: 1
        type: Number,
        required: "Seleccione si la prueba es individual o por equipo"
    },
  }, {_id: false});

  PruebaSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'prueba' },
        { $inc : { sequence_value : 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(doc.get('nombre')); 
            next();
        })
    .catch(err=> {
      funcionesGlobales.registrarError("Error en prueba Model pre", err);
    })
});
  
  PruebaSchema.pre('update', function(next) {
  this.updateOne({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre + this._id) 
                } 
              });
    next();
  });
  
  PruebaSchema.pre('findOneAndUpdate', function(next) {
    this.updateOne({},{
                   $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre)  + this._id
                  } 
                });
    next();
    });
  
  PruebaSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
      tipo: this.tipo,
      activo: this.activo
    };
  
  });
  
  PruebaSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      deporte: this.deporte,
      tipo: this.tipo,
    };
  
  });
  
  module.exports = mongoose.model('Prueba', PruebaSchema);
