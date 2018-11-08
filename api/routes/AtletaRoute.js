'use strict';

module.exports = function(app, express) {
var atletaController = require('../controllers/AtletaController');
var seguridad= require("./Seguridad.js");
var routerAdm = express.Router()
var routerGeneral = express.Router()


//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);


//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/atletas')  
    .get(atletaController.listarAtletasActivos);

routerGeneral.route('/atleta/:id')
    .get(atletaController.leerAtletaActivo)

routerAdm.route('/atletas')
    .get(atletaController.listarAtletas)
    .post(atletaController.crearAtleta);

routerAdm.route('/atleta/:id')
    .get(atletaController.leerAtleta)
    .put(atletaController.modificarAtleta);



app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
