const {configuracion, mongoose} = require("./app");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(require('./api/Globales.js').nombreBD.instance,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true 
  })
.then(async () => {
  await configuracion(3000);
})
.catch((err) => {
  console.log('Error on start: ' + err);
});


