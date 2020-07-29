const {admin} = require("..//FireBaseConfig"),
funcionesGlobales = require("../../FuncionesGlobales.js");
const { mensajes } = require("../../Globales");

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

exports.enviarNotificaciones = async function(Modelo, mensaje, dispositivo, objeto){
    Modelo
    .find()
    .where(dispositivo)
    .select({token: 1})
    .exec()
    .then(async tokens=>{
        await funcionesGlobales.asyncForEach(tokens, async (token)=>{
                                await enviarNotificacion(mensaje, token.token, objeto)
              });
    }).catch(err =>{
      funcionesGlobales.registrarError("enviarNotificaciones/AccesoDB", err)
    })
}

function mensajeaEnviar(titulo, mensaje, objeto){
  var mensaje ={
                  notification: {
                      title: titulo,
                      body: mensaje                      
                      },
                    data: objeto
                  
                }
    return mensaje;
}

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

  
async function enviarNotificacion(mensaje, registrationToken, objeto){
      const options =  notification_options,
      notificacion = mensajeaEnviar("SIRAR", mensaje, objeto);
      admin.messaging().sendToDevice(registrationToken, notificacion, options)
      .then( response => {
        console.log(response);
       })
      .catch( err => {
        funcionesGlobales.registrarError("enviarNotificacion/AccesoDB", err)
      });
}