'use strict';

//#region Requires
var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario');
const AwtAuth = require('jsonwebtoken');
var globales =  require("../Globales.js");
const rutaImagenesPerfil = globales.rutaImagenesPerfil.instance;
//#endregion Requires

//#region Funciones Auxiliares
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function validarEmail(email) {
  return new Promise(function(resolve, reject){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    resolve(re.test(String(email).toLowerCase()));
  })
}

// crea la promesa para fs.readFile()
function  leerArchivoAsync(filename) {
  var fs = require('fs');
  return new Promise(function(resolve, reject) {
      fs.readFile(filename, function(err, data){
          if (err){ 
              reject("");
            } 
          else{ 
              resolve("data:image/jpeg;base64," + new Buffer(data).toString('base64'));
          }
      });
  }).catch((e)=>{return "" });
};


function guardarImagenPerfil(ruta, usuario){
  const fs =require("fs");  
  
  // obtiene solo la imagen, le quita el prefijo base 64
  var datosLimpios = usuario.fotoUrl.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer.from(datosLimpios, 'base64');
  var fotoUrl = ruta + usuario.identificacion + "." + 'jpeg'  
  if (!fs.existsSync(ruta)){
    var shell = require('shelljs');
    shell.mkdir('-p', ruta);//Si no sirve probar https://www.npmjs.com/package/fs-path para crear fullpath
  } 
  fs.writeFileSync(fotoUrl, buf);  
  return fotoUrl;
}

function borrarArchivo(ruta){
  const fs =require("fs");
  if(ruta){
  fs.exists(ruta, function(exists) {    
    if (exists) {
      fs.access(ruta, error => {
        if(!error){
          fs.unlinkSync(ruta);
        }
        else console.log(error);
      })
    }     
});
  }
}

function mailSenderCrear(emailAdress, subject, message, res){            
  globales.emailTransporter.instance.sendMail(
      globales.emailOptions(emailAdress, subject, message).instance,
          (error, info) => {                        
                            if (error) {                                                 
                              Usuario.findOneAndRemove({correo: emailAdress}, (err, usuario)=> {
                                if (err){
                                  res.json({token: res.locals.token, datos: globales.mensajes(3, "usuario", emailAdress).instance});                      
                                }
                                else{
                                  if(usuario && usuario.fotoUrl){
                                      borrarArchivo(usuario.fotoUrl);                                               
                                  }
                                  res.json({token: res.locals.token, datos: globales.mensajes(4, "correo electrónico", emailAdress).instance});                                        
                                }
                              });                                
                            }  
                            else{   
                            res.json({token: res.locals.token, datos: globales.mensajes(-4, "usuario", emailAdress).instance})                                                                      
                            }
                          }
  );        
}


function mailSenderRecuperar(emailAdress, subject, message, res){            
    globales.emailTransporter.instance.sendMail(
      globales.emailOptions(emailAdress, subject, message).instance,
          (error, info) => {                        
                            if (error) {                                                                       
                                  res.json({datos: globales.mensajes(4, "correo electrónico", emailAdress).instance});                                              
                            }  
                            else{   
                            res.json({datos: globales.mensajes(-5, "correo electrónico", emailAdress).instance }) 
                            }
                          }
  );        
}
//#endregion Funciones Auxiliares


//#region Funciones de Respuesta
exports.verificarLogin = async function(req, res) {
  if(req.body.correo){  
  Usuario.findOne()
        .select({fechaCreacion : 0})
        .where({correo: req.body.correo.toLowerCase()})
        .then((usuario)=>{
          if(usuario) {
            if(usuario.password !== req.body.password)
              res.json({datos: globales.mensajes(1).instance});
            else{
              AwtAuth.sign({usuario}, 'secretKey', /*{expiresIn: "30s"},*/ async (err, token)=>{
                if(err){
                  res.json({datos: globales.mensajes(50).instance});
                  }
                else{
                  usuario.fotoUrl = await leerArchivoAsync(usuario.fotoUrl);
                  res.json({token: "token " + token, datos: globales.mensajes(-1, null, null,usuario.datosLogin()).instance});
                }
              });
  
            }
          }
          else{
            res.json({datos: globales.mensajes(2, "Usuario", req.body.correo.toLowerCase()).instance});
          }
        })
        .catch((err)=>{
          res.send(err);
        })
      }
      else{
        res.json({datos: globales.mensajes(2, "Usuario", "sin correo electrónico").instance});
      }
};

