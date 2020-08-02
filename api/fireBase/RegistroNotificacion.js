const fireBase = require("../fireBase/FireBaseRecurso"),
globales = require("../Globales"),
funcionesGlobales = require("../FuncionesGlobales");

//----------------------------------- Atleta ------------------------------------------------
exports.registrarDispositivoEnAtleta = async function(req, res){
    fireBase.existeDispositivoAtleta(req.body)
        .then(dispositivo =>{
            if(dispositivo.length == 0){
                fireBase.registrarDispositivoAtleta(req.body)
                .then(notificacion=>{
                    res.json({token: res.locals.token, datos: globales.mensajes(-9, "Atleta")});
                }).catch(err =>{
                    funcionesGlobales.registrarError("registrarDispositivoAtleta/RegistroNotificacion", err)
                    res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "atleta")});  
                })            
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(24, "Notificación")});
            }
        }).catch(err=>{        
            funcionesGlobales.registrarError("registrarDispositivoAtleta/RegistroNotificacion", err);
            res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "atleta")});  
        });
}

exports.removerDispositivoEnAtleta = async function(req, res){
    fireBase.existeDispositivoAtleta(req.body)
        .then(dispositivo =>{
            if(dispositivo.length > 0){
                fireBase.removerDispositivoAtleta(req.body)
                .then(notificacion=>{
                    res.json({token: res.locals.token, datos: globales.mensajes(10)});
                }).catch(err =>{
                    funcionesGlobales.registrarError("removerDispositivoAtleta/RegistroNotificacion", err)
                    res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "atleta")});  
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "Notificación")});
            }
        }).catch(err=>{        
            funcionesGlobales.registrarError("removerDispositivoAtleta/RegistroNotificacion", err);
            res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "atleta")});  
        });
}


//----------------------------------- Equipo ------------------------------------------------

exports.registrarDispositivoEnEquipo = async function(req, res){
    fireBase.existeDispositivoEquipo(req.body)
    .then(dispositivo =>{
        if(dispositivo.length == 0){
            fireBase.registrarDispositivoEquipo(req.body)
            .then(notificacion=>{
                res.json({token: res.locals.token, datos: globales.mensajes(-9, "Equipo")});
            }).catch(err =>{
                funcionesGlobales.registrarError("registrarDispositivoEquipo/RegistroNotificacion", err)
                res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "equipo")});  
            })            
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(24, "Notificación")});
        }
    }).catch(err=>{        
        funcionesGlobales.registrarError("registrarDispositivoEquipo/RegistroNotificacion", err);
        res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "equipo")});  
    });
}

exports.removerDispositivoEnEquipo = async function(req, res){
    fireBase.existeDispositivoEquipo(req.body)
        .then(dispositivo =>{
            if(dispositivo.length > 0){
                fireBase.removerDispositivoEquipo(req.body)
                .then(notificacion=>{
                    res.json({token: res.locals.token, datos: globales.mensajes(10)});
                }).catch(err =>{
                    funcionesGlobales.registrarError("removerDispositivoEquipo/RegistroNotificacion", err)
                    res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "equipo")});  
                });
            }else{
                res.json({token: res.locals.token, datos: globales.mensajes(18, "Notificación")});
            }
        }).catch(err=>{        
            funcionesGlobales.registrarError("removerDispositivoEquipo/RegistroNotificacion", err);
            res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "equipo")});  
        });
}

//----------------------------------- Competencia ------------------------------------------------
exports.registrarDispositivoEnCompetencia = async function(req, res){
    fireBase.existeDispositivoCompetencia(req.body)
    .then(dispositivo =>{
        if(dispositivo.length == 0){
            fireBase.registrarDispositivoCompetencia(req.body)
            .then(notificacion=>{
                res.json({token: res.locals.token, datos: globales.mensajes(-9, "Competencia")});
            }).catch(err =>{
                funcionesGlobales.registrarError("registrarDispositivoEnCompetencia/RegistroNotificacion", err)
                res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "competencia")});  
            })            
        }else{
            res.json({token: res.locals.token, datos: globales.mensajes(24, "Notificación")});
        }
    }).catch(err=>{        
        funcionesGlobales.registrarError("registrarDispositivoEnCompetencia/RegistroNotificacion", err);
        res.json({token: res.locals.token,datos: globales.mensajes(23, "creando", "competencia")});  
    });
}

exports.removerDispositivoEnCompetencia = async function(req, res){
fireBase.existeDispositivoCompetencia(req.body)
.then(dispositivo =>{
    if(dispositivo.length > 0){
        fireBase.removerDispositivoCompetencia(req.body)
        .then(notificacion=>{
            res.json({token: res.locals.token, datos: globales.mensajes(10)});
        }).catch(err =>{
            funcionesGlobales.registrarError("removerDispositivoCompetencia/RegistroNotificacion", err)
            res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "competencia")});  
        });
    }else{
        res.json({token: res.locals.token, datos: globales.mensajes(18, "Notificación")});
    }
}).catch(err=>{        
    funcionesGlobales.registrarError("removerDispositivoCompetencia/RegistroNotificacion", err);
    res.json({token: res.locals.token,datos: globales.mensajes(23, "borrando", "competencia")});  
});
}
