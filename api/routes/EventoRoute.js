'use strict';

module.exports = function(app, express) {
    var eventoController = require('../controllers/EventoController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/eventos')
.get(eventoController.listarEventosActivos);

routerGeneral.route('/evento/:idEvento')
.get(eventoController.leerEventoActivo);

routerGeneral.route('/eventosPorAtletas/:idAtleta')
.get(eventoController.listarEventosAtleta)

routerAdm.route('/eventos')
.get(eventoController.listarTodosEventos)
.post(eventoController.crearEvento);

routerAdm.route('/evento/:idEvento')
.get(eventoController.leerEvento)
.put(eventoController.modificarEvento);

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};