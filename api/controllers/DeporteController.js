'use strict';

//#region Requires
var mongoose = require('mongoose');
var Deporte = mongoose.model('Deporte');
var Federacion = mongoose.model('Federacion');
var Prueba = mongoose.model('Prueba');
var globales =  require("../Globales.js");
var funcionesGlobales = require("../FuncionesGlobales.js");
const rutaImagenesDeportes = globales.rutaImagenesDeportes.instance;
const rutaImagenesFederaciones = globales.rutaImagenesFederaciones.instance;
//#endregion Requires


//#region Federaciones

//#region UsuarioAdm
exports.crearFederacion = async function(req, res){
  funcionesGlobales.validarEmails([req.body.correoPresidente, req.body.correoFederacion])
  .then(function(values) {
    var nuevaFederacion = new Federacion(req.body);   
    nuevaFederacion.escudoUrl = req.body.escudoUrl ? funcionesGlobales.guardarImagen(rutaImagenesFederaciones, req.body.escudoUrl , nuevaFederacion._id) : undefined,
    nuevaFederacion.save().then(federacion =>{
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Federación", req.body.nombre).instance});
      }).catch(async err=>{  
              await funcionesGlobales.restarContador('federacion');
              funcionesGlobales.borrarArchivo(nuevaFederacion.escudoUrl);                   
              if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta               
                  res.json({token: res.locals.token, datos: globales.mensajes(10, "Federacion", funcionesGlobales.manejarError(err)).instance});
              }else{//Error llave duplicada
                 res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ").instance});
              }               
      });              
  }).catch(e=> {
    res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance})
  });
};

exports.modificarFederacion = async function(req, res){
  funcionesGlobales.validarEmails([req.body.correoPresidente, req.body.correoFederacion])
  .then(function(values) {
  Federacion.findOneAndUpdate({_id: req.params.idFederacion},
    {$set: {
      nombre: req.body.nombre,
      escudoUrl:  req.body.escudoUrl ? funcionesGlobales.guardarImagen(rutaImagenesFederaciones, req.body.escudoUrl , req.params.idFederacion) : undefined,
      correoFederacion: req.body.correoFederacion,
      activo: req.body.activo,
      paginaWeb: req.body.paginaWeb,
      ubicacion: req.body.ubicacion,
      telefonos: req.body.telefonos,
      presidente : req.body.presidente,
      correoPresidente: req.body.correoPresidente                                                                                                     
     }}, {projection:{}, new: false, runValidators: true})
     .exec()
     .then(federacionAntigua=>{
      if(federacionAntigua){
        if((!req.body.escudoUrl || req.body.escudoUrl === "") && federacionAntigua.escudoUrl != null){
          funcionesGlobales.borrarArchivo(federacionAntigua.escudoUrl);
        }       
        res.json({token: res.locals.token, datos: globales.mensajes(-3, "Federación", req.body.nombre).instance});
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ").instance});
      }
  }).catch(err=>{
    if(err.code || err.code == 11000){ //Llave duplicada  
      res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ").instance});
    }else{ 
      res.json({token: res.locals.token, datos: globales.mensajes(14, "federacion", funcionesGlobales.manejarError(err)).instance});        
    }
  });
}).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", "(s)").instance}));
};

exports.leerFederacion = async function(req, res) {  
  Federacion.findOne()
  .where({_id: req.params.idFederacion})
  .exec()
  .then(async (federacion) => {
    if(federacion){      
      federacion.escudoUrl = await funcionesGlobales.leerArchivoAsync(federacion.escudoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federacion.todaInformacion()).instance});
    }else{   
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ").instance});
    }
}).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", " ").instance});
  }) 
};

exports.listaTodasFederaciones =  async function(req, res) {
  Federacion.find()
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (federaciones)=>{
      await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
        federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);                      
      });
      if(federaciones.length > 0){
          res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,federaciones.map(f => f.todaInformacion())).instance});  
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(11, "federaciones", " ").instance});
      }
  }).catch((err)=>{
      res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones" , "").instance});  
  }); 
};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.leerFederacionActiva = async function(req, res) {  
  Federacion.findOne()
  .where({_id: req.params.idFederacion, activo: true})
  .exec()
  .then(async (federacion) => {
    if(federacion){      
      federacion.escudoUrl = await funcionesGlobales.leerArchivoAsync(federacion.escudoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federacion.infoPublica()).instance});
    }else {   
       res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ").instance});
    }
  }).catch((err)=>{  
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", " ").instance});
  }) 
};

