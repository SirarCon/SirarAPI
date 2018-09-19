'use strict';

module.exports = function(app, express) {
    var disciplinaController = require('../controllers/DisciplinaController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()


 
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/disciplinas')  
    .get(disciplinaController.listarDisciplinasGeneral);

routerAdm.route('api/disciplinas')
.get(disciplinaController.listarDisciplinas)
.post(disciplinaController.crearDisciplina);


routerAdm.route('api/disciplina/:id')
.get(disciplinaController.leerDisciplina)
.put(disciplinaController.modificarDisciplina)
.delete(disciplinaController.borrarDisciplina);




app.use("/api", routerAdm);
app.use("/", routerGeneral);
    

};
