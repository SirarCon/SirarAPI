'use strict'

module.exports = function(app, express){
    var equipoController = require('../controllers/EquipoController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

  //Se le assignan los middleware a los usuarios adm antes del login
  routerGeneral.use(seguridad.verificarTokenGeneral);

  //Se le assignan los middleware a los router de Adm luego del Login
  routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);
  //Rutas POST, GET, PUT, DELETE

  routerGeneral.route('/equipos/:idEvento')
      .get(errorHandler(equipoController.listarEquiposActivos));

  routerGeneral.route('/equipo/:idEquipo')
      .get(errorHandler(equipoController.leerEquipoActivo));

  routerAdm.route('/equipos')
      .post(errorHandler(equipoController.crearEquipo));

  routerAdm.route('/equipos/:idEvento')
      .get(errorHandler(equipoController.listarEquipos));

  routerAdm.route('/equipo/:idEquipo')
      .get(errorHandler(equipoController.leerEquipo))
      .put(errorHandler(equipoController.modificarEquipo));

  routerAdm.route('/equipo/atletas/:idEquipo/:agregar')
      .put(errorHandler(equipoController.modificarAtletas));

  routerAdm.route('/equipo/medallas/:idEquipo/:agregar')
      .put(errorHandler(equipoController.modificarMedalla));

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
}