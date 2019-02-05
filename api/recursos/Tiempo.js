exports.Tiempo = class {
    constructor(hora, minuto, segundo, milisegundo){
    if(hora)
        this.hora = hora;
    if(minuto)
        this.miunto = minuto;
    if(segundo)
        this.segundo = segundo;
    if(milisegundo)
        this.milisegundo = milisegundo;
    }
}