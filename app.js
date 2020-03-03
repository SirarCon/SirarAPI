function cargarModelos(){
    require('./api/models/ContadorModel');
    require('./api/models/MensajeModel');
    require('./api/models/PaisModel');
    require('./api/models/FaseModel');
    require('./api/models/UserModel'); //created model loading here
    require('./api/models/FederacionModel');
    require('./api/models/DeporteModel');
    require('./api/models/AtletaModel');
    require('./api/models/EquipoModel');
    require('./api/models/EventoModel');
    require('./api/models/PruebaModel');
    require('./api/models/CompetenciaAtletaModel');
    require('./api/models/AtletaCompetidorModel');  
  }

  function registrarRutas(){
    //importing routes
  var routes = [require('./api/routes/UserRoute'),
               require('./api/routes/AtletaRoute'), 
               require('./api/routes/DeporteRoute'),
               //require('./api/routes/EquipoRoute'),
               require('./api/routes/EventoRoute'),
               require('./api/routes/CompetenciaAtletaRoute'),
               require('./api/routes/RecursoRoute')
                ]; 
     //register the route
     routes.forEach((ruta) =>{ ruta(app, express)});
  }
  
  async function configuracion(port){

    var logDirectory = path.join(__dirname, 'log');

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var accessLogStream = rfs.getStream({
      filename: logDirectory + "/sirar-%DATE%.log",
       frequency:"daily" 
    });

    // setup the logger
    app.use(assignId)
    app.use(morgan(':id :method :status :url :response-time [:date[clf]]' , { stream: accessLogStream }))


    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));//Antes de esto no se pueden regitsrar las rutas no se la razón
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(compression());

    await require('./api/recursos/InicializacionDatos').Errores();
    await require('./api/Globales').inicializarMensajes(mongoose);
    //sfs2e4ui7jq6b2qyglwhvgmsncgt46eumi2yddctdtg2rdmjb3qa

    registrarRutas();//Se registan las rutas luego de que todo está listo

    app.listen(port);
    console.log('todo list RESTful API server started on: ' + port);


  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  }); 
    return app;
  }
  
  const express = require('express'),
    app = express(),
    //port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    uuid = require('node-uuid')
    rfs = require("file-stream-rotator");

    morgan.token('id', function getId (req) {
      return req.id
    });

    function assignId (req, res, next) {
      req.id = uuid.v4()
      next()
    }
    
    cargarModelos();


    module.exports = {
        express: express,
        app: app,
        mongoose: mongoose,
        compression: compression,
        bodyParser: bodyParser,
        cors: cors,
        configuracion: configuracion,
    };