
const tokenGeneral = Symbol.for("SIRAR.GLOBAL.TOKEN_GENERAL");

var SimbolosGlobales = Object.getOwnPropertySymbols(global);

var existeTokenGeneral = (SimbolosGlobales.indexOf(tokenGeneral) > -1);

if(!existeTokenGeneral){
    global[tokenGeneral] = "d89fgk"    
}
    /*{ // Encaso de que se quiera utilizar un objeto JSON
        tokkenGlobal: "d89fgk"
    };*/

var singletonTokenGeneral = {};

Object.defineProperty(singletonTokenGeneral, "instance", {
    get: function(){        
        return global[tokenGeneral];
    }
});

Object.freeze(singletonTokenGeneral);

module.exports.tokenGeneral = singletonTokenGeneral;