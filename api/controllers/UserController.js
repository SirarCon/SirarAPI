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

  function mailSender(emailadress, subject, message,res){
    'use strict';        
    const nodemailer = require('nodemailer');    
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',//'smtp.ethereal.email',
            port: 465,
           secure: true, // true for 465, false for other ports
            auth: {
                user:'casasolalonso@gmail.com',
                pass: 'Passwordg00gl3'
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'casasolalonso@gmail.com', // sender address
            to: emailadress,
            subject: subject, // Subject line
            //text: message, // plain text body
            html: message
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Adentro Error*****************");
              Usuario.remove({correo: mailOptions.to}, (err, usuario)=> {
                if (err)
                console.log(error);
              }) 
              res.json({code: '2020'});             
                return console.log(error);
            }
            res.send("Usuario " + mailOptions.to + " creado");
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            console.log("Adentro No Error------------------------");
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    
  }




exports.lista_todos_usuarios = function(req, res) {
    Usuario.find({}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
    console.log(req.params.correo + "params get G")
  });
};




exports.crear_usuario = function(req, res) {
  const randomstring = require('just.randomstring');                   
  var nuevo_usuario = new Usuario(req.body);
  nuevo_usuario.save(function(err, usuario) {
    if (err)
      res.send(err);
    if(usuario)      
      mailSender(usuario.correo,'Creación de contraseña','<p>Bienvenido ' +usuario.nombre + ' a SIRAR<p><link>localhost:3000/login/'+randomstring(15)+'</link>', res);              
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
    correo: req.body.correo
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json({ message: 'EL usuario fue borrado' });
  });
};
