const {configuracion, app, port, mongoose} = require("./app");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(require('./api/Globales.js').nombreBD.instance,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true 
  })
.then(async () => {
  await configuracion();
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  }); 
  console.log('todo list RESTful API server started on: ' + port);
})
.catch((err) => {
  console.log('Error on start: ' + err);
});


