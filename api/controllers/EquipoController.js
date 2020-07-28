'use strict';

//#region Requires
var mongoose = require('mongoose'),
Equipo = mongoose.model('Equipo'),
Atleta = mongoose.model('Atleta'),
Prueba = mongoose.model('Prueba'),
Evento = mongoose.model('Evento'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
fireBase = require("../fireBase/FireBaseRecurso");
const rutaImagenesAtletas = globales.rutaImagenesAtletas.instance;
//#endregion Requires



//#region UsuarioAdm
exports.crearEquipo = async function(req, res){
    Prueba.findOne()
    .where({_id: req.body.prueba})
    .exec()
    .then(prueba =>{
      if(prueba){
          Evento.findOne()
          .where({_id: req.body.evento})
          .exec()
           .then(evento=>{
               if(evento){
                var nuevoEquipo = new Equipo(req.body);   
                nuevoEquipo.save().then(equipo =>{ 
                    res.json({token: res.locals.token, datos: globales.mensajes(-4, "Equipo", req.body.pais )});
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
    Prueba.findOne()
    .where({_id: req.body.prueba})
    .exec()
    .then(prueba =>{
      if(prueba){
          Evento.findOne()
          .where({_id: req.body.evento})
          .exec()
           .then(evento=>{
               if(evento){
                Equipo.findOneAndUpdate({_id: req.params.idEquipo},{
                    $set:{
                        prueba: req.body.prueba,
                        pais: req.body.pais,
                        evento: req.body.evento,
                        activo: req.body.activo,
                        retirado: req.body.retirado,
                    }
                }, {projection:{}, new: false, runValidators: true}).exec()   
                .then(equipoAntiguo =>{ 
                    if(equipoAntiguo){
                        res.json({token: res.locals.token, datos: globales.mensajes(-3, "Equipo", req.body.pais )});
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
    .populate([{path: "pais", select: "name"}])
    .sort({pais: 1})
    .exec()
    .then(async (equipos)=>{    
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipos.map(a=> a.todaInformacion()))});          
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
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipo.todaInformacion())});  
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
    .then(prueba=>{
    if(prueba){
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
        res.json({token: res.locals.token, datos: globales.mensajes(2, "Prueba", req.params.prueba)});
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
                    res.json({token: res.locals.token, datos: globales.mensajes(-3, "Equipo", equipo._id)});
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
    .populate([{path: "pais", select: "name"}])
    .populate({path: "atletas", select: "_id nombre"})
    .sort({pais:  1})
    .exec()
    .then(async (equipos)=>{
        res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipos.map(a=> a.todaInformacion()))});  
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
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, equipo.todaInformacion())});  
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "equipos", " ")});
        }
    }).catch((err)=>{
          funcionesGlobales.registrarError("leerEquipo/EquipoController", err)
          res.json({token: res.locals.token,datos: globales.mensajes(13, "equipo", req.params.id)}); 
   });
}

exports.registrarDispositivoEquipo = async function(req, res){
    fireBase.existeDispositivoEquipo(req.body)
    .then(dispositivo =>{
        if(dispositivo.length == 0){
            fireBase.registrarDispositivoEquipo(req.body)
            .then(notificacion=>{
                res.json({token: res.locals.token, datos: globales.mensajes(-9, "Equipo")});
            }).catch(err =>{
                funcionesGlobales.registrarError("registrarDispositivoEquipo/EquipoController", err)
                res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "equipo")});  
            })            
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(24, "Notificación")});
        }
    }).catch(err=>{        
        funcionesGlobales.registrarError("registrarDispositivoEquipo/EquipoController", err);
        res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "equipo")});  
    });
}

exports.removerDispositivoEquipo = async function(req, res){
    fireBase.existeDispositivoEquipo(req.body)
    .then(dispositivo =>{
        if(dispositivo.length > 0){
            fireBase.removerDispositivoEquipo(req.body)
            .then(notificacion=>{
                res.json({token: res.locals.token, datos: globales.mensajes(10)});
            }).catch(err =>{
                funcionesGlobales.registrarError("removerDispositivoEquipo/EquipoController", err)
                res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "equipo")});  
            });
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(18, "Notificación")});
        }
    }).catch(err=>{        
        funcionesGlobales.registrarError("removerDispositivoEquipo/EquipoController", err);
        res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "equipo")});  
    });
}


//#endregion  Usuariopúblico