'use strict';

module.exports = function(app, express) {
var userController = require('../controllers/UserController');
var seguridad= require("./Seguridad.js");
//import * as userController from '../controllers/UserController';

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
