'use strict';

module.exports = function(app, express) {
    var competenciaController = require('../controllers/CompetenciaController');
    var atletaCompetidorController = require("../controllers/AtletaCompetidorController");
    var equipoCompetidorController = require("../controllers/EquipoCompetidorController");
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

    //Se le assignan los middleware a los usuarios adm antes del login
    routerGeneral.use(seguridad.verificarTokenGeneral);

    //Se le assignan los middleware a los router de Adm luego del Login
    routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

    // //Rutas POST, GET, PUT, DELETE
    routerGeneral.route('/deportesPorEvento/:idEvento')  
        .get(errorHandler(competenciaController.listarDeportesXEvento));

    routerGeneral.route('/listarPruebasPorDeporte/:idEvento/:idDeporte')
        .get(errorHandler(competenciaController.listarPruebasXDeporte));

    routerGeneral.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
        .get(errorHandler(competenciaController.listarFasesxPruebaEvento));

    routerGeneral.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')    
        .get(errorHandler(competenciaController.listarCompetenciasEventoPruebaFase));
    
    routerGeneral.route('/competencia/:idCompetencia')
        .get(errorHandler(competenciaController.leerCompetencia));
//----------------------------------------Atletas-----------------------
    routerGeneral.route('/listarAtletasPorCompetencia/:idCompetencia')
        .get(errorHandler(atletaCompetidorController.listarAtletasCompetencia))
        
    routerGeneral.route('/listarDeportePorEventoAtleta/:idAtleta/:idEvento')
        .get(errorHandler(atletaCompetidorController.listarDeportesEventosAtleta))

    routerGeneral.route('/listarPruebasPorDeporteYEventoAtleta/:idAtleta/:idEvento/:idDeporte')
        .get(errorHandler(atletaCompetidorController.listarPruebasDeporteEventosAtleta))

    routerGeneral.route('/listarCompetenciasPorPruebaAtleta/:idAtleta/:idEvento/:idPrueba')
        .get(errorHandler(atletaCompetidorController.listarCompetenciasPorPruebaAtleta))
//----------------------------------------Equipos-----------------------
    
    routerGeneral.route('/listarEquiposPorCompetencia/:idCompetencia')
        .get(errorHandler(equipoCompetidorController.listarEquiposCompetencia));

    routerGeneral.route('/listarDeportePorEventoEquipo/:idEquipo/:idEvento')
        .get(errorHandler(equipoCompetidorController.listarDeportesEventosEquipo));

    routerGeneral.route('/listarPruebasPorDeporteYEventoEquipo/:idEquipo/:idEvento/:idDeporte')
        .get(errorHandler(equipoCompetidorController.listarPruebasDeporteEventosEquipo));

    routerGeneral.route('/listarCompetenciasPorPruebaEquipo/:idEquipo/:idEvento/:idPrueba')
        .get(errorHandler(equipoCompetidorController.listarCompetenciasPorPruebaEquipo));

    /////--------------Admin
    routerAdm.route('/deportesPorEvento/:idEvento')  
        .get(errorHandler(competenciaController.listarDeportesXEvento));

    routerAdm.route('/listarPruebasPorDeporte/:idEvento/:idDeporte')
        .get(errorHandler(competenciaController.listarPruebasXDeporte));

    routerAdm.route('/listarFasesPruebaEvento/:idEvento/:idPrueba/:genero') 
        .get(errorHandler(competenciaController.listarFasesxPruebaEvento));

    routerAdm.route('/listarCompetenciasEventoPruebaFase/:idEvento/:idPrueba/:genero/:fase')  
        .get(errorHandler(competenciaController.listarCompetenciasEventoPruebaFase));

    routerAdm.route('/competencia')
        .post(errorHandler(competenciaController.crearCompetencia));

    routerAdm.route('/competencia/:idCompetencia')
        .get(errorHandler(competenciaController.leerCompetencia));

    routerAdm.route('/competencia/:idCompetencia')
        .put(errorHandler(competenciaController.modificarCompetencia));

    routerAdm.route('/activarCompetencia/:idCompetencia')
        .put(errorHandler(competenciaController.cambiarEstadoCompetencia));

//----------------------------------------Atletas-----------------------
    routerAdm.route('/atletaCompetencia')
        .post(errorHandler(atletaCompetidorController.ingresarAtletaACompetencia));
    
    routerAdm.route('/atletasCompetencia')
        .post(errorHandler(atletaCompetidorController.ingresarAtletasACompetencia));

    routerAdm.route('/marcadoresAtletaCompetencia/:idAtleta/:agregar')
        .put(errorHandler(atletaCompetidorController.modificarMarcadores));

    routerAdm.route('/modificarAtletaCompetidor/:idAtleta')
        .put(errorHandler(atletaCompetidorController.modificarAtletaCompetidor))    

    routerAdm.route('/atletaCompetencia/:idAtletaCompetencia')
        .delete(errorHandler(atletaCompetidorController.eliminarAtletaDeCompetencia));
//----------------------------------------Equipos-----------------------

    routerAdm.route('/equipoCompetencia')
        .post(errorHandler(equipoCompetidorController.ingresarEquipoACompetencia));
    
    routerAdm.route('/equiposCompetencia')
        .post(errorHandler(equipoCompetidorController.ingresarEquiposACompetencia));

    routerAdm.route('/marcadoresEquipoCompetencia/:idEquipo/:agregar')
        .put(errorHandler(equipoCompetidorController.modificarMarcadores));

    routerAdm.route('/modificarEquipoCompetidor/:idEquipo')
        .put(errorHandler(equipoCompetidorController.modificarEquipoCompetidor))   

    routerAdm.route('/equipoCompetencia/:idEquipoCompetencia')
        .delete(errorHandler(equipoCompetidorController.eliminarEquipoDeCompetencia));

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