'use strict';

module.exports = function(app, express) {
    var recursoController = require('../controllers/RecursoController');
    var seguridad= require("./Seguridad.js");
    var routerGeneral = express.Router()
    var routerAdm = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

 
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/paises')
.get(recursoController.obtenerPaises);

routerGeneral.route('/fases')
.get(recursoController.obtenerFases);

routerAdm.route('/paises')
.post(recursoController.crearPais)

routerAdm.route('/pais')
.delete(recursoController.borrarPais)

routerAdm.route('/fases')
.post(recursoController.crearFase)

routerAdm.route('/fase')
.delete(recursoController.borrarFase)

var routerAdm = express.Router()

app.use("/api", routerAdm);
app.use("/", routerGeneral);
};