exports.solicitarRecuperacion = async function(req, res){
   var tokenPassword = globales.crearRandom(15).instance;
   Usuario.findOneAndUpdate({correo: req.body.correo.toLowerCase()},{$set: {"tokenPassword": tokenPassword}}, {runValidators: true})
          .then(usuario => {
            if(usuario){
              mailSenderRecuperar(usuario.correo.toLowerCase(),
                'Restablecer contraseña',
                '<!DOCTYPE html PUBLIC>'+
                    '<html style="background-color: white">'+
                        '<head>'+
                            '<meta http-equiv="Content-type" content="text/html; charset=utf-8" />'+
                            '<style type="text/css">'+
                                '@font-face{'+
                                  'font-family: "Raleway";'+
                                  'font-style:normal;'+
                                  'font-weight:400;'+
                                  'src:local("Raleway"), local("Raleway"), url("https://fonts.googleapis.com/css?family=Raleway") format("woff");'+
                                '}'+
                            '</style>'+
                        '</head>'+
                        '<body style="background-color: white">'+
                        '<div style="width: 100%; font-family: ' + "'Raleway'" + ', sans-serif;border: 0px solid #C91D32; border-width: 0 0 5px 0; background-color: white">'+
                                '<div style="background-color: #00478A; color: white; padding: 30px; margin: 0 auto">'+
                                '<h2 style="margin: 0px;letter-spacing: 3px">SIRAR</h2>'+
                                '<h3 style="margin-bottom: 5px;letter-spacing: 1px">Hola</h3>'+
                                '<h4 style="margin: 0px;letter-spacing: 2px">' + usuario.nombre + '</h4>'+
                                '</div>'+
                                '<div style="text-align: center; letter-spacing: 1px">'+
                                '<br>'+
                                '<p style="margin-bottom: 10px; color: black;">Este correo electrónico se generó por una solicitud para recuperar su contraseña.</p>'+
                                '<p style="margin: 10px; color: black;">Omita este mensaje en caso de que usted no haya realizado la solicitud o ya no lo requiera.</p>'+
                                '<p style="margin: 10px 0 40px 0; color: black;">Para restablecer su contraseña presione el botón</p> '+
                                '<a '+
                                'style="color: #00478A; font-size: 12px;background-color: white; '+
                                'border-radius: 5px; font-family: ' + "'Raleway'" + ', sans-serif; border: 2px solid #00478A; letter-spacing: 2px; padding: 12px 45px; text-decoration: none"'+
                                'href="https://sirartest.herokuapp.com/restablecer?' + tokenPassword +'?1"'+
                                '>RESTABLECER CONTRASEÑA</a>'+
                                '<p style="margin-top: 40px; color: black;">O copie y pegue en su navegador el siguiente enlace</p>'+
                                '<p style="color: #00478A; ">https://sirartest.herokuapp.com/restablecer?' + tokenPassword +'?1</p>'+
                                '</div>'+
                                '</div>'+
                                '</body>'+
                                    '</html>'
              , res);    
            }
            else{
              res.json({datos: globales.mensajes(2, "Usuario", req.body.correo.toLowerCase()).instance })//
          }
          })
          .catch(err=>{console.log(err); res.json({datos: globales.mensajes(5, "usuario", req.body.correo.toLowerCase()).instance })});              
}


exports.recuperarcontrasena = async function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.tokenPassword)){
      Usuario.findOneAndUpdate({tokenPassword: req.body.tokenPassword}, 
      {$set: {"tokenPassword" : null}}, {runValidators: true})
      .then(usuario => {
        if(usuario)                  
            res.json({datos: globales.mensajes(-1, null, null, usuario.datosRecuperarContrasena()).instance});            
          else{
            res.json({datos: globales.mensajes(2, "Token", "vencido:").instance});          
          }
      })
      .catch(err=>{res.json({datos: globales.mensajes(6).instance});});
    }
    else{
      res.json({datos: globales.mensajes(7).instance});    
    }
};

