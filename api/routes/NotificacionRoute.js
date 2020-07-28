'use strict';

module.exports = function(app, express) {
     var atletaController = require("../controllers/AtletaController"),
     equipoController = require("../controllers/EquipoController"),
     competenciaController = require("../controllers/CompetenciaController"),
     routerGeneral = express.Router(),
     {errorHandler} = require("../FuncionesGlobales");

     //---------------------------------- Atletas --------------------------------------------

    routerGeneral.route("/registrarDispositivoAtleta")
        .post(errorHandler(atletaController.registrarDispositivoAtleta));

    routerGeneral.route("/removerDispositivoAtleta")
        .delete(errorHandler(atletaController.removerDispositivoAtleta));

    //---------------------------------- Equipo --------------------------------------------

    routerGeneral.route("/registrarDispositivoEquipo")
        .post(errorHandler(equipoController.registrarDispositivoEquipo));

    routerGeneral.route("/removerDispositivoEquipo")
        .delete(errorHandler(equipoController.removerDispositivoEquipo));

    //---------------------------------- Competencia --------------------------------------------

    routerGeneral.route("/registrarDispositivoCompetencia")
        .post(errorHandler(competenciaController.registrarDispositivoCompetencia));
    
    routerGeneral.route("/removerDispositivoCompetencia")
        .delete(errorHandler(competenciaController.removerDispositivoCompetencia));

    app.use("/", routerGeneral);
}