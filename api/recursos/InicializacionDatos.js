'use strict';
var mongoose = require('mongoose'),
Mensaje = mongoose.model('Mensaje'),
Usuario = mongoose.model('Usuario'),
Disciplina = mongoose.model('Disciplina'),
Federacion = mongoose.model('Federacion');

exports.Errores = async function(){
 //Mensaje.remove({},(e,el)=>e?console.log(e + "error"): console.log(el+ "exitos"));
  var mensajes = [
        {"mensaje": "", "codigo": -1, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 },
        {"mensaje": "{sutantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 },
        {"mensaje": "Contraseña de {sutantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1},
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
        {"mensaje": "No hay usuarios que listar", "codigo" : 11, "exito": 0 },
        {"mensaje": "Hubo un problema leyendo {sutantivoCambiar}", "codigo" : 12, "exito": 0 },   
        {"mensaje": "Hubo un problema leyendo {sutantivoCambiar} {id}", "codigo" : 13, "exito": 0 },
        {"mensaje": "Hubo un error modificando {sutantivoCambiar} {id}", "codigo" :14, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} indicado ya está registrado", "codigo" :15, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} {id} no tiene formato adecuado", "codigo" :16, "exito": 0 },
        {"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 },
        {"mensaje": "No existe {sutantivoCambiar}", "codigo" : 18, "exito": 0 },
        {"mensaje": "Hubo un problema borrando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema guardando la foto", "codigo" : 0, "exito": 0 },
        {"mensaje": "Hubo un problema creando el token", "codigo" : 50, "exito": 0 },
        {"mensaje": "Por su seguridad la sesión ha expirado", "codigo": 403, "exito": 0 }
]

var opciones = { upsert: true, new: true, setDefaultsOnInsert: true };
mensajes.forEach(elemento => {
        Mensaje.findOneAndUpdate(elemento, elemento, opciones, function(err, elemento) {
        if (err) return;
        });  
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

var racketball = new Federacion({
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
//  var opciones2 = {strict:false, upsert: true, new: true, setDefaultsOnInsert: true };
var federaciones = [ajedrez, atletismo, badminton, baloncesto, balonmano,
                    beisbol, billar, boliche, boxeo, canotaje, ciclismo, circket, 
                    ecuestre, esgrima, fisicoculturismo, futbol, gimnasia,
                    golf, halterofilia, hockey, judo, karate, lucha, natacion, patinaje, pelotaVasca,
                    pentatlon, racketball, remo, rugby, softbol, surf, taekwondo, tenis,
                    tenisMesa, tiroBlanco, tiroArco, triatlon,voleibol];
        federaciones.forEach(elemento => {             
                Federacion.update(elemento, elemento, opciones, function(err, elemento) {
                if (err){/*console.log(err);*/ return};
                });  
        });

console.log("F: " + federaciones.length)
    var disciplinas =
    [
        {
                nombre: "Ajedrez",
                nombreNormalizado: "ajedrez",
                imagenDisciplinaUrl: "",
                federacion: ajedrez._id,
                activo: true,                    
                pruebas: 
                        [
                        {nombre:"Individual"},
                        ]                 
        },
        {
                nombre: "Atletismo",
                nombreNormalizado: "atletismo",
                imagenDisciplinaUrl: "",
                federacion: atletismo._id,
                activo: true, 
                pruebas: [   
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
                        ]
        },
        {
         nombre: "Bádminton",
         imagenDisciplinaUrl: "",
         nombreNormalizado: "badminton",
         federacion: badminton._id,
         activo: true, 
         pruebas: [{nombre: "Individual"}]
        },
        {
                nombre: "Baloncesto",
                imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "" ,
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
        nombreNormalizado: "racquetball",
        federacion: racketball._id,
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "" ,
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
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
        imagenDisciplinaUrl: "",
        nombreNormalizado: "voleibol plya",
        federacion: voleibol._id,
        activo: true,
        pruebas:
                [
                {nombre: "Femenino"},
                {nombre: "Masculino"}
                ]
}


    ]

      
console.log("D: " + disciplinas.length)
disciplinas.forEach(elemento => {
        Disciplina.findOneAndUpdate(elemento, elemento, opciones, function(err, elemento) {
        if (err) {/*console.log(err);*/ return};
        });  
});

};