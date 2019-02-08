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


routerAdm.route('/competenciaAtleta')
    .post(competenciaAController.crearCompetenciaAtleta)

routerAdm.route('/competenciaAtleta/:idCompetencia')
    .put(competenciaAController.modificarCompetenciaAtleta)

routerAdm.route('/atletaCompetencia')
    .post(competenciaAController.ingresarAtletaACompetencia)

routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
    .delete(competenciaAController.eliminarAtletaDeCompetencia)

app.use("/api", routerAdm);
app.use("/", routerGeneral);
}