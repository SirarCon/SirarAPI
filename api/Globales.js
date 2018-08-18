var SimbolosGlobales = Object.getOwnPropertySymbols(global);
const nodemailer = require('nodemailer');

const nombreBD = Symbol.for("SIRAR.GLOBAL.NOMBREBD");
const tokenGeneral = Symbol.for("SIRAR.GLOBAL.TOKENGENERAL");
const emailTransporter = Symbol.for("SIRAR.GLOBAL.EMAILTRANSPORTER");
const emailOptions = Symbol.for("SIRAR.GLOBAL.EMAILOPTIONS"); 
const rutaImagenesPerfil = Symbol.for("SIRAR.GLOBAL.RUTAIMAGENESPERFIL"); 
const mensajesError = Symbol.for("SIRAR.GLOBAL.MENSAJESERROR");
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

module.exports.nombreBD = inicializarGLobal(nombreBD, /*"mongodb://localhost/Sirar")*/"mongodb://root:sirarcon1234@ds121871.mlab.com:21871/sirardb") 
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

module.exports.mensajesError = function(){
        return inicializarGLobal(mensajesError, todosLosMensajes);
}