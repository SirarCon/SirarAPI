'use strict';

//#region Requires
var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario'),
AwtAuth = require('jsonwebtoken'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
usuarioService = require("../services/UsuarioService.js");
const urlPwa = globales.urlPwa.instance;
const rutaImagenesPerfil = globales.rutaImagenesPerfil.instance;

//#endregion Requires

//#region Funciones Auxiliares



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



//#endregion Funciones Auxiliares


//#region Funciones de Respuesta
exports.verificarLogin = async function(req, res) {
  if(req.body.correo){  
  Usuario.findOne()
        .select({fechaCreacion : 0})
        .where({correo: req.body.correo.toLowerCase()})
        .then((usuario)=>{
          if(usuario) {
            if(!req.body.password || usuario.password !== req.body.password)
              res.json({datos: globales.mensajes(1)});
            else{
              AwtAuth.sign({usuario}, 'secretKey', /*{expiresIn: "30s"},*/ async (err, token)=>{
                if(err){
                  res.json({datos: globales.mensajes(50)});
                  }
                else{
                  usuario.fotoUrl = await funcionesGlobales.leerArchivoAsync(usuario.fotoUrl);
                  res.json({token: "token " + token, datos: globales.mensajes(-1, null, null,usuario.datosLogin())});
                }
              });
  
            }
          }
          else{
            res.json({datos: globales.mensajes(2, "Usuario", req.body.correo.toLowerCase())});
          }
        })
        .catch((err)=>{
          funcionesGlobales.registrarError("verificarLogin/UsuarioController", err)                                         
          res.send(err);
        })
      }
      else{
        res.json({datos: globales.mensajes(2, "Usuario", "sin correo electrónico")});
      }
};

exports.solicitarRecuperacion = async function(req, res){
   var tokenPassword = globales.crearRandom(15);
   Usuario.findOneAndUpdate({correo: req.body.correo.toLowerCase()},{$set: {"tokenPassword": tokenPassword}}, {runValidators: true})
          .then(usuario => {
            if(usuario){
              usuarioService.mailSenderRecuperar(usuario.correo.toLowerCase(),
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
                                'href="'+ urlPwa +'/restablecer?' + tokenPassword +'?1"'+
                                '>RESTABLECER CONTRASEÑA</a>'+
                                '<p style="margin-top: 40px; color: black;">O copie y pegue en su navegador el siguiente enlace</p>'+
                                '<p style="color: #00478A; ">'+ urlPwa + '/restablecer?' + tokenPassword +'?1</p>'+
                                '</div>'+
                                '</div>'+
                                '</body>'+
                                    '</html>'
              , res);    
            }
            else{
              res.json({datos: globales.mensajes(2, "Usuario", req.body.correo.toLowerCase()) })//
          }
          })
          .catch(err=>{
            console.log(err)
            funcionesGlobales.registrarError("solicitarRecuperacion/UsuarioController", err)                                         
            res.json({datos: globales.mensajes(5, "usuario", req.body.correo.toLowerCase())
           })});              
}

exports.recuperarcontrasena = async function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.tokenPassword)){
      Usuario.findOneAndUpdate({tokenPassword: req.body.tokenPassword}, 
      {$set: {"tokenPassword" : null}}, {runValidators: true})
      .then(usuario => {
        if(usuario)                  
            res.json({datos: globales.mensajes(-1, null, null, usuario.datosRecuperarContrasena())});            
          else{
            res.json({datos: globales.mensajes(2, "Token", "vencido:")});          
          }
      })
      .catch(err=>{
        funcionesGlobales.registrarError("recuperarcontrasena/UsuarioController", err)                                         
        res.json({datos: globales.mensajes(6)});
      });
    }else{
      res.json({datos: globales.mensajes(7)});    
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
            if(req.body.passwordVieja && usuario.password !== req.body.passwordVieja ||
              req.body.passwordConfirmacion &&
              req.body.password !== req.body.passwordConfirmacion){
                      res.json({token: res.locals.token, datos: globales.mensajes(9)});
            }else{
            Usuario.findOneAndUpdate(filtro, {$set: {password: req.body.password}}, {runValidators: true})
                   .exec()
                   .then(usuario =>{
                    if(req.body.passwordVieja){//Si se cambia desde la aplicación con la sesión inciada
                      res.json({token: res.locals.token, datos: globales.mensajes(-6, "usuario", req.body.identificacion)})
                    }else{
                      res.json({datos: globales.mensajes(-6, "usuario", req.body.identificacion)})
                    }
                    })
                   .catch(err=>{
                    if(req.body.passwordVieja)
                        res.json({token: res.locals.token, datos: globales.mensajes(8)})
                    else{
                        funcionesGlobales.registrarError("cambiarContrasena/UsuarioController", err)                                         
                        res.json({datos: globales.mensajes(8)});
                        }
                   });    
            }
        }
        else{
          if(req.body.passwordVieja)
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.body.identificacion)});
          else
            res.json({datos: globales.mensajes(2, "Usuario", req.body.identificacion)});
    }
  }).catch(err=>{
    if(req.body.passwordVieja)
       res.json({token: res.locals.token, datos: globales.mensajes(8)})
    else{
      funcionesGlobales.registrarError("cambiarContrasena/UsuarioController", err)                                         
       res.json({datos: globales.mensajes(8)});
    }
    });
}
else{
  if(req.body.identificacion == null || req.body.identificacion === "") 
  res.json({datos: globales.mensajes(2, "Usuario", "sin identificación")});
  else{
    if(req.body.passwordVieja)
    res.json({token: res.locals.token, datos: globales.mensajes(17)});
    else
      res.json({datos: globales.mensajes(17)});
  }
}
}

