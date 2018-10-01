'use strict';

//#region Requires
var mongoose = require('mongoose');
var Disciplina = mongoose.model('Disciplina');
var Federacion = mongoose.model('Federacion');
var globales =  require("../Globales.js");
var funcionesGlobales = require("../FuncionesGlobales.js");
const rutaImagenesDisciplinas = globales.rutaImagenesDisciplinas.instance;
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
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Federación", req.body.nombre ).instance});}
        ).catch(err=>{         
            if (err){   
              if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta
                funcionesGlobales.borrarArchivo(nuevaFederacion.escudoUrl); 
                  res.json({token: res.locals.token, datos: globales.mensajes(10, "Federacion", req.body.nombre).instance});
              }else{//Error llave duplicada
                 res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ").instance});
              }   
            }
      });              
  }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance}));
};

exports.modificarFederacion = async function(req, res){
  funcionesGlobales.validarEmails([req.body.correoPresidente, req.body.correoFederacion])
  .then(function(values) {
  Federacion.findOneAndUpdate({_id: req.params.id},
    {$set: {
      nombre: req.body.nombre,
      escudoUrl:  req.body.escudoUrl ? funcionesGlobales.guardarImagen(rutaImagenesFederaciones, req.body.escudoUrl , req.params.id) : undefined,
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
      }
      else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", " ").instance});
      }
  }).catch(err=>{
    if(err.code || err.code == 11000){ //Llave duplicada  
      res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre federación", " ").instance});
    }else{ 
      res.json({token: res.locals.token, datos: globales.mensajes(14, "federacion", " ").instance});        
    }
  });
}).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance}));
}


exports.leerFederacion = async function(req, res) {  
  Federacion.findOne()
  .where({_id: req.params.id})
  .exec()
  .then(async (federacion) => {
    if(federacion){      
      federacion.escudoUrl = await funcionesGlobales.leerArchivoAsync(federacion.escudoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,federacion.datosFederacion()).instance});
    }
    else {   
    res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", req.params.nombre).instance});
  }
}).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", req.params.nombre).instance});
  }) 
};


exports.listaTodasFederaciones =  async function(req, res) {//Menos el que consulta en el correo   
  try{  
  Federacion.find()
         .sort({nombreNormalizado : 1})
         .exec()
         .then(async (federaciones)=>{
          await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
            federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);            
          });
          if(federaciones.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,federaciones.map(f => f.datosFederacion())).instance});  
          }  
          else
            res.json({token: res.locals.token, datos: globales.mensajes(11).instance});
        })
          .catch((err)=>{
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones" , "").instance});  
}) 
}catch(e){
    console.log(e);
  }
};

//#endregion UsuarioAdm

//#region Usuariopúblico
exports.leerFederacionActiva = async function(req, res) {  
  Federacion.findOne()
  .where({_id: req.params.id, activo: true})
  .exec()
  .then(async (federacion) => {
    if(federacion){      
      federacion.escudoUrl = await funcionesGlobales.leerArchivoAsync(federacion.escudoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, federacion.consultaFederacion()).instance});
    }
    else {   
    res.json({token: res.locals.token, datos: globales.mensajes(2, "Federación", req.params.nombre).instance});
  }
}).catch((err)=>{  
    res.json({token: res.locals.token, datos: globales.mensajes(13, "federacion", req.params.nombre).instance});
  }) 
};



exports.listaFederacionesActivas =  async function(req, res) {//Menos el que consulta en el correo   
  try{  
  Federacion.find()
         .sort({nombreNormalizado : 1})
         .where({activo: true })
         .exec()
         .then(async (federaciones)=>{
          await funcionesGlobales.asyncForEach(federaciones ,async (element, indice, federaciones) => {
            federaciones[indice].escudoUrl = await funcionesGlobales.leerArchivoAsync(element.escudoUrl);
            
          });
          if(federaciones.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,federaciones.map(f => f.consultaFederacion())).instance});  
          }  
          else
            res.json({token: res.locals.token, datos: globales.mensajes(11).instance});
        })
          .catch((err)=>{
            console.log(err);
            res.json({token: res.locals.token,datos: globales.mensajes(12, "las federaciones", " " ).instance});  
}) 
}catch(e){
    console.log(e);
  }
};
//#endregion Usuariopúblico

//#endregion Federaciones

//#region Disciplinas

