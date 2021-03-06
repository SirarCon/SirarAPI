'use strict';
var mongoose = require('mongoose'),
Error = mongoose.model('Error'),
Contador = mongoose.model('Contador'),
Mensaje = mongoose.model('Mensaje'),
Pais = mongoose.model('Pais'),
Fase = mongoose.model('Fase'),
Usuario = mongoose.model('Usuario'),
Deporte = mongoose.model('Deporte'),
Atleta = mongoose.model('Atleta'),
Equipo = mongoose.model('Equipo'),
Prueba = mongoose.model('Prueba'),
Usuario = mongoose.model('Usuario'),
Competencia = mongoose.model('Competencia'),
AtletaCompetidor = mongoose.model('AtletaCompetidor'),
EquipoCompetidor = mongoose.model('EquipoCompetidor'),
NotificacionAtleta = mongoose.model('NotificacionAtleta'),
NotificacionEquipo = mongoose.model('NotificacionEquipo'),
NotificacionCompetencia = mongoose.model('NotificacionCompetencia'),
Evento = mongoose.model('Evento'),
Federacion = mongoose.model('Federacion'),
globales =  require("../Globales.js"),
funcionesGlobales = require("../FuncionesGlobales.js"),
rutaImagenesFederaciones = globales.rutaImagenesFederaciones.instance,
rutaImagenesEventos = globales.rutaImagenesEventos.instance,
rutaImagenesAtletas = globales.rutaImagenesAtletas.instance,

//Tener cuidado con estas 2 variables:
borrarTodosDatos = false,
insertarTodosDatos = false,

borrarErrores = false,
borrarMensajes = true,
borrarContadores = false,
borrarPaises = false,
borrarFases = false,
borrarFederaciones = false,
borrarDeportes = false,
borrarPruebas =false,
borrarUsuarios = false,
borrarAtletas = false,
borrarEquipos = false,
borrarEventos = false,
borrarCompetencias = false,
borrarAtletasCompetidores = false,
borrarEquiposCompetidores = false,
borrarNotificacionesAtletas = false,
borrarNotificacionesEquipos = false,
borrarNotificacionesCompetencias = false,

insertarMensajes = true,
insertarContadores = false,
insertarPaises = false,
insertarFases = false,
insertarFederaciones = false,
insertarDeportes = false,
insertarPruebas =false,
insertarUsuarios = false,
insertarAtletas = false,
insertarEquipos = false,
insertarEventos = false,
insertarCompetencias = false,
insertarAtletasCompetidores = false,
insertarEquiposCompetidores = false;

function cambiarEstadosBorrar(estado){
    borrarErrores = estado;
    borrarMensajes = estado,
    borrarContadores = estado,
    borrarPaises = estado,
    borrarFases = estado,
    borrarFederaciones = estado,
    borrarDeportes = estado,
    borrarPruebas =estado,
    borrarUsuarios = estado,
    borrarAtletas = estado;
    borrarEquipos = estado;  
    borrarEventos = estado; 
    borrarCompetencias = estado;
    borrarAtletasCompetidores = estado;
    borrarEquiposCompetidores = estado;
    borrarNotificacionesAtletas = estado;
    borrarNotificacionesEquipos = estado;
    borrarNotificacionesCompetencias = estado;
}

function cambiarEstadosInsertar(estado){
    insertarMensajes = estado;
    insertarContadores = estado;
    insertarPaises = estado;
    insertarFases = estado;
    insertarFederaciones = estado;
    insertarDeportes = estado;
    insertarPruebas = estado;
    insertarUsuarios = estado;
    insertarAtletas = estado;   
    insertarEquipos = estado;
    insertarEventos = estado;
    insertarCompetencias = estado;
    insertarAtletasCompetidores = estado;
    insertarEquiposCompetidores = estado;
}

if(borrarTodosDatos)
    cambiarEstadosBorrar(true);
if(insertarTodosDatos)
    cambiarEstadosInsertar(true);
 
async function inicializar(arreglo){
    await funcionesGlobales.asyncForEach(arreglo, async (element, indice, arreglo) => {    
        await arreglo[indice].save().then(async ()=> {
                    }).catch(err=>{ 
                        console.log(arreglo[indice])
                        console.log(err)}) ;
            });
}


