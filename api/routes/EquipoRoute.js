'use strict'

module.exports = function(app, express){
    var equipoController = require('../controllers/EquipoController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);
//Rutas POST, GET, PUT, DELETE

routerGeneral.route('/equipos/idEvento')
.get(equipoController.listarEquiposActivos);

routerGeneral.route('/equipo/:idEquipo')
.get(equipoController.leerEquipoActivo);

routerAdm.route('/equipos')
.post(equipoController.crearEquipo);

routerAdm.route('/equipo/:idEquipo')
.get(equipoController.leerEquipo)
.put(equipoController.modificarEquipo);

// production error handler
const HTTP_SERVER_ERROR = 500;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
console.log(err.message);
  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
})  

app.use("/api", routerAdm);
app.use("/", routerGeneral);
}