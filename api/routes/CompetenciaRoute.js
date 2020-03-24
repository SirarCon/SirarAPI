'use strict';

module.exports = function(app, express) {
    var competenciaController = require('../controllers/CompetenciaController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

// //Rutas POST, GET, PUT, DELETE
routerGeneral.route('/deportesPorEvento/:idEvento')  
    .get(competenciaController.listarDeportesXEvento);

routerGeneral.route('/listarCategoriasPorDeporte/:idEvento/:idDeporte')
    .get(competenciaController.listarCategoriasXDeporte)

routerGeneral.route('/listarAtletasPorCompetencia/:idCompetencia')
    .get(competenciaController.listarAtletasCompetencia)

routerGeneral.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
    .get(competenciaController.listarFasesxPruebaEvento)

routerGeneral.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')    
    .get(competenciaController.listarCompetenciasEventoPruebaFase)

routerGeneral.route('/listarDeportePorEventoAtleta/:idAtleta/:idEvento')
    .get(competenciaController.listarDeportesEventosAtleta)

routerGeneral.route('/listarPruebasPorDeporteYEventoAtleta/:idAtleta/:idEvento/:idDeporte')
    .get(competenciaController.listarPruebasDeporteEventosAtleta)

routerGeneral.route('/listarPruebasPorPruebaAtleta/:idAtleta/:idEvento/:idPrueba')
    .get(competenciaController.listarCompetenciasPorPruebaAtleta)

routerAdm.route('/competencia')
    .post(competenciaController.crearCompetencia)

routerAdm.route('/competencia/:idCompetencia')
    .put(competenciaController.modificarCompetencia)

routerAdm.route('/atletaCompetencia')
    .post(competenciaController.ingresarAtletaACompetencia)

routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
    .delete(competenciaController.eliminarAtletaDeCompetencia)


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
}