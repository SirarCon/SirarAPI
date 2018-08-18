var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Usuario = require('./api/models/UserModel'), //created model loading here
  Mensaje = require('./api/models/MensajeModel'), //created model loading here
  bodyParser = require('body-parser')
  cors = require('cors');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(require('./api/Globales.js').nombreBD.instance)
.then(() => {
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '10mb'}));


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


