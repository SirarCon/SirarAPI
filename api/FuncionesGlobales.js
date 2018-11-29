'use strict';

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
   // console.log(filename);
    var fs = require('fs');
    return new Promise(function(resolve, reject) {
      if(filename || filename !== "") {
      fs.readFile(filename, function(err, data){
            if (err){ 
              console.log(err+ " " + filename);
                reject("");
              } 
            else{ 
                resolve("data:image/jpeg;base64," + new Buffer(data).toString('base64'));
            }
        });
      }
        else{
          reject("");
        }
    }).catch((e)=>{ console.log(e); return "" });
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
          else console.log(error);
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

manejarError : function(err, mensajeDefecto = ""){
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
}
}