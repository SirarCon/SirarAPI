'use strict';


var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario');
const AwtAuth = require('jsonwebtoken');
var globales = require("../Globales.js");
const rutaImagenesPerfil = require('../Globales.js').rutaImagenesPerfil.instance;

function crearRandom(){
  const randomstring = require('just.randomstring');                   
  return randomstring(15);
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
  console.log("borrando" + ruta);
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

exports.verificarLogin = async function(req, res) {    
      Usuario.findOne()
      .select({created_date : 0})
      .where({correo: req.body.correo.toLowerCase()})
      .then((usuario)=>{
        if(usuario) {
          if(usuario.password !== req.body.password)
            res.json({exito: false, error: 2, mensaje: "Contraseña errónea."});
          else{
            AwtAuth.sign({usuario}, 'secretKey', /*{expiresIn: "30s"},*/ async (err, token)=>{
              if(err){
                res.json({exito:false, error: 50, mensaje: "Hubo un error creando token."});
                }
              else{
                usuario.fotoUrl = await leerArchivoAsync(usuario.fotoUrl);
                res.json({token: "token " + token, exito: true, error: -1, mensaje: usuario.datosLogin()});
              }
            });

          }
        }
        else{
          res.json({exito: false, error: 2, mensaje: "Usuario no existe."});
        }
      })
      .catch((err)=>{
        res.send(err);
      })
  };

function mailSenderCrear(emailAdress, subject, message, res){            
  require("../Globales.js").emailTransporter.instance.sendMail(
          require("../Globales.js").emailOptions(emailAdress, subject, message).instance,
          (error, info) => {                        
                            if (error) {                                                 
                              Usuario.findOneAndRemove({correo: emailAdress}, (err, usuario)=> {
                                if (err){
                                  res.json({token: res.locals.token, exito: false, error: 3, mensaje: "Error borrando usuario no existe el usuario."});                      
                                }
                                else{
                                  if(usuario && usuario.fotoUrl){
                                      borrarArchivo(usuario.fotoUrl);                                               
                                  }
                                  res.json({token: res.locals.token, exito: false, error: 4, mensaje: "Ocurrió un error enviando el correo: " + error });                                        
                                }
                              });                                
                            }  
                            else{   
                            res.json({token: res.locals.token, exito: true, error: -1, mensaje: "El usuario " + emailAdress + " se a creado." })                                                                      
                            }
                          }
  );        
}


function mailSenderRecuperar(emailAdress, subject, message, res){            
  require("../Globales.js").emailTransporter.instance.sendMail(
          require("../Globales.js").emailOptions(emailAdress, subject, message).instance,
          (error, info) => {                        
                            if (error) {                                                                       
                                  res.json({exito: false, error: 4, mensaje: "Ocurrió un error enviando el correo: " + error });                                              
                            }  
                            else{   
                            res.json({exito: true, error: -1, mensaje: "El correo a " + emailAdress + " se a enviado." }) 
                            }
                          }
  );        
}


exports.solicitarRecuperacion = function(req, res){
  var tokenPassword = crearRandom();
  Usuario.findOneAndUpdate({correo: req.body.correo.toLowerCase()}, 
    {$set: {"tokenPassword": tokenPassword}}, 
    (err, usuario) => {
      if(err){
      res.json({exito: false, error: 2, mensaje:"Ocurrió un error buscando el usuario " + req.body.correo.toLowerCase()})
      }
      else{
        if(usuario){
          mailSenderRecuperar(usuario.correo,
            'Recupeación de contraseña',
              '<p><H2>Hola ' + usuario.nombre + ' </H2></p>'+
              '<p>Este correo se le envía para recuperar su contraseña. En caso de que no halla solicitado un cambio de contraseña omita el mensaje. Para recuperar su contraseña presione '+
              '<a  href="https://sirarpwa.herokuapp.com/reestablecer?'+ tokenPassword +'" class="button">Reestablecer Contraseña</a>'+
              '<p>O copie y pegue en un navegador el siguiente Link:</p>' +
              '<p style="color: blue; ">https://sirarpwa.herokuapp.com/reestablecer?' + tokenPassword +'</p>'+
              '<style>a.button {border: 2px solid red; text-decoration: none;color: white; background-color: blue;}</style>'
          , res);    
        }
        else{
          res.json({exito: false, error: 2, mensaje: "El usuario con el correo " + req.body.correo.toLowerCase() + " no existe." })
      }
      }
  });
}


exports.recuperarcontrasena = function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.tokenPassword)){
      Usuario.findOneAndUpdate({tokenPassword: req.body.tokenPassword}, 
      {$set: {"tokenPassword" : req.body.tokenPassword}}, function(err, usuario) {
        if (err){
          res.json({exito: false, error: 2, mensaje: err.errmsg});
        }
        else{
          if(usuario)                  
            res.json({exito: true, error: -1, mensaje: usuario.datosRecuperarContrasena()});            
          else{
            res.json({exito: false, error: -1, mensaje: "No usuario con el token enviado."});          
          }
        }
       });
    }
    else{
      res.json({exito: false, error: -1, mensaje: "No existe el token especificado."});    
    }
}

