'use strict';
//#region Requires
var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js");
//#endregion Requires

module.exports.mailSenderCrear = function(emailAdress, subject, message, res){            
    globales.emailTransporter.sendMail(
        globales.emailOptions(emailAdress, subject, message),
            (error, info) => {                        
                              if (error) {                                                 
                                Usuario.findOneAndRemove({correo: emailAdress}, (err, usuario)=> {
                                  if (err){
                                    res.json({token: res.locals.token, datos: globales.mensajes(3, "usuario", emailAdress)});                      
                                  }
                                  else{
                                    if(usuario && usuario.fotoUrl){
                                       funcionesGlobales.borrarArchivo(usuario.fotoUrl);                                               
                                    }
                                    res.json({token: res.locals.token, datos: globales.mensajes(4, "correo electrónico", emailAdress)});                                        
                                  }
                                });                                
                              }  
                              else{   
                              res.json({token: res.locals.token, datos: globales.mensajes(-4, "Usuario", emailAdress)})                                                                      
                              }
                            }
    );        
  }
  
  
 module.exports.mailSenderRecuperar = function (emailAdress, subject, message, res){            
      globales.emailTransporter.sendMail(
        globales.emailOptions(emailAdress, subject, message),
            (error, info) => {                        
                              if (error) {                                                                       
                                    res.json({datos: globales.mensajes(4, "correo electrónico", emailAdress)});                                              
                              }  
                              else{   
                              res.json({datos: globales.mensajes(-5, "Correo electrónico", emailAdress) }) 
                              }
                            }
    );        
  }