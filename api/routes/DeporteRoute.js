'use strict';

module.exports = function(app, express) {
    var deporteController = require('../controllers/DeporteController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

 
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/deportes')  
.get(errorHandler(deporteController.listarDeportesActivas));

routerGeneral.route("/deportes/:idFederacion")
.get(errorHandler(deporteController.listarDeportesActivasXFederacion));

routerGeneral.route("/deporte/:idDeporte")
.get(errorHandler(deporteController.leerDeporteActiva));

routerGeneral.route('/federaciones')
.get(errorHandler(deporteController.listaFederacionesActivas));

routerGeneral.route('/federacion/:idFederacion')
.get(errorHandler(deporteController.leerFederacionActiva));

routerGeneral.route('/deporte/pruebas/:idDeporte')
.get(errorHandler(deporteController.listarPruebasActivas));

routerGeneral.route('/prueba/:idPrueba')
.get(errorHandler(deporteController.listarDeporteXPruebasActivas));

routerAdm.route('/deportes')
.get(errorHandler(deporteController.listarDeportes))
.post(errorHandler(deporteController.crearDeporte));

routerAdm.route("/deportes/:idFederacion")
.get(errorHandler(deporteController.listarDeportesXFederacion));

routerAdm.route('/deporte/pruebas/:idDeporte')
.get(errorHandler(deporteController.listarPruebas));

routerAdm.route('/deporte/prueba/:idDeporte')
.post(errorHandler(deporteController.insertarPrueba));

routerAdm.route('/deporte/prueba/:idDeporte/:idPrueba')
.put(errorHandler(deporteController.modificarPrueba));

routerAdm.route('/deporte/:idDeporte')
.get(errorHandler(deporteController.leerDeporte))
.put(errorHandler(deporteController.modificarDeporte));

routerAdm.route('/federaciones')
.get(errorHandler(deporteController.listaTodasFederaciones))
.post(errorHandler(deporteController.crearFederacion));

routerAdm.route('/federacion/:idFederacion')
.get(errorHandler(deporteController.leerFederacion))
.put(errorHandler(deporteController.modificarFederacion));

// production error handler
const HTTP_SERVER_ERROR = 500;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
})    
app.use("/api", routerAdm);
app.use("/", routerGeneral);
    

};
