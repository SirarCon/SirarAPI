function cargarModelos(){
  require('./api/models/MensajeModel');
  require('./api/models/PaisModel');
  require('./api/models/FaseModel');
  require('./api/models/UserModel'); //created model loading here
  require('./api/models/FederacionModel');
  require('./api/models/DeporteModel');
  require('./api/models/AtletaModel');
  require('./api/models/EventoModel');
  require('./api/models/PruebaModel');
  require('./api/models/CompetenciaAtletaModel');
  require('./api/models/AtletaCompetidorModel');  
}

function registrarRutas(app, express){
  //importing routes
var routes = [require('./api/routes/UserRoute'),
             require('./api/routes/AtletaRoute'), 
             require('./api/routes/DeporteRoute'),
             require('./api/routes/EventoRoute'),
             require('./api/routes/CompetenciaAtletaRoute'),
             require('./api/routes/RecursoRoute')
              ]; 
   //register the route
   routes.forEach((ruta) =>{ ruta(app, express)});
}

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  cors = require('cors');
  cargarModelos();
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(require('./api/Globales.js').nombreBD.instance)
.then(async () => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.use(bodyParser.json({limit: '10mb'}));
   app.use(compression());
  
    await require('./api/recursos/InicializacionDatos').Errores();
    await require('./api/Globales').inicializarMensajes(mongoose);
    registrarRutas(app, express);
    //sfs2e4ui7jq6b2qyglwhvgmsncgt46eumi2yddctdtg2rdmjb3qa
    app.listen(port);

    app.use(function(req, res) {
      res.status(404).send({url: req.originalUrl + ' not found'})
    });

    console.log('todo list RESTful API server started on: ' + port);

})
.catch((err) => {
  console.log('Error on start: ' + err);
});


