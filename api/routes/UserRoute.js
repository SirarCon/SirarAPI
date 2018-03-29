'use strict';
module.exports = function(app, express) {
  const tokkenGlobal = require('../Globales.js').tokenGeneral.instance;
  var userController = require('../controllers/UserController');
  const AwtAuth = require('jsonwebtoken');
  console.log(tokkenGlobal);
var routerAdm = express.Router()
var routerGeneral = express.Router()

function verificarTokenGeneral(req, res, next){  
  //Set el Token
  req.token = extraerToken(req,'general');  
  req.token === tokkenGlobal ? next() : res.sendStatus(403);
}

function verificarTokenAdm(req, res, next){
  //Set el Token
  req.token = extraerToken(req,'authorization');
  req.token !== "" ? next() : res.sendStatus(403);
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
      res.sendStatus(403);
  }else{
    /*res.json({
      message: 'message',
      authData
    });
    */
    next();
  }
});
}

//Routas POST, GET, PUT, DELETE
routerGeneral.route('/login')  
    .post(userController.verificarLogin);

routerGeneral.route('/rps')  
    .post(userController.recuperarcontrasena); 

routerAdm.route('/usuarios')
    .get(userController.lista_todos_usuarios)
    .post(userController.crear_usuario)
    .delete(userController.borrar_usuario);


routerAdm.route('/usuarios/:correo')
    .get(userController.leer_usuario)
    .put(userController.modificar_usuario);

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
