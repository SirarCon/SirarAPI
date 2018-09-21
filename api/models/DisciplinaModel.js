'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DisciplinaSchema = new Schema({
    deporte: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: 40,
        minlength: 2
      },
      nombreNormalizado:{
        type: String,
        maxlength: 40
      },
      imagendeporteUrl: {
        type: String   
      },
      escudoUrl: {
        type: String   
      },
      federacion: {
        type: String,
        required: 'Digite una federación por favor',
        maxlength: 40,
        minlength: 2
      },   
      paginaWeb: {
        type: String,
        maxlength: 40,
      },
      ubicacion: {
        type: String,
        maxlength: 100,
      },
      telefonos: {
        type:[Number],
      },
      correoFederacion: {
          type: String,
          maxlength: 40,
          minlength: 10
      },
      presidente : {
      type: String,
      required: 'Digite un nombre por favor',
      maxlength: 40,
      minlength: 2,
     },
      correoPresidente:{
        type: String,
        maxlength: 40,
        minlength: 10,
    },
    pruebas:{
      type: [
              {
                nombre: {
                        type: String,
                        maxlength: 30,
                },
              }
            ]
    }

      
});


DisciplinaSchema.method("datosDeporte", function() {
  
    return {nombre: this.nombre, 
            fotoUrl : this.fotoUrl      
           };
  
  });

  DisciplinaSchema.method("", function(){
      return {

      }
  });
  module.exports = mongoose.model("Disciplina", DisciplinaSchema);