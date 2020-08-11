'use strict';

//#region Requires
var mongoose = require('mongoose'),
Equipo = mongoose.model('Equipo'),
Atleta = mongoose.model('Atleta'),
Deporte = mongoose.model('Deporte'),
Prueba = mongoose.model('Prueba'),
Evento = mongoose.model('Evento'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
equipoService = require("../services/EquipoService");
const rutaImagenesAtletas = globales.rutaImagenesAtletas.instance;
//#endregion Requires



//#region UsuarioAdm
exports.crearEquipo = async function(req, res){
    Deporte.findOne()
    .where({_id: req.body.deporte})
    .exec()
    .then(deporte =>{
      if(deporte){
          Evento.findOne()
          .where({_id: req.body.evento})
          .exec()
           .then(evento=>{
               if(evento){
                var nuevoEquipo = new Equipo(req.body);   
                nuevoEquipo.save().then(equipo =>{ 
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, equipo._id)});
                  }).catch(async err=>{  
                    if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta                            
                        funcionesGlobales.registrarError("crearEquipo/EquipoController", err)
                        res.json({token: res.locals.token, datos: globales.mensajes(10, "Equipo", funcionesGlobales.manejarError(err))});
                    }else{//Error llave duplicada 
                        await funcionesGlobales.restarContador('equipo');
                        res.json({token: res.locals.token, datos: globales.mensajes(15, "Equipo", " ")});
                    }  
                  })     
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "el evento ingresado", " ")}); 
            }
           }).catch(err=>{
                res.json({token: res.locals.token, datos: globales.mensajes(10, "Equipo", funcionesGlobales.manejarError(err))});
                funcionesGlobales.registrarError("crearEquipo/EquipoController", err)
                });
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(18, "el deporte ingresado", " ")}); 
        }    
    }).catch(err=> { 
        res.json({token: res.locals.token, datos: globales.mensajes(10, "Equipo", funcionesGlobales.manejarError(err))});
        funcionesGlobales.registrarError("crearEquipo/EquipoController", err)
         });                   
};

exports.modificarEquipo = async function(req, res){
    Deporte.findOne()
    .where({_id: req.body.deporte})
    .exec()
    .then(deporte =>{
      if(deporte){
          Evento.findOne()
          .where({_id: req.body.evento})
          .exec()
           .then(evento=>{
               if(evento){
                Equipo.findOneAndUpdate({_id: req.params.idEquipo},{
                    $set:{
                        nombre: req.body.nombre,
                        deporte: req.body.deporte,
                        pais: req.body.pais,
                        evento: req.body.evento,
                        activo: req.body.activo,
                        retirado: req.body.retirado,
                    }
                }, {projection:{}, new: true, runValidators: true}).exec()   
                .then(equipo =>{ 
                    if(equipo){
                        res.json({token: res.locals.token, datos: globales.mensajes(-3, equipo._id)});
                    }else{
                        res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
                        }
                  }).catch(async err=>{  
                    res.json({token: res.locals.token, datos: globales.mensajes(14, "Equipo", funcionesGlobales.manejarError(err))});
                    funcionesGlobales.registrarError("modificarEquipo/EquipoController", err)
                  })     
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "el evento ingresado", " ")}); 
            }
           }).catch(err=>{
                res.json({token: res.locals.token, datos: globales.mensajes(10, "Equipo", funcionesGlobales.manejarError(err))});
                funcionesGlobales.registrarError("modificarEquipo/EquipoController", err)
                });
     }else{
            res.json({token: res.locals.token, datos: globales.mensajes(18, "el deporte ingresado", " ")}); 
        }    
    }).catch(err=> { 
        res.json({token: res.locals.token, datos: globales.mensajes(10, "Equipo", funcionesGlobales.manejarError(err))});
        funcionesGlobales.registrarError("modificarEquipo/EquipoController", err)
         });                   
};

exports.listarEquipos = async function(req, res){
    Equipo.find()
    .where({evento: req.params.idEvento})
    .populate([{path: "atletas", select: "_id nombre"},
                {path: "deporte"}])
    .sort({pais: 1})
    .exec()
    .then(async (equipos)=>{    
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipos.map(a=> a.infoPublica()))});          
    }).catch((err)=>{
        funcionesGlobales.registrarError("listarEquipos/EquipoController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, " ", "los equipos")}); 
   });
}

