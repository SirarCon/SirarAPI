'use strict';

//#region Requires
var mongoose = require('mongoose'),
Atleta = mongoose.model('Atleta'),
Deporte = mongoose.model('Deporte'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");
const rutaImagenesAtletas = globales.rutaImagenesAtletas.instance;
//#endregion Requires

//#region UsuarioAdm
exports.crearAtleta = async function(req, res){
        Deporte.findOne().where({_id: req.body.deporte}).exec()
        .then(function(deporte) {
          if(deporte){
                var nuevoAtleta = new Atleta(req.body);   
                nuevoAtleta.fotoUrl = req.body.fotoUrl ? funcionesGlobales.guardarImagen(rutaImagenesAtletas, req.body.fotoUrl , nuevoAtleta._id) : undefined,
                nuevoAtleta.save().then(atleta =>{ 
                  res.json({token: res.locals.token, datos: globales.mensajes(-4, "Atleta", req.body.nombre )});
                }
                    ).catch(async err=>{       
                        if (err){  
                            console.log(err)
                            await funcionesGlobales.restarContador('atleta');
                            funcionesGlobales.borrarArchivo(nuevoAtleta.fotoUrl);  
                            if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta                            
                                res.json({token: res.locals.token, datos: globales.mensajes(10, "Atleta", funcionesGlobales.manejarError(err))});
                            }else{//Error llave duplicada
                               
                            res.json({token: res.locals.token, datos: globales.mensajes(15, "Atleta", " ")});
                            }   
                        }
                    });
                }else{
                        res.json({token: res.locals.token, datos: globales.mensajes(18, "el deporte ingresado", " ")}); //Todo modificar mensaje
                      }    
                    }).catch(e=> { 
                        console.log(e);
                        res.json({token: res.locals.token, datos: globales.mensajes(10, "Atleta", req.body.nombre)})
                    }); //Todo modificar mensaje                  
  };

exports.modificarAtleta  = async function(req, res){    
        Deporte.findOne().where({_id: req.body.deporte}).exec()
        .then(function(deporte) {
            if(deporte){
                Atleta.findOneAndUpdate({_id: req.params.id},
                {$set: {
                    nombre: req.body.nombre,
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
                    peso: req.body.peso,
                    pais: req.body.pais,
                    deporte: req.body.deporte,
                    activo: req.body.activo
                }}, {projection:{}, new: false, runValidators: true})
                .exec()
                .then(atletaAntiguo=>{
                if(atletaAntiguo){
                if((!req.body.fotoUrl || req.body.fotoUrl === "") && atletaAntiguo.fotoUrl != null){
                    funcionesGlobales.borrarArchivo(atletaAntiguo.fotoUrl);
                } 
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Atleta", req.body.nombre)});
                }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
                }
                }).catch(err=>{
                    if(err.code || err.code == 11000){ //Llave duplicada  
                        res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre Atleta", " ")});
                    }else{ 
                        console.log(err);
                        res.json({token: res.locals.token, datos: globales.mensajes(14, "atleta.", funcionesGlobales.manejarError(err))});        
                    };
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "el deporte ingresado", " ")}); //Todo modificar mensaje
            }    
        }).catch(e=> {res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte", req.body.deporte)});}); //Todo modificar mensaje    
};

exports.listarAtletas = async function(_, res){
    Atleta.find()
    .sort({nombreNormalizado : 1})
    .populate([{path: "deporte", select: "_id federacion"}])  
    .exec()
    .then(async (atletas)=>{
          await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
              atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);            
          });
          if(atletas.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas.map(a=> a.todaInformacion()))});  
          }else{
              res.json({token: res.locals.token, datos: globales.mensajes(11, "atletas", " ")});
          }
      }).catch((err)=>{
          res.json({token: res.locals.token,datos: globales.mensajes(12, " ", "los atletas")}); 
     });
  };
  
exports.leerAtleta  = async function(req, res){
    Atleta.findOne()
    .where({_id: req.params.id})
    .populate([{path: "deporte", select: "_id federacion" },])  
    .exec()
    .then(async (atleta) => {
        if(atleta){            
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atleta.todaInformacion())});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
        }
  }).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id)});
    })
};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.listarAtletasActivos = async function(_, res){
    Atleta.find()
    .where({activo: true})  
    .sort({nombreNormalizado : 1})
    .populate([{path: "deporte", select: "_id federacion" },])      
    .exec()
    .then(async (atletas)=>{
          await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
              atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);            
          });
          if(atletas.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atletas.map(a =>a.infoPublica()))});  
          }else{
              res.json({token: res.locals.token, datos: globales.mensajes(11, "atletas", " ")});
            }
      }).catch((err)=>{
          res.json({token: res.locals.token,datos: globales.mensajes(12, "", "los atletas")}); 
     });
  };

exports.leerAtletaActivo  = async function(req, res){
    Atleta.findOne()
    .where({_id: req.params.id})
    .populate([{path: "deporte", select: "_id federacion" /*, populate:{path: "federacion", select: "_id"}*/},])  
    .exec()
    .then(async (atleta) => {
        if(atleta){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, atleta.infoPublica())});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", " ")});
        }
    }).catch((err)=>{
        res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id)});
    })
};
//#endregion  Usuariopúblico