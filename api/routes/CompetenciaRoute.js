'use strict';

module.exports = function(app, express) {
    var competenciaController = require('../controllers/CompetenciaController');
    var atletaCompetidorController = require("../controllers/AtletaCompetidorController");
    var equipoCompetidorController = require("../controllers/EquipoCompetidorController");
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

    routerGeneral.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
        .get(competenciaController.listarFasesxPruebaEvento)

    routerGeneral.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')    
        .get(competenciaController.listarCompetenciasEventoPruebaFase)
//----------------------------------------Atletas-----------------------
    routerGeneral.route('/listarAtletasPorCompetencia/:idCompetencia')
        .get(atletaCompetidorController.listarAtletasCompetencia)
        
    routerGeneral.route('/listarDeportePorEventoAtleta/:idAtleta/:idEvento')
        .get(atletaCompetidorController.listarDeportesEventosAtleta)

    routerGeneral.route('/listarPruebasPorDeporteYEventoAtleta/:idAtleta/:idEvento/:idDeporte')
        .get(atletaCompetidorController.listarPruebasDeporteEventosAtleta)

    routerGeneral.route('/listarCompetenciasPorPruebaAtleta/:idAtleta/:idEvento/:idPrueba')
        .get(atletaCompetidorController.listarCompetenciasPorPruebaAtleta)
//----------------------------------------Equipos-----------------------
    
    routerGeneral.route('/listarEquiposPorCompetencia/:idCompetencia')
        .get(equipoCompetidorController.listarEquiposCompetencia)

    routerGeneral.route('/listarDeportePorEventoEquipo/:idEquipo/:idEvento')
        .get(equipoCompetidorController.listarDeportesEventosEquipo)

    routerGeneral.route('/listarPruebasPorDeporteYEventoEquipo/:idEquipo/:idEvento/:idDeporte')
        .get(equipoCompetidorController.listarPruebasDeporteEventosEquipo)

    routerGeneral.route('/listarCompetenciasPorPruebaEquipo/:idEquipo/:idEvento/:idPrueba')
        .get(equipoCompetidorController.listarCompetenciasPorPruebaEquipo)

    /////--------------Admin

    routerAdm.route('/competencia')
        .post(competenciaController.crearCompetencia)

    routerAdm.route('/competencia/:idCompetencia')
        .put(competenciaController.modificarCompetencia)
//----------------------------------------Atletas-----------------------
    routerAdm.route('/atletaCompetencia')
        .post(atletaCompetidorController.ingresarAtletaACompetencia)

    routerAdm.route('/marcadoresAtletaCompetencia/:idAtleta/:agregar')
        .put(atletaCompetidorController.modificarMarcadores)

    routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
        .delete(atletaCompetidorController.eliminarAtletaDeCompetencia)
//----------------------------------------Equipos-----------------------

    routerAdm.route('/equipoCompetencia')
        .post(equipoCompetidorController.ingresarEquipoACompetencia)

    routerAdm.route('/marcadoresEquipoCompetencia/:idEquipo/:agregar')
        .put(equipoCompetidorController.modificarMarcadores)

    routerAdm.route('/equipoCompetencia/:idEquipoCompetencia')
        .delete(equipoCompetidorController.eliminarEquipoDeCompetencia)

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