//Necesita el checkbox application/x-www-form-urlencoded
exports.crearUsuario = async function(req, res) {  
   funcionesGlobales.validarEmail(req.body.correo).then(valido=>{
      var nuevoUsuario = new Usuario(req.body);
      nuevoUsuario.tokenPassword = globales.crearRandom(15);
      if(req.body.fotoUrl){    
          nuevoUsuario.fotoUrl = guardarImagenPerfil(rutaImagenesPerfil, nuevoUsuario);    
      }
      nuevoUsuario.correo = nuevoUsuario.correo.toLowerCase();
      nuevoUsuario.nombreNormalizado = nuevoUsuario.nombre.toLowerCase();
      nuevoUsuario.save().then(usuario=>{
          if(usuario){
            usuarioService.mailSenderCrear(usuario.correo.toLowerCase(),
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
                                    'href="'+ urlPwa + '/restablecer?' + nuevoUsuario.tokenPassword +'?0"'+
                                    '>CREAR CONTRASEÑA</a>'+
                                    '<p style="margin-top: 40px; color: black;">O copie y pegue en su navegador el siguiente enlace</p>'+
                                    '<p style="color: #00478A; ">'+ urlPwa + '/restablecer?' + nuevoUsuario.tokenPassword +'?0</p>'+
                                    '</div>'+
                                    '</div>'+
                                    '</body>'+
                                    '</html>'
                  , res);  
          }else{
                res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", nuevoUsuario.correo.toLowerCase())});
          }          
      }).catch(err=>{         
                    if (err){   
                      if(!err.code || !err.code == 11000){ //Si no es por llave duplicada, borro la imagen adjunta
                          funcionesGlobales.registrarError("crearUsuario/UsuarioController", err)                                         
                          funcionesGlobales.borrarArchivo(nuevoUsuario.fotoUrl);
                          console.log(err)
                          res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", nuevoUsuario.correo.toLowerCase())});
                      }else{//Error llave duplicada
                         res.json({token: res.locals.token, datos: globales.mensajes(15, "La identificación o correo electrónico", " ")});
                      }   
                    }
              });  
  }).catch(err=> {
    if(typeof(err) === "string"){
       res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", err)});
    }else{
      funcionesGlobales.registrarError("crearUsuario/UsuarioController", err)      
      res.json({token: res.locals.token, datos: globales.mensajes(10, "usuario", req.body.correo.toLowerCase())});
    }
  }); 
};


exports.listaTodosUsuarios =  async function(req, res) {//Menos el que consulta en el correo   
  try{  
  Usuario.find()         
         .select({password: 0, fechaCreacion: 0, tokenPassword: 0})
         .where({identificacion: {$ne: req.params.identificacion}})
         .sort({nombreNormalizado : 1})
         .exec()
         .then(async (usuarios)=>{
            await funcionesGlobales.asyncForEach(usuarios ,async (element, indice, usuarios) => {
              usuarios[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);
              
            });
            res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, usuarios.map(u => u.datosLogin()))});            
        }).catch((err)=>{
            funcionesGlobales.registrarError("listaTodosUsuarios/UsuarioController", err)                                         
            res.json({token: res.locals.token,datos: globales.mensajes(12, "", "los usuarios")});  
}) 
}catch(err){
  funcionesGlobales.registrarError("listaTodosUsuarios/UsuarioController", err)      
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
      usuario.fotoUrl = await funcionesGlobales.leerArchivoAsync(usuario.fotoUrl);
       res.json({token: res.locals.token, datos: globales.mensajes(-1, null, null, usuario.datosLogin())});
    }
    else {   
    res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.params.identificacion)});
  }
}).catch((err)=>{
    funcionesGlobales.registrarError("leerUsuario/UsuarioController", err)                                         
    res.json({token: res.locals.token, datos: globales.mensajes(13, "usuario", req.params.identificacion)});
  }) 
};

exports.modificarUsuario = async function(req, res) { 
  funcionesGlobales.validarEmail(req.body.correo, true)
  .then(function(values) {
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
              funcionesGlobales.borrarArchivo(usuarioAntiguo.fotoUrl);
            }       
            res.json({token: res.locals.token, datos: globales.mensajes(-3, "Usuario", req.body.nombre)});
          }
          else{
            res.json({token: res.locals.token, datos: globales.mensajes(2, "Usuario", req.body.identificacion)});
          }
      }).catch(err=>{
        if(err.code || err.code == 11000){ //Llave duplicada  
          res.json({token: res.locals.token, datos: globales.mensajes(15, "La identificación o correo electrónico"," ")});
        }else{ 
          funcionesGlobales.registrarError("modificarUsuario/UsuarioController", err)                                         
          res.json({token: res.locals.token, datos: globales.mensajes(14, "usuario", funcionesGlobales.manejarError(err, req.params.identificacion))});        
        }
      }); 
    }).catch(err=> {
      funcionesGlobales.registrarError("modificarUsuario/UsuarioController", err)                                         
      res.json({token: res.locals.token, datos: globales.mensajes(16, "Correo", req.body.correo ? req.body.correo : " ")
    }) 
}) 
};

exports.borrarUsuario = async function(req, res) {
  Usuario.findOneAndRemove()
        .where({identificacion: req.params.identificacion})
        .exec().
        then(usuario=> {
            if(usuario)
              if(usuario.fotoUrl != null || usuario.fotoUrl ==! "")
              funcionesGlobales.borrarArchivo(usuario.fotoUrl)
            res.json({token: res.locals.token, datos: globales.mensajes(-2, "Usuario", req.params.identificacion)});    
        }).catch(err=>{
          funcionesGlobales.registrarError("borrarUsuario/UsuarioController", err)                                         
          res.json({token: res.locals.token, datos: globales.mensajes(3, "usuario", req.params.identificacion)});
  });
};
//#endregion Funciones Respuesta