exports.cambiarContrasena = function(req, res){
  var filtro= {identificacion : req.body.identificacion};
  var Passwordcoinciden = true ;
  Usuario.findOneAndUpdate(filtro,{$set: {"password": req.body.password}},
    (err, usuario)=>{
      if(err){
        res.json({exito: false, error: 2, mensaje: "Error al cambiar contraseña."});
      }
      else{
        if(usuario){
            if(req.body.passwordVieja && usuario.password !== req.body.passwordVieja){
              Passwordcoinciden= false
            }
            if(Passwordcoinciden){
              res.json({exito: true, error: -1, mensaje: "Contraseña de usuario: " + req.body.identificacion + " cambiada exitosamente."})
            }else{
              res.json({exito: false, error: 5, mensaje: "Contraseña anterior no coincide."})
            }
        }
        else{
          res.json({exito: false, error: 2, mensaje: "No existe el usuario: " + req.body.identificacion });
        }
    }
  });
}

//Necesita el checkbox application/x-www-form-urlencoded
exports.crear_usuario = function(req, res) {   
  var nuevoUsuario = new Usuario(req.body);
  nuevoUsuario.tokenPassword = crearRandom(); 
    if(req.body.fotoUrl){    
    nuevoUsuario.fotoUrl = guardarImagenPerfil(rutaImagenesPerfil, nuevoUsuario);    
    }
  nuevoUsuario.save(function(err, usuario) {
    if (err){   
      if(!err.code || !err.code == 11000) //Llave duplicada  
      borrarArchivo(nuevoUsuario.fotoUrl); 
    res.json({token: res.locals.token, exito: false, error:1, mensaje: err.errmsg});
  }
    else
      if(usuario){              
        mailSenderCrear(usuario.correo,
            'Creación de contraseña',
              '<p><H2>Bienvenido ' + usuario.nombre + ' a SIRAR</H2></p>'+
              '<p>Para crear su contrase&ntilde;a presione el bot&oacute;n:</p>' + 
              '<a  href="https://sirarpwa.herokuapp.com/reestablecer?'+ nuevoUsuario.tokenPassword +'" class="button">Reestablecer Contraseña</a>'+
              '<p>O copie y pegue en un navegador el siguiente Link:</p>' +
              '<p style="color: blue; ">https://sirarpwa.herokuapp.com/reestablecer?' + nuevoUsuario.tokenPassword +'</p>'+
              '<style>a.button {border: 2px solid red; text-decoration: none;color: white; background-color: blue;}</style>'
          , res);              
      }
  });
};
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}


