const fireBase = require("../fireBase/FireBaseRecurso"),
funcionesGlobales = require("../FuncionesGlobales");

exports.tieneNotificacionAtleta = async function(token, atletaId){
    var resultado = await fireBase.existeDispositivoAtleta({
    atleta: atletaId,
    token: token          
    });
    return resultado.length > 0;
}

exports.tieneNotificacionEquipo = async function(token, equipoId){
    var resultado = await fireBase.existeDispositivoEquipo({
    equipo: equipoId,
    token: token          
    });
    return resultado.length > 0;
}

exports.tieneNotificacionCompetencia = async function(token, competenciaId){
    var resultado = await fireBase.existeDispositivoCompetencia({
    competencia: competenciaId,
    token: token          
    });
    return resultado.length > 0;
}

exports.notificarIngresoAtleta = async function (Model, atletaC){
    var info = await obtenerInfoPartipante(Model, atletaC,
                                    {path: "atleta", select: "_id nombre"});
   fireBase.enviarNotificacionesAtleta(mensajeAtletaEnCompetencia(info),
                                        atletaC.atleta, retornarDatosCompetencia(info));
}

exports.notificarIngresoEquipo = async function (Model, equipoC){
    var info = await obtenerInfoPartipante(Model, equipoC,
       {path: "equipo", select: "_id nombre", 
                                populate:{path: "pais", select: "name"}});
   fireBase.enviarNotificacionesEquipo(mensajeEquipoEnCompetencia(info),
                                        equipoC.equipo, retornarDatosCompetencia(info));
}

exports.notificarCambioEnCompetencia = async function(competencia){
    fireBase.enviarNotificacionesCompetencia(mensajeCambioCompetencia(competencia),
    competencia._id, retornarDatosDesdeCompetencia(competencia));
}

exports.notificarInicioCierreCompetencia = async function(competencia){
    fireBase.enviarNotificacionesCompetencia(mensajeCambioCompetencia(competencia, true),
    competencia._id, retornarDatosDesdeCompetencia(competencia));
}

//#region funcionesAyuda

async function obtenerInfoPartipante(Model, participante, pathParticipante){
    return await Model.populate(participante, 
       [{path: "competencia", 
           select: "_id fechaHora descripcion", 
                   populate:[{path: "prueba", select: "_id nombre"},
                             {path: "evento", select: "_id nombre"},
                             {path: "fase", select: "_id descripcion"}]
       }, pathParticipante
     ])
}

function retornarDatosCompetencia(info){
    var datos = {
        competencia: info.competencia._id.toString(),
        prueba: info.competencia.prueba._id.toString(),
        evento: info.competencia.evento._id.toString()
    }
    return datos;
}

function retornarDatosDesdeCompetencia(competencia){
    var datos = {
        competencia: competencia._id.toString(),
        prueba: competencia.prueba._id.toString(),
        evento: competencia.evento.toString()
    }
    return datos;
}
//#endregion funcionesAyuda




//----------------------- Mensajes -----------------------------------------
//#region mensajes
function mensajeAtletaEnCompetencia(info){
    return "Atleta " + info.atleta.nombre +
     mensajeinfoCompetencia(info) +
     funcionesGlobales.construirFecha(info.competencia.fechaHora, true);
}

function mensajeEquipoEnCompetencia(info){
    return "Equipo " + info.equipo.pais.name +
    mensajeinfoCompetencia(info) +
    funcionesGlobales.construirFecha(info.competencia.fechaHora, true);
}

function mensajeinfoCompetencia(info){
    let descripcion = info.competencia.descripcion != "" ? " en " + info.competencia.descripcion : "";
    return  " participará en la fase " + info.competencia.fase.descripcion +
            " " + info.competencia.prueba.nombre + descripcion +
            " en " + info.competencia.evento.nombre + " el " ;
}

function mensajeCambioCompetencia(competencia, inicioTermino = false){
    var final = inicioTermino ?
                competencia.enVivo == 0 ? " finalizó." : " inició."
                : " actualizó su información";

    return "Competencia " + (competencia.descripcion != "" ?  competencia.descripcion + "," : "")
            + " en fase " + competencia.fase.descripcion + " " + competencia.prueba.nombre 
            + final;
}

function mensajeAtletaMarco(info){
    return "Atleta" + info.atleta.nombre +
    " registró " + mensajeMarcador(info);
}

function mensajeEquipoMarco(info){
    return "Equipo" + info.equipo.pais.name +
    " registró " + mensajeMarcador(info);
}
//Agregar Dispositivos de atleta a competencia (migrar) cuando se agrega atleta a competencia.
//Para así dejar de enviar notificaciones al dispositivo una vez desactivado la competencia. (Si fuera que alguien no quiere recibir notificaciones de esa competencia)
//Así al enviar notificaciones de atletas en marcadores enviar solo si tiene el dispositivo también en competencia
function mensajeMarcador(info){
    let tipo = info.competencia.prueba.tipo;
    let marcador = info.marcadores;//filter latest Marcador
    let registro = tipoMarcador == 1 ? marcador.puntos + " puntos o anotaciones":
    tipoMarcador == 2 ? " un tiempo de "+ marcador.tiempo : marcador.metros + " metros ";
    return registro + ", set: " + marcador.set + 
                marcador.momentoTiempo != undefined ? 
                " " + marcador.momentoTiempo :
                "oportunidad" + marcador.momentoOportunidad + "/" + marcador.cantidadOportunidades

    " "
}

//#endregion mensajes
