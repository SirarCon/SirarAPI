'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DisciplinaSchema = new Schema({
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: 40,
        minlength: 2,
        unique: true
      },
      nombreNormalizado:{
        type: String,
        maxlength: 40
      },
      imagenDisciplinaUrl: {
        type: String   
      },
      federacion: {
            type: {
                    type: Schema.Types.ObjectId,
                     ref: 'Federacion'
            }               
          },
      activo:{
        type: Boolean
      },                    
      pruebas:{
        type: [
                {
                  nombre: {
                          type: String,
                          maxlength: 30,
                  },
                  activo: {
                          type: Boolean,
                  }
                }
              ]
      }
});

DisciplinaSchema.pre('findOneAndUpdate', function(next) {
  
  next();
  });

DisciplinaSchema.method('datosAtleta', function() {
  
    return {
      id: this._id,
      nombre: this.nombre, 
      fotoUrl : this.fotoUrl      
    };
  
  });
  
  
  module.exports = mongoose.model('Disciplina', DisciplinaSchema);
  