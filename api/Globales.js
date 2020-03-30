var SimbolosGlobales = Object.getOwnPropertySymbols(global);
const nodemailer = require('nodemailer');

const nombreBD = Symbol.for("SIRAR.GLOBAL.NOMBREBD");
const nombreBDTest = Symbol.for("SIRAR.GLOBAL.NOMBREBDTEST");
const tokenGeneral = Symbol.for("SIRAR.GLOBAL.TOKENGENERAL");
const rutaImagenesPerfil = Symbol.for("SIRAR.GLOBAL.RUTAIMAGENESPERFIL"); 
const rutaImagenesAtletas = Symbol.for("SIRAR.GLOBAL.RUTAIMAGENESATLETAS"); 
const rutaImagenesDeportes = Symbol.for("SIRAR.GLOBAL.rutaImagenesDeportes");
const rutaImagenesFederaciones = Symbol.for("SIRAR.GLOBAL.RUTAIMAGENESFEDERACIONES");
const rutaImagenesEventos = Symbol.for("SISRAR.GLOBAL.RUTAIMAGENESEVENTOS"); 

function inicializarGLobal(variableGlobal, valor){
    var existeVarGlobal = (SimbolosGlobales.indexOf(variableGlobal) > -1);
    
    if(!existeVarGlobal)
        global[variableGlobal] = valor;    

        var singletonGeneral = {};

        Object.defineProperty(singletonGeneral, "instance", {
            get: function(){        
                return global[variableGlobal];
            }
        });
        
        Object.freeze(singletonGeneral);
        return singletonGeneral;
}

//local:
module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://localhost/Sirar")
module.exports.nombreBDTest = inicializarGLobal(nombreBDTest, "mongodb://localhost/SirarTest")
//desarrollo:
//module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://root:sirarcon1234@ds121871.mlab.com:21871/sirardb") 
//pruebas:
//module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://root:sirarcon1234@ds245132.mlab.com:45132/sirardbpruebas") 
module.exports.tokenGeneral = inicializarGLobal(tokenGeneral, "d89fgk");
module.exports.rutaImagenesPerfil = inicializarGLobal(rutaImagenesPerfil, "imagenes/imagenesPerfil/");
module.exports.rutaImagenesAtletas= inicializarGLobal(rutaImagenesAtletas, "imagenes/imagenesAtletas/");
module.exports.rutaImagenesDeportes = inicializarGLobal(rutaImagenesDeportes, "imagenes/imagenesDeportes/");
module.exports.rutaImagenesFederaciones = inicializarGLobal(rutaImagenesFederaciones, "imagenes/imagenesFederaciones/");
module.exports.rutaImagenesEventos = inicializarGLobal(rutaImagenesEventos, "imagenes/imagenesEventos/");

let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',//'smtp.ethereal.email',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "sirarconcr@gmail.com",
            pass: "Sirar2018"
        }
});
module.exports.emailTransporter =  transporter;

module.exports.emailOptions = function(correo, subject, message){    
    let mailOptions = {
        from: "casasolalonso@gmail.com",
        to: correo,
        subject: subject,     
        html: message
    };
    return mailOptions;
}

module.exports.crearRandom = function(n){
    const randomstring = require('just.randomstring');                   
    return randomstring(n);
}

var todosLosMensajes;
module.exports.todosLosMensajes = todosLosMensajes

module.exports.inicializarMensajes = async function(mongoose){
    var Mensaje = mongoose.model('Mensaje');
            await Mensaje.find({},(err,mensajes)=>{
            todosLosMensajes= mensajes
    });
}

module.exports.mensajes = function(codigo, sustantivo, identificador, objeto){
     return todosLosMensajes.find(mensaje=>{return mensaje.codigo == codigo}).obtenerMensaje( sustantivo, identificador, objeto)
}
