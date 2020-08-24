const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
evento = require("../models/EventoModel"),
fase = require("../models/FaseModel"),
model = require('../models/CompetenciaModel'),
AtletaC = require('../models/AtletaCompetidorModel'),
equipoC = require('../models/EquipoCompetidorModel'),
equipo = require('../models/EquipoModel'),
pruebaModel = require("../models/PruebaModel"),
controller = require("../controllers/AtletaCompetidorController"),
expressRequestMock = require('express-request-mock');



describe('Atleta Competidor', () => {

var body = {
        evento: 1,
        prueba: 1,
        fechaHora: '2016-08-05T08:00:00.000Z',
        ciudad: 'Tokio',
        recinto: 'Tokio Stadium',
        genero: 1,
        descripcion: 'Hit 1',
        fase: 2,
        activo: true
}

var reqEliminarAtletaCompetencia = {
  ...helper.reqGeneral,
  params: {idAtletaCompetencia: 1}
}

var responseFindOneAC = {
  _id: 1,
  ...body,
}



var atletaCompetidorBody = {
  atleta: 1,
  competencia: 1,
}
var atletaCompetidorBody2 = {
  atleta: 2,
  competencia: 1,
}

var atletaCompetidorBody3 = {
  atleta: 3,
  competencia: 1,
}

var reqCrearatletaCompetidor = {
  ...helper.reqGeneral,
  body: atletaCompetidorBody,
}

var reqCrearatletasCompetidores = {
  ...helper.reqGeneral,
  body:{ atletas:[
            atletaCompetidorBody,
            atletaCompetidorBody2,
            atletaCompetidorBody3
          ],
        }
}

var reqListarAtletasCompetencia ={
  ...helper.reqGeneral,
  params:{ idCompetencia: 1,
  }
}
var respGroupListarAtletasCompetencia=[
       { _id: { _idAtleta: 1, 
          marcadores: {
              type:{
                    mteros: 100
                  }
          }
        },
        atleta: { _idAtleta: 1, nombre: 'Dafne' }
        }]

var reqlistarDeportesEventosAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1
  }
}
var reslistarDeportesEventosAtleta = [{
  _id: 1
}]

var reqlistarPruebasDeporteEventosAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1,
           idDeporte: 1,
  }
}

var reslistarPruebasDeporteEventosAtleta =[{
    _id: 1,
    nombre: "100 mts",
    nombreNormalizado: "100mts"
}]

var reqlistarCompetenciasPorPruebaAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1,
           idPrueba: 1,
  }
}

var reslistarCompetenciasPorPruebaAtleta =[{
  competencia:{ 
    _id: 1,
    descripcion: "100 mts",
    fase: {
      id: 1,
      descripcion: "Primera Fase",
      siglas: "PF"
      }
  }
}]

var resMarcadores = {
  _id: 6,
  atleta: 5,
  competencia: 1,
  marcadores: [
    {
      _id: "5e7d7d702df756081135ccc9",
      esUltimoRegistro: false,
      set: 1,
      tiempo: [Object],
    },
  ]
}

var reqModificarMarcador = {
  ...helper.reqGeneral,
  params:{
    agregar: 1,
    idMarcador: "5e7d7d702df756081135ccc9"
  }
}

var reqModificarAtletaCompetidor = {
  ...helper.reqGeneral,
  params:{
    idAtleta: 1,
  },
  body:{
    esLocal : true,
  }
}
    
    it('Ingresar Atleta a Competencia', async () => {
      mockingoose(model).toReturn(responseFindOneAC, 'findOne')
      mockingoose(AtletaC).toReturn(undefined, 'findOne')
      const { res } = await expressRequestMock(controller.ingresarAtletaACompetencia, reqCrearatletaCompetidor, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Ingresar Atletas a Competencia', async () => {
      const { res } = await expressRequestMock(controller.ingresarAtletasACompetencia, reqCrearatletasCompetidores, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Eliminar Atleta de Competencia', async () => {
      mockingoose(AtletaC).toReturn(responseFindOneAC, 'findOneAndRemove')
      const { res } = await expressRequestMock(controller.eliminarAtletaDeCompetencia, reqEliminarAtletaCompetencia, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    // it('Listar Atletas en Competencia', async () => {
    //   mockingoose(AtletaC).toReturn(respGroupListarAtletasCompetencia, 'aggregate')
    //   const { res } = await expressRequestMock(controller.listarAtletasCompetencia, reqListarAtletasCompetencia, helper.resp)
    //   const { token, datos } = JSON.parse(res._getData());
    //   expect(res.statusCode).toEqual(200);
    //   expect(datos.codigo).toBeLessThan(0);
    //   expect(datos.exito).toBeTruthy(); 
    // });


  it('Listar Fases por Prueba en Evento y Fase', async () => {
    mockingoose(AtletaC).toReturn(reslistarDeportesEventosAtleta, 'aggregate')
    const { res } = await expressRequestMock(controller.listarDeportesEventosAtleta, reqlistarDeportesEventosAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

  it('Listar Pruebas de atleta según deprte en Evento ', async () => {
    mockingoose(AtletaC).toReturn(reslistarPruebasDeporteEventosAtleta, 'aggregate')
    const { res } = await expressRequestMock(controller.listarPruebasDeporteEventosAtleta, reqlistarPruebasDeporteEventosAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

  it('Listar Pruebas de atleta según deprte en Evento ', async () => {
    mockingoose(AtletaC).toReturn(reslistarCompetenciasPorPruebaAtleta, 'aggregate')
    const { res } = await expressRequestMock(controller.listarCompetenciasPorPruebaAtleta, reqlistarCompetenciasPorPruebaAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

  it('Modificar marcadores', async () => {
    mockingoose(AtletaC).toReturn(resMarcadores, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.agregarRemoverMarcador, reqModificarMarcador, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

  it('Modificar atleta competidor', async () => {
    mockingoose(AtletaC).toReturn(resMarcadores, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.modificarAtletaCompetidor, reqModificarAtletaCompetidor, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

});