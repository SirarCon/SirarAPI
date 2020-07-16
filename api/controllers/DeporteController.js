'use strict';

//#region Requires
var mongoose = require('mongoose'),
Deporte = mongoose.model('Deporte'),
Federacion = mongoose.model('Federacion'),
Prueba = mongoose.model('Prueba'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");
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
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Federación", req.body.nombre)});
      }).catch(async err=>{  
              funcionesGlobales.borrarArchivo(nuevaFederacion.escudoUrl);                   
              if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta               
                funcionesGlobales.registrarError("crearFederacion/DeporteController", err)  
                res.json({token: res.locals.token, datos: globales.mensajes(10, "Federacion", funcionesGlobales.manejarError(err))});
              }else{//Error llave duplicada
                await funcionesGlobales.restarContador("federacion");
                res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ")});
              }               
      });              
  }).catch(err=> {
    funcionesGlobales.registrarError("crearFederacion/DeporteController", err)  
    res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e)})
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
        res.json({token: res.locals.token, datos: globales.mensajes(-3, "Federación", req.body.nombre)});
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ")});
      }
  }).catch(err=>{
    if(err.code || err.code == 11000){ //Llave duplicada  
      res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ")});
    }else{ 
      funcionesGlobales.registrarError("modificarFederacion/DeporteController", err)  
      res.json({token: res.locals.token, datos: globales.mensajes(14, "federacion", funcionesGlobales.manejarError(err))});        
    }
  });
}).catch(err=> {
      funcionesGlobales.registrarError("modificarFederacion/DeporteController", err)  
      res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", "(s)")})
 });
};

exports.leerFederacion = async function(req, res) {  
  Federacion.findOne()
  .where({_id: req.params.idFederacion})
  .exec()
  .then(async (federacion) => {
    if(federacion){      
      federacion.escudoUrl = await funcionesGlobales.leerArchivoAsync(federacion.escudoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federacion.todaInformacion())});
    }else{   
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ")});
    }
}).catch((err)=>{
    funcionesGlobales.registrarError("leerFederacion/DeporteController", err)  
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", " ")});
  }) 
};

exports.listaTodasFederaciones =  async function(_, res) {
  Federacion.find()
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (federaciones)=>{
      await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
        federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);                      
      });
      if(federaciones.length > 0){
          res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federaciones.map(f => f.todaInformacion()))});  
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(-8, "federaciones", " ")});
      }
  }).catch((err)=>{
      funcionesGlobales.registrarError("listaTodasFederaciones/DeporteController", err)  
      res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones" , "")});  
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
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federacion.infoPublica())});
    }else {   
       res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ")});
    }
  }).catch((err)=>{  
    funcionesGlobales.registrarError("leerFederacionActiva/DeporteController", err)  
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", " ")});
  }) 
};

exports.listaFederacionesActivas =  async function(_, res) {//Menos el que consulta en el correo     
  Federacion.find()
  .where({activo: true })
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (federaciones)=>{
      await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
        federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);        
      });      
      if(federaciones.length > 0){
          res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federaciones.map(f => f.infoPublica()))});  
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(-8, "federaciones", " ")});
      }
  }).catch((err)=>{
    funcionesGlobales.registrarError("listaFederacionesActivas/DeporteController", err)  
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones", " ")});  
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
          res.json({token: res.locals.token, datos: globales.mensajes(-4, "Deporte ", req.body.nombre)});
      }).catch(async err=>{ 
                funcionesGlobales.borrarArchivo(nuevoDeporte.imagenDeporteUrl); 
                if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta       
                  funcionesGlobales.registrarError("crearDeporte/DeporteController", err)                          
                  res.json({token: res.locals.token, datos: globales.mensajes(10, "Deporte ", funcionesGlobales.manejarError(err))});
                }else{//Error llave duplicada
                  await funcionesGlobales.restarContador('deporte'); 
                  res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre deporte ", " ")});
                }
      });      
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(18, "la federación ingresada"," ")}); 
    }    
  }).catch(err=> {
    funcionesGlobales.registrarError("crearDeporte/DeporteController", err)  
    res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e)})
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
              res.json({token: res.locals.token, datos: globales.mensajes(-3, "Deporte ", req.body.nombre)});
            }else{
              res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ")});
            }
          }).catch(err=>{
            if(err.code || err.code == 11000){ //Llave duplicada  
              res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre deporte ", " ")});
            }else{ 
              funcionesGlobales.registrarError("modificarDeporte/DeporteController", err)  
              res.json({token: res.locals.token, datos: globales.mensajes(14, "deporte", funcionesGlobales.manejarError(err))});        
            };
          });
        }else{
             res.json({token: res.locals.token, datos: globales.mensajes(18, "la federación ingresada", " ")}); 
        }    
  }).catch(err=>{ 
        funcionesGlobales.registrarError("modificarDeporte/DeporteController", err)  
        res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e)})
}); //Todo modificar mensaje
};

