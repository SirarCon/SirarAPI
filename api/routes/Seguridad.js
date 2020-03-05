'use strict';
const AwtAuth = require('jsonwebtoken');
const globales = require("../Globales.js");
const tokkenGlobal = globales.tokenGeneral.instance;

//Authorization: Bearer <acceess_token>
function extraerToken(req, nombreHeader){
  var bearerToken = "";
  const bearerHEader = req.headers[nombreHeader];
  //check si bearer es undefined
  if(typeof bearerHEader !== 'undefined') {
    //divide el texto en el espacio en blanco
    const bearer = bearerHEader.split(' ');
    //Gettoken desde array    
    bearerToken = bearer[1];
  }
  
  return bearerToken;
};

module.exports ={
  
  verificarTokenGeneral: function (req, res, next){  
    //Set el Token
    req.token = extraerToken(req,'general');  
    req.token === tokkenGlobal ? next() : res.json({datos: globales.mensajes(403)});
  },
  

  verify: function (req, res, next){
    AwtAuth.verify(extraerToken(req, 'authorization'), 'secretKey', (err, authData)=>{
    if(err){
        res.json({datos: globales.mensajes(403)});
    }else{//Refresca el token
      var payload = globales.crearRandom(50).instance;
      AwtAuth.sign({payload}, 'secretKey', {expiresIn: "3000s"}, 
              (err, token)=>{
                 if(err){
                   console.log(err);
                   res.json({token: payload, datos: globales.mensajes(50)});
                }
                else{
                  res.locals.token = "token " + token;
                  next();
              }}
      );
    }
  });
  }
}; 