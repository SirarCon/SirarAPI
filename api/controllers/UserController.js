'use strict';


var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario');
const AwtAuth = require('jsonwebtoken');
var globales = require("../Globales.js");
const rutaImagenesPerfil = require('../Globales.js').rutaImagenesPerfil.instance;


function convertir64bits(archivo){
  console.log(archivo + "hey");
  var fs = require('fs');
      // read binary data
      var bitmap = fs.readFileSync(archivo);
      // convert binary data to base64 encoded string
      return new Buffer(bitmap).toString('base64');
  }

function guardarImagenPerfil(ruta, usuario){
  const fs =require("fs");  //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg==
  var extension= usuario.fotoUrl.match(/\/(.*);/);
  // strip off the data: url prefix to get just the base64-encoded bytes
  var datosLimpios = usuario.fotoUrl.replace(/^data:image\/\w+;base64,/, "");

  var buf = new Buffer(datosLimpios, 'base64');
  var fotoUrl = ruta + usuario.correo + "." + extension[1]
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
      Usuario.find({correo: req.body.correo, password: req.body.password}, function(err, usuario) {
        if (err)
          res.send(err);
        if(usuario.length > 0) {
            AwtAuth.sign({usuario}, 'secretKey', /*{expiresIn: "30s"},*/ (err,token)=>{                            
              res.json({exito: true, error: -1, mensaje: token});
            });
        }
        else{
          //var x = require("../Globales.js").mensajesError(1);
          //console.log(x);
          res.json({exito: false, error: 2, mensaje: "Error verificando login"});
        }
      })
  };

function mailSender(emailAdress, subject, message, res, random){            
  require("../Globales.js").emailTransporter.instance
  .sendMail(
          require("../Globales.js").emailOptions(emailAdress, subject, message).instance,
          (error, info) => {
                  if (error) { 
                    console.log("Borrando " + emailAdress);
                    Usuario.findOneAndRemove({correo: emailAdress}, (err, usuario)=> {
                      if (err)
                      res.json({exito: false, error: 3, mensaje: "Error borrando usuario no existe el usuario"});
                      console.log(usuario.fotoUrl);
                      if(usuario.fotoUrl){
                          borrarArchivo(usuario.fotoUrl);                                               
                        }
                    });  
                    res.json({exito: false, error: 4, mensaje: "Ocurrió un error enviando el correo" + error });                                        
                  }
          Usuario.findOneAndUpdate({correo: emailAdress}, { $set: {"token": random }}, function(err, usuario) {
            if (err)
            res.json({exito: false, error: 5, mensaje: "Error guardando el token del nuevo usuario"});
            res.json({exito: true, error: -1, mensaje: "Usuario " + emailAdress + " creado"});
          });                                                                     
  });        
}

exports.recuperarcontrasena = function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.token)){
      Usuario.find({token: req.body.token}, function(err, usuario) {
        if (err)
        res.json({exito: false, error: 2, mensaje: err});
        res.json({exito: true, error: -1, mensaje: usuario});    
          console.log(req.body.token + " token")
      });
    }
    else{
      res.json({exito: true, error: -1, mensaje: "No existe el token especificado"});    
    }
}

//Necesita el checkbox application/x-www-form-urlencoded
exports.crear_usuario = function(req, res) {  
  console.log("Guardando" + req.body.fotoUrl);
  const randomstring = require('just.randomstring');                   
  var nuevoUsuario = new Usuario(req.body);
  
    if(req.body.fotoUrl){
    console.log("Con imagen");
    nuevoUsuario.fotoUrl = guardarImagenPerfil(rutaImagenesPerfil, nuevoUsuario);    
  }
  nuevoUsuario.save(function(err, usuario) {
    if (err)
    res.json({exito: false, error:1, message: err});
    else
      if(usuario){      
        var random = randomstring(15);
        mailSender(usuario.correo,
            'Creación de contraseña',
              '<p><H2>Bienvenido ' + usuario.nombre + ' a SIRAR</H2></p>'+
              '<p>Para crear su contraseña presione '+
              '<a localhost:3000/rps/'+ random +'> Aquí </a>'+
              ' o copie y pegue en un navegador el siguiente Link: localhost:3000/rps/'+ random + '</p>'
          , res, random);              
      }
  });
};

exports.lista_todos_usuarios = function(req, res) {//Menos el que consulta en el correo 
  Usuario.find({correo: {$ne: req.headers["correo"]}}, function(err, usuarios) {
  if (err)
  res.json({exito: false, error: 2, mensaje: err});
  usuarios.forEach((u, i, us) => us[i].fotoUrl = us[i].fotoUrl ? convertir64bits(u.fotoUrl) : u.fotoUrl);
  res.json({exito: true, error: -1, mensaje: usuarios});    
});
};
//Prue

exports.leer_usuario = function(req, res) {  
  Usuario.findOne({correo: req.params.correo}, function(err, usuario) {
    if (err)
    res.json({exito: false, error: 7 ,message: err});
    usuario.fotoUrl = usuario.fotoUrl ? convertir64bits(usuario.fotoUrl) : usuario.fotoUrl;    
    res.json({exito: true, error:-1, message: usuario });        
  });  
};

exports.modificar_usuario = function(req, res) { 
 var usuarioTem = new Usuario();
  usuarioTem.correo = req.params.correo;
  usuarioTem.fotoUrl = req.body.fotoUrl;  
  Usuario.findOneAndUpdate({correo: req.params.correo},
     {$set: {
      "nombre": req.body.nombre,  
      "password": req.body.password,
      "token": req.body.token, 
      "fotoUrl" : req.body.fotoUrl ? guardarImagenPerfil(rutaImagenesPerfil, usuarioTem) : undefined,
      "telefono": req.body.telefono,
      "rol": req.body.rol                                                                                                                         
      }}, {new: false}, function(err, usuarioAntiguo) {
    if (err)
      res.json({exito: false, error: 5 , message: err});        
    if((!req.body.fotoUrl || req.body.fotoUrl === "") && usuarioAntiguo.fotoUrl != null)
       borrarArchivo(usuarioAntiguo.fotoUrl);  

       res.json({exito: true, error: -1 ,message: usuarioAntiguo});
});  
};

exports.borrar_usuario = function(req, res) {
  Usuario.findOneAndRemove({
    correo: req.params.correo    
  }, function(err, usuario) {
    if (err)
    res.json({exito: true, error: 2 ,message: "Error al borrar el usuario"});
    
    if(usuario)
    if(usuario.fotoUrl != null || usuario.fotoUrl ==! "")
      borrarArchivo(usuario.fotoUrl)
    res.json({exito: true, error: -1 ,message: 'EL usuario ' + req.params.correo +' fue borrado' + usuario});    
  });
};
