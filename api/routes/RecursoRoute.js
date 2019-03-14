'use strict';

module.exports = function(app, express) {
    var recursoController = require('../controllers/RecursoController');
    var seguridad= require("./Seguridad.js");
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

routerGeneral.route('/banderas')
.get(recursoController.obtenerBanderas);

app.use("/", routerGeneral);
};