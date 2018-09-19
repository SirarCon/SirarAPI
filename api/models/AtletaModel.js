'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AtletaSchema = new Schema({

    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: 20,
        minlength: 2
      },
      apellido1: {
        type: String,
        required: 'Digite un apellido1 por favor',
        maxlength: 20,
        minlength: 2
      },
      apellido2: {
        type: String,
        maxlength: 20,
        minlength: 2
      },
      nombreNormalizado:{
        type: String,
        maxlength: 40
      },
      fotoUrl: {
        type: String   
      },
      correo: {
        type: String,
        unique:true,
        maxlength: 40,
        minlength: 10
      },
      telefono: {
        type: String,
        maxlength: 8,
      },
      fechaNacimiento: {
        type: Date, 
      },
      passaporte: {
        type: String,
        mmaxlength: 15,
        minlength: 9,
      },
      genero: {
        type: Boolean,
      },
      lateralidad: {
        type: Boolean,
      },
      beneficiario: { //Beneficiario de Póliza
        type: String,
        maxlength: 40,
      },
      cedulaBeneficiario: {
        type: String,
        mmaxlength: 15,
        minlength: 9,
      },
      visaAmericana: {
        type: String,
        maxlength: 9,
        minlength: 8,
      },
      VenceVisa: {
        type: Date,
      },
      tallaCamisa:{
        type: String,
        maxlength: 5,
      },
      pantaloneta:{
        type: String,
        maxlength: 5,
      },
      tallaJacket:{
        type: String,
        maxlength: 5,
      },
      tallaBuzo:{
        type: String,
        maxlength: 5,
      },
      tallaTenis:{
        type: String,
        maxlength: 5,
      }, 
      infoPersonal:{
        type: String,
        maxlength: 1000,
      },
      fechaDebut:{
        type: Date,
      },
      facebookUrl:{
        type: String,
        maxlength: 100,
      },
      instagramUrl:{
        type: String,
        maxlength: 100,
      },
      twitterUrl:{
        type: String,
        maxlength: 100,
      },
      altura:{
        type: Number,
      },
      codigoPais: {
        type: String,
        maxlength: 10,
      },
      deporte:{
        type: {
              deporteId: {
                type: Schema.Types.ObjectId,
                ref: "Disciplina",
              },
              nombre:{
                type: String,
                maxlength: 40,
                minlength: 2
              }
        }
      }
});

AtletaSchema.method('datosAtleta', function() {
  
    return {nombre: this.nombre, 
            fotoUrl : this.fotoUrl      
           };
  
  });
  
  
  module.exports = mongoose.model('Atleta', AtletaSchema);
  