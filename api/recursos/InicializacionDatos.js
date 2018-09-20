'use strict';
var mongoose = require('mongoose'),
Mensaje = mongoose.model('Mensaje'),
Usuario = mongoose.model('Usuario');

exports.Errores = async function(){
  //Mensaje.remove({},(e,el)=>e?console.log(e + "error"): console.log(el+ "exitos"));
  var mensajes = [
        {"mensaje": "", "codigo": -1, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} fue borrado.", "codigo": -2, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} fue modificado con éxito.", "codigo": -3, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 },
        {"mensaje": "El {sutantivoCambiar} a {id} se ha enviado.", "codigo": -5, "exito": 1 },
        {"mensaje": "Contraseña de {sutantivoCambiar}: {id} cambiada exitosamente.", "codigo": -6, "exito": 1},
        {"mensaje": "Contraseña errónea", "codigo": 1, "exito": 0 },
        {"mensaje": "{sutantivoCambiar} {id} no encontrado", "codigo": 2, "exito": 0 },
        {"mensaje": "Hubo un problema borrando el {sutantivoCambiar} {id}", "codigo": 3, "exito": 0 },
        {"mensaje": "Hubo un problema enviando {sutantivoCambiar} a {id}", "codigo": 4, "exito": 0 },
        {"mensaje": "Hubo un problema buscando el {sutantivoCambiar} {id}", "codigo" : 5, "exito": 0 },
        {"mensaje": "Hubo un problema validando el token  de contraseña", "codigo": 6, "exito": 0 },
        {"mensaje": "El token  de contraseña no tiene el formato adecuado", "codigo": 7, "exito": 0 },
        {"mensaje": "Hubo un problema cambiando la contraseña", "codigo" : 8, "exito": 0 },
        {"mensaje": "Contraseña actual no coincide con la indicada", "codigo" : 9, "exito": 0 },
        {"mensaje": "Hubo un problema creando {sutantivoCambiar} {id}", "codigo" : 10, "exito": 0 }, 
        {"mensaje": "No hay usuarios que listar", "codigo" : 11, "exito": 0 },
        {"mensaje": "Hubo un problema leyendo los usuarios", "codigo" : 12, "exito": 0 },   
        {"mensaje": "Hubo un problema leyendo el {sutantivoCambiar} {id}", "codigo" : 13, "exito": 0 },
        {"mensaje": "Hubo un error modificando el {sutantivoCambiar} {id}", "codigo" :14, "exito": 0 },
        {"mensaje": "La identificación o correo electrónico indicado ya está registrado", "codigo" :15, "exito": 0 },
        {"mensaje": "El correo electrónico no tiene formato adecuado", "codigo" :16, "exito": 0 },
        {"mensaje": "Debe digitar la nueva contraseña", "codigo" : 17, "exito": 0 },
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


 var deportes = [
        {
                nombre: "FEDERACIÓN CENTRAL DE AJEDREZ",
                deporte: "Ajedrez",
                paginaWeb: "www.fcacostarica.com",
                ubicacion: "Oficina 1036, Estadio Nacional, La Sábana, San José",
                telefonos: [25490964, 70823378],
                correoFederacion: "info@fcacostarica.com", 
                presidente : "Stanley Gómez Huertas",
                correoPresidente: "presidencia@fcacostarica.com",
                escudoUrl: "",
                imagenUrl: "" 
                }, 
                
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE ATLETISMO",
                deporte: "Atletismo",
                paginaWeb: "www.fecoa.org" ,
                ubicacion: "Oficina 1023, Estadio Nacional, La Sábana, San José",
                telefonos: [25490950, 25490949],
                correoFederacion: "crc@mf.iaaf.org", 
                presidente : "Geen Clarke",
                correoPresidente: "gclarke_4@yahoo.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        
        {
                nombre: "ASOCIACIÓN DE DESARROLLO DEL BÁDMINTON",
                deporte: "Bádminton",
                paginaWeb: null ,
                ubicacion: null,
                telefonos: [22470900],
                correoFederacion: "adbcostarica@yahoo.es", 
                presidente : "Adrian Gómez",
                correoPresidente: "adriangomezcr@yahoo.es",
                escudoUrl: "",
                imagenUrl: "" 
        }, 
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE BALONCESTO",
                deporte: "Baloncesto",
                paginaWeb: "www.fecobacr.com" ,
                ubicacion: "Gimnasio Nacional, La Sabana",
                telefonos: [2339475],
                correoFederacion: "info@fecobacr.com", 
                presidente : "Luis Blanco",
                correoPresidente: "lblancoromero@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },  
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE BALONMANO",
                deporte: "Balonmano",
                paginaWeb: null,
                ubicacion: "Dentro del Gimnasio Nacional, La Sábana, San José",
                telefonos: [22560295],
                correoFederacion: "balonmano.fecobal@hotmail.es", 
                presidente : "Juan Carlos Gutiérrez",
                correoPresidente: null,
                escudoUrl: "",
                imagenUrl: "" 
        },  
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE BÉISBOL AFICIONADO",
                deporte: "Béisbol",
                paginaWeb: "www.fcbeisbol.org",
                ubicacion: "Oficina S1001, Estadio Nacional, La Sábana, San José",
                telefonos: [25490927],
                correoFederacion: "fecobeisa@hotmail.com", 
                presidente : "Rodrigo Chaves",
                correoPresidente: "fecobeisa@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        }, 
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE BILLAR",
                deporte: "Billar",
                paginaWeb: null,
                ubicacion: "400 mts sur de la Iglesia Católica de San Francisco de Dos Ríos, San José ",
                telefonos: null,
                correoFederacion: "avalosronald@gmail.com", 
                presidente : "Ronald Avalos",
                correoPresidente: "avalosronald@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },  
        {
                nombre: "ASOCIACIÓN COSTARRICENSE DE BOLICHE",
                deporte: "Boliche",
                paginaWeb: "www.acobol.com",
                ubicacion: "Oficina 1010, Estadio Nacional, La Sábana, San José",
                telefonos: [22251510],
                correoFederacion: "acobol@gmail.com", 
                presidente : "Alvaro Castro",
                correoPresidente: "acobol@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN COSTARRICENSE DE BOXEO AFICIONADO",
                deporte: "Boxeo",
                paginaWeb: "www.boxeocostarica.org",
                ubicacion: "Oficinas dentro del Gimnasio Nacional en la Sabana, quinta puerta a mano derecha",
                telefonos: [22483151],
                correoFederacion: "acoboxcr@gmail.com", 
                presidente : "Rafael Vega",
                correoPresidente: "vegaboxcr@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE KAYAK Y CANOTAJE",
                deporte: "Canotaje",
                paginaWeb: "www.fecoka-costarica.com",
                ubicacion: "Instalaciones del Estadio Rafael A. Camacho, gradería de sombra, cubículo Asoc. Dptva Kayak, Remo y Canoa.",
                telefonos: [25573131, 88224343],
                correoFederacion: "fecokacrc@hotmail.com", 
                presidente : "Eliecer Céspedes",
                correoPresidente: "lluviaisol@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE CICLISMO",
                deporte: "Ciclismo",
                paginaWeb: "www.fecoci.net",
                ubicacion: "La Sábana Costado Suroeste, frente al restaurante La Princesa Marina, San José",
                telefonos: [22313944, 22317814],
                correoFederacion: "fecoci@ice.co.cr", 
                presidente : "William Corrales",
                correoPresidente: null,
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN DE CRICKET DE COSTA RICA",
                deporte: "Cricket",
                paginaWeb: "www.costaricacricket.org",
                ubicacion: "Estadio Nacional, Of. S.1006, La Sabana, San José",
                telefonos: [25490979, 22682903],
                correoFederacion: "info@costaricacricket.org", 
                presidente : "Sam Oswald Arthur",
                correoPresidente: "bksm777@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN ECUESTRE DE COSTA RICA",
                deporte: "Ecuestre",
                paginaWeb: "www.ecuestrecr.com",
                ubicacion: null,
                telefonos: [83854463],
                correoFederacion: "fedecucrc@gmail.com", 
                presidente : "Rocío Echeverri",
                correoPresidente: "recheverri@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE ESGRIMA",
                deporte: "Esgrima",
                paginaWeb: "www.esgrimacostarica.net",
                ubicacion: null,
                telefonos: null,
                correoFederacion: "luiscruz.crc@gmail.com", 
                presidente : "Luis A. Cruz",
                correoPresidente: "luiscruz.crc@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN DE FÍSICO CULTURISMO Y FITNESS DE COSTA RICA",
                deporte: "Fisiculturismo",
                paginaWeb: "www.fecofidea.com",
                ubicacion: "Estadio Nacioanal oficina 1016",
                telefonos: null,
                correoFederacion: "ifbb_costarica@hotmail.com", 
                presidente : "Edgar Sánchez",
                correoPresidente: "ifbb_costarica@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE FUTBOL",
                deporte: "Futbol",
                paginaWeb: "www.fedefutbol.com",
                ubicacion: "Proyecto Goal, Santa Ana",
                telefonos: [25891450, 22534561],
                correoFederacion: "ejecutivo@fedefutbol.com", 
                presidente : "Rodolfo Villalobos",
                correoPresidente: "ejecutivo@fedefutbol.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN DEPORTIVA GIMNASIA Y AFINES DE COSTA RICA",
                deporte: "Gimnasia",
                paginaWeb: "www.gimnasia-costarica.com",
                ubicacion: "Detrás del Gimnasio Nacional, La Sábana, San José",
                telefonos: [22231022],
                correoFederacion: "cristy.guillen@gimnasia-costarica.com", 
                presidente : "Javier Gonzáles",
                correoPresidente: null,
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE GOLF",
                deporte: "Golf",
                paginaWeb: "www.anagolf.org",
                ubicacion: "Oficina No. 1002 en el Estadio Nacional, La Sabana San José Costa Rica",
                telefonos: [25490922, 25490923],
                correoFederacion: "info@fedegolfcr.com", 
                presidente : "Maurizio Musmanni",
                correoPresidente: "mmusmanni@pastasromas.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN HALTEROFILICA COSTARRICENSE",
                deporte: "Halterofilia",
                paginaWeb: "www.facebook.com/Federacion-Halterofilica-Costarricense-1188110614619287",
                ubicacion: "De la parte baja del Hospital 75 metros sur, San Ramón, Alajuela",
                telefonos: [24455982],
                correoFederacion: "ferhaltero@hotmail.com", 
                presidente : "Steven Esquivel",
                correoPresidente: "ferhaltero@hotmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN HOCKEY SOBRE CÉSPED Y PISTA",
                deporte: "Hockey césped",
                paginaWeb: "www.hockeydecostarica.wixsite.com/hockeylike",
                ubicacion: "Centro comercial Paseo del Sol, San Nicolás (Taras) Cartago, local 15.",
                telefonos: [83033072],
                correoFederacion: "hockeydecostarica@gmail.com", 
                presidente : "Bernardo Picado",
                correoPresidente: "hockeydecostarica@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE JUDO",
                deporte: "Judo",
                paginaWeb: "www.fecojudo.com",
                ubicacion: "Oficina 1030, Estadio Nacional, La Sábana, San José",
                telefonos: [25490970],
                correoFederacion: "info@fecojudo.com", 
                presidente : "Dudley López",
                correoPresidente: "dlopez@dlingenieria.net",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE KARATE DO",
                deporte: "Karate",
                paginaWeb: null,
                ubicacion: "La Sábana, frente a las canchas de tenis, San José",
                telefonos: [83675439],
                correoFederacion: "jkawfcostarica@gmail.com", 
                presidente : "Julio Alvarado",
                correoPresidente: "jlvm79@yahoo.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE NATACIÓN Y AFINES",
                deporte: "Natación",
                paginaWeb: "www.fecona.co.cr",
                ubicacion: "La Sábana, frente a las canchas de tenis, San José",
                telefonos: [22330944],
                correoFederacion: "info@fecona.co.cr", 
                presidente : "Angel Herrera",
                correoPresidente: "fecona@ice.co.cr",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN DE PELOTA VASCA A.D.",
                deporte: "Pelota Vasca",
                paginaWeb: null,
                ubicacion: "San José, Colima de Tibas 300 metros norte y 50 oeste entrada a mano izquierda casa amarilla portón blanco",
                telefonos: [22409284],
                correoFederacion: "pelotavascacostarica@gmail.com", 
                presidente : "Jorge Luis López",
                correoPresidente: "dissantafe2007@yahoo.es",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE RACQUETBALL",
                deporte: "Racquetball",
                paginaWeb: "www.racquetballcr.com",
                ubicacion: "Oficina 1007 Estadio Nacional, La Sábana, San José",
                telefonos: [25490929, 22900965],
                correoFederacion: "info@racquetballcr.com", 
                presidente : "Marcelo Gómez",
                correoPresidente: "marcelogomez@racsa.co.cr",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN DE DEPORTE AVENTURA Y REMO",
                deporte: "Remo",
                paginaWeb: null,
                ubicacion: "Paseo Colón, de la esquina NE del Edificio Colón 50 Norte",
                telefonos: [22336455],
                correoFederacion: "rgallo@riostropicales.com", 
                presidente : "Rafael Gallo",
                correoPresidente: "rgallo@riostropicales.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE RUGBY",
                deporte: "Rugby",
                paginaWeb: "www.federacionrugbycr.com",
                ubicacion: "Estadio Nacional",
                telefonos: [87174793],
                correoFederacion: "presidenciafrcr@gmail.com", 
                presidente : "Ramón Cole De Temple",
                correoPresidente: "presidencia@federacionrugbycr.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE SOFTBOL (BOLA SUAVE)",
                deporte: "Softbol",
                paginaWeb: null,
                ubicacion: "Oficina S 1003 Estadio Nacional, La Sábana, San José",
                telefonos: [25490925],
                correoFederacion: "roberto.castroa@yahoo.com", 
                presidente : "Roberto Castro",
                correoPresidente: "roberto.castroas@yahoo.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE SURF",
                deporte: "Surf",
                paginaWeb: "www.SurfingCR.net",
                ubicacion: "Estadio Nacional, oficina #1003",
                telefonos: [22531532],
                correoFederacion: "info@SurfingCR.net", 
                presidente : "Randall Chaves",
                correoPresidente: "randchaves@gmail.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE TAEKWONDO",
                deporte: "Taekwondo",
                paginaWeb: "www.tkdcr.com",
                ubicacion: "De la Iglesia María Reina 200 sur Complejo de Bodegas Morepark la num.13, Pavas, San José",
                telefonos: [22314308],
                correoFederacion: "info@tkdcr.com", 
                presidente : "Wilmar Alvarado",
                correoPresidente: "presidente@tkdcr.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE TENIS",
                deporte: "Tenis",
                paginaWeb: "www.fctenis.com",
                ubicacion: "Parque de La Paz, primer oficina a mano derecha",
                telefonos: [22271335, 70165984],
                correoFederacion: "patricia.castro@fctenis.com", 
                presidente : "Carlos Bravo",
                correoPresidente: "presidencia@fctenis.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE TENIS MESA",
                deporte: "Tenis de Mesa",
                paginaWeb: "www.fecoteme.com",
                ubicacion: "Oficina 6 Estadio Nacional, La Sábana, San José",
                telefonos: [25490939],
                correoFederacion: "info@fecoteme.com", 
                presidente : "Alexander Zamora",
                correoPresidente: "azamoracr19@yahoo.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN DE TIRO - COSTA RICA",
                deporte: "Tiro Al Blanco",
                paginaWeb: null,
                ubicacion: null,
                telefonos: null,
                correoFederacion: null, 
                presidente : "Hugo Chamberlain",
                correoPresidente: "h_chamberlain_cr@yahoo.com",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "ASOCIACIÓN DEPORTIVA TIRO CON ARCO (ARQUERÍA)",
                deporte: "Tiro Con Arco",
                paginaWeb: "www.archerycrc.org",
                ubicacion: "Oficina 1025, Estadio Nacional, La Sábana, San José",
                telefonos: [25490932],
                correoFederacion: "secretaria@archerycrc.org", 
                presidente : "Pablo Bonilla",
                correoPresidente: "presidencia@archerycrc.org",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN UNIDA DE TRIATLÓN",
                deporte: "Triatlón",
                paginaWeb: "www.feutri.org",
                ubicacion: "Oficina 1004 Estadio Nacional, La Sábana, San José",
                telefonos: [25490920],
                correoFederacion: "info@feutri.org", 
                presidente : "Cristina González",
                correoPresidente: "cgonzalez@seguros.co.cr",
                escudoUrl: "",
                imagenUrl: "" 
        },
        {
                nombre: "FEDERACIÓN COSTARRICENSE DE VOLEIBOL",
                deporte: "Voleibol",
                paginaWeb: "www.fecovol.co.cr/",
                ubicacion: "Dentro del Gimnasio Nacional, San José",
                telefonos: [22330414],
                correoFederacion: "fecovol@gmail.com", 
                presidente : "Edgar Alvarado",
                correoPresidente: "presidente@fecovol.co.cr",
                escudoUrl: "",
                imagenUrl: "" 
        },

        ]        
}