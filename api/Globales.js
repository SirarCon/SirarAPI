var SimbolosGlobales = Object.getOwnPropertySymbols(global);
const nodemailer = require('nodemailer');

const nombreBD = Symbol.for("SIRAR.GLOBAL.NOMBREBD");
const tokenGeneral = Symbol.for("SIRAR.GLOBAL.TOKENGENERAL");
const emailTransporter = Symbol.for("SIRAR.GLOBAL.EMAILTRANSPORTER");
const emailOptions = Symbol.for("SIRAR.GLOBAL.EMAILOPTIONS"); 
const rutaImagenesPerfil = Symbol.for("SIRAR.GLOBAL.RUTAIMAGENESPERFIL"); 
const mensajes = Symbol.for("SIRAR.GLOBAL.MENSAJES");
const crearRandom = Symbol.for("SIRAR.GLOBAL.CREARRANDOM");

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
//module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://localhost/Sirar")
//desarrollo:
//module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://root:sirarcon1234@ds121871.mlab.com:21871/sirardb") 
//pruebas:
module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://root:sirarcon1234@ds245132.mlab.com:45132/sirardbpruebas") 
module.exports.tokenGeneral = inicializarGLobal(tokenGeneral, "d89fgk");
module.exports.rutaImagenesPerfil = inicializarGLobal(rutaImagenesPerfil, "imagenes/imagenesPerfil/")

let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',//'smtp.ethereal.email',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "sirarconcr@gmail.com",
            pass: "Sirar2018"
        }
});
module.exports.emailTransporter = inicializarGLobal(emailTransporter, transporter);

module.exports.emailOptions = function(correo, subject, message){    
    let mailOptions = {
        from: "casasolalonso@gmail.com",
        to: correo,
        subject: subject,     
        html: message
    };
    return inicializarGLobal(emailOptions, mailOptions);
}

module.exports.crearRandom = function(n){
    const randomstring = require('just.randomstring');                   
    return inicializarGLobal(crearRandom, randomstring(n));
}

var todosLosMensajes;

module.exports.inicializarMensajes = async function(mongoose){
    var Mensaje = mongoose.model('Mensaje');
            await Mensaje.find({},(err,mensajes)=>{
            todosLosMensajes= mensajes
    });
}

module.exports.mensajes = function(codigo, id, nuevoMensaje, objeto){
        var mensaje = todosLosMensajes.find(mensaje=>{return mensaje.codigo == codigo}).obtenerMensaje( id, nuevoMensaje, objeto)
        return inicializarGLobal(mensajes, mensaje);
}