exports.Datos = async function(){
    var opciones = { upsert: true, new: true, setDefaultsOnInsert: true };
    
    if(borrarErrores)
        Error.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarMensajes)
        Mensaje.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarContadores)
        Contador.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarUsuarios)
        Usuario.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarAtletasCompetidores)
        AtletaCompetidor.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarEquiposCompetidores)
        EquipoCompetidor.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarCompetencias)
        Competencia.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarPruebas)
        Prueba.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarAtletas)
        Atleta.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarEquipos)
        Equipo.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarDeportes)
        Deporte.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarFederaciones)
        Federacion.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarEventos)
        Evento.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarPaises)
        Pais.deleteMany({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarFases)
        Fase.deleteMany({},(e,el)=>{});//>e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarNotificacionesEquipos)
        NotificacionEquipo.deleteMany({},(e,el)=>{});//>e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarNotificacionesAtletas)
        NotificacionAtleta.deleteMany({},(e,el)=>{});//>e?console.log(e + "error"): console.log(el+ "exitos"));
    if(borrarNotificacionesCompetencias)
        NotificacionCompetencia.deleteMany({},(e,el)=>{});//>e?console.log(e + "error"): console.log(el+ "exitos"));
        
    if(insertarContadores){
        var contadores= [
                    new Contador({"_id": "evento", "sequence_value": 0 }),
                    new Contador({"_id": "federacion", "sequence_value": 0 }),
                    new Contador({"_id": "deporte", "sequence_value": 0 }),
                    new Contador({"_id": "competencia", "sequence_value": 0 }),
                    new Contador({"_id": "atleta", "sequence_value": 0 }),
                    new Contador({"_id": "atletaCompetidor", "sequence_value": 0 }),
                    new Contador({"_id": "prueba", "sequence_value": 0 }),
                    new Contador({"_id": "mensaje", "sequence_value": 0 }),
                    new Contador({"_id": "medalla", "sequence_value": 0 }),
                    new Contador({"_id": "tablaPosicion", "sequence_value": 0 }),
                    new Contador({"_id": "equipo", "sequence_value": 0 }),
                    new Contador({"_id": "equipoCompetidor", "sequence_value": 0 }),

        ];

        await inicializar(contadores);

    }


    if(insertarMensajes){
        var mensajes = [
        //----------------------------------- Mensajes de éxito -------------------------------------------------
        new Mensaje({"mensaje": "", "codigo": -1, "exito": 1 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 }),
        new Mensaje({"mensaje": "Contraseña de {sustantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1}),
        new Mensaje({"mensaje": "Se ha ingresado {sustantivoCambiar} {id} .", "codigo": -7, "exito": 1 }),
        new Mensaje({"mensaje": "No hay {sustantivoCambiar} que listar", "codigo" : -8, "exito": 1 }),
        new Mensaje({"mensaje": "Alerta creada para {sustantivoCambiar}", "codigo" : -9, "exito": 1 }),
        new Mensaje({"mensaje": "Alerta eliminada correctamente", "codigo" : -10, "exito": 1 }),
        //----------------------------------- Mensajes de error -------------------------------------------------
        new Mensaje({"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema borrando {sustantivoCambiar} {id}", "codigo": 3, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema enviando {sustantivoCambiar} a {id}", "codigo": 4, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema buscando {sustantivoCambiar} {id}", "codigo" : 5, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 }),
        new Mensaje({"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 }),
        new Mensaje({"mensaje": "Contraseñas son distintas", "codigo" : 9, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema creando {sustantivoCambiar} {id}", "codigo" : 10, "exito": 0 }), 
        new Mensaje({"mensaje": "Hubo un problema leyendo {sustantivoCambiar}", "codigo" : 12, "exito": 0 }),   
        new Mensaje({"mensaje": "Hubo un problema leyendo {sustantivoCambiar} {id}", "codigo" : 13, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un error modificando {sustantivoCambiar} {id}", "codigo" :14, "exito": 0 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} indicado ya está registrado", "codigo" :15, "exito": 0 }),
        new Mensaje({"mensaje": "{sustantivoCambiar} {id} no tiene formato adecuado", "codigo" :16, "exito": 0 }),
        new Mensaje({"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 }),
        new Mensaje({"mensaje": "No existe {sustantivoCambiar}", "codigo" : 18, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema ingresando {sustantivoCambiar} {id}", "codigo" : 19, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema borrando {sustantivoCambiar} {id}", "codigo" : 20, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema ingresando {sustantivoCambiar} {id}", "codigo" : 21, "exito": 0 }), 
        new Mensaje({"mensaje": "Ya se ingresó el {sustantivoCambiar} {id}", "codigo" : 22, "exito": 0 }), 
        new Mensaje({"mensaje": "Hubo un error {sustantivoCambiar} notificación para {id}", "codigo" : 23, "exito": 0 }), 
        new Mensaje({"mensaje": "Ya existe esa notificación", "codigo" : 24, "exito": 0 }), 
        new Mensaje({"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema guardando la foto", "codigo" : 100, "exito": 0 }),
        new Mensaje({"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 }),
        new Mensaje({"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 }),

        //----------------------------------- Mensajes de eventos -------------------------------------------------

        new Mensaje({"mensaje": "{sustantivoCambiar} {id} va a participar en evento  ", "codigo": 1001, "exito": 0 }),

        ]
        await inicializar(mensajes);

    }

    if(insertarPaises){
        var paises = [
                new Pais({
                    "name": "Antigua y Barbuda",
                    "_id": "028",
                    "flag": "https://restcountries.eu/data/atg.svg"
                }),
                new Pais({
                    "name": "Argentina",
                    "_id": "032",
                    "flag": "https://restcountries.eu/data/arg.svg"
                }),
                new Pais({
                    "name": "Aruba",
                    "_id": "533",
                    "flag": "https://restcountries.eu/data/abw.svg"
                }),
                new Pais({
                    "name": "Australia",
                    "_id": "036",
                    "flag": "https://restcountries.eu/data/aus.svg"
                }),
                new Pais({
                    "name": "Austria",
                    "_id": "040",
                    "flag": "https://restcountries.eu/data/aut.svg"
                }),
                new Pais({
                    "name": "Bahamas",
                    "_id": "044",
                    "flag": "https://restcountries.eu/data/bhs.svg"
                }),
                new Pais({
                    "name": "Barbados",
                    "_id": "052",
                    "flag": "https://restcountries.eu/data/brb.svg"
                }),
                new Pais({
                    "name": "Bélgica",
                    "_id": "056",
                    "flag": "https://restcountries.eu/data/bel.svg"
                }),
                new Pais({
                    "name": "Belice",
                    "_id": "084",
                    "flag": "https://restcountries.eu/data/blz.svg"
                }),
                new Pais({
                    "name": "Bermuda",
                    "_id": "060",
                    "flag": "https://restcountries.eu/data/bmu.svg"
                }),
                new Pais({
                    "name": "Bolivia",
                    "_id": "068",
                    "flag": "https://restcountries.eu/data/bol.svg"
                }),
                new Pais({
                    "name": "Bosnia y Herzegovina",
                    "_id": "070",
                    "flag": "https://restcountries.eu/data/bih.svg"
                }),
                new Pais({
                    "name": "Brasil",
                    "_id": "076",
                    "flag": "https://restcountries.eu/data/bra.svg"
                }),
                new Pais({
                    "name": "Bulgaria",
                    "_id": "100",
                    "flag": "https://restcountries.eu/data/bgr.svg"
                }),
                new Pais({
                    "name": "Camerún",
                    "_id": "120",
                    "flag": "https://restcountries.eu/data/cmr.svg"
                }),
                new Pais({
                    "name": "Canadá",
                    "_id": "124",
                    "flag": "https://restcountries.eu/data/can.svg"
                }),
                new Pais({
                    "name": "Cabo Verde",
                    "_id": "132",
                    "flag": "https://restcountries.eu/data/cpv.svg"
                }),
                new Pais({
                    "name": "Islas Caimán",
                    "_id": "136",
                    "flag": "https://restcountries.eu/data/cym.svg"
                }),
                new Pais({
                    "name": "Chile",
                    "_id": "152",
                    "flag": "https://restcountries.eu/data/chl.svg"
                }),
                new Pais({
                    "name": "China",
                    "_id": "156",
                    "flag": "https://restcountries.eu/data/chn.svg"
                }),
                new Pais({
                    "name": "Colombia",
                    "_id": "170",
                    "flag": "https://restcountries.eu/data/col.svg"
                }),
                new Pais({
                    "name": "Congo",
                    "_id": "178",
                    "flag": "https://restcountries.eu/data/cog.svg"
                }),
                new Pais({
                    "name": "Costa Rica",
                    "_id": "188",
                    "flag": "https://restcountries.eu/data/cri.svg"
                }),
                new Pais({
                    "name": "Croacia",
                    "_id": "191",
                    "flag": "https://restcountries.eu/data/hrv.svg"
                }),
                new Pais({
                    "name": "Cuba",
                    "_id": "192",
                    "flag": "https://restcountries.eu/data/cub.svg"
                }),
                new Pais({
                    "name": "Curazao",
                    "_id": "531",
                    "flag": "https://restcountries.eu/data/cuw.svg"
                }),
                new Pais({
                    "name": "República Checa",
                    "_id": "203",
                    "flag": "https://restcountries.eu/data/cze.svg"
                }),
                new Pais({
                    "name": "Dinamarca",
                    "_id": "208",
                    "flag": "https://restcountries.eu/data/dnk.svg"
                }),
                new Pais({
                    "name": "República Dominicana",
                    "_id": "214",
                    "flag": "https://restcountries.eu/data/dom.svg"
                }),
                new Pais({
                    "name": "Ecuador",
                    "_id": "218",
                    "flag": "https://restcountries.eu/data/ecu.svg"
                }),
                new Pais({
                    "name": "Egipto",
                    "_id": "818",
                    "flag": "https://restcountries.eu/data/egy.svg"
                }),
                new Pais({
                    "name": "El Salvador",
                    "_id": "222",
                    "flag": "https://restcountries.eu/data/slv.svg"
                }),
                new Pais({
                    "name": "Finlandia",
                    "_id": "246",
                    "flag": "https://restcountries.eu/data/fin.svg"
                }),
                new Pais({
                    "name": "Francia",
                    "_id": "250",
                    "flag": "https://restcountries.eu/data/fra.svg"
                }),
                new Pais({
                    "name": "Alemania",
                    "_id": "276",
                    "flag": "https://restcountries.eu/data/deu.svg"
                }),
                new Pais({
                    "name": "Ghana",
                    "_id": "288",
                    "flag": "https://restcountries.eu/data/gha.svg"
                }),
                new Pais({
                    "name": "Grecia",
                    "_id": "300",
                    "flag": "https://restcountries.eu/data/grc.svg"
                }),
                new Pais({
                    "name": "Granada",
                    "_id": "308",
                    "flag": "https://restcountries.eu/data/grd.svg"
                }),
                new Pais({
                    "name": "Guadalupe",
                    "_id": "312",
                    "flag": "https://restcountries.eu/data/glp.svg"
                }),
                new Pais({
                    "name": "Guatemala",
                    "_id": "320",
                    "flag": "https://restcountries.eu/data/gtm.svg"
                }),
                new Pais({
                    "name": "Guinea",
                    "_id": "324",
                    "flag": "https://restcountries.eu/data/gin.svg"
                }),
                new Pais({
                    "name": "Guyana",
                    "_id": "328",
                    "flag": "https://restcountries.eu/data/guy.svg"
                }),
                new Pais({
                    "name": "Haití",
                    "_id": "332",
                    "flag": "https://restcountries.eu/data/hti.svg"
                }),
                new Pais({
                    "name": "Honduras",
                    "_id": "340",
                    "flag": "https://restcountries.eu/data/hnd.svg"
                }),
                new Pais({
                    "name": "Hong Kong",
                    "_id": "344",
                    "flag": "https://restcountries.eu/data/hkg.svg"
                }),
                new Pais({
                    "name": "Hungría",
                    "_id": "348",
                    "flag": "https://restcountries.eu/data/hun.svg"
                }),
                new Pais({
                    "name": "Islandia",
                    "_id": "352",
                    "flag": "https://restcountries.eu/data/isl.svg"
                }),
                new Pais({
                    "name": "India",
                    "_id": "356",
                    "flag": "https://restcountries.eu/data/ind.svg"
                }),
                new Pais({
                    "name": "Indonesia",
                    "_id": "360",
                    "flag": "https://restcountries.eu/data/idn.svg"
                }),
                new Pais({
                    "name": "Costa de Marfil",
                    "_id": "384",
                    "flag": "https://restcountries.eu/data/civ.svg"
                }),
                new Pais({
                    "name": "Irán",
                    "_id": "364",
                    "flag": "https://restcountries.eu/data/irn.svg"
                }),
                new Pais({
                    "name": "Irak",
                    "_id": "368",
                    "flag": "https://restcountries.eu/data/irq.svg"
                }),
                new Pais( {
                    "name": "Irlanda",
                    "_id": "372",
                    "flag": "https://restcountries.eu/data/irl.svg"
                }),
                new Pais({
                    "name": "Israel",
                    "_id": "376",
                    "flag": "https://restcountries.eu/data/isr.svg"
                }),
                new Pais({
                    "name": "Italia",
                    "_id": "380",
                    "flag": "https://restcountries.eu/data/ita.svg"
                }),
                new Pais({
                    "name": "Jamaica",
                    "_id": "388",
                    "flag": "https://restcountries.eu/data/jam.svg"
                }),
                new Pais({
                    "name": "Japón",
                    "_id": "392",
                    "flag": "https://restcountries.eu/data/jpn.svg"
                }),
                new Pais({
                    "name": "Kenia",
                    "_id": "404",
                    "flag": "https://restcountries.eu/data/ken.svg"
                }),
                new Pais({
                    "name": "Malasia",
                    "_id": "548",
                    "flag": "https://restcountries.eu/data/mys.svg"
                }),
                new Pais({
                    "name": "Martinica",
                    "_id": "474",
                    "flag": "https://restcountries.eu/data/mtq.svg"
                }),
                new Pais({
                    "name": "México",
                    "_id": "484",
                    "flag": "https://restcountries.eu/data/mex.svg"
                }),
                new Pais({
                    "name": "Holanda",
                    "_id": "528",
                    "flag": "https://restcountries.eu/data/nld.svg"
                }),
                new Pais({
                    "name": "Nueva Zelanda",
                    "_id": "554",
                    "flag": "https://restcountries.eu/data/nzl.svg"
                }),
                new Pais({
                    "name": "Nicaragüa",
                    "_id": "558",
                    "flag": "https://restcountries.eu/data/nic.svg"
                }),
                new Pais({
                    "name": "Nigeria",
                    "_id": "566",
                    "flag": "https://restcountries.eu/data/nga.svg"
                }),
                new Pais({
                    "name": "Corea del Norte",
                    "_id": "408",
                    "flag": "https://restcountries.eu/data/prk.svg"
                }),
                new Pais({
                    "name": "Noruega",
                    "_id": "578",
                    "flag": "https://restcountries.eu/data/nor.svg"
                }),
                new Pais({
                    "name": "Omán",
                    "_id": "512",
                    "flag": "https://restcountries.eu/data/omn.svg"
                }),
                new Pais({
                    "name": "Pakistán",
                    "_id": "586",
                    "flag": "https://restcountries.eu/data/pak.svg"
                }),
                new Pais({
                    "name": "Panamá",
                    "_id": "591",
                    "flag": "https://restcountries.eu/data/pan.svg"
                }),
                new Pais({
                    "name": "Paraguay",
                    "_id": "600",
                    "flag": "https://restcountries.eu/data/pry.svg"
                }),
                new Pais({
                    "name": "Perú",
                    "_id": "604",
                    "flag": "https://restcountries.eu/data/per.svg"
                }),
                new Pais({
                    "name": "Polonia",
                    "_id": "616",
                    "flag": "https://restcountries.eu/data/pol.svg"
                }),
                new Pais({
                    "name": "Portugal",
                    "_id": "620",
                    "flag": "https://restcountries.eu/data/prt.svg"
                }),
                new Pais({
                    "name": "Puerto Rico",
                    "_id": "630",
                    "flag": "https://restcountries.eu/data/pri.svg"
                }),
                new Pais({
                    "name": "Qatar",
                    "_id": "634",
                    "flag": "https://restcountries.eu/data/qat.svg"
                }),
                new Pais({
                    "name": "Rumania",
                    "_id": "642",
                    "flag": "https://restcountries.eu/data/rou.svg"
                }),
                new Pais({
                    "name": "Rusia",
                    "_id": "643",
                    "flag": "https://restcountries.eu/data/rus.svg"
                }),
                new Pais({
                    "name": "Ruanda",
                    "_id": "646",
                    "flag": "https://restcountries.eu/data/rwa.svg"
                }),
                new Pais({
                    "name": "Arabia Saudita",
                    "_id": "682",
                    "flag": "https://restcountries.eu/data/sau.svg"
                }),
                new Pais({
                    "name": "Senegal",
                    "_id": "686",
                    "flag": "https://restcountries.eu/data/sen.svg"
                }),
                new Pais({
                    "name": "Serbia",
                    "_id": "688",
                    "flag": "https://restcountries.eu/data/srb.svg"
                }),
                new Pais({
                    "name": "Eslovenia",
                    "_id": "705",
                    "flag": "https://restcountries.eu/data/svn.svg"
                }),
                new Pais({
                    "name": "Sudáfrica",
                    "_id": "710",
                    "flag": "https://restcountries.eu/data/zaf.svg"
                }),
                new Pais({
                    "name": "Corea del Sur",
                    "_id": "410",
                    "flag": "https://restcountries.eu/data/kor.svg"
                }),
                new Pais({
                    "name": "España",
                    "_id": "724",
                    "flag": "https://restcountries.eu/data/esp.svg"
                }),
                new Pais({
                    "name": "Surinam",
                    "_id": "740",
                    "flag": "https://restcountries.eu/data/sur.svg"
                }),
                new Pais({
                    "name": "Suecia",
                    "_id": "752",
                    "flag": "https://restcountries.eu/data/swe.svg"
                }),
                new Pais({
                    "name": "Suiza",
                    "_id": "756",
                    "flag": "https://restcountries.eu/data/che.svg"
                }),
                new Pais({
                    "name": "Taiwan",
                    "_id": "158",
                    "flag": "https://restcountries.eu/data/twn.svg"
                }),
                new Pais({
                    "name": "Tailandia",
                    "_id": "764",
                    "flag": "https://restcountries.eu/data/tha.svg"
                }),
                new Pais({
                    "name": "Trinidad y Tobago",
                    "_id": "780",
                    "flag": "https://restcountries.eu/data/tto.svg"
                }),
                new Pais({
                    "name": "Túnez",
                    "_id": "788",
                    "flag": "https://restcountries.eu/data/tun.svg"
                }),
                new Pais({
                    "name": "Turquía",
                    "_id": "792",
                    "flag": "https://restcountries.eu/data/tur.svg"
                }),
                new Pais({
                    "name": "Uganda",
                    "_id": "800",
                    "flag": "https://restcountries.eu/data/uga.svg"
                }),
                new Pais({
                    "name": "Emiratos Arabes",
                    "_id": "784",
                    "flag": "https://restcountries.eu/data/are.svg"
                }),
                new Pais({
                    "name": "Reino Unido",
                    "_id": "826",
                    "flag": "https://restcountries.eu/data/gbr.svg"
                }),
                new Pais({
                    "name": "Estados Unidos",
                    "_id": "840",
                    "flag": "https://restcountries.eu/data/usa.svg"
                }),
                new Pais({
                    "name": "Uruguay",
                    "_id": "858",
                    "flag": "https://restcountries.eu/data/ury.svg"
                }),
                new Pais({
                    "name": "Uzbekistán",
                    "_id": "860",
                    "flag": "https://restcountries.eu/data/uzb.svg"
                }),
                new Pais({
                    "name": "Venezuela",
                    "_id": "862",
                    "flag": "https://restcountries.eu/data/ven.svg"
                }),
                new Pais({
                    "name": "Otro",
                    "_id": "999",
                    "flag": ""
                })
            ]

            paises.forEach(elemento => {
                Pais.updateOne(elemento, elemento, opciones, function(err, elemento) {
                    if (err){/*console.log(err);*/ return};
                    })
                }); 
        }

    if(insertarFases){
        var final = new Fase({ "_id": 1, "descripcion" : "Final", "siglas": "F" }),
        tercer = new Fase({ "_id": 2, "descripcion" : "3er lugar", "siglas": "3 L" }),
        cuarto = new Fase({ "_id": 3, "descripcion" : "4to lugar", "siglas": "4 L" }),
        quinto = new Fase({ "_id": 4, "descripcion" : "5to lugar", "siglas": "5 L" }),
        sexto = new Fase({ "_id": 5, "descripcion" : "6to lugar", "siglas": "6 L" }),
        septimo = new Fase({ "_id": 6, "descripcion" : "7to lugar", "siglas": "7 L" }),
        octavo = new Fase({ "_id": 7, "descripcion" : "8vo lugar", "siglas": "8 L" }),
        quintoysetimo = new Fase({ "_id": 8, "descripcion" : "Partido 5to y 7mo lugar", "siglas": "5 y 7 L" }),
        semiFinal = new Fase({ "_id": 9, "descripcion" : "Semifinal", "siglas": "SF"}),
        cuartosfinal = new Fase({ "_id": 10, "descripcion" : "Cuartos de Final", "siglas": "QF"}),
        octavosfinal = new Fase({ "_id": 11, "descripcion" : "Octavos de Final", "siglas": "8 F"}),
        dieciseisavosfinal =  new Fase({ "_id": 12, "descripcion" : "Dieciseisavos de Final", "siglas": "16 F"}),
        grupos =  new Fase({ "_id": 13, "descripcion" : "Grupos", "siglas": "Grupos"}),
        regular =  new Fase({ "_id": 14, "descripcion" : "Regular", "siglas": "Regular"});
        
        var fases = [
        final, tercer, cuarto, quinto,sexto, septimo, octavo, quintoysetimo,
         semiFinal, cuartosfinal, octavosfinal, dieciseisavosfinal, grupos, regular,
        ]

        fases.forEach(elemento => {
            Fase.updateOne(elemento, elemento, opciones, function(err, elemento) {
                if (err){/*console.log(err);*/ return};
                })
            });  
        
    }

    if(insertarFederaciones){
        var ajedrez = new Federacion({                   
                                nombre: "FEDERACIÓN CENTRAL DE AJEDREZ",
                                escudoUrl: "",
                                correoFederacion: "info@fcacostarica.com", 
                                activo: true,
                                paginaWeb: "www.fcacostarica.com",
                                ubicacion: "Oficina 1036, Estadio Nacional, La Sábana, San José",
                                telefonos: [25490964, 70823378],
                                presidente : "Stanley Gómez Huertas",
                                correoPresidente: "presidencia@fcacostarica.com",                
                }); 
                        
        var atletismo = new Federacion( {               
                                nombre: "FEDERACIÓN COSTARRICENSE DE ATLETISMO",              
                                paginaWeb: "www.fecoa.org" ,
                                ubicacion: "Oficina 1023, Estadio Nacional, La Sábana, San José",
                                telefonos: [25490950, 25490949],
                                correoFederacion: "crc@mf.iaaf.org", 
                                presidente : "Geen Clarke",
                                correoPresidente: "gclarke_4@yahoo.com",
                                escudoUrl: "", 
                                activo: true                               
                });
                
        var badminton = new Federacion({
                                nombre: "ASOCIACIÓN DE DESARROLLO DEL BÁDMINTON",                
                                paginaWeb: null ,
                                ubicacion: null,
                                telefonos: [22470900],
                                correoFederacion: "adbcostarica@yahoo.es", 
                                presidente : "Adrian Gómez",
                                correoPresidente: "adriangomezcr@yahoo.es",
                                escudoUrl: "",
                                activo: true               
                });

        var baloncesto = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE BALONCESTO",                
                                paginaWeb: "www.fecobacr.com" ,
                                ubicacion: "Gimnasio Nacional, La Sabana",
                                telefonos: [2339475],
                                correoFederacion: "info@fecobacr.com", 
                                presidente : "Luis Blanco",
                                correoPresidente: "lblancoromero@hotmail.com",
                                escudoUrl: "", 
                                activo: true                                   
                }); 

        var balonmano = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE BALONMANO",
                                paginaWeb: null,
                                ubicacion: "Dentro del Gimnasio Nacional, La Sábana, San José",
                                telefonos: [22560295],
                                correoFederacion: "balonmano.fecobal@hotmail.es", 
                                presidente : "Juan Carlos Gutiérrez",
                                correoPresidente: null,
                                escudoUrl: "",
                                activo: true                
                });  

        var beisbol = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE BÉISBOL AFICIONADO",                
                                paginaWeb: "www.fcbeisbol.org",
                                ubicacion: "Oficina S1001, Estadio Nacional, La Sábana, San José",
                                telefonos: [25490927],
                                correoFederacion: "fecobeisa@hotmail.com", 
                                presidente : "Rodrigo Chaves",
                                correoPresidente: "fecobeisa@hotmail.com",
                                escudoUrl: "", 
                                activo: true               
                });

        var billar = new Federacion( {
                                nombre: "FEDERACIÓN COSTARRICENSE DE BILLAR",                
                                paginaWeb: null,
                                ubicacion: "400 mts sur de la Iglesia Católica de San Francisco de Dos Ríos, San José ",
                                telefonos: null,
                                correoFederacion: "avalosronald@gmail.com", 
                                presidente : "Ronald Avalos",
                                correoPresidente: "avalosronald@gmail.com",
                                escudoUrl: "",
                                activo: true                
                });  

        var boliche = new Federacion({
                                nombre: "ASOCIACIÓN COSTARRICENSE DE BOLICHE",                
                                paginaWeb: "www.acobol.com",
                                ubicacion: "Oficina 1010, Estadio Nacional, La Sábana, San José",
                                telefonos: [22251510],
                                correoFederacion: "acobol@gmail.com", 
                                presidente : "Alvaro Castro",
                                correoPresidente: "acobol@gmail.com",
                                escudoUrl: "",
                                activo: true                 
                });

        var boxeo = new Federacion({
                                nombre: "ASOCIACIÓN COSTARRICENSE DE BOXEO AFICIONADO",               
                                paginaWeb: "www.boxeocostarica.org",
                                ubicacion: "Oficinas dentro del Gimnasio Nacional en la Sabana, quinta puerta a mano derecha",
                                telefonos: [22483151],
                                correoFederacion: "acoboxcr@gmail.com", 
                                presidente : "Rafael Vega",
                                correoPresidente: "vegaboxcr@gmail.com",
                                escudoUrl: "",
                                activo: true                
                });
                
        var canotaje = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE KAYAK Y CANOTAJE",        
                                paginaWeb: "www.fecoka-costarica.com",
                                ubicacion: "Instalaciones del Estadio Rafael A. Camacho, gradería de sombra, cubículo Asoc. Dptva Kayak, Remo y Canoa.",
                                telefonos: [25573131, 88224343],
                                correoFederacion: "fecokacrc@hotmail.com", 
                                presidente : "Eliecer Céspedes",
                                correoPresidente: "lluviaisol@hotmail.com",
                                escudoUrl: "", 
                                activo: true               
                });

        var ciclismo = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE CICLISMO",                
                                paginaWeb: "www.fecoci.net",
                                ubicacion: "La Sábana Costado Suroeste, frente al restaurante La Princesa Marina, San José",
                                telefonos: [22313944, 22317814],
                                correoFederacion: "fecoci@ice.co.cr", 
                                presidente : "William Corrales",
                                correoPresidente: null,
                                escudoUrl: "",
                                activo: true                
                });

        var circket = new Federacion({
                                nombre: "FEDERACIÓN DE CRICKET DE COSTA RICA",                
                                paginaWeb: "www.costaricacricket.org",
                                ubicacion: "Estadio Nacional, Of. S.1006, La Sabana, San José",
                                telefonos: [25490979, 22682903],
                                correoFederacion: "info@costaricacricket.org", 
                                presidente : "Sam Oswald Arthur",
                                correoPresidente: "bksm777@hotmail.com",
                                escudoUrl: "",
                                activo: true
                });

        var ecuestre = new Federacion({
                                nombre: "FEDERACIÓN ECUESTRE DE COSTA RICA",        
                                paginaWeb: "www.ecuestrecr.com",
                                ubicacion: null,
                                telefonos: [83854463],
                                correoFederacion: "fedecucrc@gmail.com", 
                                presidente : "Rocío Echeverri",
                                correoPresidente: "recheverri@gmail.com",
                                escudoUrl: "",
                                activo: true
                });

        var esgrima = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE ESGRIMA",                
                                paginaWeb: "www.esgrimacostarica.net",
                                ubicacion: null,
                                telefonos: null,
                                correoFederacion: "luiscruz.crc@gmail.com", 
                                presidente : "Luis A. Cruz",
                                correoPresidente: "luiscruz.crc@gmail.com",
                                escudoUrl: "",
                                activo: true
                });

        var fisicoculturismo = new Federacion({
                                nombre: "ASOCIACIÓN DE FÍSICO CULTURISMO Y FITNESS DE COSTA RICA",                
                                paginaWeb: "www.fecofidea.com",
                                ubicacion: "Estadio Nacioanal oficina 1016",
                                telefonos: null,
                                correoFederacion: "ifbb_costarica@hotmail.com", 
                                presidente : "Edgar Sánchez",
                                correoPresidente: "ifbb_costarica@hotmail.com",
                                escudoUrl: "", 
                                activo: true               
                });

        var futbol = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE FUTBOL",                
                                paginaWeb: "www.fedefutbol.com",
                                ubicacion: "Proyecto Goal, Santa Ana",
                                telefonos: [25891450, 22534561],
                                correoFederacion: "ejecutivo@fedefutbol.com", 
                                presidente : "Rodolfo Villalobos",
                                correoPresidente: "ejecutivo@fedefutbol.com",
                                escudoUrl: "",  
                                activo: true              
                });

        var gimnasia = new Federacion({
                                nombre: "FEDERACIÓN DEPORTIVA GIMNASIA Y AFINES DE COSTA RICA",                
                                paginaWeb: "www.gimnasia-costarica.com",
                                ubicacion: "Detrás del Gimnasio Nacional, La Sábana, San José",
                                telefonos: [22231022],
                                correoFederacion: "cristy.guillen@gimnasia-costarica.com", 
                                presidente : "Javier Gonzáles",
                                correoPresidente: null,
                                escudoUrl: "",   
                                activo: true             
                });

        var golf = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE GOLF",                
                                paginaWeb: "www.anagolf.org",
                                ubicacion: "Oficina No. 1002 en el Estadio Nacional, La Sabana San José Costa Rica",
                                telefonos: [25490922, 25490923],
                                correoFederacion: "info@fedegolfcr.com", 
                                presidente : "Maurizio Musmanni",
                                correoPresidente: "mmusmanni@pastasromas.com",
                                escudoUrl: "",  
                                activo: true              
                });

        var halterofilia = new Federacion({
                                nombre: "FEDERACIÓN HALTEROFILICA COSTARRICENSE",                
                                paginaWeb: "www.facebook.com/Federacion-Halterofilica-Costarricense-1188110614619287",
                                ubicacion: "De la parte baja del Hospital 75 metros sur, San Ramón, Alajuela",
                                telefonos: [24455982],
                                correoFederacion: "ferhaltero@hotmail.com", 
                                presidente : "Steven Esquivel",
                                correoPresidente: "ferhaltero@hotmail.com",
                                escudoUrl: "", 
                                activo: true               
                });

        var hockey = new Federacion({
                                nombre: "ASOCIACIÓN HOCKEY SOBRE CÉSPED Y PISTA",                
                                paginaWeb: "www.hockeydecostarica.wixsite.com/hockeylike",
                                ubicacion: "Centro comercial Paseo del Sol, San Nicolás (Taras) Cartago, local 15.",
                                telefonos: [83033072],
                                correoFederacion: "hockeydecostarica@gmail.com", 
                                presidente : "Bernardo Picado",
                                correoPresidente: "hockeydecostarica@gmail.com",
                                escudoUrl: "",
                                activo: true
                });

        var judo = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE JUDO",                
                                paginaWeb: "www.fecojudo.com",
                                ubicacion: "Oficina 1030, Estadio Nacional, La Sábana, San José",
                                telefonos: [25490970],
                                correoFederacion: "info@fecojudo.com", 
                                presidente : "Dudley López",
                                correoPresidente: "dlopez@dlingenieria.net",
                                escudoUrl: "",
                                activo: true
                });

        var karate = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE KARATE DO",                
                                paginaWeb: null,
                                ubicacion: "La Sábana, frente a las canchas de tenis, San José",
                                telefonos: [83675439],
                                correoFederacion: "jkawfcostarica@gmail.com", 
                                presidente : "Julio Alvarado",
                                correoPresidente: "jlvm79@yahoo.com",
                                escudoUrl: "",
                                activo: true
                });

        var lucha = new Federacion({
                        nombre: "FEDERACIÓN COSTARRICENSE DE Lucha",                
                        paginaWeb: null,
                        ubicacion: "",
                        telefonos: null,
                        correoFederacion: null, 
                        presidente : null,
                        correoPresidente: null,
                        escudoUrl: "",
                        activo: false
        });

        var natacion = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE NATACIÓN Y AFINES",                
                                paginaWeb: "www.fecona.co.cr",
                                ubicacion: "La Sábana, frente a las canchas de tenis, San José",
                                telefonos: [22330944],
                                correoFederacion: "info@fecona.co.cr", 
                                presidente : "Angel Herrera",
                                correoPresidente: "fecona@ice.co.cr",
                                escudoUrl: "",
                                activo: true               
                });

        var patinaje = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE PATINAJE Y DEPORTES AFINES",                
                                paginaWeb: "www.facebook.com/fedepat",
                                ubicacion: null,
                                telefonos: null,
                                correoFederacion: "secretario@fedepat.com", 
                                presidente : null,
                                correoPresidente: null,
                                escudoUrl: "",   
                                activo: true             
                });

        var pelotaVasca = new Federacion({
                                nombre: "ASOCIACIÓN DE PELOTA VASCA A.D.",               
                                paginaWeb: null,
                                ubicacion: "San José, Colima de Tibas 300 metros norte y 50 oeste entrada a mano izquierda casa amarilla portón blanco",
                                telefonos: [22409284],
                                correoFederacion: "pelotavascacostarica@gmail.com", 
                                presidente : "Jorge Luis López",
                                correoPresidente: "dissantafe2007@yahoo.es",
                                escudoUrl: "",
                                activo: true
                });

        var pentatlon = new Federacion({
                                nombre: "FEDERACIÓN DE PENTATLÓN MODERNO",              
                                paginaWeb: null,
                                ubicacion: null,
                                telefonos: null,
                                correoFederacion: null, 
                                presidente : null, 
                                correoPresidente: null,
                                escudoUrl: "",
                                activo: true
                });

        var racquetball = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE RACQUETBALL",
                                paginaWeb: "www.racquetballcr.com",
                                ubicacion: "Oficina 1007 Estadio Nacional, La Sábana, San José",
                                telefonos: [25490929, 22900965],
                                correoFederacion: "info@racquetballcr.com", 
                                presidente : "Marcelo Gómez",
                                correoPresidente: "marcelogomez@racsa.co.cr",
                                escudoUrl: "",
                                activo: true
                });
                
        var remo = new Federacion({
                                nombre: "ASOCIACIÓN DE DEPORTE AVENTURA Y REMO",                
                                paginaWeb: null,
                                ubicacion: "Paseo Colón, de la esquina NE del Edificio Colón 50 Norte",
                                telefonos: [22336455],
                                correoFederacion: "rgallo@riostropicales.com", 
                                presidente : "Rafael Gallo",
                                correoPresidente: "rgallo@riostropicales.com",
                                escudoUrl: "",
                                activo: true                
                });

        var rugby  = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE RUGBY",                
                                paginaWeb: "www.federacionrugbycr.com",
                                ubicacion: "Estadio Nacional",
                                telefonos: [87174793],
                                correoFederacion: "presidenciafrcr@gmail.com", 
                                presidente : "Ramón Cole De Temple",
                                correoPresidente: "presidencia@federacionrugbycr.com",
                                escudoUrl: "",
                                activo: true
                });

        var softbol = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE SOFTBOL (BOLA SUAVE)",                
                                paginaWeb: null,
                                ubicacion: "Oficina S 1003 Estadio Nacional, La Sábana, San José",
                                telefonos: [25490925],
                                correoFederacion: "roberto.castroa@yahoo.com", 
                                presidente : "Roberto Castro",
                                correoPresidente: "roberto.castroas@yahoo.com",
                                escudoUrl: "",
                                activo: true
                });

        var surf = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE SURF",                
                                paginaWeb: "www.SurfingCR.net",
                                ubicacion: "Estadio Nacional, oficina #1003",
                                telefonos: [22531532],
                                correoFederacion: "info@SurfingCR.net", 
                                presidente : "Randall Chaves",
                                correoPresidente: "randchaves@gmail.com",
                                escudoUrl: "",
                                activo: true
                });

        var taekwondo = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE TAEKWONDO",                
                                paginaWeb: "www.tkdcr.com",
                                ubicacion: "De la Iglesia María Reina 200 sur Complejo de Bodegas Morepark la num.13, Pavas, San José",
                                telefonos: [22314308],
                                correoFederacion: "info@tkdcr.com", 
                                presidente : "Wilmar Alvarado",
                                correoPresidente: "presidente@tkdcr.com",
                                escudoUrl: "",
                                activo: true
                });

        var tenis = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE TENIS",                
                                paginaWeb: "www.fctenis.com",
                                ubicacion: "Parque de La Paz, primer oficina a mano derecha",
                                telefonos: [22271335, 70165984],
                                correoFederacion: "patricia.castro@fctenis.com", 
                                presidente : "Carlos Bravo",
                                correoPresidente: "presidencia@fctenis.com",
                                escudoUrl: "",
                                activo: true                
                });

        var tenisMesa = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE TENIS MESA",                
                                paginaWeb: "www.fecoteme.com",
                                ubicacion: "Oficina 6 Estadio Nacional, La Sábana, San José",
                                telefonos: [25490939],
                                correoFederacion: "info@fecoteme.com", 
                                presidente : "Alexander Zamora",
                                correoPresidente: "azamoracr19@yahoo.com",
                                escudoUrl: "",
                                activo: true 
                });

        var tiroBlanco = new Federacion({
                                nombre: "FEDERACIÓN DE TIRO - COSTA RICA",                
                                paginaWeb: null,
                                ubicacion: null,
                                telefonos: null,
                                correoFederacion: null, 
                                presidente : "Hugo Chamberlain",
                                correoPresidente: "h_chamberlain_cr@yahoo.com",
                                escudoUrl: "",
                                activo: true
                });
        var tiroArco = new Federacion({
                                nombre: "ASOCIACIÓN DEPORTIVA TIRO CON ARCO (ARQUERÍA)",                
                                paginaWeb: "www.archerycrc.org",
                                ubicacion: "Oficina 1025, Estadio Nacional, La Sábana, San José",
                                telefonos: [25490932],
                                correoFederacion: "secretaria@archerycrc.org", 
                                presidente : "Pablo Bonilla",
                                correoPresidente: "presidencia@archerycrc.org",
                                escudoUrl: "",
                                activo: true
                });

        var triatlon = new Federacion({
                                nombre: "FEDERACIÓN UNIDA DE TRIATLÓN",                
                                paginaWeb: "www.feutri.org",
                                ubicacion: "Oficina 1004 Estadio Nacional, La Sábana, San José",
                                telefonos: [25490920],
                                correoFederacion: "info@feutri.org", 
                                presidente : "Cristina González",
                                correoPresidente: "cgonzalez@seguros.co.cr",
                                escudoUrl: "",
                                activo: true
                });

        var voleibol = new Federacion({
                                nombre: "FEDERACIÓN COSTARRICENSE DE VOLEIBOL",                
                                paginaWeb: "www.fecovol.co.cr",
                                ubicacion: "Dentro del Gimnasio Nacional, San José",
                                telefonos: [22330414],
                                correoFederacion: "fecovol@gmail.com", 
                                presidente : "Edgar Alvarado",
                                correoPresidente: "presidente@fecovol.co.cr",
                                escudoUrl: "",
                                activo: true
                });
            ajedrez.escudoUrl = rutaImagenesFederaciones + "FAjedrez.jpg";      
            atletismo.escudoUrl = rutaImagenesFederaciones + "FAtletismo.png";
            // badminton.escudoUrl = rutaImagenesFederaciones  +  "F.jpg";
            baloncesto.escudoUrl = rutaImagenesFederaciones  +  "FBaloncesto.jpg";
            balonmano.escudoUrl = rutaImagenesFederaciones  +  "FBalonmano.jpg";
            beisbol.escudoUrl = rutaImagenesFederaciones  +  "FBeisbol.png";
            billar.escudoUrl = rutaImagenesFederaciones  +  "FBillar.jpg";
            boliche.escudoUrl = rutaImagenesFederaciones  +  "FBoliche.jpg";
            boxeo.escudoUrl = rutaImagenesFederaciones  +  "FBoxeo.jpg";
            canotaje.escudoUrl = rutaImagenesFederaciones  +  "FKayakCanotaje.jpg";
            ciclismo.escudoUrl = rutaImagenesFederaciones  +  "FCiclismo.png";
            circket.escudoUrl = rutaImagenesFederaciones  +  "FCricket.jpg";
            ecuestre.escudoUrl = rutaImagenesFederaciones  +  "FEcuestre.jpg";
            esgrima.escudoUrl = rutaImagenesFederaciones  +  "FEsgrima.jpg";
            fisicoculturismo.escudoUrl = rutaImagenesFederaciones  +  "FFisiculturismo.png";
            futbol.escudoUrl = rutaImagenesFederaciones  +  "FFutbol.png";
            gimnasia.escudoUrl = rutaImagenesFederaciones  +  "FGimnasia.png";
            golf.escudoUrl = rutaImagenesFederaciones  +  "FGolf.jpg";
            // halterofilia.escudoUrl = rutaImagenesFederaciones  +  "F.jpg";
            hockey.escudoUrl = rutaImagenesFederaciones  +  "FHockey.jpg";
            judo.escudoUrl = rutaImagenesFederaciones  +  "FJudo.jpg";
            karate.escudoUrl = rutaImagenesFederaciones  +  "FKarate-do.jpg";
            //  lucha.escudoUrl = rutaImagenesFederaciones  +  "F.jpg";
            natacion.escudoUrl = rutaImagenesFederaciones  +  "FNatacion.jpg";
            patinaje.escudoUrl = rutaImagenesFederaciones  +  "FPatinaje.png";
            pelotaVasca.escudoUrl = rutaImagenesFederaciones  +  "FPelotaVasca.jpg";
            //pentatlon.escudoUrl = rutaImagenesFederaciones  +  "F.jpg";
            racquetball.escudoUrl = rutaImagenesFederaciones  +  "FRacquetbol.jpg";
            remo.escudoUrl = rutaImagenesFederaciones  +  "FRemo.png";
            rugby.escudoUrl = rutaImagenesFederaciones  +  "FRugby.jpg";
            softbol.escudoUrl = rutaImagenesFederaciones  +  "FSoftbol.jpg";
            surf.escudoUrl = rutaImagenesFederaciones  +  "FSurf.jpg";
            taekwondo.escudoUrl = rutaImagenesFederaciones  +  "FTaekwondo.jpg";
            tenis.escudoUrl = rutaImagenesFederaciones  +  "FTenis.jpg";
            tenisMesa.escudoUrl = rutaImagenesFederaciones  +  "FTenisMesa.png";
            // tiroBlanco.escudoUrl = rutaImagenesFederaciones  +  "F.jpg";
            tiroArco.escudoUrl = rutaImagenesFederaciones  +  "FTiroArco.jpg";
            triatlon.escudoUrl = rutaImagenesFederaciones  +  "FTriatlon.jpg";
            voleibol.escudoUrl = rutaImagenesFederaciones  +  "FVoleibol.jpg";


        //  var opciones2 = {strict:false, upsert: true, new: true, setDefaultsOnInsert: true };
        var federaciones = [ajedrez, atletismo, badminton, baloncesto, balonmano,
                            beisbol, billar, boliche, boxeo, canotaje, ciclismo, circket, 
                            ecuestre, esgrima, fisicoculturismo, futbol, gimnasia,
                            golf, halterofilia, hockey, judo, karate, lucha, natacion, patinaje, pelotaVasca,
                            pentatlon, racquetball, remo, rugby, softbol, surf, taekwondo, tenis,
                            tenisMesa, tiroBlanco, tiroArco, triatlon,voleibol];
                // federaciones.forEach(elemento => {             
                //         Federacion.update(elemento, elemento, opciones, function(err, elemento) {
                //         if (err){/*console.log(err);*/ return};
                //         });  
                // });

            await inicializar(federaciones);
    }        

    if(insertarDeportes){
        //#region Deportes
        var DAjedrez = new Deporte({
                    nombre: "Ajedrez",
                    nombreNormalizado: "ajedrez",
                    federacion: ajedrez._id,
                    activo: true,                                
            });

        var DAtletismo = new Deporte({
                    nombre: "Atletismo",
                    nombreNormalizado: "atletismo",
                    federacion: atletismo._id,
                    activo: true, 
            });

       var DBadminton = new Deporte({
         nombre: "Bádminton",
         nombreNormalizado: "badminton",
         federacion: badminton._id,
         activo: true, 
        });

        var DBaloncesto = new Deporte({
                nombre: "Baloncesto",
                nombreNormalizado: "baloncesto",
                federacion: baloncesto._id,
                activo: true,                
        });

        var DBalonmano = new Deporte({
        nombre: "Balonmano",
        nombreNormalizado: "balonmano",
        federacion: balonmano._id,
        activo: true,
        });

        var DBeisbol = new Deporte({
        nombre: "Béisbol",
        nombreNormalizado: "beisbol",
        federacion: beisbol._id,
        activo: true,               
        });

        var DBillar = new Deporte({
        nombre: "Billar",
        nombreNormalizado: "billar",
        federacion: billar._id,
        activo: true, 
        });

        var DBoliche = new Deporte({
            nombre: "Boliche",
            nombreNormalizado: "boliche",
            federacion: boliche._id,
            activo: true,               
        });

        var DBoxeo = new Deporte({
        nombre: "Boxeo",
        nombreNormalizado: "boxeo",
        federacion: boxeo._id,
        activo: true,
        });

        var DCanotaje = new Deporte({
        nombre: "Canotaje",
        nombreNormalizado: "canotaje",
        federacion: canotaje._id,
        activo: true, 
        });

        var DCiclismoCBMX = new Deporte({
        nombre: "Ciclismo CBMX",
        nombreNormalizado: "ciclismo cbmx",
        federacion: ciclismo._id,
        activo: true,
        });

        var DCiclismoCP = new Deporte({
        nombre: "Ciclismo CP",
        nombreNormalizado: "ciclismo cp",
        federacion: ciclismo._id,
        activo: true,
        });

        var DCiclismoCR = new Deporte({
        nombre: "Ciclismo CR",
        nombreNormalizado: "ciclismo cr",
        federacion: ciclismo._id,
        activo: true,
        });

        var DCiclismoCM = new Deporte({
        nombre: "Ciclismo CM Montaña",
        nombreNormalizado: "ciclismo cm montaña",
        federacion: ciclismo._id,
        activo: true,
        });

        var DCricket = new Deporte({
        nombre: "Cricket",
        nombreNormalizado: "cricket",
        federacion: circket._id,
        activo: true, 
        });

        var DEcuestreEQS = new Deporte({
        nombre: "Ecuestre EQS",
        nombreNormalizado: "ecuestre eqs",
        federacion: ecuestre._id,
        activo: true,
        });

        var DEcuestreEQA = new Deporte({
        nombre: "Ecuestre EQA",
        nombreNormalizado: "ecuestre eqa",
        federacion: ecuestre._id,
        activo: true,
        });

        var DEcuestreEQPC = new Deporte({
        nombre: "Ecuestre EQPC",
        nombreNormalizado: "ecuestre eqpc",
        federacion: ecuestre._id,
        activo: true,
        });

        var DEsgrima = new Deporte({
        nombre: "Esgrima",
        nombreNormalizado: "esgrima",
        federacion: esgrima._id,
        activo: true, 
        });

        var DFisiculturismo = new Deporte({
        nombre: "Fisiculturismo",
        nombreNormalizado: "fisiculturismo",
        federacion: fisicoculturismo._id,
        activo: true, 
        });

        var DFutbol = new Deporte({
        nombre: "Futbol",
        nombreNormalizado: "futbol",
        federacion: futbol._id,
        activo: true,
        });

        var DGimnasiaAr = new Deporte({
        nombre: "Gimnasia Artistica",
        nombreNormalizado: "gimnasia artistica",
        federacion: gimnasia._id,
        activo: true,
        });

        var DGimnasiaRi = new Deporte({
        nombre: "Gimnasia Ritmica",
        nombreNormalizado: "gimnasia ritmica",
        federacion: gimnasia._id,
        activo: true,
        });

        var DGolf = new Deporte({
        nombre: "Golf",
        nombreNormalizado: "golf",
        federacion: golf._id,
        activo: true,
        });

        var DHalterofilia = new Deporte({
        nombre: "Halterofilia",
        nombreNormalizado: "halterofilia",
        federacion: halterofilia._id,
        activo: true,
        });

        var DHockeyC = new Deporte({
        nombre: "Hockey Césped",
        nombreNormalizado: "hockey cesped",
        federacion: hockey._id,
        activo: true, 
        });

        var DJudo = new Deporte({
        nombre: "Judo",
        nombreNormalizado: "judo",
        federacion: judo._id,
        activo: true,
        });

        var DKarate = new Deporte({
        nombre: "Karate",
        nombreNormalizado: "karate",
        federacion: karate._id,
        activo: true,
        });

        var DLuchaLul = new Deporte({
        nombre: "Lucha LUL",
        nombreNormalizado: "lucha lul",
        federacion: lucha._id,
        activo: true,
        });

        var DLuchaLuG = new Deporte({
        nombre: "Lucha LUG",
        nombreNormalizado: "lucha lug",
        federacion: lucha._id,
        activo: true,
        });

        var DNatacion = new Deporte({
        nombre: "Natación",
        nombreNormalizado: "natación",
        federacion: natacion._id,
        activo: true,
        });

        var DNatacionS = new Deporte({
        nombre: "Natación Sincronizado",
        nombreNormalizado: "natación sincronizado",
        federacion: natacion._id,
        activo: true,
        });

        var DPatinaje = new Deporte({
        nombre: "Patinaje",
        nombreNormalizado: "patinaje",
        federacion: patinaje._id,
        activo: true,
        });

        var DPelotaVasca = new Deporte({
        nombre: "Pelota Vasca",
        nombreNormalizado: "pelota vasca",
        federacion: pelotaVasca._id,
        activo: true,
        });

        var DPentatlonM = new Deporte({
        nombre: "Pentatlón Moderno",
        nombreNormalizado: "pentatlón moderno",
        federacion: pentatlon._id,
        activo: true,
        });

        var DRacquetball = new Deporte({
        nombre: "Racquetball",
        nombreNormalizado: "racquetball",
        federacion: racquetball._id,
        activo: true,
        });

        var DRemo = new Deporte({
        nombre: "Remo",
        nombreNormalizado: "remo",
        federacion: remo._id,
        activo: true, 
        });

        var DRugby = new Deporte({
        nombre: "Rugby",
        nombreNormalizado: "rugby",
        federacion: rugby._id,
        activo: true,        
        });

        var DSoftbol = new Deporte({
        nombre: "Softbol",
        nombreNormalizado: "softbol",
        federacion: softbol._id,
        activo: true,        
        });

        var DSurf = new Deporte({
        nombre: "Surf",
        nombreNormalizado: "surf",
        federacion: surf._id,
        activo: true, 
        });

        var DTaekwondo = new Deporte({
        nombre: "Taekwondo",
        nombreNormalizado: "taekwondo",
        federacion: taekwondo._id,
        activo: true, 
        });

        var DTenis = new Deporte({
        nombre: "Tenis",
        nombreNormalizado: "tenis",
        federacion: tenis._id,
        activo: true,
        });

        var DTenisM = new Deporte({
        nombre: "Tenis de Mesa",
        nombreNormalizado: "tenis de mesa",
        federacion: tenisMesa._id,
        activo: true,       
        });

        var DTiro = new Deporte({
        nombre: "Tiro Al Blanco",
        nombreNormalizado: "tiro al blanco",
        federacion: tiroBlanco._id,
        activo: true,
        });

        var DTiroA = new Deporte({
        nombre: "Tiro Con Arco",
        nombreNormalizado: "tiro con arco",
        federacion: tiroArco._id,
        activo: true,
        });

        var DTria = new Deporte({
        nombre: "Triatlón",
        nombreNormalizado: "triatlón",
        federacion: triatlon._id,
        activo: true, 
        });

        var DVoleibol = new Deporte({
        nombre: "Voleibol",
        nombreNormalizado: "voleibol",
        federacion: voleibol._id,
        activo: true,
        });

        var DVoleibolP = new Deporte({
        nombre: "Voleibol Playa",
        nombreNormalizado: "voleibol plya",
        federacion: voleibol._id,
        activo: true,
        });
    //#endregion Deportes

        var deportes =[DAjedrez, DAtletismo, DBadminton, DBaloncesto, DBalonmano, DBeisbol,
            DBillar, DBoliche, DBoxeo, DCanotaje, DCiclismoCBMX, DCiclismoCP, DCiclismoCR,
            DCiclismoCM, DCricket, DEcuestreEQS, DEcuestreEQA, DEcuestreEQPC, DEsgrima,
            DFisiculturismo, DFutbol, DGimnasiaAr, DGimnasiaRi, DGolf, DHalterofilia, 
            DHockeyC, DJudo, DKarate, DLuchaLul, DLuchaLuG, DNatacion, DNatacionS, DPatinaje,
            DPelotaVasca, DPentatlonM, DRacquetball, DRemo, DRugby, DSoftbol, DSurf,
            DTaekwondo, DTenis, DTenisM, DTiro, DTiroA, DTria, DVoleibol, DVoleibolP];
        await inicializar(deportes);
    }

    if(insertarPruebas){

        var pruebasAtletismoXMetro = [   
            {nombre: "Salto de altura"},
            {nombre: "Salto de longitud"},
            {nombre: "Salto Triple"},
            {nombre: "Salto con Garrocha"},
            {nombre: "Lanzamiento de Bala"},
            {nombre: "Lanzamiento de Disco"},
            {nombre: "Lanzamiento de Jabalina"},
            {nombre: "Lanzamiento de Martillo"},                             
            ].map(prueba=>{
            return Prueba({
                    nombre: prueba.nombre,
                    deporte: DAtletismo._id,
                    activo: true,
                    tipo: 0,//Individual
                    tipoMarcador: 3,//Metros
                })
            })

        var pruebasAtletismoXTiempoIndividual = [
            {nombre: "100 m"},
            {nombre: "200 m"},
            {nombre: "400 m"},
            {nombre: "800 m"},
            {nombre: "1500 m"},
            {nombre: "5000 m"},
            {nombre: "10000 m"},
            {nombre: "100 m con vallas"},
            {nombre: "110 m con vallas"},
            {nombre: "400 m con vallas"},
            {nombre: "3000 m con obstáculos"},
            {nombre: "20 Km Marcha"},
            {nombre: "50 Km Marcha"},
            {nombre: "Maratón"},
            {nombre: "Héptatlón"},
            {nombre: "Decatlón"},
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DAtletismo._id,
                    activo: true,
                    tipo: 0, // Individual: 0
                    tipoMarcador: 2,// Tiempo
                })

            });
        
        var pruebasAtletismoXTiempoEquipo = [
            {nombre: "Relevo 4x100 m"},
            {nombre: "Relevo 4x400 m"},
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DAtletismo._id,
                    activo: true,
                    tipo: 1, // Equipo: 1
                    tipoMarcador: 2,// Tiempo
                })

            });

        var pruebasBadminton =[
                {nombre: "Individual"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBadminton._id,
                    activo: true,
                    tipo: 0, // Individual: 0
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBaloncesto =[
            {nombre: "Mayor"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBaloncesto._id,
                    activo: true,
                    tipo: 1, // Equipo: 1
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBalonmano =[
                {nombre: "Mayor"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBalonmano._id,
                    activo: true,
                    tipo: 1, // Individual: 1
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBeisbol =[
            {nombre: "Individual"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBeisbol._id,
                    activo: true,
                    tipo: 0, // Individual: 0
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBillar =[
            {nombre: "Individual"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBillar._id,
                    activo: true,
                    tipo: 0, // Individual: 0
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBolicheIndividual =[
            {nombre:"Individual"},
            {nombre: "Todo evento"},
            {nombre: "Final Maestros"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBoliche._id,
                    activo: true,
                    tipo: 0, // Individual: 0
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasBolicheEquipo =[
            {nombre:"Dobles"},
            {nombre:"Tríos"},
            {nombre: "Quintetos"}
            ].map(prueba=>{
                return Prueba({
                    nombre: prueba.nombre,
                    deporte: DBoliche._id,
                    activo: true,
                    tipo: 1, // Equipo: 1
                    tipoMarcador: 1,// Puntos
                })
            });

        var pruebasDBoxeo =[
            {nombre: "51 Kg Mosca"},
            {nombre: "Kg Ligero"},
            {nombre: "75 Kg Medio"},
            {nombre: "46 a 49 Kg Mini mosca"},
            {nombre: "52 Kg Mosca"},
            {nombre: "56 Kg Pluma"},
            {nombre: "60 Kg Ligero"},
            {nombre: "64 Kg Welter Ligero"},
            {nombre: "69 Kg Welter"},
            {nombre: "75 Kg Medio"},
            {nombre: "81 Kg Semipesado"},
            {nombre: "91 Kg Pesado"},
            {nombre: "Más de 91 Kg Superpesado"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DBoxeo._id,
                activo: true,
                tipo: 0, // Equipo: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasCanotaje =[
            {nombre: "C1"},
            {nombre: "K1"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCanotaje._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCiclismoCBMX =[
            {nombre: "Individual"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCBMX._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCiclismoCPIndividual =[
            {nombre: "500 m contra reloj"},
            {nombre: "Velocidad"},
            {nombre: "Keirin"},
            {nombre: "Persecución individual"},
            {nombre: "Scratch"},
            {nombre: "Omnium"},
            {nombre: "1 Km"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCP._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCiclismoCPXEquipo =[
            {nombre: "Velocidad por equipo"},
            {nombre: "Persecución por equipo"},
            {nombre: "Carrera por puntos"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCP._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCiclismoCPXPuntos =[
            {nombre: "Carrera por puntos"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCP._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasCiclismoCR =[
            {nombre: "Contra Reloj Individual"},
            {nombre: "Ruta individual"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCR._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCiclismoCM =[
            {nombre: "Cross Country Olympic"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCiclismoCM._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasCricket =[
            {nombre:"Individual"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DCricket._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQSXEquipo =[
            {nombre: "Equipos"},    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQS._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQSXIndividual =[
            {nombre: "Acumulado"},
            {nombre: "Individual"}     
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQS._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQSXVelocidad =[
            {nombre: "Velocidad"},    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQS._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasEcuestreEQAIndividual =[
            {nombre: "Individual"},
            {nombre: "Acumulado"},   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQA._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQAEquipo =[
            {nombre: "Equipos"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQA._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQPCIndividual =[
            {nombre: "Individual"} 
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQPC._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEcuestreEQPCEquipo =[
            {nombre: "Equipos"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEcuestreEQPC._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEsgrimaIndividual =[
            {nombre: "Espada individual"},
            {nombre: "Florete Individual"},
            {nombre: "Sable Individual"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEsgrima._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasEsgrimaEquipo =[
            {nombre: "Espada equipo"},
            {nombre: "Florete equipo"},
            {nombre: "Sable equipo"}
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DEsgrima._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasFisiculturismo =[
            {nombre: "Individual"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DFisiculturismo._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasFutbol =[
            {nombre: "Mayor"},
            {nombre: "Sub-23"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DFutbol._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasGimnasiaArIndividual =[
            {nombre: "All Around"}, 
            {nombre: "Piso"},
            {nombre: "Salto"},
            {nombre: "Barras Asimétricas"},
            {nombre: "Viga de equilibrio"},
            {nombre: "Anillos"},
            {nombre: "Caballo con Arzones"},
            {nombre: "Barra Fija"},
            {nombre: "Barras Paralelas"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DGimnasiaAr._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasGimnasiaArEquipo =[
            {nombre: "Equipo"},  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DGimnasiaAr._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasGimnasiaRiIndividual =[
            {nombre: "Aro"},
            {nombre: "Pelota"},
            {nombre: "Mazas"},
            {nombre: "Cinta"},
            {nombre: "All Around"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DGimnasiaRi._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasGimnasiaRiEquipo =[

            {nombre: "Equipos"}
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DGimnasiaRi._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasGolf =[
            {nombre: "Individual a 54 hoyos"}, 
            {nombre: "3 rondas de 18 hoyos"}     
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DGolf._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasHalterofilia =[
            {nombre: "48 Kg Arranque"},
            {nombre: "53 Kg Arranque"},
            {nombre: "58 Kg Arranque"},
            {nombre: "63 Kg Arranque"},
            {nombre: "69 Kg Arranque"},
            {nombre: "75 Kg Arranque"},
            {nombre: "Más de 75 Kg Arranque"},
            {nombre: "48 Kg Envión"},
            {nombre: "53 Kg Envión"},
            {nombre: "58 Kg Envión"},
            {nombre: "63 Kg Envión"},
            {nombre: "69 Kg Envión"},
            {nombre: "75 Kg Envión"},
            {nombre: "Más de 75 Kg Envión"},
            {nombre: "56 Kg Arranque"},
            {nombre: "62 Kg Arranque"},
            {nombre: "69 Kg Arranque"},
            {nombre: "77 Kg Arranque"},
            {nombre: "85 Kg Arranque"},
            {nombre: "94 Kg Arranque"},
            {nombre: "105 Kg Arranque"},
            {nombre: "Más de 105 Kg Arranque"},
            {nombre: "56 Kg Envión"},
            {nombre: "62 Kg Envión"},
            {nombre: "69 Kg Envión"},
            {nombre: "77 Kg Envión"},
            {nombre: "85 Kg Envión"},
            {nombre: "94 Kg Envión"},
            {nombre: "105 Kg Envión"},
            {nombre: "Más de 105 Kg Envión"} 
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DHalterofilia._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasBHockeyC =[
            {nombre:"Individual"},    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DHockeyC._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasJudoIndividual =[
            {nombre: "Menos de 44 Kg"},
            {nombre: "Menos de 48 Kg"},
            {nombre:  "Menos de 52 Kg"},
            {nombre: "Menos de 57 Kg"},
            {nombre: "Menos de 63 Kg"},
            {nombre: "Menos de 70 Kg"},
            {nombre: "Menos de 78 Kg"},
            {nombre: "Más de 78 Kg"},
            {nombre: "Menos de 55 Kg"},
            {nombre: "Menos de 60 Kg"},
            {nombre: "Menos de 66 Kg"},
            {nombre: "Menos de 73 Kg"},
            {nombre: "Menos de 81 Kg"},
            {nombre: "Menos de 90 Kg"},
            {nombre: "Menos de 100 Kg"},
            {nombre:  "Más de 100 Kg"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DJudo._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasJudoEquipo =[
            {nombre: "Equipo"}, 
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DJudo._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasKarate =[
            {nombre: "Menos de 60 Kg"},
            {nombre: "Menos de 67 Kg"},
            {nombre: "75 Kg"},
            {nombre: "Menos de 84 Kg"},
            {nombre: "Más de 84 Kg"},
            {nombre: "Kata individual"},
            {nombre: "Kata equipo"},
            {nombre: "Menos de 50 Kg"},
            {nombre: "Menos de 55 Kg"},
            {nombre: "61 Kg"},
            {nombre: "Menos de 68 Kg"},
            {nombre: "Más de 68 Kg"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DKarate._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasLuchaLul =[
            {nombre: "menos de 48 Kg"},
            {nombre: "53 Kg"},
            {nombre: "58 Kg"},
            {nombre: "63 Kg"},
            {nombre: "69 Kg"},
            {nombre: "75 Kg"},
            {nombre: "57 Kg"},
            {nombre: "65 Kg"},
            {nombre: "74 Kg"},
            {nombre: "86 Kg"},
            {nombre: "97 Kg"},
            {nombre: "125 Kg"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DLuchaLul._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasLuchaLuG =[
            {nombre: "59 Kg"},
            {nombre: "66 Kg"},
            {nombre: "75 Kg"},
            {nombre: "85 Kg"},
            {nombre: "98 Kg"},
            {nombre: "130 Kg"}  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DLuchaLuG._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasNatacionIndividual =[
            {nombre: "Marantón 10 Km"},
            {nombre: "50 m libre"},
            {nombre: "100 m libre"},
            {nombre: "200 m libre"},
            {nombre: "400 m libre"},
            {nombre: "800 m libre"},
            {nombre: "1500 m libre"},
            {nombre: "50 m dorso"},
            {nombre: "100 m dorso"},
            {nombre: "200 m dorso"},
            {nombre: "50 m pecho"},
            {nombre: "100 m pecho"},
            {nombre: "200 m pecho"},
            {nombre: "50 m pecho"},
            {nombre: "100 m pecho"},
            {nombre: "200 m pecho"},
            {nombre: "50 m mariposa"},
            {nombre: "100 m mariposa"},
            {nombre: "200 m mariposa"},
            {nombre: "200 m Combinado Individual"},
            {nombre: "400 m Combinado Individual"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DNatacion._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasNatacionEquipo =[
            {nombre: "4x100 Relevo Libre"},
            {nombre: "4x100 Relevo Combinado"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DNatacion._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasNatacionSIndividual =[
            {nombre: "Sincronizado Solo Técnico"},
            {nombre: "Sincronizado Solo Libre"},
            {nombre: "Sincronizado Rutina Libre Combinada"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DNatacionS._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasNatacionSEquipo =[
            {nombre: "Sincronizado Dueto Técnico"},
            {nombre: "Sincronizado Dueto Libre"},
            {nombre: "Sincronizado Equipo Técnico"},
            {nombre: "Sincronizado Equipo Libre"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DNatacionS._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasPatinajePuntos =[
            {nombre: "10 000 m  puntos"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DPatinaje._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasPatinajeTiempo =[
            {nombre: "300 m"},
            {nombre: "500 m "},
            {nombre: "10 000 m Combinado"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DPatinaje._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasPelotaVasca =[
            {nombre:"Individual"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DPelotaVasca._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasPentatlonMIndividual =[
            {nombre: "Individual"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DPentatlonM._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasPentatlonMEquipo =[
            {nombre: "Relevo"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DPentatlonM._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasRacquetballIndividual =[
            {nombre: "Individual"},    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DRacquetball._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasRacquetballEquipo =[
            {nombre: "Dobles"},
            {nombre: "Equipos"}     
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DRacquetball._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasRemo =[
            {nombre:"Individual"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DRemo._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasRugby =[
            {nombre:"Mayor"}
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DRugby._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasSoftbol =[
            {nombre:"Mayor"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DSoftbol._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasSurf =[
            {nombre:"Mayor"}       
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DSurf._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTaekwondo =[
            {nombre: "46 Kg"},
            {nombre: "49 Kg"},
            {nombre: "53 Kg"},
            {nombre: "57 Kg"},
            {nombre: "62 Kg"},
            {nombre: "67 Kg"},
            {nombre: "73 Kg"},
            {nombre: "Más de 73 Kg"},
            {nombre: "54 Kg"},
            {nombre: "58 Kg"},
            {nombre: "63 Kg"},
            {nombre: "68 Kg"},
            {nombre: "74 Kg"},
            {nombre: "80 Kg"},
            {nombre: "87 Kg"},
            {nombre: "Más de 87 Kg"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTaekwondo._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTenisIndividual =[
            {nombre: "Individual"},
            {nombre: "Copa de Naciones"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTenis._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTenisEquipo =[
            {nombre: "Dobles"}, 
            {nombre: "Mixtos "}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTenis._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTenisMIndividual =[
            {nombre: "Individual"},  
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTenisM._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTenisMEquipo =[
            {nombre: "Dobles"},
            {nombre: "Equipos"},
            {nombre: "Mixto"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTenisM._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTiroIndividual =[
            {nombre: "Rifle 50 m tendido"}, 
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTiro._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTiroEquipo =[
            {nombre: "Rifle 50 m tendido Equipo"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTiro._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTiroAIndividual =[
            {nombre: "Recurvo Ronda Olímpica ind. 70 m"},
            {nombre: "Compuesto Ronda Olímpica ind. 50 m"},
            {nombre: "Recurvo Mixta Ronda Olímpica Ind. 70 m"},
            {nombre: "Compuesto Mixto Ronda Olímpica 50 m"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTiroA._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTiroAEquipo =[
            {nombre: "Recurvo Ronda Olímpica equipos a 50 m"},
            {nombre: "Compuesto Ronda Olímpica equipos 50 m"},
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTiroA._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasTriaIndividual =[
            {nombre: "Individual"}   
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTria._id,
                activo: true,
                tipo: 0, // Individual: 0
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasTriaIndividualEquipo =[
            {nombre: "Equipos"},
            {nombre: "Relevo Mixto"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DTria._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 2,// Tiempo
            })
        });

        var pruebasBVoleibol =[
            {nombre: "Mayor"}    
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DVoleibol._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });

        var pruebasVoleibolP =[
            {nombre: "Mayor"}            
        ].map(prueba=>{
            return Prueba({
                nombre: prueba.nombre,
                deporte: DVoleibolP._id,
                activo: true,
                tipo: 1, // Equipo: 1
                tipoMarcador: 1,// Puntos
            })
        });
    
    var pruebas = [pruebasAtletismoXMetro, pruebasAtletismoXTiempoIndividual,
        pruebasAtletismoXTiempoEquipo, pruebasBadminton, pruebasBaloncesto, 
        pruebasBalonmano, pruebasBeisbol, pruebasBillar, pruebasBolicheIndividual,
        pruebasBolicheEquipo, pruebasDBoxeo, pruebasCanotaje, pruebasCiclismoCBMX,
        pruebasCiclismoCPIndividual, pruebasCiclismoCPXEquipo, pruebasCiclismoCPXPuntos,
        pruebasCiclismoCR, pruebasCiclismoCM, pruebasCricket, pruebasEcuestreEQSXEquipo, 
        pruebasEcuestreEQSXIndividual, pruebasEcuestreEQSXVelocidad, pruebasEcuestreEQAIndividual,
        pruebasEcuestreEQAEquipo, pruebasEcuestreEQPCIndividual, pruebasEcuestreEQPCEquipo, 
        pruebasEsgrimaIndividual, pruebasEsgrimaEquipo, pruebasFisiculturismo, pruebasFutbol,
        pruebasGimnasiaArIndividual, pruebasGimnasiaArEquipo, pruebasGimnasiaRiIndividual,
        pruebasGimnasiaRiEquipo, pruebasGolf, pruebasHalterofilia, pruebasBHockeyC,
        pruebasJudoIndividual, pruebasJudoEquipo, pruebasKarate, pruebasLuchaLul,
        pruebasLuchaLuG, pruebasNatacionIndividual, pruebasNatacionEquipo, 
        pruebasNatacionSIndividual, pruebasNatacionSEquipo, pruebasPatinajePuntos, 
        pruebasPatinajeTiempo, pruebasPelotaVasca, pruebasPentatlonMIndividual,
        pruebasPentatlonMEquipo, pruebasRacquetballIndividual, pruebasRacquetballEquipo,
        pruebasRemo, pruebasRugby, pruebasSoftbol, pruebasSurf, pruebasTaekwondo,
        pruebasTenisIndividual, pruebasTenisEquipo, pruebasTenisMIndividual, pruebasTenisMEquipo,
        pruebasTiroIndividual, pruebasTiroEquipo, pruebasTiroAIndividual, pruebasTiroAEquipo,
        pruebasTriaIndividual, pruebasTriaIndividualEquipo, pruebasBVoleibol, pruebasVoleibolP]

        await funcionesGlobales.asyncForEach(pruebas, async prueba=>{
            await inicializar(prueba);
        });
    }

    if(insertarUsuarios){            
        var usuarios = [
            new Usuario({ 
                "nombre": "Jonathan Varela Barrantes",
                "password": "Clave1234",
                "fotoUrl": "imagenes/imagenesPerfil/115670126.jpeg",
                "correo": "varela.b@hotmail.com",
                "identificacion": "115670126",
                "telefono": "70889619",
                "rol": 1,
                "created_date":"2018-08-15T06:59:50.463Z",
                "token": "6tm7GIM6qGtTAmF",        
                "tokenPassword": "ZScdYdUuPFbqwUN",
                "nombreNormalizado": "jonathan varela barrantes"
            }),
            new Usuario({       
                "nombre": "William Casasola Villalobos",
                "password": "Clave1234",
                "fotoUrl": "",
                "correo": "wacvillalobos@hotmail.es",
                "identificacion": "112233445566",
                "telefono": "",
                "rol": 1,
                "fechaCreacion": "2018-09-07T15:06:27.967Z",
                "tokenPassword": "OuFiYTZ5kbDWiF6",
                "nombreNormalizado": "william casasola villalobos",
            }),
            new Usuario({    
                "nombre": "Will",
                "correo": "casasolalonso@gmail.com",
                "identificacion": "115780376",
                "password": "Clave1234",
                "telefono": "222222",
                "fotoUrl": "imagenes/imagenesPerfil/115780376.jpeg",
                "rol": 0,
                "fechaCreacion":  "2018-09-15T18:54:28.458Z",
                "tokenPassword": "TpTbF1cRyNlmV9s",
                "nombreNormalizado": "will",
            })
        ];

        usuarios.forEach(elemento => {       
            Usuario.updateOne(elemento, elemento, opciones, function(err, elemento) {
            if (err) {/*console.log(err); */return};
            });  
        });
    }

    if(insertarAtletas){
        var atletas = [
            new Atleta({
                "nombre": "Nery Brenes",
                "correo": "nery@hotmail.es",
                "deporte": DAtletismo._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": true,
                "nombreNormalizado": "nerybrenes",
                "retirado": false,
                "fotoUrl": rutaImagenesAtletas + "NeryBrenes.jpg"
            }),
            new Atleta({
                "nombre": "Brisa Hennessey Kobara",
                "correo": "Brisa@hotmail.es",
                "deporte": DSurf._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": false,
                "nombreNormalizado": "brisahennesseykobara",
                "retirado": false,
                "fotoUrl": rutaImagenesAtletas + "BrisaHennesey.jpg"
            }),
            new Atleta({
                "nombre": "Andrea Vargas",
                "correo": "aVargas@hotmail.es",
                "deporte": DAtletismo._id,        
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": false,
                "nombreNormalizado": "andreavargas",
                "retirado": false,
                "fotoUrl": rutaImagenesAtletas + "AndreaVargas.jpeg"
            }),
            new Atleta({
                "nombre": "Claudia Poll",
                "correo": "CPoll@hotmail.es",
                "deporte": DNatacion._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": false,
                "nombreNormalizado": "claudiapoll",
                "retirado": true,
                "fotoUrl": rutaImagenesAtletas + "ClaudiaPoll.jpg"

            }),
            new Atleta({
                "nombre": "Henry Nuñez",
                "correo": "HNuñez@hotmail.es",
                "deporte": DJudo._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": true,
                "nombreNormalizado": "henrynuñez",
                "retirado": true,
                "fotoUrl": rutaImagenesAtletas + "HenryNuz.jpg",
            }),
            new Atleta({
                "nombre": "Diana Brenes",
                "correo": "DBrenes@hotmail.es",
                "deporte": DJudo._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": false,
                "nombreNormalizado": "dianabrenes",
                "retirado": false,
                "fotoUrl": rutaImagenesAtletas + "DianaBrenes.jpg"
            }),
            new Atleta({
                "nombre": "Kenneth Tencio ",
                "correo": "DBrenes@hotmail.es",
                "deporte": DCiclismoCBMX._id,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "activo": true,
                "genero": true,
                "nombreNormalizado": "kennethtencio",
                "retirado": false,
                "fotoUrl": rutaImagenesAtletas + "KennethTencio.jpg"
            }),
            new Atleta({
                "nombre": "Andrey Amador",
                "correo": "Andrey@hotmail.es",
                "telefono": "22660139",
                "deporte": DCiclismoCR._id,
                "fotoUrl": rutaImagenesAtletas + "AndreyAmador.jpg",
                "activo": true,
                "fechaNacimiento": "1986-08-29T00:00:00.000Z",
                "pasaporte": "123456789",
                "genero": true,
                "lateralidad": true,
                "beneficiario": "Padre",
                "cedulaBeneficiario": "123456789012",
                "visaAmericana": "12345678",
                "venceVisa": "2022-08-08T00:00:00.000Z",
                "tallaCamisa": "L",
                "pantaloneta": "38",
                "tallaJacket": "L",
                "tallaBuzo": "38",
                "tallaTenis": "40",
                "infoPersonal": "«Todavía tengo muchas cosas que puedo aprender y mejorar como corredor, y el Team INEOS es el lugar perfecto para seguir creciendo»",
                "fechaDebut": "2009-05-05T00:00:00.000Z",
                "facebookUrl": "https://www.facebook.com/andreyamadoroficial/",
                "instagramUrl": "https://www.instagram.com/andrey_amador/",
                "twitterUrl": "https://twitter.com/Andrey_Amador",
                "altura": 1.80,
                "pais": paises.find(p => p.name ==="Costa Rica")._id,
                "peso": 72,
                "nombreNormalizado": "andreyamador",
                "retirado": false,
            })
        ]; 

        await inicializar(atletas);
    } 

    if(insertarEventos){

        var Rio = new Evento({
            "nombre": "Juegos Olímpicos de Río de Janeiro 2016",
            "fechaInicio": "2016-08-05T00:00:00.000Z",
            "fechaFinal": "2016-08-21T00:00:00.000Z",
            "ciudad": "Río",
            "pais": paises.find(p => p.name ==="Brasil")._id,
            "fotoUrl": rutaImagenesEventos + "Rio.png",
            "activo": true,
            //"nombreNormalizado": "juegosolimpicosderiodejaneiro2016",
        });
        var Tokio = new Evento({
            //"_id": getNextSequenceValue("evento"),
            "nombre": "Juegos Olímpicos de Tokio 2020",
            "fechaInicio":"2020-08-05T00:00:00.000Z",
            "fechaFinal":  "2020-08-21T00:00:00.000Z",
            "ciudad": "Tokio",
            "pais": paises.find(p => p.name ==="Japón")._id,
            "fotoUrl": rutaImagenesEventos + "Tokio.png",
            "activo": true,
        });



        var eventos = [Rio, Tokio];


        await inicializar(eventos)
    }

    if(insertarCompetencias){
        var competencia = new Competencia({    
            "evento": Rio._id,
            "prueba": pruebasAtletismoXTiempoIndividual[1]._id,
            "fechaHora":  "2016-07-28T00:00:00.000Z",
            "recinto": "Estadio Río",
            "ciudad": "Río",
            "genero": true,
            "descripcion": "Hit 1",
            "fase": 2,
            "activo": true,
        });

        var competencia2 = new Competencia({    
            "evento": Rio._id,
            "prueba": pruebasCiclismoCR[1]._id,
            "fechaHora":  "2016-08-06T00:00:00.000Z",
            "recinto": "Copacabana",
            "ciudad": "Copacabana",
            "genero": true,
            "descripcion": "Hit 1",
            "fase": 1,
            "activo": true,
        });
        
        var competencias = [competencia, competencia2];

        await inicializar(competencias);
    }

    if(insertarAtletasCompetidores){
        var atletaCompetidor = new AtletaCompetidor({
            "atleta": atletas[0]._id,
            "competencia": competencia._id,
            "marcadores": [
                {
                    "esUltimoRegistro": true,
                    "set": 1,
                    "puntaje": "20: 33",
                    "momentoRegistro": new Date().getTime()
                }
            ],
        });

        var atletaCompetidor2 = new AtletaCompetidor({
            "atleta": atletas[7]._id,
            "competencia": competencia2._id,
            "marcadores": [
                {
                    "esUltimoRegistro": true,
                    "set": 1,
                    "puntaje": "6:30:05",
                    "momentoRegistro": new Date().getTime()
                }
            ],
        });

        var atletasCompetidores = [atletaCompetidor, atletaCompetidor2];

        await inicializar(atletasCompetidores);

    }

};