exports.lista_todos_usuarios =  async function(req, res) {//Menos el que consulta en el correo   
  try{ 
  Usuario.find()
         .sort({nombre : 1})
         .select({password: 0, created_date: 0, tokenPassword: 0})
         .where({identificacion: {$ne: req.params.identificacion}})
         .exec()
         .then(async (usuarios)=>{
          await asyncForEach(usuarios ,async (element, indice, usuarios) => {
            usuarios[indice].fotoUrl = await leerArchivoAsync(element.fotoUrl);
            
          });
          if(usuarios.length > 0){
              res.json({token: res.locals.token, exito: true, error: -1, mensaje: usuarios.map(u => u.datosLogin())});  
          }  
          else
            res.json({token: res.locals.token, exito: false, error:10, mensaje: "No hay usuarios registrados."});
        })
          .catch((err)=>{
            res.json({token: res.locals.token, exito: false, error: 2, mensaje: err});  
}) 
}catch(e){
    console.log(e);
  }
};
//[remote "origin"]
//	url = https://sirar2018.visualstudio.com/SIRAR/_git/SIRAR%20API
//	fetch = +refs/heads/*:refs/remotes/origin/*

exports.leer_usuario = async function(req, res) {  
  Usuario.findOne()
  .where({identificacion: req.params.identificacion})
  .exec()
  .then(async (usuario) => {
    if(usuario){      
      usuario.fotoUrl = await leerArchivoAsync(usuario.fotoUrl);
       res.json({token: res.locals.token, exito: true, error: -1, mensaje: usuario.datosLogin() });
    }
    else {   
    res.json({token: res.locals.token, exito: false, error: 10, mensaje: "No hay usuarios con la identificación: " + req.params.identificacion});
  }
}).catch((err)=>{
    res.json({token: res.locals.token, exito: false, error: 7 ,mensaje: err});
  }) 
};

exports.modificar_usuario = function(req, res) { 
 var usuarioTem = new Usuario();
  usuarioTem.identificacion = req.body.identificacion;
  usuarioTem.fotoUrl = req.body.fotoUrl;
  Usuario.findOneAndUpdate({identificacion: req.params.identificacion},
     {$set: {
      "correo" : req.body.correo.toLowerCase(),
      "nombre": req.body.nombre,        
      "fotoUrl" : req.body.fotoUrl ? guardarImagenPerfil(rutaImagenesPerfil, usuarioTem) : undefined,
      "telefono": req.body.telefono,
      "rol": req.body.rol                                                                                                                         
      }}, {projection:{password: 0, created_date : 0}, new: false}, function(err, usuarioAntiguo) {
  if (err){
    console.log(err);
      res.json({token: res.locals.token, exito: false, error: 5 , mensaje: "Hubo un fallo al modificar los datos."});        
  }
  else{
  if(usuarioAntiguo){
    if((!req.body.fotoUrl || req.body.fotoUrl === "") && usuarioAntiguo.fotoUrl != null){
        borrarArchivo(usuarioAntiguo.fotoUrl);
    }       
    res.json({token: res.locals.token, exito: true, error: -1 ,mensaje: "Usuario " + usuarioAntiguo.nombre +" modificado con éxito."});
  }
  else{
    res.json({token: res.locals.token, exito: false, error: 9 ,mensaje: "Usuario " + req.params.identificacion +" no éxiste."});
  }
}
});  
};

exports.borrar_usuario = function(req, res) {
  Usuario.findOneAndRemove({
    identificacion: req.params.identificacion    
  },function(err, usuario) {
    if (err)
    res.json({token: res.locals.token, exito: true, error: 2 ,mensaje: "Error al borrar el usuario "+ err.errmsg});
    
    if(usuario)
    if(usuario.fotoUrl != null || usuario.fotoUrl ==! "")
      borrarArchivo(usuario.fotoUrl)
    res.json({token: res.locals.token, exito: true, error: -1 ,mensaje: 'EL usuario ' + req.params.identificacion +' fue borrado.'});    
  });
};
