'use strict';

module.exports = function(app, express) {
    var disciplinaController = require('../controllers/DisciplinaController');
    var seguridad= require("./Seguridad.js");
    var routerAdm = express.Router()
    var routerGeneral = express.Router()

//Se le assignan los middleware a los usuarios adm antes del login
routerGeneral.use(seguridad.verificarTokenGeneral);

//Se le assignan los middleware a los router de Adm luego del Login
routerAdm.use(seguridad.verificarTokenGeneral, seguridad.verify);

 
//Rutas POST, GET, PUT, DELETE
routerGeneral.route('/disciplinas')  
.get(disciplinaController.listarDisciplinasActivas);

routerGeneral.route("/disciplina/:id")
.get(disciplinaController.leerDisciplinaActiva);

routerGeneral.route('/federaciones')
.get(disciplinaController.listaFederacionesActivas);

routerGeneral.route('/federacion/:id')
.get(disciplinaController.leerFederacionActiva);

routerGeneral.route('/disciplina/pruebas/:idDisciplina')
.get(disciplinaController.listarPruebasActivas);

routerAdm.route('/disciplinas')
.get(disciplinaController.listarDisciplinas)
.post(disciplinaController.crearDisciplina);

routerAdm.route('/disciplina/pruebas/:idDisciplina')
.get(disciplinaController.listarPruebas);

routerAdm.route('/disciplina/prueba/:idDisciplina')
.post(disciplinaController.insertarPrueba);

routerAdm.route('/disciplina/prueba/:idDisciplina/:idPrueba')
.put(disciplinaController.editarPrueba);

routerAdm.route('/disciplina/:id')
.get(disciplinaController.leerDisciplina)
.put(disciplinaController.modificarDisciplina);

routerAdm.route('/federaciones')
.get(disciplinaController.listaTodasFederaciones)
.post(disciplinaController.crearFederacion);

routerAdm.route('/federacion/:id')
.get(disciplinaController.leerFederacion)
.put(disciplinaController.modificarFederacion);

app.use("/api", routerAdm);
app.use("/", routerGeneral);
    

};