//#endregion UsuarioAdm
exports.listarDisciplinas = async function(req, res){
  Disciplina.find()
  .populate('federacion', ['nombre'])
  .exec()
  .then(async (disciplinas) => {
    res.json({disciplina: disciplinas})
  }).catch((err)=>{
      res.json({error: err });
      //res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion).instance});
    });
};
exports.crearDisciplina = async function(req, res){
  Federacion.findOne().where({_id: req.body.federacion}).exec()
  .then(function(federacion) {
    if(federacion){
    var nuevaDisciplina = new Disciplina(req.body);    
    req.body.pru.forEach(elemento => {
      nuevaDisciplina.pruebas.push({nombre: elemento, activo: true});
    });   
    nuevaDisciplina.imagenDisciplinaUrl = req.body.imagenDisciplinaUrl ? funcionesGlobales.guardarImagen(rutaImagenesDisciplinas, req.body.imagenDisciplinaUrl , nuevaDisciplina._id) : undefined,
    nuevaDisciplina.save().then(disciplina =>{
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Disciplina", req.body.nombre ).instance});
      }).catch(err=>{         
            if (err){   
              if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta
                funcionesGlobales.borrarArchivo(nuevaDisciplina.imagenDisciplinaUrl); 
                console.log(err);
                  res.json({token: res.locals.token, datos: globales.mensajes(10, "Disciplina", req.body.nombre).instance});
              }else{//Error llave duplicada
                 res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre disciplina", " ").instance});
              }   
            }
      });      
    }    
    else{
      res.json({token: res.locals.token, datos: globales.mensajes(18, "la federación ingresada"," ").instance}); //Todo modificar mensaje
    }    
  }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", e).instance})); //Todo modificar mensaje
};

exports.leerDisciplina = async function(req, res){
    Disciplina.findOne()
    .where({_id: req.params.id})
    .populate('federacion', ['nombre'])
    .exec()
    .then(async (disciplina) => {
        console.log(disciplina.federacion.nombre + " ");
res.json({disciplina: disciplina, federacion: disciplina.federacion.nombre })
  }).catch((err)=>{
      res.json({error: err });
      //res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion).instance});
    })
};
exports.modificarDisciplina = async function(req, res){

};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.leerDisciplinaActiva = async function(req, res){
  Disciplina.findOne()
  .where({_id: req.params.id, activo: true})
  .populate({path: "federacion"} )
  .exec()
  .then(async (disciplina) => {
    if(disciplina)
      console.log(disciplina.federacion.nombre + " ");
res.json({disciplina: disciplina, })
}).catch((err)=>{
  console.log(err);
    res.json({error: err });
    //res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion).instance});
  })
};

exports.listarDisciplinasActivas = async function(req, res){
  Disciplina.find()
  .where({activo: true })
  .populate('federacion', ['nombre'])
  .exec()
  .then(async (disciplinas) => {
  res.json({disciplina: disciplinas, federacion: disciplinas })
}).catch((err)=>{
    res.json({error: err });
    //res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion).instance});
  });
};

//#endregion Usuariopúblico
//#endregion Disciplinas

//#region Pruebas
//#region UsuarioAdm
exports.listarPruebas = async function(req, res){
    Disciplina.findOne()
    .where({_id: req.params.idDisciplina})
    .exec()
    .then(disciplina=>{      
      res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, disciplina.pruebas ).instance});
    })
    .catch(err=>{
      res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
    });
};

exports.insertarPrueba = async function(req, res){
  Disciplina.update({_id: req.params.idDisciplina},
      {
        $push: {
          "pruebas": {nombre: req.body.nuevoNombre,
                      activo: req.body.activo
                      }
        }
     })
     .exec()
     .then(disciplina=>{
       if(disciplina)
          res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, disciplina.pruebas ).instance});
        else
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Disciplina", " ").instance});
     }).catch(err=>{
            console.log(err);
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "Disciplina", " ").instance});//Todo Cambiar
     });
};

exports.editarPrueba = function(req, res){
  Disciplina.update({_id: req.params.idDisciplina, "pruebas._id": req.params.idPrueba}, 
    {
      $set: {
        "pruebas.$.nombre": req.body.nuevoNombre,
        "pruebas.$.activo": req.body.activo
      }
   })
   .exec()
   .then(disciplina=>{
     if(disciplina){
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, disciplina.pruebas ).instance});
     }
     else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Disciplina o prueba", "especificada").instance});
     }
   }).catch(err=>{
          if(err.kind === 'ObjectId')
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Disciplina o prueba", "especificada").instance});
          else
            res.json({token: res.locals.token, datos: globales.mensajes(14, "prueba", req.body.nuevoNombre).instance});        
   });
};

//#endregion UsuarioAdm

//#region Usuariopúblico

exports.listarPruebasActivas = async function(req, res){
  Disciplina.findOne()
  .where({_id: req.params.idDisciplina})
  .exec()
  .then(disciplina=>{
    res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, disciplina.pruebas.filter(p=>p.activo)).instance});
  })
  .catch(err=>{
    console.log(err);
    res.json({token: res.locals.token,datos: globales.mensajes(12, "las pruebas", " ").instance});  
  });
};

//#endregion Usuariopúblico

//#endregion Pruebas