exports.listarDeportes = async function(_, res){
  Deporte.find()
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {  
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {     
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);     
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.todaInformacion()))})
  }).catch((err)=>{   
      funcionesGlobales.registrarError("listarDeportes/DeporteController", err)          
      res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes ", " ")});  
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
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.todaInformacion()))})
  }).catch((err)=>{    
      funcionesGlobales.registrarError("listarDeportesXFederacion/DeporteController", err)                   
      res.json({token: res.locals.token,datos: globales.mensajes(12, "los deportes ", " ")});  
    });
};

exports.leerDeporte = async function(req, res){
    Deporte.findOne()
    .where({_id: req.params.idDeporte})
    .exec()
    .then(async (deporte) => {
      if(deporte){        
        deporte.imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(deporte.imagenDeporteUrl);
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.todaInformacion())});
      }else {   
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ")});
      }
    }).catch((err)=>{
          funcionesGlobales.registrarError("leerDeporte/DeporteController", err)                   
          res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte ", " ")});
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
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deporte.infoPublica()) })
    }else{   
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ")});
    }
}).catch((err)=>{
      funcionesGlobales.registrarError("leerDeporteActiva/DeporteController", err)                   
      res.json({token: res.locals.token, datos: globales.mensajes(13, "deporte", " ")});
  })
};

exports.listarDeportesActivas = async function(_, res){
  Deporte.find()
  .where({activo: true })
  .sort({nombreNormalizado : 1})
  .exec()
  .then(async (deportes) => {
    await funcionesGlobales.asyncForEach(deportes ,async (element, indice, deportes) => {
      deportes[indice].imagenDeporteUrl = await funcionesGlobales.leerArchivoAsync(element.imagenDeporteUrl);          
    });
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.infoPublica())) })
  }).catch((err)=>{
        funcionesGlobales.registrarError("listarDeportesActivas/DeporteController", err)                   
        res.json({token: res.locals.token, datos: globales.mensajes(13, "deportes", " ")});
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
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, deportes.map(d => d.infoPublica())) })
  }).catch((err)=>{
      funcionesGlobales.registrarError("listarDeportesActivasXFederacion/DeporteController", err)                   
      res.json({token: res.locals.token, datos: globales.mensajes(13, "deportes", " ")});
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
          res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nombre, " ")}); 
        }else{
          var nuevaPrueba = new Prueba(req.body);
          nuevaPrueba.deporte = req.params.idDeporte;
          nuevaPrueba.save().then(prueba=>{
            res.json({token: res.locals.token, datos: globales.mensajes(-4, "Prueba", req.body.nombre)});
          }).catch(async err => {
            if(!err.code || !err.code == 11000){//Si no es por llave duplicada
              funcionesGlobales.registrarError("insertarPrueba/DeporteController", err)  
              res.json({token: res.locals.token, datos: globales.mensajes(14, "prueba", funcionesGlobales.manejarError(err))});        
            }else{//Error llave duplicada  
              await funcionesGlobales.restarContador('prueba'); 
              res.json({token: res.locals.token, datos: globales.mensajes(15, "prueba", " ")});
            };
          });          
        }
      }).catch(err=>{
        funcionesGlobales.registrarError("insertarPrueba/DeporteController", err)  
        res.json({token: res.locals.token, datos: globales.mensajes(13, "pruebas", " ")});
       });
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ")});
      }
    }).catch(err =>{
        funcionesGlobales.registrarError("insertarPrueba/DeporteController", err)  
        res.json({token: res.locals.token, datos: globales.mensajes(10, "Prueba", funcionesGlobales.manejarError(err))});
      })
}

