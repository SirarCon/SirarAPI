'use strict';

module.exports ={
    validarEmail : function(email) {
    return new Promise(function(resolve, reject){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      resolve(re.test(String(email).toLowerCase()));
    })
  },
  
  // crea la promesa para fs.readFile()
  leerArchivoAsync: function (filename) {
    var fs = require('fs');
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data){
            if (err){ 
                reject("");
              } 
            else{ 
                resolve("data:image/jpeg;base64," + new Buffer(data).toString('base64'));
            }
        });
    }).catch((e)=>{return "" });
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
  }
  

}