exports.cambiarContrasena = async function(req, res){
  if(req.body.identificacion && req.body.password && req.body.password !== ""){
var filtro= { identificacion : req.body.identificacion};

Usuario.findOne()
      .where(filtro)
      .select({password: 1})
      .exec()
      .then((usuario)=>{
        if(usuario){
            if(req.body.passwordVieja && usuario.password !== req.body.passwordVieja){
              res.json({token: res.locals.token, datos: globales.mensajes(9).instance});
            }
            else{
            Usuario.findOneAndUpdate(filtro, {$set: {password: req.body.password}}, {runValidators: true})
                   .exec()
                   .then(usuario =>{
                    if(req.body.passwordVieja){
                      res.json({token: res.locals.token, datos: globales.mensajes(-6, "usuario", req.body.identificacion).instance})
                      console.log("Si")
                    }else{
                      res.json({datos: globales.mensajes(-6, "usuario", req.body.identificacion).instance})
                      console.log("no")
                    }
                    })
                   .catch(err=>{
                    if(req.body.passwordVieja)
                    res.json({token: res.locals.token, datos: globales.mensajes(8).instance})
                 else
                    res.json({datos: globales.mensajes(8).instance});
                   });    
            }
        }
        else{
          if(req.body.passwordVieja)
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.body.identificacion).instance});
          else
            res.json({datos: globales.mensajes(2, "Usuario", req.body.identificacion).instance});
    }
  }).catch(err=>{
    if(req.body.passwordVieja)
       res.json({token: res.locals.token, datos: globales.mensajes(8).instance})
    else
       res.json({datos: globales.mensajes(8).instance});
    });
}
else{
  if(req.body.identificacion == null || req.body.identificacion === "") 
  res.json({datos: globales.mensajes(2, "Usuario", "sin identificación").instance});
  else{
    if(req.body.passwordVieja)
    res.json({token: res.locals.token, datos: globales.mensajes(17).instance});
    else
      res.json({datos: globales.mensajes(17).instance});
  }
}
}

//Necesita el checkbox application/x-www-form-urlencoded
exports.crearUsuario = async function(req, res) {  
  validarEmail(req.body.correo).then(valido=>{
    if(valido == true){ 
      var nuevoUsuario = new Usuario(req.body);
      nuevoUsuario.tokenPassword = globales.crearRandom(15).instance;
      if(req.body.fotoUrl){    
          nuevoUsuario.fotoUrl = guardarImagenPerfil(rutaImagenesPerfil, nuevoUsuario);    
      }
      nuevoUsuario.correo = nuevoUsuario.correo.toLowerCase();
      nuevoUsuario.nombreNormalizado = nuevoUsuario.nombre.toLowerCase();
      nuevoUsuario.save().then(usuario=>{
          if(usuario){
                mailSenderCrear(usuario.correo.toLowerCase(),
                    'Registro en SIRAR',
                    '<!DOCTYPE html PUBLIC>'+
                    '<html style="background-color: white">'+
                        '<head>'+
                            '<meta http-equiv="Content-type" content="text/html; charset=utf-8" />'+
                            '<style type="text/css">'+
                                '@font-face{'+
                                  'font-family: "Raleway";'+
                                  'font-style:normal;'+
                                  'font-weight:400;'+
                                  'src:local("Raleway"), local("Raleway"), url("https://fonts.googleapis.com/css?family=Raleway") format("woff");'+
                                '}'+
                            '</style>'+
                        '</head>'+
                        '<body style="background-color: white">'+
                            '<div style="width: 100%; font-family: ' + "'Raleway'" + ', sans-serif;border: 0px solid #C91D32; border-width: 0 0 5px 0; background-color: white">'+
                                    '<div style="background-color: #00478A; color: white; padding: 30px; margin: 0 auto">'+
                                    '<h2 style="margin: 0px;letter-spacing: 3px">SIRAR</h2>'+
                                    '<h3 style="margin-bottom: 5px;letter-spacing: 1px">Bienvenido (a)</h3>'+
                                    '<h4 style="margin: 0px;letter-spacing: 2px">' + usuario.nombre + '</h4>'+
                                    '</div>'+
                                    '<div style="text-align: center; letter-spacing: 1px">'+
                                    '<br>'+
                                    '<p style="margin-bottom: 40px; color: black;">Para crear su contrase&ntilde;a presione el bot&oacute;n</p>'+
                                    '<a '+
                                    'style="color: #00478A; font-size: 12px;background-color: white; '+
                                    'border-radius: 5px; font-family: ' + "'Raleway'" + ', sans-serif; border: 2px solid #00478A; letter-spacing: 2px; padding: 12px 45px; text-decoration: none"'+
                                    'href="https://sirartest.herokuapp.com/restablecer?' + nuevoUsuario.tokenPassword +'?0"'+
                                    '>CREAR CONTRASEÑA</a>'+
                                    '<p style="margin-top: 40px; color: black;">O copie y pegue en su navegador el siguiente enlace</p>'+
                                    '<p style="color: #00478A; ">https://sirartest.herokuapp.com/restablecer?' + nuevoUsuario.tokenPassword +'?0</p>'+
                                    '</div>'+
                                    '</div>'+
                                    '</body>'+
                                    '</html>'
                  , res);  
          }else{
                res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", nuevoUsuario.correo.toLowerCase()).instance});
          }          
      }).catch(err=>{         
                    if (err){   
                      if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta
                          borrarArchivo(nuevoUsuario.fotoUrl);
                          console.log(err)
                          res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", nuevoUsuario.correo.toLowerCase()).instance});
                      }else{//Error llave duplicada
                         res.json({token: res.locals.token, datos: globales.mensajes(15).instance});
                       
                      }   
                    }
              });
    }
    else{
      res.json({token: res.locals.token, datos: globales.mensajes(16).instance})
    }
  }).catch(e=> res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", nuevoUsuario.correo.toLowerCase()).instance})); 
};


