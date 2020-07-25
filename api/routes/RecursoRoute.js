'use strict';

module.exports = function(app, express) {
    var recursoController = require('../controllers/RecursoController');
    var seguridad= require("./Seguridad.js");
    var routerGeneral = express.Router()
    var routerAdm = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

    
    //Rutas POST, GET, PUT, DELETE
    routerGeneral.route('/paises')
      .get(errorHandler(recursoController.obtenerPaises));

    routerGeneral.route('/fases')
      .get(errorHandler(recursoController.obtenerFases));

    routerAdm.route('/paises')
      .get(errorHandler(recursoController.obtenerPaises)); 
      
    routerAdm.route('/fases')
      .get(errorHandler(recursoController.obtenerFases));

    routerAdm.route('/paises')
      .post(errorHandler(recursoController.crearPais));

    routerAdm.route('/pais')
      .delete(errorHandler(recursoController.borrarPais));

    routerAdm.route('/fases')
      .post(errorHandler(recursoController.crearFase));

    routerAdm.route('/fase')
      .delete(errorHandler(recursoController.borrarFase));

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