'use strict';

module.exports = function(app, express) {
    var deporteController = require('../controllers/DeporteController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

 
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/deportes')  
.get(deporteController.listarDeportesActivas);

routerGeneral.route("/deportes/:idFederacion")
.get(deporteController.listarDeportesActivasXFederacion);

routerGeneral.route("/deporte/:idDeporte")
.get(deporteController.leerDeporteActiva);

routerGeneral.route('/federaciones')
.get(deporteController.listaFederacionesActivas);

routerGeneral.route('/federacion/:idFederacion')
.get(deporteController.leerFederacionActiva);

routerGeneral.route('/deporte/pruebas/:idDeporte')
.get(deporteController.listarPruebasActivas);

routerGeneral.route('/prueba/:idPrueba')
.get(deporteController.listarDeporteXPruebasActivas);

routerAdm.route('/deportes')
.get(deporteController.listarDeportes)
.post(deporteController.crearDeporte);

routerAdm.route("/deportes/:idFederacion")
.get(deporteController.listarDeportesXFederacion);

routerAdm.route('/deporte/pruebas/:idDeporte')
.get(deporteController.listarPruebas);

routerAdm.route('/deporte/prueba/:idDeporte')
.post(deporteController.insertarPrueba);

routerAdm.route('/deporte/prueba/:idDeporte/:idPrueba')
.put(deporteController.modificarPrueba);

routerAdm.route('/deporte/:idDeporte')
.get(deporteController.leerDeporte)
.put(deporteController.modificarDeporte);

routerAdm.route('/federaciones')
.get(deporteController.listaTodasFederaciones)
.post(deporteController.crearFederacion);

routerAdm.route('/federacion/:idFederacion')
.get(deporteController.leerFederacion)
.put(deporteController.modificarFederacion);



    
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