exports.modificarPrueba = function(req, res){
    Deporte.findOne()//Existe el deporte?
    .where({_id: req.params.idDeporte})
    .exec()
    .then(deporte=>{ 
      if(deporte){    
        Prueba.findOne()//Existe una prueba de ese deporte con el mismo nombre?
        .where({ deporte: req.params.idDeporte, nombre: req.body.nombre, _id: {$ne: req.params.idPrueba}})
        .exec()
        .then(prueba => {
          if(prueba){
            res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre de prueba " + req.body.nombre , " ")}); 
          }else{// No existen pruebas con el mismo nombre
            Prueba.findOneAndUpdate({_id: req.params.idPrueba, deporte: req.params.idDeporte},
            { $set: {
              nombre: req.body.nombre, 
              tipo: req.body.tipo,                       
              activo: req.body.activo        
            }}, {projection:{}, new: false, runValidators: true})
            .exec()
            .then(prueba=>{
              if(prueba){
                res.json({token: res.locals.token, datos: globales.mensajes(-3, "Prueba ", req.body.nombre)});
              }else{
                  res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte o prueba", "especificada")});
              }
            }).catch(err=>{      
              funcionesGlobales.registrarError("modificarPrueba/DeporteController", err)  
              res.json({token: res.locals.token,datos: globales.mensajes(12, "la prueba", " ")});
            })
          }
        }).catch(err=> {
          console.log(err);
          funcionesGlobales.registrarError("modificarPrueba/DeporteController", err)  
          res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ")});
        }); 
      }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ")});
      }}).catch(err=>{
        funcionesGlobales.registrarError("modificarPrueba/DeporteController", err)  
        res.json({token: res.locals.token,datos: globales.mensajes(12, "el deporte", " ")});
      }) 
    };     
      

exports.listarPruebas = async function(req, res){
  Prueba.find()
  .where({deporte: req.params.idDeporte})
  .sort({nombreNormalizado : 1})
  .exec()
  .then(pruebas=>{ 
    if(pruebas){     
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, pruebas.map(d => d.todaInformacion()))});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte ", " ")});
    }
  }).catch(err=>{
    funcionesGlobales.registrarError("listarPruebas/DeporteController", err)  
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ")});  
  });
};

//#endregion UsuarioAdm
     
//#region Usuariopúblico
exports.listarPruebasActivas = async function(req, res){
  Prueba.find()
  .where({activo: true, deporte: req.params.idDeporte})
  .sort({nombreNormalizado : 1})
  .exec()
  .then(pruebas=>{
    if(pruebas){
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, pruebas.map(p=>p.infoPublica()))});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", " ")});
    }
  }).catch(err=>{
    funcionesGlobales.registrarError("listarPruebasActivas/DeporteController", err)  
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ")});  
  });
};

exports.listarDeporteXPruebasActivas = async function(req, res){
  Prueba.findOne()
  .where({_id: req.params.idPrueba})
  .exec()
  .then(async (prueba)=>{
    if(prueba){
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, prueba.todaInformacion())});
    }else{
      res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", " ")});
    }
  }).catch(err=>{
    funcionesGlobales.registrarError("listarDeporteXPruebasActivas/DeporteController", err)  
    res.json({token: res.locals.token,datos: globales.mensajes(12, "la prueba", " ")});  
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
