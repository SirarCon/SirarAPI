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
  
  async function configuracion(){
    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));//Antes de esto no se pueden regitsrar las rutas no se la razón
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(compression());

    await require('./api/recursos/InicializacionDatos').Errores();
    await require('./api/Globales').inicializarMensajes(mongoose);
    //sfs2e4ui7jq6b2qyglwhvgmsncgt46eumi2yddctdtg2rdmjb3qa

    registrarRutas();//Se registan las rutas luego de que todo está listo

    app.listen(port);
  }
  
  const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    cargarModelos();


    module.exports = {
        express: express,
        app: app,
        port: port,
        mongoose: mongoose,
        compression: compression,
        bodyParser: bodyParser,
        cors: cors,
        configuracion: configuracion,
    };