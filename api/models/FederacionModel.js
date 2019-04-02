
'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;


var FederacionSchema = new Schema({ 
    _id:{
      type: Number,
    },
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        unique: true,
        maxlength: [40, "El nombre tiene que ser menor a 41 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
      },
      nombreNormalizado:{
        type: String,
      },
      escudoUrl: {
        type: String   
      },
      correoFederacion: {
        type: String,        
        maxlength: [40, "El correo de la federación tiene que ser menor a 41 caracteres"],
        minlength: [10, "El correo de la federación tiene que ser mayor a 9 caracteres"],
      },
      activo:{
        type: Boolean
      },
      paginaWeb: {
        type: String,
        maxlength: [40, "La página Web es de máximo 40 caracteres" ],
      },
      ubicacion: {
        type: String,
        maxlength: [100, "La ubicación es de máximo 100 caracteres" ],
      },
      telefonos: {
        type:[Number],
      },
      presidente : {
      type: String,
      maxlength: [40, "El nombre del presidente es de máximo 40 caracteres" ],
      minlength: [2, "El nombre del presidente tiene que ser mayor a 1 caracteres"],
    },
      correoPresidente:{
        type: String,
        maxlength: [40, "El correo del presidente tiene que ser menor a 41 caracteres"],
        minlength: [10, "El correo del presidente tiene que ser mayor a 9 caracteres"],
    }
}, {_id: false});

FederacionSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'federacion' },
        { $inc : { sequence_value : 1 } },
        { new : true },)  
        .then(async seq =>{
            doc._id = seq.sequence_value;
            doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(doc.get('nombre')); 
            next();
        })
    .catch(err=> {
      console.log("Error en federacion Model pre")
    })
});

FederacionSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

FederacionSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });


FederacionSchema.method('todaInformacion', function() {
  
  return {
    id: this._id,
    nombre: this.nombre ,    
    escudoUrl: this.escudoUrl,  
    paginaWeb: this.paginaWeb,
    ubicacion: this.ubicacion,
    telefonos: this.telefonos, 
    correoFederacion: this.correoFederacion,
    presidente : this.presidente,
    correoPresidente: this.correoPresidente,
    activo: this.activo,    
   };
  
  });

  FederacionSchema.method('infoPublica', function() {
  
    return {
      id: this._id,
      nombre: this.nombre ,    
      escudoUrl: this.escudoUrl,  
      paginaWeb: this.paginaWeb,
      ubicacion: this.ubicacion,
      telefonos: this.telefonos, 
      correoFederacion: this.correoFederacion,
      presidente : this.presidente,
      correoPresidente: this.correoPresidente, 
     };
    
    });
  
  module.exports = mongoose.model('Federacion', FederacionSchema);
  
  