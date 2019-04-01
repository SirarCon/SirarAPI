'use strict';
var mongoose = require('mongoose'),
Contador = mongoose.model('Contador'),
Mensaje = mongoose.model('Mensaje'),
Pais = mongoose.model('Pais'),
Fase = mongoose.model('Fase'),
Usuario = mongoose.model('Usuario'),
Deporte = mongoose.model('Deporte'),
Atleta = mongoose.model('Atleta'),
Prueba = mongoose.model('Prueba'),
Usuario = mongoose.model('Usuario'),
Competencia = mongoose.model('CompetenciaAtleta'),
AtletaCompetidor = mongoose.model('AtletaCompetidor'),
Evento = mongoose.model('Evento'),
Federacion = mongoose.model('Federacion'),
globales =  require("../Globales.js"),
rutaImagenesFederaciones = globales.rutaImagenesFederaciones.instance,
borrarDatos = true,
insertarDatos = true;
 
exports.Errores = async function(){
    if(insertarDatos){
        if(borrarDatos){
            Mensaje.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Contador.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Usuario.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Deporte.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Atleta.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Prueba.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Usuario.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Competencia.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            AtletaCompetidor.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Evento.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Federacion.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Pais.remove({},(e,el)=>{});//e?console.log(e + "error"): console.log(el+ "exitos"));
            Fase.remove({},(e,el)=>{});//>e?console.log(e + "error"): console.log(el+ "exitos"));
        }


var contadores= [ {"_id": "evento", "sequence_value": 0 } ];


  var mensajes = [
        {"mensaje": "", "codigo": -1, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 },
        {"mensaje": "Contraseña de {sutantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1},
        {"mensaje": "{sutantivoCambiar} {id} se ha ingresado.", "codigo": -7, "exito": 1 },
        {"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 },
        {"mensaje": "Hubo un problema borrando {sutantivoCambiar} {id}", "codigo": 3, "exito": 0 },
        {"mensaje": "Hubo un problema enviando {sutantivoCambiar} a {id}", "codigo": 4, "exito": 0 },
        {"mensaje": "Hubo un problema buscando {sutantivoCambiar} {id}", "codigo" : 5, "exito": 0 },
        {"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 },
        {"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 },
        {"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 },
        {"mensaje": "Contraseña actual no coincide con la indicada", "codigo" : 9, "exito": 0 },
        {"mensaje": "Hubo un problema creando {sutantivoCambiar} {id}", "codigo" : 10, "exito": 0 }, 
        {"mensaje": "No hay {sutantivoCambiar} que listar", "codigo" : 11, "exito": 0 },
        {"mensaje": "Hubo un problema leyendo {sutantivoCambiar}", "codigo" : 12, "exito": 0 },   
        {"mensaje": "Hubo un problema leyendo {sutantivoCambiar} {id}", "codigo" : 13, "exito": 0 },
        {"mensaje": "Hubo un error modificando {sutantivoCambiar} {id}", "codigo" :14, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} indicado ya está registrado", "codigo" :15, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} {id} no tiene formato adecuado", "codigo" :16, "exito": 0 },
        {"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 },
        {"mensaje": "No existe {sutantivoCambiar}", "codigo" : 18, "exito": 0 },
        {"mensaje": "Hubo un problema ingresando {sutantivoCambiar} {id}", "codigo" : 19, "exito": 0 },
        {"mensaje": "Hubo un problema borrando {sutantivoCambiar} {id}", "codigo" : 20, "exito": 0 },
        {"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema guardando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 },
        {"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 }
]

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


 var final = new Fase({ "_id": 1, "descripcion" : "Final", "siglas": "F" }),
  semiFinal = new Fase({ "_id": 2, "descripcion" : "Semifinal", "siglas": "SF"}),
  cuartosfinal = new Fase({ "_id": 3, "descripcion" : "Cuartos de Final", "siglas": "QF"}),
  octavosfinal = new Fase({ "_id": 4, "descripcion" : "Octavos de Final", "siglas": "8 F"}),
  dieciseisavosfinal =  new Fase({ "_id": 5, "descripcion" : "Dieciseisavos de Final", "siglas": "16 F"}),
  grupos =  new Fase({ "_id": 6, "descripcion" : "Fase de Grupos", "siglas": "Grupos"});
 
  var fases = [
   final, semiFinal, cuartosfinal, octavosfinal, dieciseisavosfinal, grupos
]

var opciones = { upsert: true, new: true, setDefaultsOnInsert: true };

contadores.forEach(elemento => {
    Contador.update(elemento, elemento, opciones, function(err, elemento) {
        if (err){/*console.log(err);*/ return};
        })
    });  



mensajes.forEach(elemento => {
        Mensaje.findOneAndUpdate(elemento, elemento, opciones, function(err, elemento) {
        if (err) return;
        });  
});

paises.forEach(elemento => {
        Pais.update(elemento, elemento, opciones, function(err, elemento) {
            if (err){/*console.log(err);*/ return};
            })
        });  

fases.forEach(elemento => {
    Fase.update(elemento, elemento, opciones, function(err, elemento) {
        if (err){/*console.log(err);*/ return};
        })
    });  

var usuario = {
        "nombre" : "William",
        "nombreNormalizado" : "william",
        "identificacion" : "115780376",
        "correo" : "wacvillalobos@hotmail.es",
        "password" : "P123456p",
        "rol" : "1" }

Usuario.findOneAndUpdate(usuario, usuario, opciones, function(err, elemento) {
        if (err) return;
        }); 

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
var federaciones = [ajedrez, atletismo, badminton/*, baloncesto, balonmano,
                    beisbol, billar, boliche, boxeo, canotaje, ciclismo, circket, 
                    ecuestre, esgrima, fisicoculturismo, futbol, gimnasia,
                    golf, halterofilia, hockey, judo, karate, lucha, natacion, patinaje, pelotaVasca,
                    pentatlon, racquetball, remo, rugby, softbol, surf, taekwondo, tenis,
tenisMesa, tiroBlanco, tiroArco, triatlon,voleibol*/];
        federaciones.forEach(elemento => {             
                Federacion.update(elemento, elemento, opciones, function(err, elemento) {
                if (err){/*console.log(err);*/ return};
                });  
        });

console.log("F: " + federaciones.length)
    
    var DAjedrez = new Deporte({
                nombre: "Ajedrez",
                nombreNormalizado: "ajedrez",
                imagenDeporteUrl: "",
                federacion: ajedrez._id,
                activo: true,                                
        });
     var DAtletismo = new Deporte({
                nombre: "Atletismo",
                nombreNormalizado: "atletismo",
                imagenDeporteUrl: "",
                federacion: atletismo._id,
                activo: true, 
                /*pruebas: [   
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
                        {nombre: "Relevo 4x100 m"},
                        {nombre: "Relevo 4x400 m"},
                        {nombre: "Salto de altura"},
                        {nombre: "Salto de longitud"},
                        {nombre: "Salto Triple"},
                        {nombre: "Salto con Garrocha"},
                        {nombre: "Lanzamiento de Bala"},
                        {nombre: "Lanzamiento de Disco"},
                        {nombre: "Lanzamiento de Jabalina"},
                        {nombre: "Lanzamiento de Martillo"}, 
                        {nombre: "20 Km Marcha"},
                        {nombre: "50 Km Marcha"},
                        {nombre: "Maratón"},
                        {nombre: "Héptatlón"},
                        {nombre: "Decatlón"},                                       
                        ]*/
        });
       var DBadminton = new Deporte({
         nombre: "Bádminton",
         imagenDeporteUrl: "",
         nombreNormalizado: "badminton",
         federacion: badminton._id,
         activo: true, 
        /* pruebas: [{nombre: "Individual"}]*/
        });
        /*{
                nombre: "Baloncesto",
                imagenDeporteUrl: "",
                nombreNormalizado: "baloncesto",
                federacion: baloncesto._id,
                activo: true,
                pruebas: 
                        [
                                {nombre: "Masculino"},
                                {nombre: "Femenino"}
                        ]   
        },
{
        nombre: "Balonmano",
        imagenDeporteUrl: "" ,
        nombreNormalizado: "balonmano",
        federacion: balonmano._id,
        activo: true,
        pruebas: 
                        [
                                {nombre: "Femenino"},
                                {nombre: "Masculino"}
                        ]
},
{
        nombre: "Béisbol",
        imagenDeporteUrl: "",
        nombreNormalizado: "beisbol",
        federacion: beisbol._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Billar",
        imagenDeporteUrl: "",
        nombreNormalizado: "billar",
        federacion: billar._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Boliche",
        imagenDeporteUrl: "",
        nombreNormalizado: "boliche",
        federacion: boliche._id,
        activo: true,
        pruebas: 
                [
                {nombre:"Individual"},
                {nombre:"Dobles"},
                {nombre:"Tríos"},
                {nombre: "Quintetos"},
                {nombre: "Todo evento"},
                {nombre: "Final Maestros"}
                ]
},
{
        nombre: "Boxeo",
        imagenDeporteUrl: "",
        nombreNormalizado: "boxeo",
        federacion: boxeo._id,
        activo: true,
        pruebas:
        [
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
        ] 
},
{
        nombre: "Canotaje",
        imagenDeporteUrl: "",
        nombreNormalizado: "canotaje",
        federacion: canotaje._id,
        activo: true, 
        pruebas:
        [
                {nombre: "C1"},
                {nombre: "K1"}      
        ]
},
{
        nombre: "Ciclismo CBMX",
        imagenDeporteUrl: "",
        nombreNormalizado: "ciclismo cbmx",
        federacion: ciclismo._id,
        activo: true,
        pruebas:
        [
                {nombre: "Individual"},                                
        ] 
},
{
        nombre: "Ciclismo CP",
        imagenDeporteUrl: "",
        nombreNormalizado: "ciclismo cp",
        federacion: ciclismo._id,
        activo: true,
        pruebas:
        [                               
                {nombre: "500 m contra reloj"},
                {nombre: "Velocidad"},
                {nombre: "Keirin"},
                {nombre: "Velocidad por equipo"},
                {nombre: "Persecución por equipo"},
                {nombre: "Persecución individual"},
                {nombre: "Carrera por puntos"},
                {nombre: "Scratch"},
                {nombre: "Omnium"},
                {nombre: "1 Km"}
        ] 
},
{
        nombre: "Ciclismo CR",
        imagenDeporteUrl: "",
        nombreNormalizado: "ciclismo cr",
        federacion: ciclismo._id,
        activo: true,
        pruebas:
                [                               
                        {nombre: "Contra Reloj Individual"},
                        {nombre: "Ruta individual"},                                
                ] 
},
{
        nombre: "Ciclismo CM Montaña",
        imagenDeporteUrl: "",
        nombreNormalizado: "ciclismo cm montaña",
        federacion: ciclismo._id,
        activo: true,
        pruebas:
                [       
                        {nombre: "Cross Country Olympic"}
                ] 
},
{
        nombre: "Cricket",
        imagenDeporteUrl: "",
        nombreNormalizado: "cricket",
        federacion: circket._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Ecuestre EQS",
        imagenDeporteUrl: "",
        nombreNormalizado: "ecuestre eqs",
        federacion: ecuestre._id,
        activo: true,
                pruebas:
                        [
                                {nombre: "Velocidad"},
                                {nombre: "Equipos"},
                                {nombre: "Acumulado"},
                                {nombre: "Individual"}                                     
                        ] 
},
{
        nombre: "Ecuestre EQA",
        imagenDeporteUrl: "",
        nombreNormalizado: "ecuestre eqa",
        federacion: ecuestre._id,
        activo: true,
        pruebas:
                        [
                                {nombre: "Equipos"},
                                {nombre: "Acumulado"},
                                {nombre: "Individual"}      
                        ] 
},
{
        nombre: "Ecuestre EQPC",
        imagenDeporteUrl: "",
        nombreNormalizado: "ecuestre eqpc",
        federacion: ecuestre._id,
        activo: true,
        pruebas:
                        [
                                {nombre: "Equipos"},
                                {nombre: "Individual"}      
                        ] 
},
{
        nombre: "Esgrima",
        imagenDeporteUrl: "",
        nombreNormalizado: "esgrima",
        federacion: esgrima._id,
        activo: true,
                pruebas:
                        [
                                {nombre: "Espada individual"},
                                {nombre: "Espada equipo"},
                                {nombre: "Florete Individual"},
                                {nombre: "Florete equipo"},
                                {nombre: "Sable Individual"},
                                {nombre: "Sable equipo"}
                        ] 
},
{
        nombre: "Fisiculturismo",
        imagenDeporteUrl: "",
        nombreNormalizado: "fisiculturismo",
        federacion: fisicoculturismo._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Futbol",
        imagenDeporteUrl: "",
        nombreNormalizado: "futbol",
        federacion: futbol._id,
        activo: true,
                pruebas:
                        [
                                {nombre: "Femenino"},
                                {nombre: "Masculino"}        
                        ] 
},
{
        nombre: "Gimnasia Artistica",
        imagenDeporteUrl: "",
        nombreNormalizado: "gimnasia artistica",
        federacion: gimnasia._id,
        activo: true,
        pruebas: 
                [
                        {nombre: "Equipo"},
                        {nombre: "All Around"}, 
                        {nombre: "Piso"},
                        {nombre: "Salto"},
                        {nombre: "Barras Asimétricas"},
                        {nombre: "Viga de equilibrio"},
                        {nombre: "Anillos"},
                        {nombre: "Caballo con Arzones"},
                        {nombre: "Barra Fija"},
                        {nombre: "Barras Paralelas"},                        
                ]
},
{
        nombre: "Gimnasia Ritmica",
        imagenDeporteUrl: "",
        nombreNormalizado: "gimnasia ritmica",
        federacion: gimnasia._id,
        activo: true,
                pruebas:
                        [ 
                                {nombre: "Aro"},
                                {nombre: "Pelota"},
                                {nombre: "Mazas"},
                                {nombre: "Cinta"},
                                {nombre: "All Around"},
                                {nombre: "Equipos"}
                        ]
},
{
        nombre: "Golf",
        imagenDeporteUrl: "",
        nombreNormalizado: "golf",
        federacion: golf._id,
        activo: true,
                pruebas:
                        [
                                {nombre: "Individual a 54 hoyos"}, 
                                {nombre: "3 rondas de 18 hoyos"}       
                        ] 
},
{
        nombre: "Halterofilia",
        imagenDeporteUrl: "",
        nombreNormalizado: "halterofilia",
        federacion: halterofilia._id,
        activo: true,
                pruebas:
                        [ 
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
                        ] 
},
{
        nombre: "Hockey Césped",
        imagenDeporteUrl: "",
        nombreNormalizado: "hockey cesped",
        federacion: hockey._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Judo",
        imagenDeporteUrl: "",
        nombreNormalizado: "judo",
        federacion: judo._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Menos de 44 Kg"},
                        {nombre: "Menos de 48 Kg"},
                        {nombre:  "Menos de 52 Kg"},
                        {nombre: "Menos de 57 Kg"},
                        {nombre: "Menos de 63 Kg"},
                        {nombre: "Menos de 70 Kg"},
                        {nombre: "Menos de 78 Kg"},
                        {nombre: "Más de 78 Kg"},
                        {nombre: "Equipo"},
                        {nombre: "Menos de 55 Kg"},
                        {nombre: "Menos de 60 Kg"},
                        {nombre: "Menos de 66 Kg"},
                        {nombre: "Menos de 73 Kg"},
                        {nombre: "Menos de 81 Kg"},
                        {nombre: "Menos de 90 Kg"},
                        {nombre: "Menos de 100 Kg"},
                        {nombre:  "Más de 100 Kg"}
                ]
},
{
        nombre: "Karate",
        imagenDeporteUrl: "",
        nombreNormalizado: "karate",
        federacion: karate._id,
        activo: true,
        pruebas:
                [
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
                ] 
},
{
        nombre: "Lucha LUL",
        imagenDeporteUrl: "",
        nombreNormalizado: "lucha lul",
        federacion: lucha._id,
        activo: true,
        pruebas:
                [
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
                ]
},
{
        nombre: "Lucha LUG",
        imagenDeporteUrl: "",
        nombreNormalizado: "lucha lug",
        federacion: lucha._id,
        activo: true,
        pruebas:
                [
                        {nombre: "59 Kg"},
                        {nombre: "66 Kg"},
                        {nombre: "75 Kg"},
                        {nombre: "85 Kg"},
                        {nombre: "98 Kg"},
                        {nombre: "130 Kg"}      
                ]
},
{
        nombre: "Natación",
        imagenDeporteUrl: "",
        nombreNormalizado: "natación",
        federacion: natacion._id,
        activo: true,
        pruebas:
                [
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
                        {nombre: "4x100 Relevo Libre"},
                        {nombre: "4x100 Relevo Combinado"},                        
                ] 
},
{
        nombre: "Natación Sincronizado",
        imagenDeporteUrl: "",
        nombreNormalizado: "natación sincronizado",
        federacion: natacion._id,
        activo: true,
               pruebas:
                   [
                        {nombre: "Sincronizado Dueto Técnico"},
                        {nombre: "Sincronizado Dueto Libre"},
                        {nombre: "Sincronizado Solo Técnico"},
                        {nombre: "Sincronizado Solo Libre"},
                        {nombre: "Sincronizado Equipo Técnico"},
                        {nombre: "Sincronizado Equipo Libre"},
                        {nombre: "Sincronizado Rutina Libre Combinada"}
                    ]
},
{
        nombre: "Patinaje",
        imagenDeporteUrl: "",
        nombreNormalizado: "patinaje",
        federacion: patinaje._id,
        activo: true,
        pruebas:
                 [
                {nombre: "300 m"},
                {nombre: "500 m "},
                {nombre: "10 000 m Combinado"},
                {nombre: "10 000 m  puntos"},
                   ] 
},
{
        nombre: "Pelota Vasca",
        imagenDeporteUrl: "",
        nombreNormalizado: "pelota vasca",
        federacion: pelotaVasca._id,
        activo: true,
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Pentatlón Moderno",
        imagenDeporteUrl: "",
        nombreNormalizado: "pentatlón moderno",
        federacion: pentatlon._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Individual"},
                        {nombre: "Relevo"}
                ] 
},
{
        nombre: "Racquetball",
        imagenDeporteUrl: "",
        nombreNormalizado: "racquetball",
        federacion: racquetball._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Individual"},
                        {nombre: "Dobles"},
                        {nombre: "Equipos"}     
                ] 
},
{
        nombre: "Remo",
        imagenDeporteUrl: "",
        nombreNormalizado: "remo",
        federacion: remo._id,
        activo: true, 
        pruebas: 
                [
                {nombre:"Individual"},
                ]
},
{
        nombre: "Rugby",
        imagenDeporteUrl: "" ,
        nombreNormalizado: "rugby",
        federacion: rugby._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Femenino"},
                        {nombre: "Masculino"}   
                ]
},
{
        nombre: "Softbol",
        imagenDeporteUrl: "",
        nombreNormalizado: "softbol",
        federacion: softbol._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Masculino"},
                        {nombre: "Femenino"}       
                ]
},
{
        nombre: "Surf",
        imagenDeporteUrl: "",
        nombreNormalizado: "surf",
        federacion: surf._id,
        activo: true,
        pruebas:
                [
                        {nombre: "Masculino"},
                        {nombre: "Femenino"}      
                ] 
},
{
        nombre: "Taekwondo",
        imagenDeporteUrl: "",
        nombreNormalizado: "taekwondo",
        federacion: taekwondo._id,
        activo: true,
        pruebas:
                [
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
                ]  
},
{
        nombre: "Tenis",
        nombreNormalizado: "tenis",
        federacion: tenis._id,
        activo: true,
        imagenDeporteUrl: "",
                pruebas:
                        [
                                {nombre: "Individual"},
                                {nombre: "Dobles"}, 
                                {nombre: "Copa de Naciones"},
                                {nombre: "Mixtos "}
                        ] 
},
{
        nombre: "Tenis de Mesa",
        imagenDeporteUrl: "",
        nombreNormalizado: "tenis de mesa",
        federacion: tenisMesa._id,
        activo: true,
        pruebas: 
                [
                        {nombre: "Individual"},
                        {nombre: "Dobles"},
                        {nombre: "Equipos"},
                        {nombre: "Mixto"}
                ]
        
},
{
        nombre: "Tiro Al Blanco",
        imagenDeporteUrl: "",
        nombreNormalizado: "tiro al blanco",
        federacion: tiroBlanco._id,
        activo: true,
        pruebas: [
                {nombre: "Rifle 50 m tendido"}, 
                {nombre: "Rifle 50 m tendido Equipo"}                 
        ]
},
{
        nombre: "Tiro Con Arco",
        imagenDeporteUrl: "",
        nombreNormalizado: "tiro con arco",
        federacion: tiroArco._id,
        activo: true,
        pruebas: 
                [
                        {nombre: "Recurvo Ronda Olímpica ind. 70 m"},
                        {nombre: "Recurvo Ronda Olímpica equipos a 50 m"},
                        {nombre: "Compuesto Ronda Olímpica ind. 50 m"},
                        {nombre: "Compuesto Ronda Olímpica equipos 50 m"},
                        {nombre: "Recurvo Mixta Ronda Olímpica Ind. 70 m"},
                        {nombre: "Compuesto Mixto Ronda Olímpica 50 m"}
                ] 
},
{
        nombre: "Triatlón",
        imagenDeporteUrl: "",
        nombreNormalizado: "triatlón",
        federacion: triatlon._id,
        activo: true,
        pruebas: 
                [
                        {nombre: "Individual"}, 
                        {nombre: "Equipos"},
                        {nombre: "Relevo Mixto"}         
                ] 
},
{
        nombre: "Voleibol",
        imagenDeporteUrl: "",
        nombreNormalizado: "voleibol",
        federacion: voleibol._id,
        activo: true,
        pruebas:
                [
                {nombre: "Femenino"},
                {nombre: "Masculino"}
                ]
},
{
        nombre: "Voleibol Playa",
        imagenDeporteUrl: "",
        nombreNormalizado: "voleibol plya",
        federacion: voleibol._id,
        activo: true,
        pruebas:
                [
                {nombre: "Femenino"},
                {nombre: "Masculino"}
                ]
}
*/

var deportes =[DAjedrez, DAtletismo, DBadminton]

      
console.log("D: " + deportes.length)
deportes.forEach(elemento => {       
        Deporte.update(elemento, elemento, opciones, function(err, elemento) {
        if (err) {/*console.log(err); */return};
        });  
});

var usuarios = [
    new Usuario({ 
        "nombre": "Jonathan Varela Barrantes",
        "password": "Clave1234",
        "fotoUrl": "imagenes/imagenesPerfil/115670126.jpeg",
        "correo": "varela.b@hotmail.com",
        "identificacion": "115670126",
        "telefono": "70889619",
        "rol": 1,
        "created_date": {
            "$date": "2018-08-15T06:59:50.463Z"
        },
        "token": "6tm7GIM6qGtTAmF",        
        "tokenPassword": "ZScdYdUuPFbqwUN",
        "nombreNormalizado": "jonathan varela barrantes"
    }),
    new Usuario({       
        "nombre": "William Casasola Villalobos",
        "fotoUrl": "",
        "correo": "wacvillalobos@hotmail.es",
        "identificacion": "112233445566",
        "telefono": "",
        "rol": 1,
        "fechaCreacion": {
            "$date": "2018-09-07T15:06:27.967Z"
        },
        "tokenPassword": "OuFiYTZ5kbDWiF6",
        "nombreNormalizado": "william casasola villalobos",
    }),
    new Usuario({    
        "nombre": "Will",
        "correo": "casasolalonso@gmail.com",
        "identificacion": "115780376",
        "password": "una",
        "telefono": "222222",
        "fotoUrl": "imagenes/imagenesPerfil/115780376.jpeg",
        "rol": 0,
        "fechaCreacion": {
            "$date": "2018-09-15T18:54:28.458Z"
        },
        "tokenPassword": "TpTbF1cRyNlmV9s",
        "nombreNormalizado": "will",
    })
];


usuarios.forEach(elemento => {       
    Usuario.update(elemento, elemento, opciones, function(err, elemento) {
    if (err) {/*console.log(err); */return};
    });  
});
console.log("U: " + usuarios.length)



var atletas = [
    new Atleta({
        "nombre": "Nery Brenes",
        "correo": "nery@hotmail.es",
        "apellido1": "Brenes",
        "deporte": DAtletismo._id,
        "pais": paises.find(p => p.name ==="Costa Rica")._id,
        "activo": true,
        "nombreNormalizado": "nerybrenes",
    }),
    new Atleta({
        "nombre": "Usain ",
        "correo": "uBolt@hotmail.es",
        "apellido1": "Bolt",
        "deporte": DAtletismo._id,
        "pais": paises.find(p => p.name ==="Jamaica")._id,
        "activo": true,
        "nombreNormalizado": "usain",
    }),
    new Atleta({
        "nombre": "Saina",
        "correo": "sNehwal@hotmail.es",
        "apellido1": "Nehwal",
        "deporte": DBadminton._id,        
        "pais": paises.find(p => p.name ==="India")._id,
        "activo": true,
        "nombreNormalizado": "saina",
    }),
    new Atleta({
        "nombre": "Carolina",
        "correo": "Marin@hotmail.es",
        "apellido1": "Marin",
        "deporte": DBadminton._id,
        "pais": paises.find(p => p.name ==="España")._id,
        "activo": true,
        "nombreNormalizado": "carolina",
    }),
    new Atleta({
        "nombre": "Bobby",
        "correo": "Bob@hotmail.es",
        "apellido1": "Fischer",
        "deporte": DAjedrez._id,
        "pais": paises.find(p => p.name ==="Estados Unidos")._id,
        "activo": true,
        "nombreNormalizado": "bobby",
    }),
    new Atleta({
        "nombre": "Fabiano",
        "correo": "FCaruna@hotmail.es",
        "apellido1": "Caruana",
        "deporte": DAjedrez._id,
        "pais": paises.find(p => p.name ==="Estados Unidos")._id,
        "activo": true,
        "nombreNormalizado": "fabiano",
    }),
    new Atleta({
        "nombre": "Dafne",
        "correo": "dafne@hotmail.es",
        "apellido1": "Schippers",
        "apellido2": "Schip",
        "telefono": "22660139",
        "deporte": DAtletismo._id,
        "fotoUrl": "imagenes/imagenesAtletas/5c87158dd3cb6b0015814b90.jpeg",
        "activo": true,
        "fechaNacimiento": {
            "$date": "1992-06-15T00:00:00.000Z"
        },
        "pasaporte": "123456789",
        "genero": false,
        "lateralidad": true,
        "beneficiario": "Padre",
        "cedulaBeneficiario": "123456789012",
        "visaAmericana": "12345678",
        "venceVisa": {
            "$date": "2022-08-08T00:00:00.000Z"
        },
        "tallaCamisa": "L",
        "pantaloneta": "38",
        "tallaJacket": "L",
        "tallaBuzo": "38",
        "tallaTenis": "40",
        "infoPersonal": "She is a Dutch track and field athlete. She competes primarily in the sprints, having previously participated in the heptathlon. She is the 2015 and 2017 World Champion and won silver at the 2016 Summer Olympics in the 200 metres.",
        "fechaDebut": {
            "$date": "2009-05-05T00:00:00.000Z"
        },
        "facebookUrl": "https://www.facebook.com/dafneschippersfanpage/",
        "instagramUrl": "https://www.instagram.com/dafne_schippers/",
        "twitterUrl": "https://twitter.com/dafneschippers",
        "altura": 1.79,
        "pais": paises.find(p => p.name ==="Holanda")._id,
        "peso": 68,
        "nombreNormalizado": "dafne",
    })
]; 

console.log("A: " + atletas.length)
atletas.forEach(elemento => {       
    Atleta.update(elemento, elemento, opciones, function(err, elemento) {
    if (err) {/*console.log(err); */return};
    });  
});


var pruebaAtletismo = new Prueba({
        "nombre": "200 mts",
        "tipo": 1,
        "activo": true,
        "deporte": DAtletismo._id,
        "nombreNormalizado": "200mts5c872185d3cb6b0015814b94",
});

var pruebas = [pruebaAtletismo];

console.log("P: " + pruebas.length)
pruebas.forEach(elemento => {       
    Prueba.update(elemento, elemento, opciones, function(err, elemento) {
    if (err) {/*console.log(err); */return};
    });  
});



var Rio = new Evento({
    "nombre": "Juegos Olímpicos de Río de Janeiro 2016",
    "fechaInicio": "2016-08-05T00:00:00.000Z",
    "fechaFinal": "2016-08-21T00:00:00.000Z",
    "ciudad": "Río",
    "pais": paises.find(p => p.name ==="Brasil")._id,
    "fotoUrl": "imagenes/imagenesEventos/5c8719d7d3cb6b0015814b91.jpeg",
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
    "fotoUrl": "imagenes/imagenesEventos/5c8719d7d3cb6b0015814b91.jpeg",
    "activo": true,
});



var eventos = [Rio, Tokio];

console.log("E: " + eventos.length)

eventos.forEach(elemento => {    
    elemento.save().then(async ()=> {
        }).catch(err=>{ console.log(err)}) ;
});


var competencia = new Competencia({    
    "evento": Rio._id,
    "prueba": pruebaAtletismo._id,
    "fechaHora": {
        "$date": "2016-08-18T00:00:00.000Z"
    },
    "lugar": "Estadio Río",
    "genero": false,
    "descripcion": "Hit 1",
    "fase": 1,
    "activo": true,
});

var competencias = [competencia];


console.log("C: " + competencias.length)
competencias.forEach(elemento => {       
    Competencia.update(elemento, elemento, opciones, function(err, elemento) {
    if (err) {/*console.log(err); */return};
    });  
});

var atletaCompetidor = new AtletaCompetidor({
    "atleta": atletas[6]._id,
    "competencia": competencia._id,
    "esUltimoRegistro": true,
    "marcadores": [
        {
            "set": 1,
            "tiempo": {
                "segundo": 21,
                "milisegundo": 88
            },
            "tipo": 2,            
        }
    ],
});

var atletasCompetidores = [atletaCompetidor];

console.log("AC: " + atletasCompetidores.length)
atletasCompetidores.forEach(elemento => {       
    AtletaCompetidor.update(elemento, elemento, opciones, function(err, elemento) {
    if (err) {/*console.log(err); */return};
    });  
});
}

};