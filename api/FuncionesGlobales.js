'use strict';
var mongoose = require("mongoose"),
Error = mongoose.model("Error"),
Contador = mongoose.model("Contador"),
moment = require("moment");

var meses =["ENERO", "FEBRERO, MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO",
            "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]

module.exports ={
    validarEmail : function(email, obligatorio = false) {
    return new Promise(function(resolve, reject){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var exito= email ? re.test(String(email).toLowerCase()) : !obligatorio;
      if(exito)
        resolve(true);
      else
        reject(email);
    })
  },
  
  validarEmails: function(emails) {
   return Promise.all(emails.map(e=>this.validarEmail(e)));
  },

  guardarImagen: function(ruta, fotoUrl, id){
    const fs =require("fs");  
    // obtiene solo la imagen, le quita el prefijo base 64
    var datosLimpios = fotoUrl.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer.from(datosLimpios, 'base64');
    var fotoUrl = ruta + id + "." + 'jpeg'  
    if (!fs.existsSync(ruta)){
      var shell = require('shelljs');
      shell.mkdir('-p', ruta);//Si no sirve probar https://www.npmjs.com/package/fs-path para crear fullpath
    } 
    fs.writeFileSync(fotoUrl, buf);  
    return fotoUrl;
  },

  // crea la promesa para fs.readFile()
  leerArchivoAsync: function (filename) {
    var fs = require('fs');
    return new Promise(function(resolve, reject) {
      if(filename && filename !== "") {
      fs.readFile(filename, function(err, data){
            if (err){ 
              //Se comenta para que no llene de mensajes de error por no encontrar el archivo
              //Descomentar si existe un error y se quiere saber la razón
                //module.exports.registrarError("leerArchivoAsync/FuncionesGlobales", err + " " + filename);
                reject("");
              } 
            else{ 
                resolve("data:image/jpeg;base64," + new Buffer.from(data).toString('base64'));
            }
        });
      }
      else{
        resolve("");
      }
    }).catch((err)=>{ 
      if(err != "")
        module.exports.registrarError("leerArchivoAsync/FuncionesGlobales", err) 
      return "";
     });
  },

  borrarArchivo: function (ruta){
    const fs =require("fs");
    if(ruta){
    fs.exists(ruta, function(exists) {    
      if (exists) {
        fs.access(ruta, error => {
          if(!error){
            fs.unlinkSync(ruta);
          }
          else{
            module.exports.registrarError("borrarArchivo/FuncionesGlobales", error); 
          } 
        })
      }     
  });
    }
  },

  asyncForEach : async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  },
  
formatoNombreNormalizado : function (nombre){
  if(nombre)
    return nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "");
  else
  return "";
},

ordenarPorNombre : function(a, b){
  if(a.nombreNormalizado < b.nombreNormalizado) return -1;
  if(a.nombreNormalizado > b.nombreNormalizado) return 1;
  return 0;
},

manejarError : function(err, mensajeDefecto = " "){
  var errorM;
  switch (err.name) {
    case 'ValidationError':
      for (let field in err.errors) {
        switch (err.errors[field].kind) {
          case 'exists':
          case 'invalid':          
          case 'minlength':         
          case 'maxlength':
          case 'required':
          errorM=err.errors[field].message
          break;          
          default:
          errorM = mensajeDefecto
          break              
       }
      }
  }  
  return errorM;
},

registrarError: async function(nombreFuncionArchivo, error){
  var error = new Error({
      nombreFuncionArchivo: nombreFuncionArchivo,
      mensaje: error.message || error,
      codigo: error.code || 0
  });
  error.save();
},

restarContador : async function(entidad){
  await Contador.findOneAndUpdate(
                { _id: entidad },
                { $inc : { sequence_value : -1 } },
                { new : true })  
            .then().catch(error=> {
              module.exports.registrarError("restarContador/FuncionesGlobales",
                                            "Error restando contador de " + entidad + " " + error);
            })
},

calcularEdad : function(fechaNacimiento){
  if(fechaNacimiento !== undefined){
  var d =  module.exports.fechaValida(fechaNacimiento) ? fechaNacimiento
          : new Date(fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));
  var hoy = new Date();
  var annos = hoy.getFullYear() - d.getFullYear();

  return (hoy.getMonth() - d.getMonth() > 0 || hoy.getMonth() - d.getMonth() == 0 && hoy.getDate() - d.getDate() >= 0) ?
          annos : annos - 1; //getMonth comienza en 0
  }else{
    return 0;
  }
},

formatoFecha: function(fecha){
  if(fecha){
    try{
      var tipoFecha = module.exports.fechaValida(fecha) ? fecha : module.exports.convertirAFecha(fecha);
      return new Date(tipoFecha).toLocaleDateString("es-CR");
    }catch(error){
         module.exports.registrarError("formatoFecha/FuncionesGlobales", error);
         return new Date();
    }
  }  
  return fecha;
},

convertirAFecha: function(fecha){
  let tipoFecha = fecha;
  if(fecha && !module.exports.fechaValida(fecha)){
    tipoFecha = moment(fecha, 'DD/MM/YYYY')
               .format('MM/DD/YYYY');
  }         
  return tipoFecha;
}
,

construirFecha: function(fechaCompleta, paraNotificacion = false){//+ 1 por que en JS el mes comienza en 0 
  if(fechaCompleta){
  var fecha = paraNotificacion ?
              fechaCompleta.getDate() + " " +
              meses[fechaCompleta.getMonth()] + ", " +
              fechaCompleta.getFullYear()
              :
             fechaCompleta.getFullYear() + '/' + 
              (fechaCompleta.getMonth() + 1) +'/'+ 
              fechaCompleta.getDate();

  var hora = fechaCompleta.getHours() + ":" + 
            (fechaCompleta.getMinutes().toString().length == 1 ? "0" + fechaCompleta.getMinutes() 
                                                                : fechaCompleta.getMinutes());             
            return fecha + ' '+ hora;
  } 
  else
   return null;
},

obtenerAnno: function(fecha){
  var anno = module.exports.convertirAFecha(fecha).getFullYear();
  return anno;
},

fechaValida: function(fecha){
  try{
    var valida = Date.parse(fecha)
    return !Number.isNaN(valida)
  }catch(error){
    module.exports.registrarError("fechaValida/FuncionesGlobales", error);
     return false;
  }
},

obtenerEstadoEvento: function(fechaInicial, fechaFinal){
  var hoy = new Date();
  var hayFechaInicial = module.exports.fechaValida(fechaInicial);
  var hayFechaFinal = module.exports.fechaValida(fechaFinal);
 
  if(hayFechaInicial && hayFechaFinal &&
    fechaInicial <= hoy && hoy <= fechaFinal)
      return 1;
  if(hayFechaFinal && fechaFinal < hoy)
      return 0;
  if (hayFechaInicial && hoy < fechaInicial)
      return 2;
   
  return 2; //Por defecto no ha iniciado
},

errorHandler: fn => (req, res, next) => {
  return Promise
      .resolve(fn(req, res, next))
      .catch(next);
},

}