exports.leerEquipo = async function(req, res){
    Equipo.findOne()
    .where({_id: req.params.id})
    .exec()
    .then(async (equipo)=>{
        if(equipo){
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipo.infoPublica())});  
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "equipos", " ")});
        }
    }).catch((err)=>{
          funcionesGlobales.registrarError("leerEquipo/EquipoController", err)
          res.json({token: res.locals.token,datos: globales.mensajes(13, "equipo", req.params.id)}); 
   });
}

exports.modificarMedalla = async function(req, res){
    var modificar = req.params.agregar == 1 ? {$push:{ medallas: req.body}} : {$pull:{ medallas: {_id: req.body.idMedalla} } };
    Prueba.findOne()
    .where({_id: req.body.prueba})
    .exec()
    .then(deporte=>{
    if(deporte){
        Evento.findOne()
        .where({_id: req.body.evento})
        .exec()
        .then(evento=>{
            if(evento){
                Equipo.findOneAndUpdate({_id: req.params.idEquipo}, modificar, {new: true}).exec()
                .then(equipo=>{
                    if(equipo){
                        res.json({token: res.locals.token, datos: globales.mensajes(-3, "Equipo", equipo._id)});
                    }else{
                        res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
                        }
                }).catch(err=>{
                    funcionesGlobales.registrarError("modificarMedalla/EquipoController", err)
                    res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo", funcionesGlobales.manejarError(err))});                              
                  })
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(2, "Evento", req.params.evento)});
            }
        }).catch(err =>{
                funcionesGlobales.registrarError("modificarMedalla/EquipoController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))});        
        })
    }else{
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Deporte", req.params.deporte)});
    }
    }).catch(err=>{
        funcionesGlobales.registrarError("modificarMedalla/EquipoController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))});        
    });
};

exports.modificarAtletas = async function(req, res){
    var modificar = req.params.agregar == 1 ? {$push:{ atletas: req.body.atleta}} : {$pull:{ atletas: req.body.atleta } };
    Atleta.findOne()
    .where({_id: req.body.atleta})
    .exec()
    .then(atleta=>{
        if(atleta){
            Equipo.findOneAndUpdate({_id: req.params.idEquipo}, modificar, {new: true}).exec()
            .then(equipo=>{
                if(equipo){
                    res.json({token: res.locals.token, datos: globales.mensajes(-3, "Equipo", equipo)});
                    }else{
                        res.json({token: res.locals.token, datos: globales.mensajes(2, "Equipo", " ")});
                        }
            }).catch(err=>{
                funcionesGlobales.registrarError("modificarAtleta/EquipoController", err)
                res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo", funcionesGlobales.manejarError(err))});
                    })
    
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Atleta", req.body.atleta)});
        }
    }).catch(err=>{
        funcionesGlobales.registrarError("modificarAtleta/EquipoController", err)
        res.json({token: res.locals.token, datos: globales.mensajes(14, "equipo.", funcionesGlobales.manejarError(err))});        
    });
};
//#endregion UsuarioAdm

//#region Usuariopúblico
exports.listarEquiposActivos = async function(req, res){
    Equipo.find()
    .where({evento: req.params.idEvento, activo: true})  
    .populate([{path: "atletas", select: "_id nombre"},
                {path: "deporte"}])
    .sort({pais:  1})
    .exec()
    .then(async (equipos)=>{
        equipos = await equipoService.iterarEquipos(req.header('tokenDispositivo'), equipos)
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipos)});  
    }).catch((err)=>{        
        funcionesGlobales.registrarError("listarEquipos/EquipoController", err)
        res.json({token: res.locals.token,datos: globales.mensajes(12, " ", "los equipos")}); 
   });
}

exports.leerEquipoActivo = async function(req, res){
    Equipo.findOne()
    .where({_id: req.params.id, activo: true})
    .exec()
    .then(async (equipo)=>{
        if(equipo){
            var tieneAlerta =
            await equipoService.tieneNotificacion(req.header('tokenDispositivo'), equipo._id)
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipo.infoPublica(tieneAlerta))});  
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "equipo", " ")});
        }
    }).catch((err)=>{
          funcionesGlobales.registrarError("leerEquipo/EquipoController", err)
          res.json({token: res.locals.token,datos: globales.mensajes(13, "equipo", req.params.id)}); 
   });
}

exports.registrarDispositivoEquipo = async function(req, res){
    equipoService.registrarDispositivoEquipo(req, res);
}

exports.removerDispositivoEquipo = async function(req, res){
    equipoService.removerDispositivoEquipo(req, res)
}


//#endregion  Usuariopúblico