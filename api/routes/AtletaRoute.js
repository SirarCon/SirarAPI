'use strict';

module.exports = function(app, express) {
var atletaController = require('../controllers/AtletaController');
var seguridad= require("./Seguridad.js");
var routerAdm = express.Router()
var routerGeneral = express.Router()
var {errorHandler} = require("../FuncionesGlobales");


//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);


//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/atletas/:retirado?')  
    .get(errorHandler(atletaController.listarAtletasActivos));

routerGeneral.route('/atleta/:id')
    .get(errorHandler(atletaController.leerAtletaActivo))

routerAdm.route('/atletas')
    .get(errorHandler(atletaController.listarAtletas))
    .post(errorHandler(atletaController.crearAtleta));

routerAdm.route('/atleta/:id')
    .get(errorHandler(atletaController.leerAtleta))
    .put(errorHandler(atletaController.modificarAtleta));

routerAdm.route('/atleta/medallas/:idAtleta/:agregar')
    .put(errorHandler(atletaController.modificarMedalla));

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
    
};