exports.listaFederacionesActivas =  async function(req, res) {//Menos el que consulta en el correo     
  Federacion.find()
  .where({activo: true })
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (federaciones)=>{
      await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
        federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);        
      });      
      if(federaciones.length > 0){
          res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federaciones.map(f => f.infoPublica())).instance});  
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(11, "federaciones", " ").instance});
      }
  }).catch((err)=>{
    console.log(err);
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones", " ").instance});  
});
};
//#endregion Usuariopúblico
//#endregion Federaciones

//#region Deportes
//#region UsuarioAdm
exports.crearDeporte = async function(req, res){
  Federacion.findOne()
  .where({_id: req.body.federacion})
  .exec()
  .then(function(federacion) {
    if(federacion){
      var nuevoDeporte = new Deporte(req.body); 
      nuevoDeporte.imagenDeporteUrl = req.body.imagenDeporteUrl ? funcionesGlobales.guardarImagen(rutaImagenesDeportes, req.body.imagenDeporteUrl , nuevoDeporte._id) : undefined,
      nuevoDeporte.save()
      .then(deporte =>{
          res.json({token: res.locals.token, datos: globales.mensajes(-4, "Deporte ", req.body.nombre).instance});
      }).catch(async err=>{ 
                await funcionesGlobales.restarContador('deporte'); 
                funcionesGlobales.borrarArchivo(nuevoDeporte.imagenDeporteUrl); 
                if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta                               
                    res.json({token: res.locals.token, datos: globales.mensajes(10, "Deporte ", funcionesGlobales.manejarError(err)).instance});
                }else{//Error llave duplicada
                  res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre deporte ", " ").instance});
                }
      });      
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(18, "la federación ingresada"," ").instance}); 
    }    
  }).catch(e=> {
    res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance})
  }); 
};

exports.modificarDeporte = async function(req, res){
  Federacion.findOne()
  .where({_id: req.body.federacion})
  .exec()
  .then(function(federacion) {
    if(federacion){
        Deporte.findOneAndUpdate({_id: req.params.idDeporte},
          {$set: {
            nombre: req.body.nombre,
            imagenDeporteUrl: req.body.imagenDeporteUrl ? funcionesGlobales.guardarImagen(rutaImagenesDeportes, req.body.imagenDeporteUrl , req.params.idDeporte) : undefined,
            federacion: req.body.federacion,
            activo: req.body.activo        
          }}, {projection:{}, new: false, runValidators: true})
          .exec()
          .then(deporteAntiguo=>{
            if(deporteAntiguo){
              if((!req.body.imagenDeporteUrl || req.body.imagenDeporteUrl === "") && deporteAntiguo.imagenDeporteUrl != null){
                funcionesGlobales.borrarArchivo(deporteAntiguo.imagenDeporteUrl);
              }       
              res.json({token: res.locals.token, datos: globales.mensajes(-3, "Deporte ", req.body.nombre).instance});
            }else{
              res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
            }
          }).catch(err=>{
            if(err.code || err.code == 11000){ //Llave duplicada  
              res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre deporte ", " ").instance});
            }else{ 
              res.json({token: res.locals.token, datos: globales.mensajes(14, "deporte", funcionesGlobales.manejarError(err)).instance});        
            };
          });
        }else{
             res.json({token: res.locals.token, datos: globales.mensajes(18, "la federación ingresada", " ").instance}); 
        }    
  }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance})); //Todo modificar mensaje
};

exports.listarDeportes = async function(req, res){
  Deporte.find()
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {  
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {     
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);     
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.todaInformacion())).instance})
  }).catch((err)=>{           
      res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes ", " ").instance});  
    });
};

exports.listarDeportesXFederacion = async function(req, res){
  Deporte.find()
  .where({federacion: req.params.idFederacion})
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {   
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {     
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);     
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.todaInformacion())).instance})
  }).catch((err)=>{             
      res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes ", " ").instance});  
    });
};

