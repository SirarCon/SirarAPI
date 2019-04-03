'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
funcionesGlobales = require("../FuncionesGlobales.js"),
Schema = mongoose.Schema;


var AtletaSchema = new Schema({
    _id: {
      type: Number,
    },
    nombre: {
        type: String,
        required: 'Digite un nombre por favor',
        maxlength: [60, "El nombre tiene que ser menor a 21 caracteres"],
        minlength: [2, "El nombre tiene que ser mayor a 1 caracteres"],
      },
      nombreNormalizado:{
        type: String,
      },
      fotoUrl: {
        type: String   
      },
      correo: {
        type: String,
        maxlength: [40, "El correo de la federación tiene que ser menor a 41 caracteres"],    
      },
      telefono: {
        type: String,
        maxlength: [8, "El teléfono tiene que ser menor a 9 caracteres"],
      },
      fechaNacimiento: {
        type: String, 
      },
      pasaporte: {
        type: String,
        maxlength: [15, "El pasaporte tiene que ser menor a 16 caracteres"],        
      },
      genero: {
        type: Number,
      },
      lateralidad: {
        type: String,
      },
      beneficiario: { //Beneficiario de Póliza
        type: String,
        maxlength: [40, "El beneficiario tiene que ser menor a 41 caracteres"],
      },
      cedulaBeneficiario: {
        type: String,
        mmaxlength: [15, "La cédula del beneficiario tiene que ser menor a 16 caracteres"],        
      },
      visaAmericana: {
        type: String,
        maxlength: [9, "La visa americana tiene que ser menor a 16 caracteres"],        
      },
      venceVisa: {
        type: Date,
      },
      tallaCamisa:{
        type: String,
        maxlength: [5, "La talla de la camisa tiene que se menor a 6 caracteres"],
      },
      pantaloneta:{
        type: String,
        maxlength: [5, "La talla de la pantaloneta tiene que se menor a 6 caracteres"],
      },
      tallaJacket:{
        type: String,
        maxlength: [5, "La talla de la jacket tiene que se menor a 6 caracteres"],
      },
      tallaBuzo:{
        type: String,
        maxlength: [5, "La talla del buzo tiene que se menor a 6 caracteres"],
      },
      tallaTenis:{
        type: String,
        maxlength: [5, "La talla de las tenis tiene que se menor a 6 caracteres"],
      }, 
      infoPersonal:{
        type: String,
        maxlength: [1000, "La información personal tiene que ser menor a 1001 caracteres"],
      },
      fechaDebut:{
        type: String,
      },
      facebookUrl:{
        type: String,
        maxlength: [100, "El link de Facebook tiene que ser menor a 101 caracteres"]
      },
      instagramUrl:{
        type: String,
        maxlength: [100, "El link de Instagram tiene que ser menor a 101 caracteres"]
      },
      twitterUrl:{
        type: String,
        maxlength: [100, "El link del Twitter tiene que ser menor a 101 caracteres"]
      },
      altura:{
        type: Number,
      },
      peso:{
        type: Number
      },      
      activo: {
        type: Boolean,
        required: "Seleccione si el atleta está activo"
      },
      deporte:{ 
        required: "Seleccione un deporte",
        type: Number,
        ref: "Deporte",                     
      },
      pais: {
        required: "Seleccione un país",
        type: Number,
        ref: "Pais",
      },
}, {_id: false});

AtletaSchema.pre('save', async function(next) {
  var doc = this;
  await Contador.findOneAndUpdate(
        { _id: 'atleta' },
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

AtletaSchema.pre('update', function(next) {
this.update({},{
               $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().nombre) 
              } 
            });
next();
});

AtletaSchema.pre('findOneAndUpdate', function(next) {
  this.update({},{
                 $set: { nombreNormalizado: funcionesGlobales.formatoNombreNormalizado(this.getUpdate().$set.nombre) 
                } 
              });
  next();
  });


AtletaSchema.method('todaInformacion', function() {
    return {
      id: this._id,
      nombre: this.nombre,
      fotoUrl: this.fotoUrl,
      correo: this.correo,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
      pasaporte: this.pasaporte,
      genero: this.genero,
      lateralidad: this.lateralidad,
      beneficiario: this.beneficiario,
      cedulaBeneficiario: this.cedulaBeneficiario,
      visaAmericana: this.visaAmericana,
      venceVisa: this.venceVisa,
      tallaCamisa: this.tallaCamisa,
      pantaloneta: this.pantaloneta,
      tallaJacket: this.tallaJacket,
      tallaBuzo: this.tallaBuzo,
      tallaTenis: this.tallaTenis,
      infoPersonal: this.infoPersonal,
      fechaDebut: this.fechaDebut,
      facebookUrl: this.facebookUrl,
      instagramUrl: this.instagramUrl,
      twitterUrl: this.twitterUrl,
      altura: this.altura,
      peso: this.peso,
      codigoPais: this.codigoPais,
      deporte: this.deporte,
      pais: this.pais,
      activo: this.activo,
    }
  });
  
AtletaSchema.method('infoPublica', function() {
  return {
    id: this._id,
    nombre: this.nombre,
    fotoUrl: this.fotoUrl,
    correo: this.correo,
    telefono: this.telefono,
    fechaNacimiento: this.fechaNacimiento,
    genero: this.genero,
    infoPersonal: this.infoPersonal,
    fechaDebut: this.fechaDebut,
    facebookUrl: this.facebookUrl,
    instagramUrl: this.instagramUrl,
    twitterUrl: this.twitterUrl,
    altura: this.altura,
    peso: this.peso,
    codigoPais: this.codigoPais,
    deporte: this.deporte,
    pais: this.pais
  }
});
  
  module.exports = mongoose.model('Atleta', AtletaSchema);
  