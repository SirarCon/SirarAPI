const funcionesGlobales = require("../FuncionesGlobales.js"),
globales =  require("../Globales.js");


exports.tieneNotificacion = async function(token ,atletaId){
    var resultado = await fireBase.existeDispositivoAtleta({
        atleta: atletaId,
        token: token          
     });
     return resultado.length > 0;
}

exports.iterarAtletas = async function (token, atletas){
    await funcionesGlobales.asyncForEach(atletas ,async (element, indice, atletas) => {
         atletas[indice].fotoUrl = await funcionesGlobales.leerArchivoAsync(element.fotoUrl);               
         var tieneNotificacion = await module.exports.tieneNotificacion(token, element._id)
          atletas[indice] = element.infoPublica(tieneNotificacion);
     });
     return atletas;
 }

 exports.manejarErrorLeerAtleta = async function(err, req, res){
    funcionesGlobales.registrarError("leerAtletaActivo/AtletaController", err)
    res.json({token: res.locals.token, datos: globales.mensajes(13, "atleta", req.params.id)});
}

exports.manejarErrorLeerAtletas = async function (err, res){
    funcionesGlobales.registrarError("listarAtletasActivos/AtletaController", err)
    res.json({token: res.locals.token,datos: globales.mensajes(12, "los atletas", "")}); 
}