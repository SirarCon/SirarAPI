'use strict';

module.exports = function(app, express) {
var atletaController = require('../controllers/AtletaController');
var seguridad= require("./Seguridad.js");
var routerAdm = express.Router()
var routerGeneral = express.Router()

//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/atletas')  
    .get((req,res)=>{
        res.json({p:"prueba"});
    }); 

routerAdm.route('api/atletas')
    .get(atletaController.listarAtletas)
    .post(atletaController.crearAtleta);


routerAdm.route('api/atleta/:id')
    .get(atletaController.leerAtleta)
    .put(atletaController.modificarAtleta)
    .delete(atletaController.borrarAtleta);



app.use("/api", routerAdm);
app.use("/", routerGeneral);
    
};
