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

routerGeneral.route("/deporte/:id")
.get(deporteController.leerDeporteActiva);

routerGeneral.route('/federaciones')
.get(deporteController.listaFederacionesActivas);

routerGeneral.route('/federacion/:id')
.get(deporteController.leerFederacionActiva);

routerGeneral.route('/deporte/pruebas/:idDeporte')
.get(deporteController.listarPruebasActivas);

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

routerAdm.route('/deporte/:id')
.get(deporteController.leerDeporte)
.put(deporteController.modificarDeporte);

routerAdm.route('/federaciones')
.get(deporteController.listaTodasFederaciones)
.post(deporteController.crearFederacion);

routerAdm.route('/federacion/:id')
.get(deporteController.leerFederacion)
.put(deporteController.modificarFederacion);

routerAdm.route('/prueba/:idPrueba')
.get(deporteController.listarDeporteXPruebasActivas);

    
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
