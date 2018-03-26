'use strict';


var mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario');
  const AwtAuth = require('jsonwebtoken');

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
        }else
        res.json({
          token: "No registro"
        }) 
      })
  };

  
exports.lista_todos_usuarios = function(req, res) {
    Usuario.find({}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
    console.log(req.params.correo + "params get G")
  });
};




exports.crear_usuario = function(req, res) {
  var nuevo_usuario = new Usuario(req.body);
  nuevo_usuario.save(function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};


exports.leer_usuario = function(req, res) {
  Usuario.find({correo: req.params.correo}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
    //res.json({b:"gok"});
    console.log(req.params.correo + "params leer")
  });
};


exports.modificar_usuario = function(req, res) {
  Usuario.findOneAndUpdate({correo: req.params.correo}, req.body, {new: true}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};


exports.borrar_usuario = function(req, res) {


  Usuario.remove({
    correo: req.params.correo
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json({ message: 'EL usuario fue borrado' });
  });
};