exports.leerDeporte = async function(req, res){
    Deporte.findOne()
    .where({_id: req.params.idDeporte})
    .exec()
    .then(async (deporte) => {
      if(deporte){        
        deporte.imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(deporte.imagenDeporteUrl);
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.todaInformacion()).instance});
      }else {   
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
      }
    }).catch((err)=>{
      res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte ", " ").instance});
    })
};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.leerDeporteActiva = async function(req, res){
  Deporte.findOne()
  .where({_id: req.params.idDeporte, activo: true})
  .exec()
  .then(async (deporte) => {
    if(deporte){  
      deporte.imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(deporte.imagenDeporteUrl);
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.infoPublica()).instance })
    }else{   
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
    }
}).catch((err)=>{
  res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte", " ").instance});
  })
};

exports.listarDeportesActivas = async function(req, res){
  Deporte.find()
  .where({activo: true })
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);          
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.infoPublica())).instance })
  }).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "deportes", " ").instance});
  });
};

exports.listarDeportesActivasXFederacion = async function(req, res){
  Deporte.find()
  .where({activo: true, federacion: req.params.idFederacion })
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);          
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.infoPublica())).instance })
  }).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "deportes", " ").instance});
  });
}


//#endregion Usuariopúblico
//#endregion Deportes

//#region Pruebas
//#region UsuarioAdm


exports.insertarPrueba = async function(req, res){
   Deporte.findOne()
  .where({_id: req.params.idDeporte})
  .exec()
  .then(deporte=>{ 
    if(deporte){
      Prueba.findOne()
      .where({nombre: req.body.nombre, deporte: req.params.idDeporte})
      .then(prueba => {
        if(prueba){
          res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nombre, " ").instance}); 
        }else{
          var nuevaPrueba = new Prueba(req.body);
          nuevaPrueba.deporte = req.params.idDeporte;
          nuevaPrueba.save().then(prueba=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-4, "Prueba", req.body.nombre).instance});
          }).catch(async err => {
            await funcionesGlobales.restarContador('federacion');
            res.json({token: res.locals.token, datos: globales.mensajes(10, "Prueba", " ").instance});
          });          
        }
      }).catch(err=>{
        console.log(err);
      res.json({token: res.locals.token, datos: globales.mensajes(13, "pruebas", " ").instance});
       });
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
      }
    }).catch(err =>{
         res.json({token: res.locals.token, datos: globales.mensajes(10, "Prueba", funcionesGlobales.manejarError(err)).instance});
      })
}

exports.modificarPrueba = function(req, res){
    Deporte.findOne()//Existe el deporte?
    .where({_id: req.params.idDeporte})
    .exec()
    .then(deporte=>{ 
      if(deporte){    
        Prueba.findOne()//Existe una prueba de ese deporte con el mismo nombre?
        .where({ deporte: req.params.idDeporte, nombre: req.body.nombre})
        .exec()
        .then(prueba => {
          if(prueba){
            res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nombre , " ").instance}); 
          }else{// No existen pruebas con el mismo nombre
            Prueba.findOneAndUpdate({_id: req.params.idPrueba, deporte: req.params.idDeporte},
            { $set: {
              nombre: req.body.nombre,                        
              activo: req.body.activo        
            }}, {projection:{}, new: false, runValidators: true})
            .exec()
            .then(prueba=>{
              if(prueba){
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Prueba ", req.body.nombre).instance});
              }else{
                  res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte o prueba", "especificada").instance});
              }
            }).catch(err=>{
              res.json({token: res.locals.token,datos: globales.mensajes(12, "la prueba", " ").instance});
            })
          }
        }).catch(err=> {
          res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});
        }); 
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ").instance});
      }}).catch(err=>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "el deporte", " ").instance});
      }) 
    };     
      

exports.listarPruebas = async function(req, res){
  Prueba.find()
  .where({deporte: req.params.idDeporte})
  .sort({nombreNormalizado : 1})
  .exec()
  .then(pruebas=>{ 
    if(pruebas){     
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, pruebas.map(d => d.todaInformacion())).instance});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
    }
  }).catch(err=>{
    console.log(err);
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
  });
};

//#endregion UsuarioAdm
     
