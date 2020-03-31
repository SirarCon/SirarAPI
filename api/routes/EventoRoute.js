'use strict';

module.exports = function(app, express) {
    var eventoController = require('../controllers/EventoController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/eventos')
.get(errorHandler(eventoController.listarEventosActivos));

routerGeneral.route('/evento/:idEvento')
.get(errorHandler(eventoController.leerEventoActivo));

routerGeneral.route('/eventosPorAtletas/:idAtleta')
.get(errorHandler(eventoController.listarEventosAtleta));

routerAdm.route('/eventos')
.get(errorHandler(eventoController.listarTodosEventos))
.post(errorHandler(eventoController.crearEvento));

routerAdm.route('/evento/:idEvento')
.get(errorHandler(eventoController.leerEvento))
.put(errorHandler(eventoController.modificarEvento));

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