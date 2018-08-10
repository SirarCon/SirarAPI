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

function convertir64bits(archivo){  
  console.log(archivo)
  var fs = require('fs');
      // read binary data
      
      return fs.readFile(archivo,(err, imagenEncontrada)=>{
        if(err){
          if(err.code === 'ENOENT')          
          return  "Archivo no encontrado";
          else
          return "Error leyendo el archivo";
        }
        else{
          console.log(imagenEncontrada)
            return "data:image/jpeg;base64," +  new Buffer(imagenEncontrada).toString('base64');;
        }        
      });            
      // convert binary data to base64 encoded string      
  }

function guardarImagenPerfil(ruta, usuario){
  console.log("updti");
  const fs =require("fs");  //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg==
  var extension= usuario.fotoUrl.match(/\/(.*);/);
  // strip off the data: url prefix to get just the base64-encoded bytes
  var datosLimpios = usuario.fotoUrl.replace(/^data:image\/\w+;base64,/, "");
  console.log("g")
  var buf = new Buffer(datosLimpios, 'base64');
  var fotoUrl = ruta + usuario.identificacion + "." + extension[1]  
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

exports.verificarLogin = function(req, res) {    
      Usuario.find(
      {correo: req.body.correo, password: req.body.password}, 
      {password: 0, created_date : 0},
      function(err, usuario) {
        if (err)
          res.send(err);
        if(usuario.length > 0) {
            AwtAuth.sign({usuario}, 'secretKey', /*{expiresIn: "30s"},*/ (err,token)=>{                            
              res.json({exito: true, error: -1, mensaje: {token: token, usuario: usuario}});
            });
        }
        else{
          //var x = require("../Globales.js").mensajesError(1);
          //console.log(x);
          res.json({exito: false, error: 2, mensaje: "Usuario o Contraseña erróneos"});
        }
      })
  };

function mailSender(emailAdress, subject, message, res){            
  require("../Globales.js").emailTransporter.instance.sendMail(
          require("../Globales.js").emailOptions(emailAdress, subject, message).instance,
          (error, info) => {
                            if (error) {                     
                              Usuario.findOneAndRemove({correo: emailAdress}, (err, usuario)=> {
                                if (err)
                                res.json({exito: false, error: 3, mensaje: "Error borrando usuario no existe el usuario"});                      
                                if(usuario.fotoUrl){
                                    borrarArchivo(usuario.fotoUrl);                                               
                                  }
                              });  
                              res.json({exito: false, error: 4, mensaje: "Ocurrió un error enviando el correo" + err.errmsg });                                        
                            }     
                            res.json({exito: true, error: -1, mensaje: emailAdress + " creado." })                                                                      
                          }
  );        
}

exports.recuperarcontrasena = function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.token)){
      Usuario.findOneAndUpdate({token: req.body.token}, 
      {$set: {"token" : null}}, function(err, usuario) {
        if (err)
          res.json({exito: false, error: 2, mensaje: err.errmsg});
        if(usuario)                  
          res.json({exito: true, error: -1, mensaje: "Contraseña cambiada exitosamente"});            
       });
    }
    else{
      res.json({exito: true, error: -1, mensaje: "No existe el token especificado"});    
    }
}

//Necesita el checkbox application/x-www-form-urlencoded
exports.crear_usuario = function(req, res) {   
  var nuevoUsuario = new Usuario(req.body);
  nuevoUsuario.token = crearRandom(); 
    if(req.body.fotoUrl){    
    nuevoUsuario.fotoUrl = guardarImagenPerfil(rutaImagenesPerfil, nuevoUsuario);    
    }
  nuevoUsuario.save(function(err, usuario) {
    if (err){   
      if(!err.code || !err.code == 11000) //Llave duplicada  
      borrarArchivo(nuevoUsuario.fotoUrl); 
    res.json({exito: false, error:1, mensaje: err.errmsg});
  }
    else
      if(usuario){              
        mailSender(usuario.correo,
            'Creación de contraseña',
              '<p><H2>Bienvenido ' + usuario.nombre + ' a SIRAR</H2></p>'+
              '<p>Para crear su contraseña presione '+
              '<a https://sirarapp.herokuapp.com/reestablecer/reestablecer?'+ nuevoUsuario.token +'> Aquí </a>'+
              ' o copie y pegue en un navegador el siguiente Link: https://sirarapp.herokuapp.com/reestablecer/reestablecer?'+ nuevoUsuario.token + '</p>'
          , res);              
      }
  });
};

