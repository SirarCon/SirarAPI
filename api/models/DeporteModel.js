'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;


var DeporteSchema = new Schema({
    _id: {
      type: Number,
    },
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: [40, "El nombre tiene que ser menor a 41 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
        unique: true
      },
      nombreNormalizado:{
        type: String,
      },
      imagenDeporteUrl: {
        type: String   
      },
      federacion: {
                    type: Number,
                     ref: 'Federacion',
                     required: 'Digite una federación por favor',                      
          },
      activo:{
        type: Boolean
      },                    
}, {_id: false});

DeporteSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'deporte' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(doc.get('nombre')); 
            next();
        })
    .catch(err=> {
      console.log("Error en deporte Model pre")
    })
});

DeporteSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

DeporteSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });

DeporteSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      activo: this.activo,
      federacion: this.federacion
    };
  
  });
  
  DeporteSchema.method('infoPublica', function() {
    return {
      id: this._id,
      nombre: this.nombre, 
      imagenDeporteUrl : this.imagenDeporteUrl,
      federacion: this.federacion
    };
  
  });
  
  module.exports = mongoose.model('Deporte', DeporteSchema);
  