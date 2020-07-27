'use strict';

module.exports = function(app, express) {
    var competenciaController = require('../controllers/CompetenciaController');
    var atletaCompetidorController = require("../controllers/AtletaCompetidorController");
    var equipoCompetidorController = require("../controllers/EquipoCompetidorController");
    var routerGeneral = express.Router()
    var {errorHandler} = require("../FuncionesGlobales");

    routerGeneral.route("/notificarAtleta")
        .post(atletaCompetidorController.registrarNotificacion);

    app.use("/", routerGeneral);
}