exports.listaTodosUsuarios =  async function(req, res) {//Menos el que consulta en el correo   
  try{  
  Usuario.find()
         .sort({nombreNormalizado : 1})
         .select({password: 0, fechaCreacion: 0, tokenPassword: 0})
         .where({identificacion: {$ne: req.params.identificacion}})
         .exec()
         .then(async (usuarios)=>{
          await asyncForEach(usuarios ,async (element, indice, usuarios) => {
            usuarios[indice].fotoUrl = await leerArchivoAsync(element.fotoUrl);
            
          });
          if(usuarios.length > 0){
              res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,usuarios.map(u => u.datosLogin())).instance});  
          }  
          else
            res.json({token: res.locals.token, datos: globales.mensajes(11).instance});
        })
          .catch((err)=>{
            res.json({token: res.locals.token,datos: globales.mensajes(12).instance});  
}) 
}catch(e){
    console.log(e);
  }
};
//[remote "origin"]
//	url = https://sirar2018.visualstudio.com/SIRAR/_git/SIRAR%20API
//	fetch = +refs/heads/*:refs/remotes/origin/*

exports.leerUsuario = async function(req, res) {  
  Usuario.findOne()
  .where({identificacion: req.params.identificacion})
  .exec()
  .then(async (usuario) => {
    if(usuario){      
      usuario.fotoUrl = await leerArchivoAsync(usuario.fotoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null,usuario.datosLogin()).instance});
    }
    else {   
    res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.params.identificacion).instance});
  }
}).catch((err)=>{
    res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion).instance});
  }) 
};

exports.modificarUsuario = async function(req, res) { 
 var usuarioTem = new Usuario();
  usuarioTem.identificacion = req.params.identificacion;
  usuarioTem.fotoUrl = req.body.fotoUrl;
  Usuario.findOneAndUpdate({identificacion: req.params.identificacion},
     {$set: {
      "correo" : req.body.correo.toLowerCase(),
      "nombre": req.body.nombre,   
      "nombreNormalizado":  req.body.nombre.toLowerCase(),     
      "fotoUrl" : req.body.fotoUrl ? guardarImagenPerfil(rutaImagenesPerfil, usuarioTem) : undefined,
      "telefono": req.body.telefono,
      "rol": req.body.rol                                                                                                                         
      }}, {projection:{password: 0, fechaCreacion : 0}, new: false, runValidators: true})
      .exec()
      .then(usuarioAntiguo=>{
          if(usuarioAntiguo){
            if((!req.body.fotoUrl || req.body.fotoUrl === "") && usuarioAntiguo.fotoUrl != null){
                borrarArchivo(usuarioAntiguo.fotoUrl);
            }       
            res.json({token: res.locals.token, datos: globales.mensajes(-3, "usuario", req.body.nombre).instance});
          }
          else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.body.identificacion).instance});
          }
      }).catch(err=>{
        if(err.code || err.code == 11000){ //Llave duplicada  
          res.json({token: res.locals.token, datos: globales.mensajes(15).instance});
        }else{ 
          res.json({token: res.locals.token, datos: globales.mensajes(14, "usuario", req.params.identificacion).instance});        
        }
      });  
};

exports.borrarUsuario = async function(req, res) {
  Usuario.findOneAndRemove()
        .where({identificacion: req.params.identificacion})
        .exec().
        then(usuario=> {
                        if(usuario)
                          if(usuario.fotoUrl != null || usuario.fotoUrl ==! "")
                            borrarArchivo(usuario.fotoUrl)
                        res.json({token: res.locals.token, datos: globales.mensajes(-2, "Usuario", req.params.identificacion).instance});    
        }).catch(err=>{res.json({token: res.locals.token, datos: globales.mensajes(3, "usuario", req.params.identificacion).instance});
  });
};
//#endregion Funciones Respuesta
