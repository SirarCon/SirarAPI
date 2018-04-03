'use strict';


var mongoose = require('mongoose'),
Usuario = mongoose.model('Usuario');
const AwtAuth = require('jsonwebtoken');


function borrarArchivo(ruta){
  const fs =require("fs");
  console.log("borrando");
  fs.exists(ruta, function(exists) {
    let uploadedFileName;
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
              res.json({
                token: token
              });
            });
        }
        else
          res.json({
            token: "No registro"
          }) 
      })
  };

function mailSender(emailAdress, subject, message, res, random){            
  require("../Globales.js").emailTransporter.instance
  .sendMail(
          require("../Globales.js").emailOptions(emailAdress, subject, message).instance,
          (error, info) => {
                  if (error) {              
                    Usuario.remove({correo: emailAdress}, (err, usuario)=> {
                      if (err)
                        console.log(error);
                        if(usuario.fotoUrl)
                        borrarArchivo(usuario.fotoUrl);                        
                        res.json({code: '2021'});
                    }) 
                    res.json({code: '2020'});             
                    return console.log(error);
                  }
          Usuario.findOneAndUpdate({correo: emailAdress}, { $set: {"token": random }}, function(err, usuario) {
            if (err)
              res.send(err);
              res.send("Usuario " + emailAdress + " creado");
          });                        
          console.log('Message sent: %s', info.messageId);                                   
  });        
}

exports.recuperarcontrasena = function(req, res){
    if(/^([A-Za-z0-9]{15})$/.test(req.body.token)){
      Usuario.find({token: req.body.token}, function(err, usuario) {
        if (err)
          res.send(err);
          res.json(usuario);    
          console.log(req.body.token + " token")
      });
    }
    else{
      res.send("No existe el token especificado");    
    }
}

exports.lista_todos_usuarios = function(req, res) {
    Usuario.find({}, function(err, usuarios) {
    if (err)
      res.send(err);
    res.json(usuarios);    
  });
};

exports.crear_usuario = function(req, res) {  
  const randomstring = require('just.randomstring');                   
  var nuevoUsuario = new Usuario(req.body);
  if(req.file){
    console.log("Con imagen");
    nuevoUsuario.fotoUrl = req.file.path
  }
  nuevoUsuario.save(function(err, usuario) {
    if (err)
      res.send(err);
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

exports.leer_usuario = function(req, res) {
  Usuario.find({correo: req.params.correo}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);        
  });
};

exports.modificar_usuario = function(req, res) {    
  Usuario.findOneAndUpdate({correo: req.params.correo},
     {$set: {
      "nombre": req.body.nombre,  
      "password": req.body.password,
      "token": req.body.token, 
      "fotoUrl" : req.file ? req.file.path : undefined,
      "telefono": req.body.telefono,
      "rol": req.body.rol                                                                                                                         
      }}, {new: false}, function(err, usuario) {
    if (err)
      res.send(err);        
        if(!req.file)
        borrarArchivo(usuario.fotoUrl);   
  res.json(usuario);
});  
};

exports.borrar_usuario = function(req, res) {
  Usuario.remove({
    correo: req.params.correo
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json({ message: 'EL usuario ' +req.params.correo +' fue borrado' });
  });
};
