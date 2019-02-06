'use strict';

//#region Requires
var mongoose = require('mongoose');
var Evento = mongoose.model('Evento');
var AtletaC = mongoose.model('AtletaCompetidor');
var globales =  require("../Globales.js");
var funcionesGlobales = require("../FuncionesGlobales.js");
const rutaImagenesEventos = globales.rutaImagenesEventos.instance;
//#endregion Requires

//#region Eventos

//#region UsuarioAdm
exports.crearEvento = async function (req, res) {
    var nuevoEvento = new Evento(req.body);
    nuevoEvento.fotoUrl = req.body.fotoUrl ? funcionesGlobales.guardarImagen(rutaImagenesEventos, req.body.fotoUrl , nuevoEvento._id) : undefined
    nuevoEvento.save().then(evento => {
        res.json({token: res.locals.token, datos: globales.mensajes(-4, "Evento", req.body.nombre).instance});
    }).catch(err => {
        funcionesGlobales.borrarArchivo(nuevoEvento.fotoUrl);                   
        if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta             
            res.json({token: res.locals.token, datos: globales.mensajes(10, "Evento.", funcionesGlobales.manejarError(err)).instance});
        }else{//Error llave duplicada
           res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre evento", " ").instance});
        }
    });
}

exports.modificarEvento = async function(req, res){
    Evento.findByIdAndUpdate({_id: req.params.idEvento},
        {
           $set: {
            "nombre": req.body.nombre, 
            "fotoUrl" : req.body.fotoUrl  ? funcionesGlobales.guardarImagen(rutaImagenesEventos, req.body.fotoUrl , req.params.idEvento) : undefined,
            "fechaInicio": req.body.fechaInicio,
            "fechaFinal": req.body.fechaFinal,
            "ciudad": req.body.ciudad,
            "pais": req.body.pais,
            "activo": req.body.activo
           } 
        }, {projection:{}, new: false, runValidators: true}
        )
    .exec()
    .then(eventoAntiguo=>{
        if(eventoAntiguo){
        if((!req.body.fotoUrl || req.body.fotoUrl === "") && eventoAntiguo.fotoUrl != null){
            funcionesGlobales.borrarArchivo(eventoAntiguo.fotoUrl);
          } 
          res.json({token: res.locals.token, datos: globales.mensajes(-3, "Evento ", req.body.nombre).instance});
        }else{
          res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento ", " ").instance});
        }
    })
    .catch(err=>{
        if(err.code || err.code == 11000){ //Llave duplicada  
          res.json({token: res.locals.token, datos: globales.mensajes(15, "Nombre evento ", " ").instance});
        }else{ 
          res.json({token: res.locals.token, datos: globales.mensajes(14, "evento", funcionesGlobales.manejarError(err)).instance});        
        };
      }) 

}

exports.leerEvento = async function(req, res){
    Evento.findOne()
    .where({_id: req.params.idEvento})
    .exec()
    .then(async evento => {
        if(evento){
            evento.fotoUrl = await funcionesGlobales.leerArchivoAsync(evento.fotoUrl);
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, evento.todaInformacion()).instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.idEvento).instance});
        }
      }).catch((err)=>{
          res.json({token: res.locals.token, datos: globales.mensajes(13, "evento", req.params.idEvento).instance});
    })
}

exports.listarTodosEventos = async function(req, res){
    Evento.find()
     .sort({fechaInicio : 1, fechaFinal: 1})
     .exec()
     .then(async (eventos) => {
        await funcionesGlobales.asyncForEach(eventos ,async (element, indice, eventos) => {
            eventos[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);                      
          });
          if(eventos.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos.map(e => e.todaInformacion())).instance});  
          }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ").instance});
          }
     }).catch((err)=>{
         console.log(err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos" , " ").instance});  
    });
}
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.listarEventosActivos = async function(req, res){
    Evento.find()
    .where({activo: true })
    .sort({fechaInicio : 1, fechaFinal: 1})     
    .exec()
    .then(async (eventos) => {
        await funcionesGlobales.asyncForEach(eventos ,async (element, indice, eventos) => {
            eventos[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);                      
          });
          if(eventos.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos.map(e => e.todaInformacion())).instance});  
          }else{
            res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ").instance});
          }
     }).catch((err)=>{
        res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos" , "").instance});  
    });
}


exports.leerEventoActivo = async function(req, res){
    Evento.findOne()
    .where({_id: req.params.idEvento, activo: true})
    .exec()
    .then(async evento => {
        if(evento){
            evento.fotoUrl = await funcionesGlobales.leerArchivoAsync(evento.fotoUrl);
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, evento.infoPublica()).instance});
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.idEvento).instance});
        }
      }).catch((err)=>{
          res.json({token: res.locals.token, datos: globales.mensajes(13, "evento", req.params.idEvento).instance});
    })
}

exports.listarEventosActivosAtleta = async function(req, res){
AtletaC.aggregate([
   {
       $match: { 
           atleta: mongoose.Types.ObjectId(req.params.idAtleta),
       }
    },
     {  $lookup: {
            "localField": "competencia",
            "from": "competenciaatletas",
            "foreignField": "_id",
            "as":  "competencias"
       }
    },
    {
        $group: {
           _id: "$competencias.evento",
       }       
    },
    {
        $lookup:{
            "localField": "_id",
            "from": "eventos",
            "foreignField": "_id",
            "as": "eventos"
        }
    },
    {
        $project: {
            _id: 0,
            eventos: {
                _id: 1,
                nombre: 1,                
            }            
        }
    }
    
]).exec().then(eventos=> {
    if(eventos.length > 0){                                               
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, eventos).instance});  
 }else{
        res.json({token: res.locals.token, datos: globales.mensajes(11, "eventos", " ").instance});
 }
}).catch(err => {
res.json({token: res.locals.token,datos: globales.mensajes(12, "los eventos del atleta", " ").instance});  
});
}



//#endregion Usuariopúblico

//#endregion Eventos