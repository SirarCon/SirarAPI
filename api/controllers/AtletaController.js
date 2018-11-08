'use strict';

//#region Requires
var mongoose = require('mongoose');
var Atleta = mongoose.model('Atleta');
var Deporte = mongoose.model('Deporte');
var globales =  require("../Globales.js");
var funcionesGlobales = require("../FuncionesGlobales.js");
const rutaImagenesAtletas = globales.rutaImagenesAtletas.instance;
//#endregion Requires

//#region UsuarioAdm
exports.crearAtleta = async function(req, res){
    funcionesGlobales.validarEmail(req.body.correo)
    .then(function(values) {
        Deporte.findOne().where({_id: req.body.deporte}).exec()
        .then(function(deporte) {
          if(deporte){
                var nuevoAtleta = new Atleta(req.body);  
                console.log(nuevoAtleta.deporte);
                var t= mongoose.Types.ObjectId(req.body.deporte);
                console.log(t);
                nuevoAtleta.fotoUrl = req.body.fotoUrl ? funcionesGlobales.guardarImagen(rutaImagenesAtletas, req.body.fotoUrl , nuevoAtleta._id) : undefined,
                nuevoAtleta.save().then(atleta =>{
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, "Atleta", req.body.nombre ).instance});}
                    ).catch(err=>{ 
                        console.log(err);        
                        if (err){  
                            funcionesGlobales.borrarArchivo(nuevoAtleta.fotoUrl);  
                            if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta                            
                                res.json({token: res.locals.token, datos: globales.mensajes(10, "Atleta", funcionesGlobales.manejarError(err)).instance});
                            }else{//Error llave duplicada
                            res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre atleta", " ").instance});
                            }   
                        }
                    });
                }else{
                        res.json({token: res.locals.token, datos: globales.mensajes(18, "la deporte ingresada", " ").instance}); //Todo modificar mensaje
                      }    
                    }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance})); //Todo modificar mensaje              
    }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance}));
  };


exports.modificarAtleta  = async function(req, res){
    funcionesGlobales.validarEmail(req.body.correo)
    .then(function(values) {
        Deporte.findOne().where({_id: req.body.deporte}).exec()
        .then(function(deporte) {
            if(deporte){
                Atleta.findOneAndUpdate({_id: req.params.id},
                {$set: {
                    nombre: req.body.nombre,
                    apellido1: req.body.apellido1,
                    apellido2: req.body.apellido2,
                    nombreNormalizado: req.body.nombre,
                    fotoUrl: req.body.fotoUrl ? funcionesGlobales.guardarImagen(rutaImagenesAtletas, req.body.fotoUrl , req.params.id) : undefined,
                    correo: req.body.correo,
                    telefono: req.body.telefono,
                    fechaNacimiento: req.body.fechaNacimiento,
                    passaporte: req.body.passaporte,
                    genero: req.body.genero,
                    lateralidad: req.body.lateralidad,
                    beneficiario: req.body.beneficiario,
                    cedulaBeneficiario: req.body.cedulaBeneficiario,
                    visaAmericana: req.body.visaAmericana,
                    venceVisa: req.body.venceVisa,
                    tallaCamisa: req.body.tallaCamisa,
                    pantaloneta: req.body.pantaloneta,
                    tallaJacket: req.body.tallaJacket,
                    tallaBuzo: req.body.tallaBuzo,
                    tallaTenis: req.body.tallaTenis,
                    infoPersonal: req.body.infoPersonal,
                    fechaDebut: req.body.fechaDebut,
                    facebookUrl: req.body.facebookUrl,
                    instagramUrl: req.body.instagramUrl,
                    twitterUrl: req.body.twitterUrl,
                    altura: req.body.altura,
                    codigoPais: req.body.codigoPais,
                    deporte: req.body.deporte,
                    activo: req.body.activo
                }}, {projection:{}, new: false, runValidators: true})
                .exec()
                .then(atletaAntiguo=>{
                if(atletaAntiguo){
                if((!req.body.fotoUrl || req.body.fotoUrl === "") && atletaAntiguo.fotoUrl != null){
                    funcionesGlobales.borrarArchivo(atletaAntiguo.imagenDeporteUrl);
                }       
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Atleta", req.body.nombre).instance});
                }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ").instance});
                }
                }).catch(err=>{
                    if(err.code || err.code == 11000){ //Llave duplicada  
                        res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre Atleta", " ").instance});
                    }else{ 
                        res.json({token: res.locals.token, datos: globales.mensajes(14, "atleta", funcionesGlobales.manejarError(err)).instance});        
                    };
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "la deporte ingresada", " ").instance}); //Todo modificar mensaje
            }    
        }).catch(e=> {res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte", req.body.deporte).instance});}); //Todo modificar mensaje
    }).catch(e=> {res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance}) 
});
};

  exports.listarAtletas = async function(req, res){
    Atleta.find()
    .sort({nombreNormalizado : 1})
    .populate({path: "deporte", slect: "nombre", populate:{path: "federacion", select: "nombre"}})  
    .exec()
    .then(async (atletas)=>{
          await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
              atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);            
          });
          if(atletas.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas.map(a=> a.todaInformacion())).instance});  
          }else{
              res.json({token: res.locals.token, datos: globales.mensajes(11).instance});
          }
      }).catch((err)=>{
          res.json({token: res.locals.token,datos: globales.mensajes(12, "", "los atletas").instance}); 
     });
  };
  
exports.leerAtleta  = async function(req, res){
    Atleta.findOne()
    .where({_id: req.params.id})
    .populate({path: "deporte", slect: "nombre", populate:{path: "federacion", select: "nombre"}})  
    .exec()
    .then(async (atleta) => {
        if(atleta){            
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atleta.todaInformacion()).instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ").instance});
        }
  }).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id).instance});
    })
};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.listarAtletasActivos = async function(req, res){
    Atleta.find()
    .sort({nombreNormalizado : 1})
    .populate({path: "deporte", slect: "nombre", populate:{path: "federacion", select: "nombre"}})  
    .where({activo: true})  
    .exec()
    .then(async (atletas)=>{
          await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
              atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);            
          });
          if(atletas.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas.map(a =>a.infoPublica())).instance});  
          }else{
              res.json({token: res.locals.token, datos: globales.mensajes(11).instance});
            }
      }).catch((err)=>{
          res.json({token: res.locals.token,datos: globales.mensajes(12, "", "los atletas").instance}); 
     });
  };

exports.leerAtletaActivo  = async function(req, res){
    Atleta.findOne()
    .where({_id: req.params.id})
    .populate({path: "deporte", slect: "nombre", populate:{path: "federacion", select: "nombre"}})  
    .exec()
    .then(async (atleta) => {
        if(atleta){
            console.log(atleta.deporte.nombre + " ");
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, atleta.infoPublica()).instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ").instance});
        }
    }).catch((err)=>{
        res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id).instance});
    })
};
//#endregion  Usuariopúblico