exports.lista_todos_usuarios = function(req, res) {//Menos el que consulta en el correo   
  Usuario.find({identificacion: {$ne: req.headers["identificacion"]}}, {password: 0, created_date : 0}, function(err, usuarios) {
  if (err)
  res.json({exito: false, error: 2, mensaje: err.errmsg});  
  usuarios.forEach((u, i, us) => {console.log(us[i].fotoUrl); us[i].fotoUrl = us[i].fotoUrl ? convertir64bits(u.fotoUrl) : u.fotoUrl});
  if(usuarios.length > 0)
  res.json({exito: true, error: -1, mensaje: usuarios});    
  else
  res.json({exito: false, error:10, mensaje: "No hay usuarios registrados"});
}).sort({nombre : 1});
};
//[remote "origin"]
//	url = https://sirar2018.visualstudio.com/SIRAR/_git/SIRAR%20API
//	fetch = +refs/heads/*:refs/remotes/origin/*

exports.leer_usuario = function(req, res) {  
  console.log("ee")
  Usuario.findOne({identificacion: req.params.identificacion}, {password: 0, created_date : 0}, function(err, usuario) {
    if (err)
    res.json({exito: false, error: 7 ,mensaje: err});
    if(usuario){      
       usuario.fotoUrl = usuario.fotoUrl ? convertir64bits(usuario.fotoUrl) : usuario.fotoUrl;             
       res.json({exito: true, error:-1, mensaje: usuario });
    }    
    res.json({exito: false, error: 10, mensaje: "No hay usuarios con la identificación: " + req.params.identificacion});
  });  
};

exports.modificar_usuario = function(req, res) { 
 var usuarioTem = new Usuario();
  usuarioTem.identificacion = req.body.identificacion;
  usuarioTem.fotoUrl = req.body.fotoUrl;
  console.log("u");  
  Usuario.findOneAndUpdate({identificacion: req.params.identificacion},
     {$set: {
      "correo" : req.body.correo,
      "nombre": req.body.nombre,        
      "token": req.body.token, 
      "fotoUrl" : req.body.fotoUrl ? guardarImagenPerfil(rutaImagenesPerfil, usuarioTem) : undefined,
      "telefono": req.body.telefono,
      "rol": req.body.rol                                                                                                                         
      }}, {projection:{password: 0, created_date : 0}, new: false}, function(err, usuarioAntiguo) {
  if (err){
    console.log(err);
      res.json({exito: false, error: 5 , mensaje: "Hubo un fallo al modificar los datos"});        
  }
  else{
  if(usuarioAntiguo){
    console.log("k");
    if((!req.body.fotoUrl || req.body.fotoUrl === "") && usuarioAntiguo.fotoUrl != null){
        borrarArchivo(usuarioAntiguo.fotoUrl);
    }       
    res.json({exito: true, error: -1 ,mensaje: "Usuario" + usuarioAntiguo.nombre +" modificado con éxito"});
  }
  else{
    res.json({exito: false, error: 9 ,mensaje: "Usuario" + req.params.identificacion +" no éxiste"});
  }
}
});  
};

exports.borrar_usuario = function(req, res) {
  Usuario.findOneAndRemove({
    identificacion: req.params.identificacion    
  },function(err, usuario) {
    if (err)
    res.json({exito: true, error: 2 ,mensaje: "Error al borrar el usuario "+ err.errmsg});
    
    if(usuario)
    if(usuario.fotoUrl != null || usuario.fotoUrl ==! "")
      borrarArchivo(usuario.fotoUrl)
    res.json({exito: true, error: -1 ,mensaje: 'EL usuario ' + req.params.identificacion +' fue borrado'});    
  });
};
