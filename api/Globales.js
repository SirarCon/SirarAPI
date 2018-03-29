var SimbolosGlobales = Object.getOwnPropertySymbols(global);
const nodemailer = require('nodemailer');

const nombreBD = Symbol.for("SIRAR.GLOBAL.NOMBREBD");
const tokenGeneral = Symbol.for("SIRAR.GLOBAL.TOKENGENERAL");
const emailTransporter = Symbol.for("SIRAR.GLOBAL.EMAILTRANSPORTER");
const emailOptions = Symbol.for("SIRAR.GLOBAL.EMAILOPTIONS"); 

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

module.exports.nombreBD = inicializarGLobal(nombreBD, "mongodb://localhost/Tododb") 
module.exports.tokenGeneral = inicializarGLobal(tokenGeneral, "d89fgk");

let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',//'smtp.ethereal.email',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "casasolalonso@gmail.com",
            pass: "*********"
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