//#region Usuariopúblico
exports.listarPruebasActivas = async function(req, res){
  Prueba.find()
  .where({deporte: req.params.idDeporte})
  .sort({nombreNormalizado : 1})
  .exec()
  .then(pruebas=>{
    if(pruebas){
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, pruebas.map(p=>p.infoPublica())).instance});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ").instance});
    }
  }).catch(err=>{
    console.log(err);
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
  });
};


exports.listarDeporteXPruebasActivas = async function(req, res){
  Prueba.findOne()
  .where({_id: req.params.idPrueba})
  .exec()
  .then(async (prueba)=>{
    if(prueba){
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, prueba.todaInformacion()).instance});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", " ").instance});
    }
  }).catch(err=>{
console.log(err);
    res.json({token: res.locals.token,datos: globales.mensajes(12, "la prueba", " ").instance});  
  });
};
//#endregion Usuariopúblico
//#endregion Pruebas



// exports.insertarPrueba = async function(req, res){
//   Deporte.findOne()
//   .where({_id: req.params.idDeporte})
//   .exec()
//   .then(deporte=>{ 
//     if(deporte){
//        if(req.body.nombre && !deporte.pruebas.some((p)=> p.nombre === req.body.nombre)){
//           req.body.nombreNormalizado = funcionesGlobales.formatoNombreNormalizado(req.body.nombre)
//           deporte.pruebas.push(req.body);
//           deporte.save();       
//           res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.pruebas.sort(funcionesGlobales.ordenarPorNombre)).instance});
//        }else{
//         res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nombre, " ").instance}); 
//        }
//        }else{
//         res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
//        }
//      }).catch(err=>{
//        console.log(err);
//       res.json({token: res.locals.token, datos: globales.mensajes(10, "Prueba", funcionesGlobales.manejarError(err)).instance});
//      });
// };

// exports.editarPrueba = function(req, res){
//   Deporte.findOne()
//   .where({_id: req.params.idDeporte})
//   .exec()
//   .then(deporte=>{ 
//     if(deporte){           
//        if(req.body.nuevoNombre && 
//         !deporte.pruebas.some((p)=> p._id.toString() !== req.params.idPrueba.toString() && p.nombre === req.body.nuevoNombre)){
//           Deporte.findOneAndUpdate({_id: req.params.idDeporte, "pruebas._id": req.params.idPrueba}, 
//             {   
//               $set: {
//                 "pruebas.$.nombre": req.body.nuevoNombre,
//                 "pruebas.$.nombreNormalizado": funcionesGlobales.formatoNombreNormalizado(req.body.nuevoNombre),
//                 "pruebas.$.activo": req.body.activo
//               }
//           }, {projection:{}, new: true, runValidators: true})
//           .exec()
//           .then(deporte=>{
//             if(deporte){
//                 res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.pruebas).instance});
//             }else{
//                 res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte o prueba", "especificada").instance});
//             }
//           }).catch(err=>{        
//             console.log(err);
//                 res.json({token: res.locals.token, datos: globales.mensajes(14, "prueba", funcionesGlobales.manejarError(err)).instance});        
//           });
//         }else{
//           res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nuevoNombre , " ").instance}); 
//          }
//       }else{
//           res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ").instance});
//       }
//     }).catch(err=>{
//       res.json({token: res.locals.token, datos: globales.mensajes(14, "Prueba", req.body.nuevoNombre).instance});
//     });
// };

// exports.listarPruebas = async function(req, res){
//   Deporte.findOne()
//   .where({_id: req.params.idDeporte})
//   .exec()
//   .then(deporte=>{ 
//     if(deporte){     
//       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.pruebas.sort(funcionesGlobales.ordenarPorNombre)).instance});
//     }else{
//       res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ").instance});
//     }
//   }).catch(err=>{
//     res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
//   });
// };

//#endregion UsuarioAdm

//#region Usuariopúblico
// exports.listarPruebasActivas = async function(req, res){
//   Deporte.findOne()
//   .where({_id: req.params.idDeporte})
//   .exec()
//   .then(deporte=>{
//     if(deporte){
//       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.pruebas.filter(p=>p.activo).sort(funcionesGlobales.ordenarPorNombre)).instance});
//     }else{
//       res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ").instance});
//     }
//   }).catch(err=>{
//     res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
//   });
// };
//#endregion Usuariopúblico
//#endregion Pruebas
