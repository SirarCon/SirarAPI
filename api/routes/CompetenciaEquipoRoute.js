'use strict';
//todo: Cambiar nombre de metodos
module.exports = function(app, express) {
    var competenciaEController = require('../controllers/CompetenciaEquipoController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

// //Rutas POST, GET, PUT, DELETE
routerGeneral.route('/deportesPorEvento/:idEvento')  
    .get(competenciaEController.listarDeportesXEvento);

routerGeneral.route('/listarCategoriasPorDeporte/:idEvento/:idDeporte')
    .get(competenciaEController.listarCategoriasXDeporte)

routerGeneral.route('/listarAtletasPorCompetencia/:idCompetencia')
    .get(competenciaEController.listarAtletasCompetencia)

routerGeneral.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
    .get(competenciaEController.listarFasesxPruebaEvento)

routerGeneral.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')    
    .get(competenciaEController.listarCompetenciasEventoPruebaFase)

routerGeneral.route('/listarDeportePorEventoAtleta/:idAtleta/:idEvento')
    .get(competenciaEController.listarDeportesEventosAtleta)

routerGeneral.route('/listarPruebasPorDeporteYEventoAtleta/:idAtleta/:idEvento/:idDeporte')
    .get(competenciaEController.listarPruebasDeporteEventosAtleta)

routerGeneral.route('/listarPruebasPorPruebaAtleta/:idAtleta/:idEvento/:idPrueba')
    .get(competenciaEController.listarCompetenciasPorPruebaAtleta)

routerAdm.route('/competencia')
    .post(competenciaEController.crearCompetencia)

routerAdm.route('/competencia/:idCompetencia')
    .put(competenciaEController.modificarCompetencia)

routerAdm.route('/atletaCompetencia')
    .post(competenciaEController.ingresarAtletaACompetencia)

routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
    .delete(competenciaEController.eliminarAtletaDeCompetencia)


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