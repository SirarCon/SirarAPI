const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
deporte = require("../models/DeporteModel"),
prueba = require("../models/PruebaModel"),
competencia = require("../models/CompetenciaModel"),
atletaC = require("../models/AtletaCompetidorModel"),
equipoC = require('../models/EquipoCompetidorModel'),
equipo = require('../models/EquipoModel'),
evento = require("../models/EventoModel"),
model = require("../models/AtletaModel"),
notificacionAtleta = require("../models/NotificacionAtletaModel"),
controller = require("../controllers/AtletaController"),
expressRequestMock = require('express-request-mock') ;

//#region objetos y requests

var bodyCrearAtleta= { //Objeto con el body completo para reutilizarlo
  nombre: 'TestExitoso3',
  correo: 'wacvillalobggos@kotmail.es',
  activo: true,
  deporte: 1,
  pais: 840,
  retirado: true,
}
//Se extrae solo el rol , pues el objeto de respuesta no lo retorna
var  { rol, ...responseLuegoCrearAtleta} = bodyCrearAtleta;
//Objeto para enviar al modelo Atleta de mongo, se usa el spread operator para completarlo
var nuevoAtleta = {
  _id: 1,
  ...bodyCrearAtleta,
}
//Objeto para enviar al controller de Atleta
var reqNuevoAtleta = {
  ...helper.reqGeneral,
  body: bodyCrearAtleta,
}
//Objeto para modificar atleta
var {rol, correo , ...bodyModificarAtleta} = bodyCrearAtleta
var correoModificado ={ correo: 'wacvillalobggos@hotmail.es'}
//Objeto para enviar al controller modificar
var reqModificarAtleta = {
  ...helper.reqGeneral,
  body: {
    _id: 1,
    ...bodyModificarAtleta,
    correoModificado
  },
}
var depRes ={
    _id: 1,
    nombre: 'Ajedrez',
    nombreNormalizado: 'ajedrez',
    imagenDeporteUrl: '',
    federacion: 1,
    activo: true,
}

var responseNotiAtle = [];

var responseListarAtletas = [
  {
    _id: 1,
    nombre: 'Nery Brenes',
    correo: 'nery@hotmail.es',
    deporte: { _id: 2, federacion: 2 },
    pais: 188,
    activo: true,
    nombreNormalizado: 'nerybrenes',
    __v: 0
  }
]
var reqLeerAtleta = {
  ...helper.reqGeneral,
  params:{ 
    id: 1
  } 
}
var responseLeerAtleta={
    _id: 1,
   ...bodyCrearAtleta
}

var pruebaRes ={
  _id: 1,
}
var eventoRes ={
_id: 1,
}
var medallasActualizadas = { 
  ...nuevoAtleta,
  medallas: [{
    _id: "5e8131e4dbdc2009e5bbb861",
    prueba: 1,
    posicion: 1,
    evento: 1
  }]
}
//#endregion objetos y requests

//#region tests
describe('Atletas Model', () => {
  it('Guardar Atleta en mongo', () => {
    mockingoose(model).toReturn(nuevoAtleta, 'save');
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    return model
          .create(nuevoAtleta).then((res) => {
            expect(JSON.parse(JSON.stringify(res))).toMatchObject(responseLuegoCrearAtleta)
          });
  });

  it('Crear atleta', async () => {
    mockingoose(deporte).toReturn(depRes, 'findOne')
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.crearAtleta, reqNuevoAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    expect(res.statusCode).toEqual(200)
  })

  it('Modificar atleta', async () => {
    mockingoose(deporte).toReturn(depRes, 'findOne')
    mockingoose(model).toReturn({...bodyModificarAtleta, correoModificado}, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.modificarAtleta, reqModificarAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    expect(res.statusCode).toEqual(200)
  })

  // it('Listar atletas', async () => {
  //   mockingoose(model).toReturn(responseListarAtletas, 'find')
  //   const { res } = await expressRequestMock(controller.listarAtletas, helper.reqGeneral, helper.resp)
  //   const { token, datos } = JSON.parse(res._getData());
  //   expect(res.statusCode).toEqual(200);
  //   expect(datos.codigo).toBeLessThan(0);
  //   expect(datos.exito).toBeTruthy();

  // })
  
  // it('Listar atleta específico', async () => {
  //   mockingoose(model).toReturn(responseLeerAtleta, 'findOne')
  //   const { res } = await expressRequestMock(controller.leerAtleta, reqLeerAtleta, helper.resp)
  //   const { token, datos } = JSON.parse(res._getData());
  //   expect(datos.codigo).toBeLessThan(0);
  //   expect(datos.exito).toBeTruthy();
  //   expect(res.statusCode).toEqual(200)
  // })

  it('Listar atletas activos', async () => {
    mockingoose(model).toReturn(responseListarAtletas, 'find')
    mockingoose(notificacionAtleta).toReturn(responseNotiAtle, 'find');
    const { res } = await expressRequestMock(controller.listarAtletasActivos, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    expect(res.statusCode).toEqual(200)
  })
  
  it('Listar atleta activo específico', async () => {
    mockingoose(model).toReturn(responseLeerAtleta, 'findOne')
    const { res } = await expressRequestMock(controller.leerAtletaActivo, reqLeerAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    expect(res.statusCode).toEqual(200)
  })

  it('Modificar medallas', async ()=>{
    mockingoose(prueba).toReturn(pruebaRes, 'findOne')
    mockingoose(evento).toReturn(eventoRes, 'findOne')
    mockingoose(model).toReturn(medallasActualizadas, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.modificarMedalla, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    expect(res.statusCode).toEqual(200)
})

});

//#endregion tests
