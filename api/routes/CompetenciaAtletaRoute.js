'use strict';

module.exports = function(app, express) {
    var competenciaAController = require('../controllers/CompetenciaAtletaController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

// //Rutas POST, GET, PUT, DELETE
routerGeneral.route('/deportesPorEvento/:idEvento')  
    .get(competenciaAController.listarDeportesXEvento);

routerGeneral.route('/listarCategoriasPorDeporte/:idEvento/:idDeporte')
    .get(competenciaAController.listarCategoriasXDeporte)

routerGeneral.route('/listarAtletasPorCompetencia/:idCompetencia')
    .get(competenciaAController.listarAtletasCompetencia)

routerGeneral.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
    .get(competenciaAController.listarFasesxPruebaEvento)

routerGeneral.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')    
    .get(competenciaAController.listarCompetenciasEventoPruebaFase)

routerGeneral.route('/listarDeportePorEventoAtleta/:idAtleta/:idEvento')
    .get(competenciaAController.listarDeportesEventosAtleta)

routerGeneral.route('/listarPruebasPorDeporteYEventoAtleta/:idAtleta/:idEvento/:idDeporte')
    .get(competenciaAController.listarPruebasDeporteEventosAtleta)

routerGeneral.route('/listarPruebasPorPruebaAtleta/:idAtleta/:idEvento/:idPrueba')
    .get(competenciaAController.listarCompetenciasPorPruebaAtleta)

routerAdm.route('/competencia')
    .post(competenciaAController.crearCompetencia)

routerAdm.route('/competencia/:idCompetencia')
    .put(competenciaAController.modificarCompetencia)

routerAdm.route('/atletaCompetencia')
    .post(competenciaAController.ingresarAtletaACompetencia)

routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
    .delete(competenciaAController.eliminarAtletaDeCompetencia)


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