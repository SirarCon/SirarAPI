var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors');
  require('./api/models/MensajeModel');
  require('./api/models/UserModel'); //created model loading here
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(require('./api/Globales.js').nombreBD.instance)
.then(async () => {
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '10mb'}));

await require('./api/recursos/InicializacionDatos').Errores();
await require('./api/Globales').inicializarMensajes(mongoose);
var routes = require('./api/routes/UserRoute'); //importing route

routes(app, express); //register the route

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


