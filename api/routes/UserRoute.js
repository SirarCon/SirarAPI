'use strict';
module.exports = function(app, express) {
const tokkenGlobal = require('../Globales.js').tokenGeneral.instance;
var userController = require('../controllers/UserController');
//import * as userController from '../controllers/UserController';
const AwtAuth = require('jsonwebtoken');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'imagenes/imagenesPerfil/');
  },
  filename: function(req, file, cb){                   
    cb(null, req.body.correo + "_imagen");
  }
  });

  const fileFilter = (req, file, cb)=>{
    if(file.mimetype  == 'image/jpeg' || file.mimetype  == 'image/png')
      cb(null, true);
      else
    cb(new Error("No es el formato permitido para la imagen"), false);    
  }

const upload = multer({storage: storage, limits:
  {filesize: 1024 * 1024 * 5},
  fileFilter: fileFilter
});  




var routerAdm = express.Router()
var routerGeneral = express.Router()

function verificarTokenGeneral(req, res, next){  
  //Set el Token
  req.token = extraerToken(req,'general');  
  req.token === tokkenGlobal ? next() : res.sendStatus(403);
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

function crearRandom(){
  const randomstring = require('just.randomstring');                   
  return randomstring(50);//Todo: Pasar a globales
}

function verify(req, res, next){
  AwtAuth.verify(extraerToken(req, 'authorization'), 'secretKey', (err, authData)=>{
  if(err){
      res.json({token: "", exito: false, error: 403, mensaje: "Sesión expirada o usuario sin permisos"});
  }else{
    var payload = crearRandom()
    AwtAuth.sign({payload}, 'secretKey', {expiresIn: "60s"}, 
            (err, token)=>{
               if(err){
                 console.log(err);
                 res.json({token: payload, exito: false, error: 50, mensaje: "Hubo un error creando token."});
              }
              else{
                res.locals.token = "token " + token;
                console.log(res.locals.token)
                next();
            }}
    );
  }
});
}



//Routas POST, GET, PUT, DELETE
routerGeneral.route('/login')  
    .post(userController.verificarLogin);

routerGeneral.route('/rps')  
    .post(userController.solicitarRecuperacion)
    .put(userController.recuperarcontrasena); 

routerGeneral.route('/rps/cambiar')  
    .post(userController.cambiarContrasena)

routerAdm.route('/usuarios/:identificacion?')
    .get(userController.lista_todos_usuarios)
    .post(/*upload.single('imagenUsuario'),*/ userController.crear_usuario);


routerAdm.route('/usuario/:identificacion')
    .get(userController.leer_usuario)
    .put(/*upload.single('imagenUsuario'),*/ userController.modificar_usuario)
    .delete(userController.borrar_usuario);

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
