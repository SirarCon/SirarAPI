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
        type: Date,
        required: 'Digite la fecha de inicio del evento'
      },
      fechaFinal: {
        type: Date,
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
  });


  EventoSchema.pre('save', function(next) {
    var doc = this;
    Contador.findOneAndUpdate(
        { _id: 'evento' },
        { $inc : { sequence_value : 1 } },
        { new : true },  
        function(err, seq){
            if(err) return next(err);
            doc._id = seq.sequence_value;
            doc.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(this.get('nombre')); 
            next();
        }
    );
 
   
  });
  
  EventoSchema.pre('update', async function(next) {
    var doc = this;
   await Contador.findOneAndUpdate(
      { _id: 'evento' },
      { $inc : { sequence_value : 1 } },
      { new : true },  
      function(err, seq){
          if(err) return next(err);
          console.log(doc._id)
          doc._id= seq.sequence_value;
          console.log(doc._id)

             // nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
          // } 
         //});
next();
      }
  );


  
  });
  
  EventoSchema.pre('findOneAndUpdate', function(next) {
    this.update({},{
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
        anno: this.fechaInicio.getFullYear(),
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
        anno: this.fechaInicio.getFullYear()
      };
    
    });

    module.exports = mongoose.model('Evento', EventoSchema);