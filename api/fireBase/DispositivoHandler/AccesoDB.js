exports.registrarDispositivo = async function(Modelo, body){
    var modelo = new Modelo(body);
    return modelo.save();
  }
  
 exports.removerDispositivo = async function (Modelo, dispositivo){
    return Modelo.findOneAndRemove(dispositivo);
  }
  
  exports.existeDispositivo = async function (Modelo, dispositivo){
    return Modelo.find(dispositivo);
  }

exports.enviarNotificaciones = async function(Modelo, mensaje, dispositivo){
    Modelo
    .find()
    .where(dispositivo)
    .select({token: 1})
    .exec()
    .then(async tokens=>{
        await funcionesGlobales.asyncForEach(tokens, async (token)=>{
                                await enviarNotificacion(mensaje, token)
              });
    }).catch(err =>{
      funcionesGlobales.registrarError("enviarNotificaciones/AccesoDB", err)
    })
}

function mensajeaEnviar(titulo, mensaje){
    var mensaje ={
                  notification: {
                      title: titulo,
                      body: mensaje
                      }
                }
    return mensaje;
}
  
async function  enviarNotificacion(mensaje, registrationToken){
  console.log(registrationToken)
      const options =  notification_options,
      notificacion = mensajeaEnviar("SIRAR", mensaje);
      admin.messaging().sendToDevice(registrationToken, notificacion, options)
      .then( response => {

        console.log(response);
       })
      .catch( err => {
        funcionesGlobales.registrarError("enviarNotificacion/AccesoDB", err)
      });
}