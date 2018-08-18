'use strict';
module.exports = function(app, express) {
const tokkenGlobal = require('../Globales.js').tokenGeneral.instance;
var userController = require('../controllers/UserController');
//import * as userController from '../controllers/UserController';
const AwtAuth = require('jsonwebtoken');

 
var routerAdm = express.Router()
var routerGeneral = express.Router()

function verificarTokenGeneral(req, res, next){  
  //Set el Token
  req.token = extraerToken(req,'general');  
  req.token === tokkenGlobal ? next() : res.json({token: "", exito: false, error: 403, mensaje: "Usuario sin permisos"});
}


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
}


//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(verificarTokenGeneral);
//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(verificarTokenGeneral, verify);


function verify(req, res, next){
  AwtAuth.verify(extraerToken(req, 'authorization'), 'secretKey', (err, authData)=>{
  if(err){
      res.json({token: "", exito: false, error: 403, mensaje: "Sesión expirada o usuario sin permisos"});
  }else{//Refresca el token
    var payload = require("../Globales.js").crearRandom(50).instance;
    AwtAuth.sign({payload}, 'secretKey', {expiresIn: "60s"}, 
            (err, token)=>{
               if(err){
                 console.log(err);
                 res.json({token: payload, exito: false, error: 50, mensaje: "Hubo un error creando token."});
              }
              else{
                res.locals.token = "token " + token;
                next();
            }}
    );
  }
});
}



//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/login')  
    .post(userController.verificarLogin);

routerGeneral.route('/rps')  
    .post(userController.solicitarRecuperacion)
    .put(userController.recuperarcontrasena); 

routerGeneral.route('/rps/cambiar')  
    .post(userController.cambiarContrasena)

routerAdm.route('/usuarios/:identificacion?')
    .get(userController.listaTodosUsuarios)
    .post(userController.crearUsuario);


routerAdm.route('/usuario/:identificacion')
    .get(userController.leerUsuario)
    .put(userController.modificarUsuario)
    .delete(userController.borrarUsuario);

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
