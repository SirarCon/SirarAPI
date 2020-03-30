'use strict';

module.exports = function(app, express) {
var usuarioController = require('../controllers/UsuarioController');
var seguridad= require("./Seguridad.js");
//import * as usuarioController from '../controllers/UsuarioController';

var routerAdm = express.Router()
var routerGeneral = express.Router()


//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);
routerGeneral.use(verificarCambioContrasena);
//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);


function verificarCambioContrasena(req, res, next){
if(req.body.passwordVieja){
    seguridad.verify(req, res, next);
}
else{
    next();
}
}

//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/login')  
    .post(usuarioController.verificarLogin);

routerGeneral.route('/rps')  
    .post(usuarioController.solicitarRecuperacion)
    .put(usuarioController.recuperarcontrasena); 

routerGeneral.route('/rps/cambiar')  
    .post(usuarioController.cambiarContrasena)

routerAdm.route('/usuarios/:identificacion?')
    .get(usuarioController.listaTodosUsuarios)
    .post(usuarioController.crearUsuario);


routerAdm.route('/usuario/:identificacion')
    .get(usuarioController.leerUsuario)
    .put(usuarioController.modificarUsuario)
    .delete(usuarioController.borrarUsuario);
    

// production error handler
const HTTP_SERVER_ERROR = 500;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
console.log(err.message);
  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
})      

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
